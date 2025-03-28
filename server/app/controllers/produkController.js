const { KategoriProduk, Produk } = require("../../database/models");

exports.getAllProduk = async (req, res) => {
    try {
        const produk = await Produk.findAll({
            order: [['updatedAt', 'DESC']], // Mengurutkan berdasarkan createdAt dari yang terbaru
        });
        res.json({
            success: true,
            message: "Data produk berhasil diambil",
            data: produk
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data produk",
            error: error.message
        });
    }
}

exports.createProduk = async (req, res) => {
    try {
        const { kode_barang, nama_barang, harga_grosir, harga_jual, harga_modal, stok, nama_kategori } = req.body;

        // Validasi input
        // Kode barang tidak boleh kosong
        if (!kode_barang || kode_barang.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Kode barang tidak boleh kosong"
            });
        }

        // Nama barang tidak boleh kosong
        if (!nama_barang || nama_barang.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nama barang tidak boleh kosong"
            });
        }

        // Harga grosir tidak boleh kosong dan lebih besar dari 0
        if (!harga_grosir || harga_grosir <= 0) {
            return res.status(400).json({
                success: false,
                message: "Harga grosir tidak boleh kosong dan harus lebih besar dari 0"
            });
        }

        // Harga jual tidak boleh kosong dan lebih besar dari 0
        if (!harga_jual || harga_jual <= 0) {
            return res.status(400).json({
                success: false,
                message: "Harga jual tidak boleh kosong dan harus lebih besar dari 0"
            });
        }

        // Harga modal tidak boleh kosong dan lebih besar dari 0
        if (!harga_modal || harga_modal <= 0) {
            return res.status(400).json({
                success: false,
                message: "Harga modal tidak boleh kosong dan harus lebih besar dari 0"
            });
        }

        // Stok tidak boleh kosong dan lebih besar dari atau sama dengan 0
        if (!stok || stok < 0) {
            return res.status(400).json({
                success: false,
                message: "Stok tidak boleh kosong dan harus lebih besar dari atau sama dengan 0"
            });
        }

        // Nama kategori tidak boleh kosong
        if (!nama_kategori || nama_kategori.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nama kategori tidak boleh kosong"
            });
        }

        // Cek apakah kode barang sudah ada
        const existingProduk = await Produk.findOne({ where: { kode_barang } });
        if (existingProduk) {
            return res.status(409).json({
                success: false,
                message: "Kode barang sudah ada."
            });
        }

        // Dapatkan id_kategori dari nama_kategori
        const kategori = await KategoriProduk.findOne({ where: { nama_kategori } });

        // Jika kategori tidak ditemukan, kembalikan response error
        if (!kategori) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        // Buat produk baru
        const produkBaru = await Produk.create({
            kode_barang,
            nama_barang,
            harga_grosir,
            harga_jual,
            harga_modal,
            stok,
            id_kategori: kategori.id_kategori
        });

        res.status(201).json({
            success: true,
            message: "Produk berhasil ditambahkan",
            data: produkBaru
        });
    } catch (error) {
        console.error("Error saat menambahkan produk:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};

exports.updateProduk = async (req, res) => {
    try {
        const { id } = req.params;
        const { kode_barang, nama_barang, harga_grosir, harga_jual, harga_modal, stok, nama_kategori } = req.body;

        // Validasi input
        // Kode barang tidak boleh kosong
        if (!kode_barang || kode_barang.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Kode barang tidak boleh kosong"
            });
        }

        // Nama barang tidak boleh kosong
        if (!nama_barang || nama_barang.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nama barang tidak boleh kosong"
            });
        }

        // Harga grosir tidak boleh kosong dan lebih besar dari 0
        if (!harga_grosir || harga_grosir <= 0) {
            return res.status(400).json({
                success: false,
                message: "Harga grosir tidak boleh kosong dan harus lebih besar dari 0"
            });
        }

        // Harga jual tidak boleh kosong dan lebih besar dari 0
        if (!harga_jual || harga_jual <= 0) {
            return res.status(400).json({
                success: false,
                message: "Harga jual tidak boleh kosong dan harus lebih besar dari 0"
            });
        }

        // Harga modal tidak boleh kosong dan lebih besar dari 0
        if (!harga_modal || harga_modal <= 0) {
            return res.status(400).json({
                success: false,
                message: "Harga modal tidak boleh kosong dan harus lebih besar dari 0"
            });
        }

        // Stok tidak boleh kosong dan lebih besar dari atau sama dengan 0
        if (!stok || stok < 0) {
            return res.status(400).json({
                success: false,
                message: "Stok tidak boleh kosong dan harus lebih besar dari atau sama dengan 0"
            });
        }

        // Nama kategori tidak boleh kosong
        if (!nama_kategori || nama_kategori.trim() === "") {
            return res.status(400).json({
                success: false,
                message: "Nama kategori tidak boleh kosong"
            });
        }

        // Cek apakah produk dengan id yang diberikan ada
        const produk = await Produk.findByPk(id);
        if (!produk) {
            return res.status(404).json({
                success: false,
                message: "Produk tidak ditemukan"
            });
        }

        // Dapatkan id_kategori dari nama_kategori
        const kategori = await KategoriProduk.findOne({ where: { nama_kategori } });

        // Jika kategori tidak ditemukan, kembalikan response error
        if (!kategori) {
            return res.status(404).json({
                success: false,
                message: "Kategori tidak ditemukan"
            });
        }

        // Update produk
        produk.kode_barang = kode_barang;
        produk.nama_barang = nama_barang;
        produk.harga_grosir = harga_grosir;
        produk.harga_jual = harga_jual;
        produk.harga_modal = harga_modal;
        produk.stok = stok;
        produk.id_kategori = kategori.id_kategori;

        await produk.save();

        res.json({
            success: true,
            message: "Produk berhasil diupdate",
            data: produk
        });
    } catch (error) {
        console.error("Error saat mengupdate produk:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};

exports.deleteProduk = async (req, res) => {
    try {
        const { id } = req.params;

        // Cek apakah produk dengan id yang diberikan ada
        const produk = await Produk.findByPk(id);
        if (!produk) {
            return res.status(404).json({
                success: false,
                message: "Produk tidak ditemukan"
            });
        }

        // Hapus produk
        await produk.destroy();

        res.json({
            success: true,
            message: "Produk berhasil dihapus"
        });
    } catch (error) {
        console.error("Error saat menghapus produk:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server.",
            error: error.message
        });
    }
};