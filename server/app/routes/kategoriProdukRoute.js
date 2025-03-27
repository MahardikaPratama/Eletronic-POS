const express = require('express');
const router = express.Router();
const kategoriProdukController = require('../controllers/kategoriProdukController');

router.get('/', kategoriProdukController.getAllKategori);
router.post('/', kategoriProdukController.createKategori);
router.put('/:id', kategoriProdukController.updateKategori);
router.delete('/:id', kategoriProdukController.deleteKategori);

module.exports = router;
