const express = require('express');
const app = express();

// Middleware dan routing 
app.use(express.json());
app.use('/kategori', require('./app/routes/kategoriProdukRoute'));
app.use('/produk', require('./app/routes/produkRoute'));

module.exports = app;
