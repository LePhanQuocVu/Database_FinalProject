const db = require('../config/dbConnect');
const sql = require('mssql');

async function insertBill(req, res) {
    try {
        console.log(req.body);
        const {
            paidDate,
            customerPhone,
            saleSSN,
            totalPrice,
            storeID,
            listOfProduct,
        } = req.body;

        (await db.poolConnect)
            .request()
            .input('paid_Date', sql.Date, paidDate)
            .input('card_ID', sql.Char(10), customerPhone)
            .input('sale_SSN', sql.Char(12), saleSSN)
            .input('total_Price', sql.Decimal(10, 3), totalPrice)
            .input('store_ID', sql.Int, storeID)
            .input('list_Of_Product', sql.VarChar(sql.MAX), listOfProduct)
            .execute('INSERT_NEW_BILL');
        return res.status(200).json({ state: 'success' });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
}

module.exports = { insertBill };
