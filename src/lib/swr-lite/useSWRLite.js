"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const cacheStore = new Map();

const serializeKey = (key) => {
  if (key === null || key === undefined) {
    return null;
  }
  if (typeof key === "string") {
    return key;
  }
  return JSON.stringify(key);
};

const now = () => Date.now();

export const createSwrCacheSnapshot = () => {
  const snapshot = {};
  cacheStore.forEach((value, key) => {
    snapshot[key] = {
      data: value.data,
      timestamp: value.timestamp,
    };
  });
  return snapshot;
};

export const primeSwrCache = (entries = {}) => {
  Object.entries(entries).forEach(([key, value]) => {
    cacheStore.set(key, {
      data: value.data,
      timestamp: value.timestamp ?? now(),
      promise: null,
      error: undefined,
    });
  });
};

export const clearSwrCache = () => {
  cacheStore.clear();
};

const defaultOptions = {
  staleTime: 1000 * 60 * 5,
  initialData: undefined,
};

export function useSWRLite(key, fetcher, options = {}) {
  const serializedKey = useMemo(() => serializeKey(key), [key]);
  const { staleTime, initialData } = { ...defaultOptions, ...options };
  const fetchRef = useRef(fetcher);

  useEffect(() => {
    fetchRef.current = fetcher;
  }, [fetcher]);

  const [state, setState] = useState(() => {
    if (!serializedKey) {
      return {
        data: initialData,
        error: undefined,
        isLoading: false,
        isValidating: false,
      };
    }
    const entry = cacheStore.get(serializedKey);
    if (entry?.data !== undefined) {
      return {
        data: entry.data,
        error: entry.error,
        isLoading: false,
        isValidating: false,
      };
    }
    if (initialData !== undefined) {
      cacheStore.set(serializedKey, {
        data: initialData,
        timestamp: now(),
        promise: null,
        error: undefined,
      });
      return {
        data: initialData,
        error: undefined,
        isLoading: false,
        isValidating: false,
      };
    }
    return {
      data: undefined,
      error: undefined,
      isLoading: true,
      isValidating: true,
    };
  });

  useEffect(() => {
    if (!serializedKey || !fetchRef.current) {
      return undefined;
    }

    let cancelled = false;

    const run = async () => {
      const entry = cacheStore.get(serializedKey);
      const isStale = entry ? now() - entry.timestamp > staleTime : true;

      if (entry && entry.data !== undefined) {
        setState((prev) => {
          if (prev.data === entry.data && !prev.isLoading) {
            return prev;
          }
          return {
            data: entry.data,
            error: entry.error,
            isLoading: false,
            isValidating: false,
          };
        });
      }

      if (!isStale && entry?.promise == null) {
        setState((prev) => ({
          ...prev,
          isLoading: false,
          isValidating: false,
        }));
        return;
      }

      const pendingPromise = (async () => {
        try {
          const data = await fetchRef.current();
          cacheStore.set(serializedKey, {
            data,
            timestamp: now(),
            promise: null,
            error: undefined,
          });
          if (!cancelled) {
            setState({
              data,
              error: undefined,
              isLoading: false,
              isValidating: false,
            });
          }
          return data;
        } catch (error) {
          cacheStore.set(serializedKey, {
            data: entry?.data,
            timestamp: entry?.timestamp ?? 0,
            promise: null,
            error,
          });
          if (!cancelled) {
            setState({
              data: entry?.data,
              error,
              isLoading: false,
              isValidating: false,
            });
          }
          throw error;
        }
      })();

      cacheStore.set(serializedKey, {
        data: entry?.data,
        timestamp: entry?.timestamp ?? now(),
        promise: pendingPromise,
        error: entry?.error,
      });

      setState((prev) => ({
        ...prev,
        isValidating: true,
        isLoading: prev.isLoading && !entry?.data,
      }));

      try {
        await pendingPromise;
      } catch (error) {
        if (!cancelled) {
          setState((prev) => ({
            ...prev,
            error,
            isLoading: false,
            isValidating: false,
          }));
        }
      }
    };

    run();

    return () => {
      cancelled = true;
    };
  }, [serializedKey, staleTime]);

  const mutate = async (updater) => {
    if (!serializedKey) {
      return undefined;
    }
    if (typeof updater === "function") {
      const current = cacheStore.get(serializedKey)?.data;
      const nextValue = await updater(current);
      cacheStore.set(serializedKey, {
        data: nextValue,
        timestamp: now(),
        promise: null,
        error: undefined,
      });
      setState({
        data: nextValue,
        error: undefined,
        isLoading: false,
        isValidating: false,
      });
      return nextValue;
    }
    if (updater !== undefined) {
      cacheStore.set(serializedKey, {
        data: updater,
        timestamp: now(),
        promise: null,
        error: undefined,
      });
      setState({
        data: updater,
        error: undefined,
        isLoading: false,
        isValidating: false,
      });
      return updater;
    }
    const data = await fetchRef.current();
    cacheStore.set(serializedKey, {
      data,
      timestamp: now(),
      promise: null,
      error: undefined,
    });
    setState({
      data,
      error: undefined,
      isLoading: false,
      isValidating: false,
    });
    return data;
  };

  return {
    ...state,
    mutate,
  };
}
