'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('produk', [
      { id_barang: 1, kode_barang: 'ELK001', nama_barang: 'Resistor 1K Ohm', harga_grosir: 100, harga_jual: 150, harga_modal: 90, stok: 100, id_kategori: 1 },
      { id_barang: 2, kode_barang: 'ELK002', nama_barang: 'Kapasitor 100uF', harga_grosir: 200, harga_jual: 250, harga_modal: 180, stok: 80, id_kategori: 1 },
      { id_barang: 3, kode_barang: 'ALK001', nama_barang: 'Lampu LED 10W', harga_grosir: 15000, harga_jual: 20000, harga_modal: 14000, stok: 50, id_kategori: 2 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('produk', null, {});
  }
};
