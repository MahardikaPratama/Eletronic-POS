const { KategoriProduk } = require("../../database/models");

exports.getAllKategori = async (req, res) => {
    try {
        const kategori = await KategoriProduk.findAll();
        res.json(kategori);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.createKategori = async (req, res) => {
    try {
        const kategori = await KategoriProduk.create(req.body);
        res.status(201).json(kategori);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.updateKategori = async (req, res) => {
    try {
        const { id } = req.params;
        await KategoriProduk.update(req.body, { where: { id_kategori: id } });
        res.json({ message: "Kategori berhasil diperbarui" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteKategori = async (req, res) => {
    try {
        const { id } = req.params;
        await KategoriProduk.destroy({ where: { id_kategori: id } });
        res.json({ message: "Kategori berhasil dihapus" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
