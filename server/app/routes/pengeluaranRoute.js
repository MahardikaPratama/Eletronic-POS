const express = require('express');
const router = express.Router();
const pengeluaranController = require('../controllers/pengeluaranController');

// Rute untuk mendapatkan semua pengeluaran
router.get('/', pengeluaranController.getAllPengeluaran);

// Rute untuk menambahkan pengeluaran baru
router.post('/', pengeluaranController.createPengeluaran);

// Rute untuk memperbarui pengeluaran berdasarkan ID
router.put('/:id', pengeluaranController.updatePengeluaran);

// Rute untuk menghapus pengeluaran berdasarkan ID
router.delete('/:id', pengeluaranController.deletePengeluaran);

module.exports = router;