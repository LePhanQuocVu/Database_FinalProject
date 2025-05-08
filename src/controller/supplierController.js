const getConnection = require('../config/dbConnect');
const getAllSuppliers = async (req, res) => {
  try {
    const pool = await getConnection()
    const result = await pool.request().query("SELECT * FROM Suppliers")
    res.json(result.recordset)
  } catch (err) {
    console.error("Query error:", err)
    res.status(500).send("Internal server error")
  }
}

module.exports = getAllSuppliers;