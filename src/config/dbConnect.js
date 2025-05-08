// lib/db.ts
const sql = require('mssql');

const config = {
    server: 'localhost',
    database: 'HighlandsCoffee',
    user: 'sa',
    password: '123456',
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};

// export async function query<T = any>(sqlQuery: string): Promise<T[]> {
//     try {
//         const pool = await sql.connect(config);
//         const result = await pool.request().query(sqlQuery);
//         return result.recordset;
//     } catch (err) {
//         throw err;
//     } finally {
//         // await sql.close()
//     }
// }

const pool = new sql.ConnectionPool(config);
const poolConnect = pool.connect();

async function getConnection() {
    try {
        await poolConnect; // đảm bảo đã kết nối trước khi trả về pool
        console.log('SQL connected');
        return pool;
    } catch (err) {
        console.error('SQL Server Connection Failed!', err);
        throw err;
    }
}

module.exports = getConnection;
