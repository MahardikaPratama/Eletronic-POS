import Sidebar from "../components/Sidebar";
import Footer from "../components/Footer";
import statistic from "../data/statistic.json";
import lowStockProducts from "../data/lowStockProducts.json";
import favoriteProducts from "../data/favoriteProducts.json";
import Chart from "react-apexcharts";
import { useEffect } from "react";
import { DataTable } from "simple-datatables";

const Dashboard = () => {
    const icons = {
        total_products: "fas fa-box-open text-orange-500",
        total_orders: "fas fa-shopping-cart text-purple-500",
        total_pendapatan: "fas fa-wallet text-green-500",
        total_pengeluaran: "fas fa-money-bill-wave text-red-500",
        total_profit: "fas fa-chart-line text-blue-500"
    };

    // Fungsi untuk memformat angka
    const formatNumber = (value) => {
        if (value >= 1_000_000) {
            const juta = Math.floor(value / 1_000_000);
            return `${juta} juta`;
        }
        return value.toLocaleString("id-ID"); // Format dengan pemisah ribuan
    };

    // Data untuk grafik pendapatan dan pengeluaran
    const dataPendapatan = {
        30: [
            6000000, 6100000, 6050000, 6150000, 6200000, 6300000, 6350000,
            6250000, 6400000, 6350000, 6450000, 6600000, 6550000, 6700000,
            6750000, 6700000, 6800000, 6850000, 6900000, 7050000, 7100000,
            7050000, 7200000, 7250000, 7300000, 7250000, 7350000, 7400000,
            7500000, 7450000,
        ],
    };
    
    const dataPengeluaran = {
        30: [
            2000000, 2100000, 2150000, 2300000, 2400000, 2500000, 2550000,
            2700000, 2650000, 2800000, 2900000, 3000000, 3100000, 3050000,
            3200000, 3300000, 3250000, 3400000, 3500000, 3550000, 3600000,
            3700000, 3800000, 3750000, 3900000, 4000000, 4050000, 4150000,
            4200000, 4300000,
        ],
    };
    
    const pendapatanData = dataPendapatan[30];
    const pengeluaranData = dataPengeluaran[30];

    // Pengaturan opsi untuk grafik Pendapatan
    const pendapatanOptions = {
        chart: {
            id: "pendapatan-chart",
            toolbar: { show: false },
            animations: { enabled: true },
            fontFamily: "Inter, sans-serif",
        },
        xaxis: {
            categories: Array.from({ length: 30 }, (_, i) => `${i + 1} Feb`),
            tickAmount: 5,
            labels: {
                formatter: (val, index) => (index % 7 === 0 ? val : val),
                style: {
                    fontSize: "12px",
                    colors: "#6B7280", // Warna teks tanggal
                },
            },
            axisBorder: {
                color: "#D1D5DB", // Warna garis bawah x-axis
            },
            axisTicks: {
                color: "#D1D5DB", // Warna tick pada x-axis
            },
        },
        colors: ["#28A745"], // Hijau untuk Pendapatan
        dataLabels: { enabled: false },
        stroke: { width: 3 },
        markers: { size: 0 },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ["#28A745"], // Gradient hijau
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 100],
            },
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: { left: 2, right: 2, top: 0 },
        },
        legend: {
            position: "bottom",
            labels: { colors: "#4B5563" },
        },
        tooltip: { enabled: true, x: { show: false } },
    };

    // Pengaturan opsi untuk grafik Pengeluaran
    const pengeluaranOptions = {
        chart: {
            id: "pengeluaran-chart",
            toolbar: { show: false },
            animations: { enabled: true },
            fontFamily: "Inter, sans-serif",
        },
        xaxis: {
            categories: Array.from({ length: 30 }, (_, i) => `${i + 1} Feb`),
            tickAmount: 5,
            labels: {
                formatter: (val, index) => (index % 7 === 0 ? val : val),
                style: {
                    fontSize: "12px",
                    colors: "#6B7280", // Warna teks tanggal
                },
            },
            axisBorder: {
                color: "#D1D5DB", // Warna garis bawah x-axis
            },
            axisTicks: {
                color: "#D1D5DB", // Warna tick pada x-axis
            },
        },
        colors: ["#DC3545"], // Merah untuk Pengeluaran
        dataLabels: { enabled: false },
        stroke: { width: 3 },
        markers: { size: 0 },
        fill: {
            type: "gradient",
            gradient: {
                shade: "light",
                type: "vertical",
                shadeIntensity: 0.5,
                gradientToColors: ["#DC3545"], // Gradient merah
                inverseColors: false,
                opacityFrom: 0.5,
                opacityTo: 0.1,
                stops: [0, 100],
            },
        },
        grid: {
            show: false,
            strokeDashArray: 4,
            padding: { left: 2, right: 2, top: 0 },
        },
        legend: {
            position: "bottom",
            labels: { colors: "#4B5563" },
        },
        tooltip: { enabled: true, x: { show: false } },
    };

    useEffect(() => {
        if (document.getElementById("lowStockTable")) {
            new DataTable("#lowStockTable", {
                searchable: true,
                perPage: 5,
                perPageSelect: [5, 10, 20],
                labels: {
                    placeholder: "Cari produk...",
                    noRows: "Tidak ada data yang tersedia",
                    info: "Showing {start} to {end} of {rows} entries",
                },
            });
        }

        if (document.getElementById("favoriteProductsTable")) {
            new DataTable("#favoriteProductsTable", {
                searchable: true,
                perPage: 5,
                perPageSelect: [5, 10, 20],
                labels: {
                    placeholder: "Cari produk...",
                    noRows: "Tidak ada data yang tersedia",
                    info: "Showing {start} to {end} of {rows} entries",
                },
            });
        }
    }, []);

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-h-screen lg:ml-64 bg-gray-100">
                {/* Main Content */}
                <div className="flex-1 px-4 pt-16 lg:px-6 mt-4 lg:mt-0">
                    {/* Header */}
                    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-xl lg:text-2xl font-semibold text-gray-800">
                            Dashboard
                        </h1>
                    </div>

                    {/* Date Form */}
                    <div className="p-6 bg-white rounded-lg shadow-md mb-6">
                        <form className="flex flex-col gap-6">
                            <div className="flex flex-col lg:flex-row items-center gap-6">
                                <div className="flex flex-col w-full lg:w-1/2">
                                    <label
                                        htmlFor="start-date"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    >
                                        Start date
                                    </label>
                                    <input
                                        type="date"
                                        id="start-date"
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>

                                <div className="flex flex-col w-full lg:w-1/2">
                                    <label
                                        htmlFor="end-date"
                                        className="mb-2 text-sm font-medium text-gray-700"
                                    >
                                        End date
                                    </label>
                                    <input
                                        type="date"
                                        id="end-date"
                                        className="border rounded-md px-4 py-2 w-full"
                                    />
                                </div>
                            </div>

                            <div className="flex justify-start">
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-red-500 text-white font-medium rounded-full hover:bg-red-600"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Statistik */}
                    <div className="grid grid-cols-1 gap-6 mb-6 lg:grid-cols-3 xl:grid-cols-5">
                        {Object.entries(statistic[0]).map(([key, value]) => (
                            <div key={key} className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center text-center">
                                <div className={`text-4xl mb-3`}>
                                    <i className={icons[key] || "fas fa-chart-bar"}></i>
                                </div>
                                <h3 className="text-base font-bold text-gray-600 capitalize">
                                    {key.replace("_", " ")}
                                </h3>
                                <p className={`text-2xl font-bold ${
                                    key.includes("total_pendapatan") ? "text-green-500" :
                                    key.includes("total_pengeluaran") ? "text-red-500" :
                                    key.includes("total_profit") ? "text-blue-500" :
                                    "text-gray-800"
                                }`}>
                                    {key.includes("total_pendapatan") || key.includes("total_pengeluaran") || key.includes("total_profit") ? (
                                        <span>
                                            <span className="text-2xl">Rp</span> {formatNumber(value)}
                                        </span>
                                    ) : formatNumber(value)}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Grafik Pendapatan dan Pengeluaran */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Grafik Pendapatan */}
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Grafik Pendapatan</h3>
                            <Chart
                                options={pendapatanOptions} // Opsi khusus untuk pendapatan
                                series={[{ name: "Pendapatan", data: pendapatanData }]} // Data Pendapatan
                                type="area" // Tipe grafik area
                                height={350} // Tinggi grafik
                            />
                        </div>

                        {/* Grafik Pengeluaran */}
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">Grafik Pengeluaran</h3>
                            <Chart
                                options={pengeluaranOptions} // Opsi khusus untuk pengeluaran
                                series={[{ name: "Pengeluaran", data: pengeluaranData }]} // Data Pengeluaran
                                type="area" // Tipe grafik area
                                height={350} // Tinggi grafik
                            />
                        </div>
                    </div>

                    {/* Tabel Produk stok rendah dan Produk terfavorit */}
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Tabel Produk Stok Rendah */}
                        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Produk Stok Rendah
                            </h2>
                            <table id="lowStockTable" className="table-auto w-full text-left text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Images</th>
                                        <th className="px-4 py-2">Nama</th>
                                        <th className="px-4 py-2">Stok</th>
                                        <th className="px-4 py-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lowStockProducts.map((product, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{product.name}</td>
                                            <td className="px-4 py-2">{product.stock}</td>
                                            <td className="px-4 py-2">{formatNumber(product.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Tabel Produk Terfavorit */}
                        <div className="p-6 bg-white rounded-lg shadow-md mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                                Produk Terfavorit
                            </h2>
                            <table id="favoriteProductsTable" className="table-auto w-full text-left text-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2">Images</th>
                                        <th className="px-4 py-2">Nama</th>
                                        <th className="px-4 py-2">Quantity</th>
                                        <th className="px-4 py-2">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {favoriteProducts.map((product, index) => (
                                        <tr
                                            key={index}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                                        >
                                            <td className="px-4 py-2">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 object-cover rounded"
                                                />
                                            </td>
                                            <td className="px-4 py-2">{product.name}</td>
                                            <td className="px-4 py-2">{product.quantity}</td>
                                            <td className="px-4 py-2">{formatNumber(product.price)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
    );
};

export default Dashboard;
