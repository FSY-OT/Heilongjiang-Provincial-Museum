import sql from 'mssql';

const config: sql.config = {
  server: '思源AND理念',
  database: 'museum_operations',
  user: 'sa',
  password: 'fsy20050920',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool: sql.ConnectionPool | null = null;

export async function getPool(): Promise<sql.ConnectionPool> {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
}

export async function query<T>(queryText: string, params?: Record<string, any>): Promise<T[]> {
  const pool = await getPool();
  const request = pool.request();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }
  }
  const result = await request.query(queryText);
  return result.recordset as T[];
}

export async function execute(procedureName: string, params?: Record<string, any>): Promise<sql.IRecordSet<any>> {
  const pool = await getPool();
  const request = pool.request();
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      request.input(key, value);
    }
  }
  return request.execute(procedureName);
}

export async function closePool(): Promise<void> {
  if (pool) {
    await pool.close();
    pool = null;
  }
}

export const db = {
  query,
  execute,
  getPool,
  closePool,
};

export default db;