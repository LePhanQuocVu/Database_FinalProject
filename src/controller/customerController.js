const db = require('../config/dbConnect');
const sql = require('mssql');

async function listCustomers(req, res) {
    // console.log(paidDate);
    (await db.poolConnect)
        .request()
        .query('SELECT * FROM Customer_card')
        .then((result) => {
            return res.status(200).json(result.recordset);
        })
        .catch((err) => {
            console.log(err.message);
            return res.status(500).json(err.message);
        });
}

module.exports = { listCustomers };
