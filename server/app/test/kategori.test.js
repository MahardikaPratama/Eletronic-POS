const request = require("supertest");
const app = require("../../app"); 
const { KategoriProduk } = require("../../database/models");

jest.mock("../../database/models", () => ({
    KategoriProduk: {
        findAll: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        destroy: jest.fn()
    }
}));

describe("Pengujian Kategori Controller", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /kategori", () => {
        it("berhasil mengambil semua data kategori", async () => {
            KategoriProduk.findAll.mockResolvedValue([{ id_kategori: 1, nama_kategori: "Makanan" }]);

            const res = await request(app).get("/kategori");

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Data kategori berhasil diambil");
            expect(KategoriProduk.findAll).toHaveBeenCalled();
        });

        it("gagal mengambil data kategori karena error server", async () => {
            KategoriProduk.findAll.mockRejectedValue(new Error("Database error"));

            const res = await request(app).get("/kategori");

            expect(res.statusCode).toBe(500);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe("Terjadi kesalahan saat mengambil data kategori");
        });
    });

    describe("POST /kategori", () => {
        it("berhasil menambahkan kategori baru", async () => {
            const data = { nama_kategori: "Minuman" };
            KategoriProduk.findOne.mockResolvedValue(null);
            KategoriProduk.create.mockResolvedValue({ id_kategori: 2, ...data });

            const res = await request(app).post("/kategori").send(data);

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(res.body.message).toBe("Kategori berhasil ditambahkan");
        });

        it("gagal karena nama kategori kosong", async () => {
            const res = await request(app).post("/kategori").send({ nama_kategori: " " });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Nama kategori tidak boleh kosong");
        });

        it("gagal karena kategori sudah ada", async () => {
            const data = { nama_kategori: "Makanan" };
            KategoriProduk.findOne.mockResolvedValue(data);

            const res = await request(app).post("/kategori").send(data);

            expect(res.statusCode).toBe(409);
            expect(res.body.message).toBe("Kategori sudah ada.");
        });
    });

    describe("PUT /kategori/:id", () => {
        it("berhasil memperbarui kategori", async () => {
            const id = 1;
            const body = { nama_kategori: "Elektronik" };

            KategoriProduk.findByPk.mockResolvedValue({ id_kategori: id });
            KategoriProduk.findOne.mockResolvedValue(null);
            KategoriProduk.update.mockResolvedValue([1]);

            const res = await request(app).put(`/kategori/${id}`).send(body);

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Kategori berhasil diperbarui");
        });

        it("gagal karena nama kategori kosong", async () => {
            const res = await request(app).put("/kategori/1").send({ nama_kategori: " " });

            expect(res.statusCode).toBe(400);
            expect(res.body.message).toBe("Nama kategori tidak boleh kosong");
        });

        it("gagal karena kategori tidak ditemukan", async () => {
            KategoriProduk.findByPk.mockResolvedValue(null);

            const res = await request(app).put("/kategori/99").send({ nama_kategori: "Fashion" });

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Kategori tidak ditemukan");
        });

        it("gagal karena nama kategori sudah ada", async () => {
            KategoriProduk.findByPk.mockResolvedValue({ id_kategori: 1 });
            KategoriProduk.findOne.mockResolvedValue({ id_kategori: 2 });

            const res = await request(app).put("/kategori/1").send({ nama_kategori: "Makanan" });

            expect(res.statusCode).toBe(409);
            expect(res.body.message).toBe("Kategori sudah ada.");
        });
    });

    describe("DELETE /kategori/:id", () => {
        it("berhasil menghapus kategori", async () => {
            KategoriProduk.findByPk.mockResolvedValue({ id_kategori: 1 });
            KategoriProduk.destroy.mockResolvedValue(1);

            const res = await request(app).delete("/kategori/1");

            expect(res.statusCode).toBe(200);
            expect(res.body.message).toBe("Kategori berhasil dihapus");
        });

        it("gagal karena kategori tidak ditemukan", async () => {
            KategoriProduk.findByPk.mockResolvedValue(null);

            const res = await request(app).delete("/kategori/99");

            expect(res.statusCode).toBe(404);
            expect(res.body.message).toBe("Kategori tidak ditemukan");
        });
    });
});
