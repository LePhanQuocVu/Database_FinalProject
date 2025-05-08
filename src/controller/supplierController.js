const db = require('../config/dbConnect');
const sql = require('mssql');
const supplierController = {
  // Define the getAllSuppliers method inside the controller object
  getAllSuppliers: async (req, res) => {
    try {
      const pool = await db.poolConnect; // Connect to the database
      const result = await pool.request().query('SELECT * FROM Supplier');
  
      // Return the data in JSON format
      res.json(result.recordset); // recordset contains the data returned from the SQL query
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal server error");
    }
  },

  // Define the addSupplier method inside the controller object
  addSupplier: async (req, res) => {
    try {
      const { Supplier_ID, Phone_number, Email, Name, Address } = req.body;

      // Ccheck data
      if (!Supplier_ID || !Phone_number || !Email || !Name || !Address) {
        return res.status(400).send("Thiếu trường dữ liệu.");
      }

      const pool = await db.poolConnect;
      const request = pool.request();

      // Insert the supplier into the database
      await request
        .input('Supplier_ID', sql.Int, Supplier_ID)
        .input('Phone_number', sql.VarChar(10), Phone_number)
        .input('Email', sql.VarChar(255), Email)
        .input('Name', sql.VarChar(255), Name)
        .input('Address', sql.VarChar(255), Address)
        .query(`
          INSERT INTO Supplier (Supplier_ID, Phone_number, Email, Name, Address)
          VALUES (@Supplier_ID, @Phone_number, @Email, @Name, @Address)
        `); 

    res.status(201).send("Thêm thành công!");
    } catch (err) {
      console.error("Error:", err);
      res.status(500).send("Internal server error.");
    }
  }
};

module.exports =  supplierController;