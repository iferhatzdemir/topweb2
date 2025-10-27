export class ZodValidationError extends Error {
  constructor(issues) {
    super("Validation failed");
    this.name = "ZodValidationError";
    this.issues = issues;
  }
}

const issue = (path, message) => ({ path, message });

const cloneSchema = (schema) => {
  const next = Object.assign(Object.create(Object.getPrototypeOf(schema)), schema);
  if (schema.checks) {
    next.checks = [...schema.checks];
  }
  if (schema.refinements) {
    next.refinements = [...schema.refinements];
  }
  return next;
};

const baseOptional = (schema) => {
  const next = cloneSchema(schema);
  next.optional = true;
  return next;
};

const parseString = (schema, value, path) => {
  if (value === undefined || value === null || value === "") {
    if (schema.optional) {
      return { success: true, data: value === undefined ? undefined : String(value ?? "") };
    }
    return {
      success: false,
      issues: [issue(path, schema.emptyMessage || "Bu alan zorunludur.")],
    };
  }

  if (typeof value !== "string") {
    return {
      success: false,
      issues: [issue(path, "Metin değeri olmalıdır.")],
    };
  }

  for (const check of schema.checks) {
    const result = check(value);
    if (result) {
      return { success: false, issues: [issue(path, result)] };
    }
  }

  return { success: true, data: value };
};

const parseNumber = (schema, value, path) => {
  if (value === undefined || value === null || value === "") {
    if (schema.optional) {
      return { success: true, data: value === "" ? undefined : value }; // leave undefined when empty
    }
    return { success: false, issues: [issue(path, "Bu alan zorunludur.")] };
  }

  const parsed = typeof value === "number" ? value : Number(value);
  if (Number.isNaN(parsed)) {
    return { success: false, issues: [issue(path, "Sayısal bir değer girin.")] };
  }

  for (const check of schema.checks) {
    const result = check(parsed);
    if (result) {
      return { success: false, issues: [issue(path, result)] };
    }
  }

  return { success: true, data: parsed };
};

const parseBoolean = (schema, value, path) => {
  if (value === undefined || value === null || value === "") {
    if (schema.optional) {
      return { success: true, data: undefined };
    }
    return { success: false, issues: [issue(path, "Bu alan zorunludur.")] };
  }

  let parsed = value;
  if (typeof value === "string") {
    parsed = value === "true" || value === "1" || value === "on";
  }

  return { success: true, data: Boolean(parsed) };
};

const parseEnum = (schema, value, path) => {
  if (value === undefined || value === null || value === "") {
    if (schema.optional) {
      return { success: true, data: undefined };
    }
    return { success: false, issues: [issue(path, "Bir değer seçin.")] };
  }

  if (!schema.options.includes(value)) {
    return {
      success: false,
      issues: [issue(path, schema.errorMessage || `Geçersiz değer: ${value}`)],
    };
  }

  return { success: true, data: value };
};

const parseArray = (schema, value, path) => {
  if (value === undefined || value === null) {
    if (schema.optional) {
      return { success: true, data: [] };
    }
    return { success: false, issues: [issue(path, "En az bir öğe ekleyin.")] };
  }

  if (!Array.isArray(value)) {
    return { success: false, issues: [issue(path, "Dizi formatında olmalıdır.")] };
  }

  const parsedItems = [];
  const issues = [];

  value.forEach((item, index) => {
    const result = parseSchema(schema.element, item, [...path, index]);
    if (result.success) {
      parsedItems.push(result.data);
    } else {
      issues.push(...result.issues);
    }
  });

  if (schema.minLength && parsedItems.length < schema.minLength.value) {
    issues.push(issue(path, schema.minLength.message));
  }

  if (issues.length) {
    return { success: false, issues };
  }

  return { success: true, data: parsedItems };
};

const parseObject = (schema, value, path) => {
  if (value === undefined || value === null) {
    if (schema.optional) {
      return { success: true, data: undefined };
    }
    return { success: false, issues: [issue(path, "Bu alan zorunludur.")] };
  }

  if (typeof value !== "object" || Array.isArray(value)) {
    return { success: false, issues: [issue(path, "Nesne formatında olmalıdır.")] };
  }

  const parsed = {};
  const issues = [];

  for (const [key, shapeSchema] of Object.entries(schema.shape)) {
    const childValue = value[key];
    const result = parseSchema(shapeSchema, childValue, [...path, key]);
    if (result.success) {
      if (result.data !== undefined) {
        parsed[key] = result.data;
      }
    } else {
      issues.push(...result.issues);
    }
  }

  if (schema.refinements?.length) {
    for (const refinement of schema.refinements) {
      const valid = refinement.check(parsed);
      if (!valid) {
        issues.push(issue(path, refinement.message));
      }
    }
  }

  if (issues.length) {
    return { success: false, issues };
  }

  return { success: true, data: parsed };
};

