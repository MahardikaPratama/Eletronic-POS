"use strict";
module.exports = (sequelize, DataTypes) => {
    const KategoriProduk = sequelize.define(
        "KategoriProduk",
        {
            id_kategori: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            nama_kategori: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
        },
        {
            tableName: "kategori_produk",
            timestamps: false,
        }
    );

    KategoriProduk.associate = (models) => {
        KategoriProduk.hasMany(models.Produk, {
            foreignKey: "id_kategori",
            as: "produk",
            onDelete: "SET NULL",
        });
    };

    return KategoriProduk;
};
