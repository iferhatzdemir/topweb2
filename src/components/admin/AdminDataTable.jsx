"use client";

import { useMemo, useState } from "react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import styles from "./AdminDataTable.module.css";

const toLowerSafe = (value) => (value ?? "").toString().toLowerCase();

const AdminDataTable = ({
  columns,
  rows,
  searchableKeys = [],
  filters = [],
  defaultSort,
  pageSizeOptions = [10, 20, 50],
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(defaultSort?.key ?? columns[0]?.key);
  const [sortDirection, setSortDirection] = useState(defaultSort?.direction ?? "desc");
  const [pageSize, setPageSize] = useState(pageSizeOptions[0]);
  const [page, setPage] = useState(1);
  const [activeFilters, setActiveFilters] = useState(() =>
    filters.reduce((acc, filter) => ({ ...acc, [filter.key]: filter.defaultValue ?? "all" }), {})
  );

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDirection("desc");
    }
  };

  const filteredRows = useMemo(() => {
    let dataset = [...rows];

    if (searchTerm && searchableKeys.length) {
      const lowerSearch = searchTerm.toLowerCase();
      dataset = dataset.filter((row) =>
        searchableKeys.some((key) => toLowerSafe(row[key]).includes(lowerSearch))
      );
    }

    filters.forEach((filter) => {
      const value = activeFilters[filter.key];
      if (!value || value === "all") return;
      if (filter.match) {
        dataset = dataset.filter((row) => filter.match(row, value));
      } else {
        dataset = dataset.filter((row) => row[filter.key] === value);
      }
    });

    if (sortKey) {
      dataset.sort((a, b) => {
        const first = a[sortKey];
        const second = b[sortKey];

        if (first === second) return 0;
        const direction = sortDirection === "asc" ? 1 : -1;

        if (first === undefined || first === null) return 1;
        if (second === undefined || second === null) return -1;

        if (typeof first === "number" && typeof second === "number") {
          return (first - second) * direction;
        }

        const firstValue = toLowerSafe(first);
        const secondValue = toLowerSafe(second);
        return firstValue.localeCompare(secondValue, "tr") * direction;
      });
    }

    return dataset;
  }, [rows, searchTerm, searchableKeys, filters, activeFilters, sortKey, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const visibleRows = filteredRows.slice(startIndex, startIndex + pageSize);

  const updateFilter = (key, value) => {
    setActiveFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const changePageSize = (value) => {
    setPageSize(value);
    setPage(1);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.toolbar}>
        <Input
          value={searchTerm}
          onChange={(event) => {
            setSearchTerm(event.target.value);
            setPage(1);
          }}
          placeholder="Başlık, yazar veya slug ara"
          aria-label="Tablo araması"
          className={styles.search}
        />
        <div className={styles.filters}>
          {filters.map((filter) => (
            <label key={filter.key} className={styles.filterControl}>
              <span>{filter.label}</span>
              <select
                value={activeFilters[filter.key]}
                onChange={(event) => updateFilter(filter.key, event.target.value)}
              >
                <option value="all">Tümü</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
      </div>

      <div className={styles.tableScroller}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((column) => {
                const sortState =
                  sortKey === column.key
                    ? sortDirection === "asc"
                      ? "ascending"
                      : "descending"
                    : "none";

                return (
                  <th key={column.key} scope="col" aria-sort={sortState}>
                    <button
                      type="button"
                      onClick={() => column.sortable !== false && handleSort(column.key)}
                      className={`${styles.headerButton} ${
                      sortKey === column.key ? styles.sorted : ""
                    }`}
                  >
                    {column.label}
                    {sortKey === column.key ? (
                      <span className={styles.sortIndicator} aria-hidden="true">
                        {sortDirection === "asc" ? "↑" : "↓"}
                      </span>
                    ) : null}
                  </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {visibleRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className={styles.emptyState}>
                  Kriterlere uygun kayıt bulunamadı.
                </td>
              </tr>
            ) : (
              visibleRows.map((row) => (
                <tr key={row.id}>
                  {columns.map((column) => (
                    <td key={column.key} data-title={column.label}>
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className={styles.footer}>
        <div className={styles.paginationInfo}>
          {filteredRows.length} kayıttan {startIndex + 1}-{startIndex + visibleRows.length} arası
          gösteriliyor.
        </div>
        <div className={styles.paginationControls}>
          <label className={styles.pageSize}>
            <span>Sayfa boyutu</span>
            <select value={pageSize} onChange={(event) => changePageSize(Number(event.target.value))}>
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <div className={styles.buttons}>
            <Button
              size="sm"
              variant="neutral"
              tone="ghost"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              Önceki
            </Button>
            <span className={styles.pageIndicator}>
              {currentPage} / {totalPages}
            </span>
            <Button
              size="sm"
              variant="neutral"
              tone="ghost"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              Sonraki
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDataTable;
