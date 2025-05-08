const db = require('../config/dbConnect');
const sql = require('mssql');
const productController = {
  getAllDiscount: async (req, res) => {
    try {
      const pool = await db.poolConnect;
      const result = await pool.request().query('SELECT * FROM Discount');
      res.json(result.recordset);
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Lỗi khi lấy danh sách giảm giá.");
    }
  },

  addDiscount: async (req, res) => {
    try {
        console.log("Body: ", req.body);
      const { Dis_ID, Product_ID, Name, Discount_price, Start_date, End_date } = req.body;
  
      if (!Product_ID) {
        return res.status(400).send({ msg: "Thiếu Product ID." });
      }
  
      const pool = await db.poolConnect;
      const request = pool.request();
  
      const query = `
        INSERT INTO Discount (Dis_ID, Product_ID, Name, Discount_price, Start_date, End_date) 
        VALUES (@Dis_ID, @Product_ID, @Name, @Discount_price, @Start_date, @End_date) 
      `;
      request.input('Dis_ID', sql.Int, Dis_ID); 
      request.input('Product_ID', sql.VarChar(6), Product_ID);
      request.input('Name', sql.VarChar(255), Name || null);
      request.input('Discount_price', sql.Decimal(10, 3), Discount_price || null);
      request.input('Start_date', sql.Date, Start_date || null);
      request.input('End_date', sql.Date, End_date || null);
  
      await request.query(query);
  
      res.status(201).send("Thêm giảm giá thành công!");
    } catch (err) {
      console.error("Error add dis:", err);
      res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = productController;