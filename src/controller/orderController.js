const db = require('../config/dbConnect');
const sql = require('mssql');
const orderController = {
  getAllBill: async (req, res) => {
      try {
        const pool = await db.poolConnect;
        const result = await pool.request().query('SELECT * FROM Bill');
        res.json(result.recordset);
      } catch (err) {
        console.error("Get all Bill error:", err);
        res.status(500).send({msg: err});
      }
    },
};

module.exports =  orderController;