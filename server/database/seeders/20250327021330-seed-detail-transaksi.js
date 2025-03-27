'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('detail_transaksi', [
      { id_detail: 1, id_transaksi: 1, kode_barang: 'ELK001', jumlah: 10, harga_satuan: 150, subtotal: 1500 },
      { id_detail: 2, id_transaksi: 2, kode_barang: 'ALK001', jumlah: 5, harga_satuan: 20000, subtotal: 100000 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('detail_transaksi', null, {});
  }
};
