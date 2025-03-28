const { KategoriProduk } = require("../../database/models");

exports.getAllKategori = async (req, res) => {
    try {
        const kategori = await KategoriProduk.findAll({
            order: [['updatedAt', 'DESC']], // Mengurutkan berdasarkan createdAt dari yang terbaru
        });
        res.json({
            success: true,
            message: "Data kategori berhasil diambil",
            data: kategori
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data kategori",
            error: error.message
        });
    }
};

exports.createKategori = async (req, res) => {
    try {
        const { nama_kategori } = req.body; // Destructure to get the name property

        // Validasi input
        if (!nama_kategori || nama_kategori.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nama kategori tidak boleh kosong"
            });
        }

        // Cek apakah kategori sudah ada
        const existingKategori = await KategoriProduk.findOne({ where: { nama_kategori } });
        if (existingKategori) {
            return res.status(409).json({
                success: false,
                message: "Kategori sudah ada."
            });
        }

        // Tambahkan kategori baru
        const kategori = await KategoriProduk.create({ nama_kategori });

        res.status(201).json({
            success: true,
            message: "Kategori berhasil ditambahkan",
            data: kategori
        });
    } catch (error) {
        console.error("Error saat menambahkan kategori:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};

exports.updateKategori = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_kategori } = req.body;

        // Validasi input
        if (!nama_kategori || nama_kategori.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nama kategori tidak boleh kosong"
            });
        }

        const kategori = await KategoriProduk.findByPk(id);
        if (!kategori) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        const existingKategori = await KategoriProduk.findOne({ where: { nama_kategori } });
        if (existingKategori) {
            return res.status(409).json({
                success: false,
                message: "Kategori sudah ada."
            });
        }

        const kategoriBaru = await KategoriProduk.update({ nama_kategori }, { where: { id_kategori: id } });

        res.json({
            success: true,
            message: "Kategori berhasil diperbarui",
            data: kategoriBaru
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Gagal memperbarui kategori",
            error: error.message
        });
    }
};

exports.deleteKategori = async (req, res) => {
    try {
        const { id } = req.params;

        const kategori = await KategoriProduk.findByPk(id);
        if (!kategori) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        await KategoriProduk.destroy({ where: { id_kategori: id } });

        res.json({
            success: true,
            message: "Kategori berhasil dihapus"
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Gagal menghapus kategori",
            error: error.message
        });
    }
};
