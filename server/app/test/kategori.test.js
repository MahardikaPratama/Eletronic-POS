const request = require("supertest");
const express = require("express");
const bodyParser = require("body-parser");
const kategoriRouter = require("../../app/routes/kategoriProdukRoute");
const kategoriController = require("../../app/controllers/kategoriProdukController");
const { KategoriProduk, sequelize } = require("../../database/models");

const app = express();
app.use(bodyParser.json());
app.use("/kategori-produk", kategoriRouter);

describe("Kategori Controller - Unit Testing", () => {
    let mockReq, mockRes, kategoriMock;

    beforeEach(() => {
        mockReq = {};
        mockRes = { json: jest.fn(), status: jest.fn().mockReturnThis() };

        kategoriMock = {
            id_kategori: 1,
            nama_kategori: "Elektronik",
            update: jest.fn().mockResolvedValue([1]), // Mock update return array [1]
            destroy: jest.fn().mockResolvedValue(1), // Mock delete return 1
        };
    });

    test("getAllKategori() harus mengembalikan daftar kategori", async () => {
        KategoriProduk.findAll = jest.fn().mockResolvedValue([kategoriMock]);

        await kategoriController.getAllKategori(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: "Data kategori berhasil diambil",
            data: [kategoriMock],
        });
    });

    test("createKategori() harus menambahkan kategori baru", async () => {
        mockReq.body = { nama_kategori: "Smartphone" };

        KategoriProduk.findOne = jest.fn().mockResolvedValue(null); // Tidak ada kategori dengan nama yang sama
        KategoriProduk.create = jest.fn().mockResolvedValue({
            id_kategori: 2,
            nama_kategori: "Smartphone",
        });

        await kategoriController.createKategori(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: "Kategori berhasil ditambahkan",
            data: {
                id_kategori: 2,
                nama_kategori: "Smartphone",
            },
        });
    });

    test("updateKategori() harus memperbarui kategori", async () => {
        mockReq.params = { id: 1 };
        mockReq.body = { nama_kategori: "Smartphone" };

        KategoriProduk.findByPk = jest.fn().mockResolvedValue(kategoriMock);
        KategoriProduk.findOne = jest.fn().mockResolvedValue(null); // Tidak ada kategori dengan nama yang sama

        await kategoriController.updateKategori(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: "Kategori berhasil diperbarui",
            data: [1], // Sequelize update method returns an array with the number of affected rows
        });
    });

    test("deleteKategori() harus menghapus kategori", async () => {
        mockReq.params = { id: 1 };

        KategoriProduk.findByPk = jest.fn().mockResolvedValue(kategoriMock);

        await kategoriController.deleteKategori(mockReq, mockRes);

        expect(mockRes.json).toHaveBeenCalledWith({
            success: true,
            message: "Kategori berhasil dihapus",
        });
    });

    test("deleteKategori() harus gagal jika kategori tidak ditemukan", async () => {
        mockReq.params = { id: 99 };

        KategoriProduk.findByPk = jest.fn().mockResolvedValue(null);

        await kategoriController.deleteKategori(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(404);
        expect(mockRes.json).toHaveBeenCalledWith({
            success: false,
            message: "Kategori tidak ditemukan",
        });
    });
});

describe("Kategori API - Integration Testing", () => {
    beforeAll(async () => {
        await sequelize.sync({ force: true }); // Reset database untuk testing
    });

    afterAll(async () => {
        await sequelize.close(); // Menutup koneksi database setelah semua tes selesai
    });

    test("POST /kategori-produk harus menambahkan kategori baru", async () => {
        const res = await request(app)
            .post("/kategori-produk")
            .send({ nama_kategori: "Aksesoris" });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
        expect(res.body.data.nama_kategori).toBe("Aksesoris");
    });

    test("GET /kategori-produk harus mengembalikan daftar kategori", async () => {
        const res = await request(app).get("/kategori-produk");

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    test("PUT /kategori-produk/:id harus mengupdate kategori", async () => {
        const kategori = await KategoriProduk.create({ nama_kategori: "Gadget" });

        const res = await request(app)
            .put(`/kategori-produk/${kategori.id_kategori}`)
            .send({ nama_kategori: "Smartphone" });

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe("Kategori berhasil diperbarui");
    });

    test("DELETE /kategori-produk/:id harus menghapus kategori", async () => {
        const kategori = await KategoriProduk.create({ nama_kategori: "HapusKategori" });

        const res = await request(app).delete(`/kategori-produk/${kategori.id_kategori}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);

        const cekKategori = await KategoriProduk.findByPk(kategori.id_kategori);
        expect(cekKategori).toBeNull();
    });
});