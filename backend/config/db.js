const { Pool } = require('pg');
const logger = require('../utils/logger');

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
      throw new Error('DATABASE_URL (or POSTGRES_URL / NEON_DATABASE_URL) is not defined');
    }

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
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

  await query('CREATE EXTENSION IF NOT EXISTS pgcrypto');
  await query(`
    CREATE TABLE IF NOT EXISTS app_records (
      id UUID PRIMARY KEY,
      model TEXT NOT NULL,
      data JSONB NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);
  await query('CREATE INDEX IF NOT EXISTS idx_app_records_model ON app_records(model)');
  await query('CREATE INDEX IF NOT EXISTS idx_app_records_model_created ON app_records(model, created_at DESC)');
  await query('CREATE INDEX IF NOT EXISTS idx_app_records_data_gin ON app_records USING GIN (data)');

  schemaReady = true;
}

async function connectDB(options = {}) {
  const maxRetries = options.retries || 5;
  const retryDelay = options.retryDelay || 2000;

  for (let attempt = 1; attempt <= maxRetries; attempt += 1) {
    try {
      const clientPool = getPool();
      const client = await clientPool.connect();
      await client.query('SELECT 1');
      client.release();

      await ensureSchema();
      logger.info('PostgreSQL connected');
      return clientPool;
    } catch (error) {
      logger.error(`Database connection attempt ${attempt} failed: ${error.message}`);
      if (attempt < maxRetries) {
        logger.info(`Retrying DB connection in ${retryDelay}ms...`);
        // eslint-disable-next-line no-await-in-loop
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        logger.error('All database connection attempts failed');
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