const parseSchema = (schema, value, path = []) => {
  switch (schema.type) {
    case "string":
      return parseString(schema, value, path);
    case "number":
      return parseNumber(schema, value, path);
    case "boolean":
      return parseBoolean(schema, value, path);
    case "enum":
      return parseEnum(schema, value, path);
    case "array":
      return parseArray(schema, value, path);
    case "object":
      return parseObject(schema, value, path);
    default:
      return { success: true, data: value };
  }
};

const buildResult = (result) => {
  if (result.success) {
    return { success: true, data: result.data };
  }
  return {
    success: false,
    error: {
      issues: result.issues,
    },
  };
};

const string = () => ({
  type: "string",
  optional: false,
  checks: [],
  emptyMessage: undefined,
  min(length, message) {
    this.checks.push((value) =>
      value.length >= length ? null : message || `En az ${length} karakter olmalı.`
    );
    return this;
  },
  max(length, message) {
    this.checks.push((value) =>
      value.length <= length ? null : message || `En fazla ${length} karakter olmalı.`
    );
    return this;
  },
  nonempty(message) {
    this.emptyMessage = message || "Bu alan zorunludur.";
    this.checks.push((value) => (value.trim().length ? null : message || "Bu alan zorunludur."));
    return this;
  },
  email(message) {
    const regex = /[^\s@]+@[^\s@]+\.[^\s@]+/;
    this.checks.push((value) => (regex.test(value) ? null : message || "Geçerli bir e-posta girin."));
    return this;
  },
  regex(pattern, message) {
    this.checks.push((value) => (pattern.test(value) ? null : message || "Geçersiz format."));
    return this;
  },
  url(message) {
    this.checks.push((value) => {
      try {
        // eslint-disable-next-line no-new
        new URL(value);
        return null;
      } catch (error) {
        return message || "Geçerli bir URL girin.";
      }
    });
    return this;
  },
  optional() {
    return baseOptional(this);
  },
  safeParse(value) {
    return buildResult(parseString(this, value, []));
  },
  parse(value) {
    const parsed = this.safeParse(value);
    if (!parsed.success) {
      throw new ZodValidationError(parsed.error.issues);
    }
    return parsed.data;
  },
});

const number = () => ({
  type: "number",
  optional: false,
  checks: [],
  min(value, message) {
    this.checks.push((input) => (input >= value ? null : message || `En az ${value}`));
    return this;
  },
  max(value, message) {
    this.checks.push((input) => (input <= value ? null : message || `En fazla ${value}`));
    return this;
  },
  optional() {
    return baseOptional(this);
  },
  safeParse(value) {
    return buildResult(parseNumber(this, value, []));
  },
});

const boolean = () => ({
  type: "boolean",
  optional: false,
  optional() {
    return baseOptional(this);
  },
  safeParse(value) {
    return buildResult(parseBoolean(this, value, []));
  },
});

const enumeration = (options) => ({
  type: "enum",
  options,
  optional: false,
  errorMessage: undefined,
  optional() {
    return baseOptional(this);
  },
  safeParse(value) {
    return buildResult(parseEnum(this, value, []));
  },
});

const array = (element) => ({
  type: "array",
  element,
  optional: false,
  minLength: undefined,
  min(value, message) {
    this.minLength = { value, message: message || `En az ${value} kayıt ekleyin.` };
    return this;
  },
  optional() {
    return baseOptional(this);
  },
  safeParse(value) {
    return buildResult(parseArray(this, value, []));
  },
});

const object = (shape) => ({
  type: "object",
  shape,
  optional: false,
  refinements: [],
  refine(check, message) {
    this.refinements.push({ check, message });
    return this;
  },
  optional() {
    return baseOptional(this);
  },
  safeParse(value) {
    return buildResult(parseObject(this, value, []));
  },
});

export const z = {
  string,
  number,
  boolean,
  enum: enumeration,
  array,
  object,
};
