<<<<<<< HEAD
const { Pool } = require("pg");
const logger = require("../utils/logger");
=======
const { Pool } = require('pg');
const logger = require('../utils/logger');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

let pool;
let schemaReady = false;

function getConnectionString() {
  return (
    process.env.DATABASE_URL ||
    process.env.POSTGRES_URL ||
    process.env.NEON_DATABASE_URL ||
    process.env.DATABASE_URI
  );
}

function getPool() {
  if (!pool) {
    const connectionString = getConnectionString();
    if (!connectionString) {
<<<<<<< HEAD
      throw new Error("DATABASE_URL (or POSTGRES_URL / NEON_DATABASE_URL) is not defined");
    }

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
=======
      throw new Error('DATABASE_URL (or POSTGRES_URL / NEON_DATABASE_URL) is not defined');
    }

    // Only enable SSL for Postgres when explicitly requested or in production.
    // Some local Postgres instances do not support SSL; forcing SSL causes connection failures.
    const enableSsl = (process.env.DB_SSL === 'true') || /sslmode=require/.test(connectionString) || process.env.NODE_ENV === 'production';

    pool = new Pool({
      connectionString,
      ssl: enableSsl ? { rejectUnauthorized: false } : false,
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      max: Number(process.env.DB_POOL_MAX || 10),
      idleTimeoutMillis: 30_000,
    });
  }

  return pool;
}

async function query(text, params) {
  const clientPool = getPool();
  return clientPool.query(text, params);
}

async function ensureSchema() {
  if (schemaReady) return;

<<<<<<< HEAD
  await query("CREATE EXTENSION IF NOT EXISTS pgcrypto");
=======
  await query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
  await query(`
    CREATE TABLE IF NOT EXISTS app_records (
      id UUID PRIMARY KEY,
      model TEXT NOT NULL,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
<<<<<<< HEAD
  await query("CREATE INDEX IF NOT EXISTS idx_app_records_model ON app_records(model)");
  await query(
    "CREATE INDEX IF NOT EXISTS idx_app_records_model_created ON app_records(model, created_at DESC)",
  );
  await query(
    "CREATE INDEX IF NOT EXISTS idx_app_records_data_gin ON app_records USING GIN (data)",
  );
=======
  await query('CREATE INDEX IF NOT EXISTS idx_app_records_model ON app_records(model)');
  await query('CREATE INDEX IF NOT EXISTS idx_app_records_model_created ON app_records(model, created_at DESC)');
  await query('CREATE INDEX IF NOT EXISTS idx_app_records_data_gin ON app_records USING GIN (data)');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763

  schemaReady = true;
}

async function connectDB(options = {}) {
  const maxRetries = options.retries || 5;
  const retryDelay = options.retryDelay || 2000;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const clientPool = getPool();
      const client = await clientPool.connect();
<<<<<<< HEAD
      await client.query("SELECT 1");
      client.release();

      await ensureSchema();
      logger.info("PostgreSQL connected");
=======
      await client.query('SELECT 1');
      client.release();

      await ensureSchema();
      logger.info('PostgreSQL connected');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
      return clientPool;
    } catch (error) {
      logger.error(`Database connection attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        logger.info(`Retrying DB connection in ${retryDelay}ms...`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
<<<<<<< HEAD
        logger.error("All database connection attempts failed");
=======
        logger.error('All database connection attempts failed');
>>>>>>> ff1035069d14f891f4a70ea6c8f2721597241763
        throw error;
      }
    }
  }
  return null;
}

async function closeDB() {
  if (pool) {
    await pool.end();
    pool = null;
    schemaReady = false;
  }
}

module.exports = connectDB;
module.exports.connectDB = connectDB;
module.exports.getPool = getPool;
module.exports.query = query;
module.exports.ensureSchema = ensureSchema;
module.exports.closeDB = closeDB;
