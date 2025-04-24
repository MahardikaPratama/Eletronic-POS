const request = require('supertest');
const app = require('../../app'); // Sesuaikan dengan path file Express utama
const { Produk, KategoriProduk } = require('../../database/models');

jest.mock('../../database/models');

describe('Produk Controller', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('GET /produk', () => {
        it('harus mengembalikan semua produk beserta kategori', async () => {
            Produk.findAll.mockResolvedValue([
                {
                    id_barang: 1,
                    kode_barang: 'P001',
                    nama_barang: 'Produk A',
                    kategori: { nama_kategori: 'Makanan' }
                }
            ]);

            const res = await request(app).get('/produk');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
            expect(Array.isArray(res.body.data)).toBe(true);
            expect(Produk.findAll).toHaveBeenCalled();
        });

        it('harus menangani error', async () => {
            Produk.findAll.mockRejectedValue(new Error('Database Error'));
            const res = await request(app).get('/produk');

            expect(res.statusCode).toBe(500);
            expect(res.body.success).toBe(false);
        });
    });

    describe('POST /produk', () => {
        it('harus berhasil menambahkan produk', async () => {
            Produk.findOne.mockResolvedValue(null);
            Produk.create.mockResolvedValue({ id_barang: 1 });

            const res = await request(app).post('/produk').send({
                kode_barang: 'P002',
                nama_barang: 'Produk B',
                harga_grosir: 1000,
                harga_jual: 1500,
                harga_modal: 800,
                stok: 10,
                batas_grosir: 5,
                id_kategori: '1'
            });

            expect(res.statusCode).toBe(201);
            expect(res.body.success).toBe(true);
            expect(Produk.create).toHaveBeenCalled();
        });

        it('harus mengembalikan status 409 jika kode_barang sudah ada', async () => {
            Produk.findOne.mockResolvedValue({ id_barang: 1 });

            const res = await request(app).post('/produk').send({
                kode_barang: 'P001',
                nama_barang: 'Produk A',
                harga_grosir: 1000,
                harga_jual: 1500,
                harga_modal: 800,
                stok: 10,
                batas_grosir: 5,
                id_kategori: '1'
            });

            expect(res.statusCode).toBe(409);
            expect(res.body.success).toBe(false);
        });
    });

    describe('PUT /produk/:id', () => {
        it('harus berhasil mengupdate produk', async () => {
            Produk.findByPk.mockResolvedValue({
                save: jest.fn(),
                kode_barang: 'P003'
            });

            const res = await request(app).put('/produk/1').send({
                kode_barang: 'P003',
                nama_barang: 'Produk C',
                harga_grosir: 1200,
                harga_jual: 1700,
                harga_modal: 1000,
                stok: 20,
                batas_grosir: 10,
                id_kategori: '2'
            });

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('harus mengembalikan status 404 jika produk tidak ditemukan', async () => {
            Produk.findByPk.mockResolvedValue(null);

            const res = await request(app).put('/produk/999').send({
                kode_barang: 'P999',
                nama_barang: 'Tidak Ada',
                harga_grosir: 500,
                harga_jual: 700,
                harga_modal: 400,
                stok: 0,
                batas_grosir: 1,
                id_kategori: '1'
            });

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Produk tidak ditemukan');
        });
    });

    describe('DELETE /produk/:id', () => {
        it('harus berhasil menghapus produk', async () => {
            Produk.findByPk.mockResolvedValue({
                destroy: jest.fn()
            });

            const res = await request(app).delete('/produk/1');

            expect(res.statusCode).toBe(200);
            expect(res.body.success).toBe(true);
        });

        it('harus mengembalikan status 404 jika produk tidak ditemukan', async () => {
            Produk.findByPk.mockResolvedValue(null);

            const res = await request(app).delete('/produk/999');

            expect(res.statusCode).toBe(404);
            expect(res.body.success).toBe(false);
        });
    });
});
