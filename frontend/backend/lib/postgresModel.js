<<<<<<< HEAD
const crypto = require("crypto");
const { getPool, query } = require("../config/db");
const { registerModel, getModel } = require("./modelRegistry");
=======
const crypto = require('crypto');
const { getPool, query } = require('../config/db');
const { registerModel, getModel } = require('./modelRegistry');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

function deepClone(value) {
  return value === undefined ? value : JSON.parse(JSON.stringify(value));
}

function isObject(value) {
<<<<<<< HEAD
  return value !== null && typeof value === "object" && !Array.isArray(value);
=======
  return value !== null && typeof value === 'object' && !Array.isArray(value);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
}

function getValue(obj, path) {
  if (!path) return obj;
<<<<<<< HEAD
  const normalized = path === "_id" ? "id" : path;
  return normalized.split(".").reduce((acc, key) => {
=======
  const normalized = path === '_id' ? 'id' : path;
  return normalized.split('.').reduce((acc, key) => {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    if (acc == null) return undefined;
    return acc[key];
  }, obj);
}

function setValue(obj, path, value) {
<<<<<<< HEAD
  const normalized = path === "_id" ? "id" : path;
  const parts = normalized.split(".");
=======
  const normalized = path === '_id' ? 'id' : path;
  const parts = normalized.split('.');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  let current = obj;
  for (let i = 0; i < parts.length - 1; i += 1) {
    const part = parts[i];
    if (!isObject(current[part])) {
      current[part] = {};
    }
    current = current[part];
  }
  current[parts[parts.length - 1]] = value;
}

function matchesText(doc, search) {
  const needle = String(search).toLowerCase();
  const stack = [doc];
  while (stack.length) {
    const value = stack.pop();
    if (value == null) continue;
<<<<<<< HEAD
    if (typeof value === "string") {
      if (value.toLowerCase().includes(needle)) return true;
      continue;
    }
    if (typeof value === "number" || typeof value === "boolean") {
=======
    if (typeof value === 'string') {
      if (value.toLowerCase().includes(needle)) return true;
      continue;
    }
    if (typeof value === 'number' || typeof value === 'boolean') {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      if (String(value).toLowerCase().includes(needle)) return true;
      continue;
    }
    if (Array.isArray(value)) {
      stack.push(...value);
      continue;
    }
<<<<<<< HEAD
    if (typeof value === "object") {
=======
    if (typeof value === 'object') {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      stack.push(...Object.values(value));
    }
  }
  return false;
}

function compareOperator(value, condition) {
  if (condition == null || !isObject(condition) || condition instanceof RegExp) {
    if (condition instanceof RegExp) {
<<<<<<< HEAD
      return typeof value === "string" && condition.test(value);
=======
      return typeof value === 'string' && condition.test(value);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    }
    if (Array.isArray(value)) {
      return value.some((item) => String(item) === String(condition));
    }
    return String(value) === String(condition);
  }

<<<<<<< HEAD
  if ("$regex" in condition) {
    const regex =
      condition.$regex instanceof RegExp
        ? condition.$regex
        : new RegExp(condition.$regex, condition.$options || "i");
    return typeof value === "string" && regex.test(value);
  }

  if ("$gte" in condition && !(value >= condition.$gte)) return false;
  if ("$lte" in condition && !(value <= condition.$lte)) return false;
  if ("$gt" in condition && !(value > condition.$gt)) return false;
  if ("$lt" in condition && !(value < condition.$lt)) return false;
  if ("$in" in condition && !condition.$in.map(String).includes(String(value))) return false;
  if ("$ne" in condition && String(value) === String(condition.$ne)) return false;
=======
  if ('$regex' in condition) {
    const regex = condition.$regex instanceof RegExp
      ? condition.$regex
      : new RegExp(condition.$regex, condition.$options || 'i');
    return typeof value === 'string' && regex.test(value);
  }

  if ('$gte' in condition && !(value >= condition.$gte)) return false;
  if ('$lte' in condition && !(value <= condition.$lte)) return false;
  if ('$gt' in condition && !(value > condition.$gt)) return false;
  if ('$lt' in condition && !(value < condition.$lt)) return false;
  if ('$in' in condition && !condition.$in.map(String).includes(String(value))) return false;
  if ('$ne' in condition && String(value) === String(condition.$ne)) return false;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  return true;
}

function matchesFilter(doc, filter = {}) {
  const entries = Object.entries(filter || {});
  for (const [key, condition] of entries) {
<<<<<<< HEAD
    if (key === "$and") {
      if (!condition.every((clause) => matchesFilter(doc, clause))) return false;
      continue;
    }
    if (key === "$or") {
      if (!condition.some((clause) => matchesFilter(doc, clause))) return false;
      continue;
    }
    if (key === "$text") {
      if (!matchesText(doc, condition.$search || "")) return false;
=======
    if (key === '$and') {
      if (!condition.every((clause) => matchesFilter(doc, clause))) return false;
      continue;
    }
    if (key === '$or') {
      if (!condition.some((clause) => matchesFilter(doc, clause))) return false;
      continue;
    }
    if (key === '$text') {
      if (!matchesText(doc, condition.$search || '')) return false;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      continue;
    }

    const value = getValue(doc, key);
    if (!compareOperator(value, condition)) return false;
  }
  return true;
}

function sortDocuments(docs, sortSpec) {
  if (!sortSpec) return docs;
<<<<<<< HEAD
  const specs =
    typeof sortSpec === "string"
      ? sortSpec
          .split(/\s+/)
          .filter(Boolean)
          .map((part) => ({
            field: part.startsWith("-") ? part.slice(1) : part,
            direction: part.startsWith("-") ? -1 : 1,
          }))
      : Object.entries(sortSpec).map(([field, direction]) => ({
          field,
          direction: String(direction).startsWith("-") || direction === -1 ? -1 : 1,
        }));
=======
  const specs = typeof sortSpec === 'string'
    ? sortSpec.split(/\s+/).filter(Boolean).map((part) => ({
      field: part.startsWith('-') ? part.slice(1) : part,
      direction: part.startsWith('-') ? -1 : 1,
    }))
    : Object.entries(sortSpec).map(([field, direction]) => ({
      field,
      direction: String(direction).startsWith('-') || direction === -1 ? -1 : 1,
    }));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

  return [...docs].sort((a, b) => {
    for (const { field, direction } of specs) {
      const av = getValue(a, field);
      const bv = getValue(b, field);
      if (av === bv) continue;
      if (av == null) return 1 * direction;
      if (bv == null) return -1 * direction;
      if (av > bv) return 1 * direction;
      if (av < bv) return -1 * direction;
    }
    return 0;
  });
}

async function populateDocuments(docs, populateSpec, modelClass) {
  const specs = Array.isArray(populateSpec) ? populateSpec : [populateSpec];
  const relations = modelClass.relations || {};

  for (const spec of specs.filter(Boolean)) {
<<<<<<< HEAD
    const path = typeof spec === "string" ? spec : spec.path;
=======
    const path = typeof spec === 'string' ? spec : spec.path;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    if (!path) continue;
    const relation = relations[path];
    if (!relation) continue;

<<<<<<< HEAD
    const relationModelName = typeof relation === "string" ? relation : relation.model;
=======
    const relationModelName = typeof relation === 'string' ? relation : relation.model;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    const many = Boolean(relation && relation.many);
    const relatedModel = getModel(relationModelName);
    if (!relatedModel) continue;

    for (const doc of docs) {
      const value = getValue(doc, path);
      if (value == null) continue;

      if (many || Array.isArray(value)) {
        const ids = Array.isArray(value) ? value : [value];
        const populated = [];
        for (const id of ids) {
          // eslint-disable-next-line no-await-in-loop
          const related = await relatedModel.findById(id);
          if (related) populated.push(related);
        }
        setValue(doc, path, populated);
      } else {
        // eslint-disable-next-line no-await-in-loop
        const related = await relatedModel.findById(value);
        if (related) setValue(doc, path, related);
      }
    }
  }

  return docs;
}

function stripInternal(doc) {
  const result = {};
  for (const [key, value] of Object.entries(doc)) {
<<<<<<< HEAD
    if (key.startsWith("_")) continue;
    if (typeof value === "function") continue;
=======
    if (key.startsWith('_')) continue;
    if (typeof value === 'function') continue;
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
    result[key] = value;
  }
  return result;
}

class Query {
  constructor(modelClass, filter = {}, single = false) {
    this.modelClass = modelClass;
    this.filter = filter || {};
    this.single = single;
    this._sort = null;
    this._skip = 0;
    this._limit = null;
    this._populate = [];
  }

  sort(value) {
    this._sort = value;
    return this;
  }

  skip(value) {
    this._skip = Number(value) || 0;
    return this;
  }

  limit(value) {
    this._limit = value == null ? null : Number(value);
    return this;
  }

  select() {
    return this;
  }

  populate(spec) {
    if (Array.isArray(spec)) {
      this._populate.push(...spec);
    } else {
      this._populate.push(spec);
    }
    return this;
  }

  async exec() {
    const docs = await this.modelClass._findMany(this.filter);
    let result = docs;

    if (this._sort) {
      result = sortDocuments(result, this._sort);
    }

    if (this._skip) {
      result = result.slice(this._skip);
    }

    if (this._limit != null) {
      result = result.slice(0, this._limit);
    }

    if (this.single) {
      result = result[0] || null;
      if (result && this._populate.length) {
        await populateDocuments([result], this._populate, this.modelClass);
      }
      return result;
    }

    if (this._populate.length) {
      await populateDocuments(result, this._populate, this.modelClass);
    }

    return result;
  }

  then(resolve, reject) {
    return this.exec().then(resolve, reject);
  }

  catch(reject) {
    return this.exec().catch(reject);
  }
}

class BaseDocument {
  constructor(modelClass, data = {}, isHydrated = false) {
<<<<<<< HEAD
    Object.defineProperty(this, "_modelClass", {
=======
    Object.defineProperty(this, '_modelClass', {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      value: modelClass,
      enumerable: false,
      writable: true,
    });
<<<<<<< HEAD
    Object.defineProperty(this, "_original", {
=======
    Object.defineProperty(this, '_original', {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      value: deepClone(data),
      enumerable: false,
      writable: true,
    });
<<<<<<< HEAD
    Object.defineProperty(this, "_includeSensitive", {
=======
    Object.defineProperty(this, '_includeSensitive', {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      value: false,
      enumerable: false,
      writable: true,
    });
<<<<<<< HEAD
    Object.defineProperty(this, "_isHydrated", {
=======
    Object.defineProperty(this, '_isHydrated', {
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      value: isHydrated,
      enumerable: false,
      writable: true,
    });

    const payload = deepClone(data) || {};
    Object.assign(this, payload);

    if (!this.id) {
      this.id = crypto.randomUUID();
    }
    if (!this._id) {
      this._id = this.id;
    }
  }

  get isNew() {
    return !this._isHydrated;
  }

  isModified(path) {
    if (!path) {
<<<<<<< HEAD
      return (
        JSON.stringify(stripInternal(this)) !== JSON.stringify(stripInternal(this._original || {}))
      );
    }
    return (
      JSON.stringify(getValue(this, path)) !== JSON.stringify(getValue(this._original || {}, path))
    );
=======
      return JSON.stringify(stripInternal(this)) !== JSON.stringify(stripInternal(this._original || {}));
    }
    return JSON.stringify(getValue(this, path)) !== JSON.stringify(getValue(this._original || {}, path));
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  }

  select() {
    this._includeSensitive = true;
    return this;
  }

  async populate(spec) {
    await populateDocuments([this], spec, this._modelClass);
    return this;
  }

  async save(options = {}) {
    if (this._modelClass._beforeSave) {
      await this._modelClass._beforeSave(this, {
        isNew: this.isNew,
        options,
        original: deepClone(this._original || {}),
      });
    }

    if (options.validateBeforeSave !== false && this._modelClass._validate) {
      await this._modelClass._validate(this, {
        isNew: this.isNew,
        options,
      });
    }

    await this._modelClass._persist(this);
    this._isHydrated = true;
    this._original = deepClone(this.toObject());
    return this;
  }

  toObject() {
    return deepClone(stripInternal(this));
  }

  toJSON() {
    if (this._modelClass._toJSON) {
      return this._modelClass._toJSON(this);
    }
    return this.toObject();
  }
}

function createModel(modelName, options = {}) {
  class Model extends BaseDocument {
    constructor(data = {}, hydrated = false) {
      super(Model, data, hydrated);
      if (options.defaults) {
        for (const [key, value] of Object.entries(options.defaults)) {
          if (this[key] === undefined) {
<<<<<<< HEAD
            this[key] = typeof value === "function" ? value() : deepClone(value);
=======
            this[key] = typeof value === 'function' ? value() : deepClone(value);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
          }
        }
      }
      if (options.methods) {
        for (const [name, fn] of Object.entries(options.methods)) {
          if (!this[name]) {
            Object.defineProperty(this, name, {
              value: fn.bind(this),
              enumerable: false,
            });
          }
        }
      }
    }

    static get modelName() {
      return modelName;
    }

    static get relations() {
      return options.relations || {};
    }

    static hydrate(row) {
      if (!row) return null;
<<<<<<< HEAD
      return new Model(
        {
          id: row.id,
          _id: row.id,
          ...row.data,
          createdAt: row.created_at,
          updatedAt: row.updated_at,
        },
        true,
      );
    }

    static async _findRows(filter = {}) {
      const result = await query("SELECT * FROM app_records WHERE model = $1", [modelName]);
=======
      return new Model({
        id: row.id,
        _id: row.id,
        ...row.data,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }, true);
    }

    static async _findRows(filter = {}) {
      const result = await query('SELECT * FROM app_records WHERE model = $1', [modelName]);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      return result.rows
        .map((row) => ({
          id: row.id,
          data: row.data,
          created_at: row.created_at,
          updated_at: row.updated_at,
        }))
        .map((row) => Model.hydrate(row))
        .filter((doc) => matchesFilter(doc, filter));
    }

    static async _findMany(filter = {}) {
      return this._findRows(filter);
    }

    static find(filter = {}) {
      return new Query(Model, filter, false);
    }

    static findOne(filter = {}) {
      return new Query(Model, filter, true);
    }

    static findById(id) {
      return new Query(Model, { id: String(id) }, true);
    }

    static async findByIdAndUpdate(id, update = {}, options = {}) {
      const doc = await this.findById(id);
      if (!doc) return null;
      Object.assign(doc, deepClone(update));
      await doc.save({ validateBeforeSave: options.runValidators !== false });
      return options.new === false ? null : doc;
    }

    static async findByIdAndDelete(id) {
      const existing = await this.findById(id);
      if (!existing) return null;
<<<<<<< HEAD
      await query("DELETE FROM app_records WHERE model = $1 AND id = $2", [modelName, String(id)]);
=======
      await query('DELETE FROM app_records WHERE model = $1 AND id = $2', [modelName, String(id)]);
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      return existing;
    }

    static async countDocuments(filter = {}) {
      const docs = await this._findRows(filter);
      return docs.length;
    }

    static async create(data = {}) {
      const doc = new Model(data, false);
      await doc.save();
      return doc;
    }

    static async _persist(doc) {
      const payload = doc.toObject();
      const now = new Date().toISOString();
      if (!doc.createdAt) {
        doc.createdAt = now;
      }
      doc.updatedAt = now;
      payload.createdAt = doc.createdAt;
      payload.updatedAt = doc.updatedAt;
      payload.id = doc.id;
      payload._id = doc._id;
      await query(
        `INSERT INTO app_records (id, model, data, created_at, updated_at)
         VALUES ($1, $2, $3::jsonb, COALESCE($4::timestamptz, NOW()), COALESCE($5::timestamptz, NOW()))
         ON CONFLICT (id)
         DO UPDATE SET model = EXCLUDED.model, data = EXCLUDED.data, updated_at = EXCLUDED.updated_at`,
<<<<<<< HEAD
        [doc.id, modelName, JSON.stringify(payload), doc.createdAt, doc.updatedAt],
=======
        [doc.id, modelName, JSON.stringify(payload), doc.createdAt, doc.updatedAt]
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      );
    }

    static async _validate(doc, context) {
      if (options.validate) {
        await options.validate(doc, context);
      }
    }

    static async _beforeSave(doc, context) {
      if (options.beforeSave) {
        await options.beforeSave(doc, context);
      }
    }

    static _toJSON(doc) {
      if (options.toJSON) {
        return options.toJSON(doc);
      }
      return doc.toObject();
    }
  }

  registerModel(modelName, Model);
  return Model;
}

module.exports = {
  createModel,
  BaseDocument,
  Query,
  deepClone,
  getValue,
  setValue,
  matchesFilter,
  populateDocuments,
};
