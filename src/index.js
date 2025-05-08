const express = require('express');

<<<<<<< HEAD
const  supplierRouter = require('./routers/supplierRoutes');
const billRouter = require('./routers/billRoutes');
const productRouter = require('./routers/productRoutes');
const orderRouter = require('./routers/orderRoutes');
=======
const supplierRouter = require('./routers/supplierRoutes');
const billRouter = require('./routers/billRoutes');
const storeRouter = require('./routers/storeRoutes');
const customerRouter = require('./routers/customerRoutes');
>>>>>>> 202effcd583a203184c84c106f0a654f3011207a

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
<<<<<<< HEAD
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);
=======
app.use('/api/stores', storeRouter);
app.use('/api/customers', customerRouter);
>>>>>>> 202effcd583a203184c84c106f0a654f3011207a

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
