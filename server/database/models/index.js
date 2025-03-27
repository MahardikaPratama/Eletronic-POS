'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config.json')[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.KategoriProduk = require('./kategoriProduk')(sequelize, DataTypes);
db.Produk = require('./produk')(sequelize, DataTypes);
db.Pengeluaran = require('./pengeluaran')(sequelize, DataTypes);
db.Transaksi = require('./transaksi')(sequelize, DataTypes);
db.DetailTransaksi = require('./detailtransaksi')(sequelize, DataTypes);

// Setup relationships
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
