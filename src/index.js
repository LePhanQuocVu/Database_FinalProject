const express = require('express');

const  supplierRouter = require('./routers/supplierRoutes');
const billRouter = require('./routers/billRoutes');
const productRouter = require('./routers/productRoutes');
const orderRouter = require('./routers/orderRoutes');

const cors = require('cors');
const db = require('./config/dbConnect');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('start');
    res.send('Hello Node.js!');
});

// Router
db.getConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/suppliers', supplierRouter);
app.use('/api/bills', billRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
