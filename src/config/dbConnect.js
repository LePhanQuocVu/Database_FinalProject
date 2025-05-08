
import sql from 'mssql'
const config = {
  user: '',
  password: '',
  server: '', // ví dụ: 'localhost' hoặc 'QUOCVUSQLEXPRESS07'
  database: '',
  port: 1433,
  options: {
    encrypt: false, // true nếu dùng Azure
    trustServerCertificate: true,
  },
}

const pool = new sql.ConnectionPool(config)
const poolConnect = pool.connect()

export async function getConnection() {
  try {
    await poolConnect // đảm bảo đã kết nối trước khi trả về pool
    return pool
  } catch (err) {
    console.error('SQL Server Connection Failed!', err)
    throw err
  }
}

