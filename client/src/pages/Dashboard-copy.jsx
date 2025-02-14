import Sidebar from "../components/Sidebar";
import Chart from "react-apexcharts";
import Footer from "../components/Footer";

const Dashboard = () => {
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

    return (
        <div className="flex">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex-1 min-h-screen ml-64 bg-gray-100">
                <div className="px-6 pt-20">
                    {/* Header */}
                    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
                        <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
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

                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
