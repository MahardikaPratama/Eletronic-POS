'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pengeluaran', {
      id_pengeluaran: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      tanggal: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      keterangan: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      jumlah: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('pengeluaran');
  }
};