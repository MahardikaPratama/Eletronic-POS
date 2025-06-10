const { Pengeluaran } = require("../../database/models");

exports.getAllPengeluaran = async (req, res) => {
    try {
        const pengeluaran = await Pengeluaran.findAll({
            order: [['updatedAt', 'DESC']], // Mengurutkan berdasarkan updatedAt dari yang terbaru
        });
        res.json({
            success: true,
            message: "Data pengeluaran berhasil diambil",
            data: pengeluaran
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data pengeluaran",
            error: error.message
        });
    }
};

exports.createPengeluaran = async (req, res) => {
    try {
        const { tanggal, keterangan, jumlah } = req.body;

        // Validasi input
        if (!tanggal || !keterangan || !jumlah || jumlah <= 0) {
            return res.status(400).json({
                success: false,
                message: "Semua field wajib diisi dengan benar"
            });
        }

        // Tambahkan pengeluaran baru
        const pengeluaran = await Pengeluaran.create({ tanggal, keterangan, jumlah });

        res.status(201).json({
            success: true,
            message: "Pengeluaran berhasil ditambahkan",
            data: pengeluaran
        });
    } catch (error) {
        console.error("Error saat menambahkan pengeluaran:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};

exports.updatePengeluaran = async (req, res) => {
    try {
        const { id } = req.params;
        const { tanggal, keterangan, jumlah } = req.body;

        // Validasi input
        if (!tanggal || !keterangan || !jumlah || jumlah <= 0) {
            return res.status(400).json({
                success: false,
                message: "Semua field wajib diisi dengan benar"
            });
        }

        const pengeluaran = await Pengeluaran.findByPk(id);
        if (!pengeluaran) {
            return res.status(404).json({
                success: false,
                message: "Pengeluaran tidak ditemukan"
            });
        }

        // Update pengeluaran
        pengeluaran.tanggal = tanggal;
        pengeluaran.keterangan = keterangan;
        pengeluaran.jumlah = jumlah;

        await pengeluaran.save();

        res.json({
            success: true,
            message: "Pengeluaran berhasil diperbarui",
            data: pengeluaran
        });
    } catch (error) {
        console.error("Error saat memperbarui pengeluaran:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};

exports.deletePengeluaran = async (req, res) => {
    try {
        const { id } = req.params;

        const pengeluaran = await Pengeluaran.findOne({ where: { id_pengeluaran: id } });
        if (!pengeluaran) {
            return res.status(404).json({
                success: false,
                message: "Pengeluaran tidak ditemukan"
            });
        }

        await Pengeluaran.destroy({ where: { id_pengeluaran: id } });

        res.json({
            success: true,
            message: "Pengeluaran berhasil dihapus"
        });
    } catch (error) {
        console.error("Error saat menghapus pengeluaran:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};