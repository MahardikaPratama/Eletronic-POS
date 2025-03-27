'use strict';

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('pengeluaran', [
      { id_pengeluaran: 1, tanggal: '2025-03-25', keterangan: 'Pembelian bahan solder', jumlah: 50000 },
      { id_pengeluaran: 2, tanggal: '2025-03-26', keterangan: 'Biaya listrik toko', jumlah: 150000 }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('pengeluaran', null, {});
  }
};
