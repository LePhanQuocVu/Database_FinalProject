const getConnection = require('../config/dbConnect');
const db = require('../config/dbConnect')
const getAllSuppliers = async (req, res) => {
  try {
    // Đảm bảo rằng kết nối đã được thực hiện trước khi thực hiện truy vấn
    const pool = await db.poolConnect; // Đảm bảo kết nối đã hoàn tất
    const result = await pool.request().query('SELECT * FROM Supplier');

    // Trả về dữ liệu trong mảng recordset
    res.json(result.recordset); // recordset chứa dữ liệu trả về từ câu truy vấn SQL

  } catch (err) {
    console.error("Error:", err);
    res.status(500).send("Internal server error");
  }
};


module.exports = getAllSuppliers;