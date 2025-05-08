const db = require('../config/dbConnect');
const sql = require('mssql');

async function listStores(req, res) {
    (await db.poolConnect)
        .request()
        .query(
            'SELECT b.ID, b.Address FROM Store s JOIN Branch b ON s.Store_ID = b.ID'
        )
        .then((result) => {
            return res.status(200).json(result.recordset);
        })
        .catch((err) => {
            return res.status(500).json(err.message);
        });
}

module.exports = { listStores };
