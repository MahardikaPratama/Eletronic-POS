"use strict";
module.exports = (sequelize, DataTypes) => {
    const Pengeluaran = sequelize.define(
        "Pengeluaran",
        {
            id_pengeluaran: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            tanggal: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            keterangan: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            jumlah: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
        },
        {
            tableName: "pengeluaran",
            timestamps: false,
        }
    );

    return Pengeluaran;
};
