import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BiCategory, BiBarChartAlt } from "react-icons/bi";
import { FiPackage, FiLogOut } from "react-icons/fi";
import { FaMoneyBillWave, FaStore } from "react-icons/fa";
import { RiBillFill } from "react-icons/ri";
import "../styles/sidebar.css";

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [activeLink, setActiveLink] = useState("");

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    const location = useLocation();
    useEffect(() => {
        // Ambil pathname untuk menentukan halaman aktif
        const path = location.pathname.split("/")[2] || "dashboard"; 
        setActiveLink(path);
    }, [location]);
    
    return (
        <div>
            {/* Navigation bar */}
            <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-300">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                onClick={toggleSidebar}
                                className="inline-flex items-center p-2 text-sm text-gray-600 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    ></path>
                                </svg>
                            </button>
                            <a href="/dashboard" className="flex ms-2 md:me-24">
                                <FaStore className="h-8 text-gray-950 me-3" />
                                <span className="self-center text-xl font-semibold text-gray-950 sm:text-2xl">
                                    Bubun Eletronik
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Sidebar */}
            <aside
                id="logo-sidebar"
                className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } bg-gray-50 border-r border-gray-300 sm:translate-x-0`}
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-gray-50 scrollbar-hide">
                    <ul className="space-y-2 font-medium">
                        {/* Dashboard Link */}
                        <li>
                            <a
                                href="/dashboard"
                                onClick={() => handleLinkClick("dashboard")}
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "dashboard"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <svg
                                    className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 22 21"
                                >
                                    <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                                    <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                                </svg>
                                <span className="ms-3">Dashboard</span>
                            </a>
                        </li>
                        {/* Master Section */}
                        <li className="mt-4">
                            <span className="block px-2 text-sm font-medium text-gray-500 uppercase">
                                Master
                            </span>
                        </li>
                        <li>
                            <a
                                href="/dashboard/kategori"
                                onClick={() => handleLinkClick("kategori")}
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "kategori"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <BiCategory className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Kategori</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard/produk"
                                onClick={() => handleLinkClick("produk")}
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "produk"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <FiPackage className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Produk</span>
                            </a>
                        </li>

                        {/* Transaction Section */}
                        <li className="mt-4">
                            <span className="block px-2 text-sm font-medium text-gray-500 uppercase">
                                Transaksi
                            </span>
                        </li>
                        <li>
                            <a
                                href="/dashboard/transactions"
                                onClick={() => handleLinkClick("transaksi")}
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "transaksi"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <RiBillFill className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Transaksi</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="/dashboard/laporan-pengeluaran"
                                onClick={() => handleLinkClick("pengeluaran")}
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "pengeluaran"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <FaMoneyBillWave className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Pengeluaran</span>
                            </a>
                        </li>

                        {/* Reports Section */}
                        <li className="mt-4">
                            <span className="block px-2 text-sm font-medium text-gray-500 uppercase">
                                Laporan
                            </span>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() =>
                                    handleLinkClick("laporanKeuangan")
                                }
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "laporanKeuangan"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <BiBarChartAlt className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Laporan Keuangan</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() =>
                                    handleLinkClick("laporanPenjualan")
                                }
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "laporanPenjualan"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <BiBarChartAlt className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Laporan Penjualan</span>
                            </a>
                        </li>

                        {/* Other Section */}
                        <li className="mt-4">
                            <span className="block px-2 text-sm font-medium text-gray-500 uppercase">
                                Other
                            </span>
                        </li>
                        <li>
                            <a
                                href="#"
                                onClick={() => handleLinkClick("logout")}
                                className={`flex items-center p-2 text-gray-600 rounded-lg hover:bg-gray-100 group ${
                                    activeLink === "logout"
                                        ? "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                <FiLogOut className="w-5 h-5 text-gray-300 transition duration-75 group-hover:text-white" />
                                <span className="ms-3">Logout</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </div>
    );
};

export default Sidebar;
