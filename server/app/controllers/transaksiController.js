const { Transaksi, DetailTransaksi, Produk } = require("../../database/models");

exports.getAllTransaksi = async (req, res) => {
    try {
        const transaksi = await Transaksi.findAll({
            include: [
                {
                    model: DetailTransaksi,
                    as: "detail_transaksi",
                    include: [
                        {
                            model: Produk,
                            as: "produk",
                            attributes: ["kode_barang", "nama_barang"],
                        },
                    ],
                },
            ],
            order: [["tanggal", "DESC"]],
        });

        res.json({
            success: true,
            message: "Data transaksi berhasil diambil",
            data: transaksi,
        });
    } catch (error) {
        console.error("Error saat mengambil data transaksi:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan saat mengambil data transaksi",
            error: error.message,
        });
    }
};

exports.createTransaksi = async (req, res) => {
    try {
        const { tanggal, total_harga, metode_pembayaran, detail_transaksi } = req.body;

        // Validasi input
        if (!tanggal || !total_harga || !metode_pembayaran || !detail_transaksi || detail_transaksi.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Semua field wajib diisi dengan benar",
            });
        }

        // Buat transaksi baru
        const transaksi = await Transaksi.create({
            tanggal,
            total_harga,
            metode_pembayaran,
        });

        // Tambahkan detail transaksi
        for (const detail of detail_transaksi) {
            const produk = await Produk.findOne({ where: { kode_barang: detail.kode_barang } });
            if (!produk) {
                return res.status(404).json({
                    success: false,
                    message: `Produk dengan kode ${detail.kode_barang} tidak ditemukan`,
                });
            }

            await DetailTransaksi.create({
                id_transaksi: transaksi.id_transaksi,
                kode_barang: detail.kode_barang,
                jumlah: detail.jumlah,
                harga_satuan: detail.harga_satuan,
                subtotal: detail.jumlah * detail.harga_satuan,
            });

            // Kurangi stok produk
            produk.stok -= detail.jumlah;
            await produk.save();
        }

        res.status(201).json({
            success: true,
            message: "Transaksi berhasil dibuat",
            data: transaksi,
        });
    } catch (error) {
        console.error("Error saat membuat transaksi:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

exports.getTransaksiById = async (req, res) => {
    try {
        const { id } = req.params;

        const transaksi = await Transaksi.findByPk(id, {
            include: [
                {
                    model: DetailTransaksi,
                    as: "detail_transaksi",
                    include: [
                        {
                            model: Produk,
                            as: "produk",
                            attributes: ["kode_barang", "nama_barang"],
                        },
                    ],
                },
            ],
        });

        if (!transaksi) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        res.json({
            success: true,
            message: "Data transaksi berhasil diambil",
            data: transaksi,
        });
    } catch (error) {
        console.error("Error saat mengambil transaksi:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

exports.deleteTransaksi = async (req, res) => {
    try {
        const { id } = req.params;

        const transaksi = await Transaksi.findByPk(id);
        if (!transaksi) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        // Hapus transaksi dan detail transaksi
        await DetailTransaksi.destroy({ where: { id_transaksi: id } });
        await transaksi.destroy();

        res.json({
            success: true,
            message: "Transaksi berhasil dihapus",
        });
    } catch (error) {
        console.error("Error saat menghapus transaksi:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};

exports.getPrintData = async (req, res) => {
    try {
        const { id } = req.params;

        // Query untuk mengambil data transaksi beserta detail dan produk terkait
        const transaksi = await Transaksi.findByPk(id, {
            include: [
                {
                    model: DetailTransaksi,
                    as: "detail_transaksi",
                    include: [
                        {
                            model: Produk,
                            as: "produk",
                            attributes: ["kode_barang", "nama_barang", "harga_jual", "harga_grosir", "batas_grosir"],
                        },
                    ],
                },
            ],
        });

        // Jika transaksi tidak ditemukan
        if (!transaksi) {
            return res.status(404).json({
                success: false,
                message: "Transaksi tidak ditemukan",
            });
        }

        // Format data untuk keperluan cetak
        const printData = {
            id_transaksi: transaksi.id_transaksi,
            tanggal: transaksi.tanggal,
            total_harga: parseFloat(transaksi.total_harga),
            metode_pembayaran: transaksi.metode_pembayaran,
            detail_transaksi: transaksi.detail_transaksi.map((detail) => ({
                kode_barang: detail.kode_barang,
                jumlah: detail.jumlah,
                harga_satuan: detail.harga_satuan,
                subtotal: detail.subtotal,
                produk: detail.produk ? {
                    nama_barang: detail.produk.nama_barang,
                    kode_barang: detail.produk.kode_barang,
                    harga_jual: detail.produk.harga_jual,
                    harga_grosir: detail.produk.harga_grosir,
                    batas_grosir: detail.produk.batas_grosir
                } : {
                    nama_barang: "Barang tidak ditemukan",
                    kode_barang: "N/A",
                    harga_jual: 0,
                    harga_grosir: 0,
                    batas_grosir: 0,
                },
            })),
            total_item: transaksi.detail_transaksi.reduce((sum, detail) => sum + detail.jumlah, 0),
            created_at: new Date().toISOString(),
        };

        // debugging print Data
        console.log("Data untuk cetak:", printData);

        // Kirim respons dengan data yang diformat
        res.json({
            success: true,
            message: "Data print berhasil diambil",
            data: printData,
        });
    } catch (error) {
        console.error("Error saat mengambil data print:", error);
        res.status(500).json({
            success: false,
            message: "Terjadi kesalahan pada server",
            error: error.message,
        });
    }
};