const express = require('express');
const cors = require('cors');
const app = express();

// Konfigurasi CORS yang lebih spesifik
const corsOptions = {
  origin: 'http://localhost:5173', // Sesuaikan dengan URL frontend
  credentials: true, // Penting untuk withCredentials
  allowedHeaders: ['Content-Type', 'Authorization'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
};

app.use(cors(corsOptions));

// Middleware untuk handle preflight requests
app.options('*', cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const kategoriProdukRoutes = require('./app/routes/kategoriProdukRoute');
const produkRoutes = require('./app/routes/produkRoute');

app.use('/api/v1/kategori-produk', kategoriProdukRoutes);
app.use('/api/v1/produk', produkRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});