'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('kategori_produk', [
      { id_kategori: 1, nama_kategori: 'Komponen Elektronik' },
      { id_kategori: 2, nama_kategori: 'Alat Listrik' },
      { id_kategori: 3, nama_kategori: 'Peralatan Rumah Tangga' }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('kategori_produk', null, {});
  }
};
