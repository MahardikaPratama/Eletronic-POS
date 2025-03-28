"use strict";
module.exports = (sequelize, DataTypes) => {
    const Produk = sequelize.define(
        "Produk",
        {
            id_barang: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            kode_barang: {
                type: DataTypes.STRING(50),
                unique: true,
            },
            nama_barang: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            harga_grosir: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            harga_jual: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            harga_modal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            stok: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            batas_grosir: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 10,
            },
            id_kategori: {
                type: DataTypes.INTEGER,
                references: {
                    model: "kategori_produk",
                    key: "id_kategori",
                },
            },
        },
        {
            tableName: "produk",
            timestamps: false,
        }
    );

    Produk.associate = (models) => {
        Produk.belongsTo(models.KategoriProduk, {
            foreignKey: "id_kategori",
            as: "kategori", 
        });
        Produk.hasMany(models.DetailTransaksi, {
            foreignKey: "id_barang",
            onDelete: "CASCADE",
        });
    };

    return Produk;
};
