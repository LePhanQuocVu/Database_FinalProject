// db.js
import sql from "mssql"

// connection configs
const config = {
    user: '',
    password: '',
    server: 'QUOCVU\\SQLEXPRESS07',
    database: 'HighlandsCoffee',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        trustedconnection: true,
        trustServerCertificate: true
    },
}
// Singleton pattern for connection pool
let connectionPool: sql.ConnectionPool | null = null

export const getConnection = async (): Promise<sql.ConnectionPool> => {
  if (connectionPool) {
    return connectionPool
  }

  try {
    connectionPool = await sql.connect(config)
    console.log("Connected to SQL Server")
    return connectionPool
  } catch (err) {
 console.error('Failed to connect to SQL Server:', err)
    throw err
  }
}
