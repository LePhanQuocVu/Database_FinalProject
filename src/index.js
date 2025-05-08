const express = require('express');

const supplierRouter = require('./routers/supplierRoutes');
const db = require('./config/dbConnect');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    console.log('start');
    res.send('Hello Node.js!');
});

// Router
db();
app.use(express.json());

app.use('/api/suppliers', supplierRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
