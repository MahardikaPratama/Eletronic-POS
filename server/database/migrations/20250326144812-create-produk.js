'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('produk', {
      kode_barang: {
        type: Sequelize.STRING(50),
        primaryKey: true
      },
      nama_barang: {
        type: Sequelize.STRING(150),
        allowNull: false
      },
      harga_grosir: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      harga_jual: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      harga_modal: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
      },
      stok: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      id_kategori: {
        type: Sequelize.INTEGER,
        references: {
          model: 'kategori_produk',
          key: 'id_kategori'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
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
    await queryInterface.dropTable('produk');
  }
};