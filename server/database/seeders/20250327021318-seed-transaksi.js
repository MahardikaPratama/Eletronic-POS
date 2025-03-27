'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('transaksi', [
      { id_transaksi: 1, tanggal: new Date(), total_harga: 50000, metode_pembayaran: 'Cash' },
      { id_transaksi: 2, tanggal: new Date(), total_harga: 120000, metode_pembayaran: 'Transfer' }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('transaksi', null, {});
  }
};
