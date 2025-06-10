const express = require("express");
const router = express.Router();
const transaksiController = require("../controllers/transaksiController");

router.get("/", transaksiController.getAllTransaksi);
router.post("/", transaksiController.createTransaksi);
router.get("/:id", transaksiController.getTransaksiById);
router.get("/:id/print", transaksiController.getPrintData); // Endpoint khusus untuk print
router.delete("/:id", transaksiController.deleteTransaksi);

module.exports = router;