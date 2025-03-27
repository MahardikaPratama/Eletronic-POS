"use strict";
module.exports = (sequelize, DataTypes) => {
    const DetailTransaksi = sequelize.define(
        "DetailTransaksi",
        {
            id_detail: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            id_transaksi: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: "transaksi",
                    key: "id_transaksi",
                },
            },
            kode_barang: {
                type: DataTypes.STRING(50),
                allowNull: false,
                references: {
                    model: "produk",
                    key: "kode_barang",
                },
            },
            jumlah: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            harga_satuan: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            subtotal: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            tableName: "detail_transaksi",
            timestamps: true,
        }
    );

    // Relasi antar model
    DetailTransaksi.associate = (models) => {
        DetailTransaksi.belongsTo(models.Transaksi, {
            foreignKey: "id_transaksi",
            as: "transaksi",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });

        DetailTransaksi.belongsTo(models.Produk, {
            foreignKey: "kode_barang",
            as: "produk",
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
        });
    };

    return DetailTransaksi;
};