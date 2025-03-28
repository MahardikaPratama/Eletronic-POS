const { Sequelize } = require("sequelize");
const { KategoriProduk } = require("../../database/models");

// Gunakan SQLite in-memory agar tidak bergantung pada database eksternal
const sequelize = new Sequelize("sqlite::memory", { logging: false });

async function setupDatabase() {
    await sequelize.sync({ force: true }); // Reset database sebelum test
    await KategoriProduk.create({ nama_kategori: "Elektronik" }); // Seed data awal
}

module.exports = { sequelize, setupDatabase };
