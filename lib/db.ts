// db.js
import sql from 'mssql'

// connection configs
const config = {
    user: 'test',
    password: '1000',
    server: '.\sqlexpress',
    database: 'DATABASE_NAME',
    port: 1433,
    options: {
        instancename: 'SQLEXPRESS',
        trustedconnection: true,
        trustServerCertificate: true
    },
}

// export default async function ExcuteQuery(query, options) {
//     try {
//         let pool = await sql.connect(config);
//         let products = await pool.request().query(query);
//         return products.recordsets;
//     }
//     catch (error) {
//         console.log(error);
//     }
// }