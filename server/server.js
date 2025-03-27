const express = require('express');
const app = express();
const kategoriProdukRoutes = require('./app/routes/kategoriProdukRoute');
// const produkRoutes = require('./app/routes/produkRoute');
// const pengeluaranRoutes = require('./app/routes/pengeluaranRoute');
// const transaksiRoutes = require('./app/routes/transaksiRoute');
// const detailTransaksiRoutes = require('./app/routes/detailTransaksiRoute');

app.use(express.json());

app.use('/kategori-produk', kategoriProdukRoutes);
// app.use('/produk', produkRoutes);
// app.use('/pengeluaran', pengeluaranRoutes);
// app.use('/transaksi', transaksiRoutes);
// app.use('/detail-transaksi', detailTransaksiRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
