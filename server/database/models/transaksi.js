"use strict";
module.exports = (sequelize, DataTypes) => {
    const Transaksi = sequelize.define(
        "Transaksi",
        {
            id_transaksi: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tanggal: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            total_harga: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            metode_pembayaran: {
                type: DataTypes.ENUM("Cash", "Transfer"),
                allowNull: false,
            },
        },
        {
            tableName: "transaksi",
            timestamps: false,
        }
    );

    Transaksi.associate = (models) => {
        Transaksi.hasMany(models.DetailTransaksi, {
            foreignKey: "id_transaksi",
            onDelete: "CASCADE",
        });
    };

    return Transaksi;
};
