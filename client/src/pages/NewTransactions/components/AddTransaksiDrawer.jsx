import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import TransaksiDataService from '../../../services/transaksi.service';
import ProdukDataService from '../../../services/produk.service';

const AddTransaksiDrawer = ({ isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        tanggal: new Date().toISOString().slice(0, 10), // Tanggal sekarang
        metode_pembayaran: 'Cash',
        detail_transaksi: [],
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [produkList, setProdukList] = useState([]); // Daftar produk untuk dropdown

    useEffect(() => {
        if (isOpen) {
            fetchProdukList();
        }
    }, [isOpen]);

    const fetchProdukList = async () => {
        try {
            const response = await ProdukDataService.getAll();
            setProdukList(response.data.data); // Pastikan respons API adalah array
        } catch (error) {
            console.error('Gagal mengambil daftar produk:', error);
        }
    };

    const handleAddDetail = () => {
        setFormData((prev) => ({
            ...prev,
            detail_transaksi: [
                ...prev.detail_transaksi,
                { nama_barang: '', kode_barang: '', jumlah: '', harga_satuan: '', subtotal: 0 },
            ],
        }));
    };

    const handleDetailChange = (index, field, value) => {
        const updatedDetails = [...formData.detail_transaksi];
        updatedDetails[index][field] = value;
    
        // Jika nama barang dipilih, cari kode barang dan harga satuan
        if (field === 'nama_barang') {
            const selectedProduk = produkList.find((produk) => produk.nama_barang === value);
            if (selectedProduk) {
                updatedDetails[index].kode_barang = selectedProduk.kode_barang;
                updatedDetails[index].harga_satuan = selectedProduk.harga_jual; // Default harga satuan
            }
        }
    
        // Hitung subtotal jika jumlah berubah
        if (field === 'jumlah') {
            const jumlah = parseInt(updatedDetails[index].jumlah, 10) || 0;
    
            // Gunakan harga grosir jika jumlah melebihi batas grosir
            const selectedProduk = produkList.find(
                (produk) => produk.kode_barang === updatedDetails[index].kode_barang
            );
            if (selectedProduk && jumlah >= selectedProduk.batas_grosir) {
                updatedDetails[index].harga_satuan = selectedProduk.harga_grosir;
            } else if (selectedProduk) {
                updatedDetails[index].harga_satuan = selectedProduk.harga_jual;
            }
    
            updatedDetails[index].subtotal = jumlah * updatedDetails[index].harga_satuan;
        }
    
        setFormData((prev) => ({
            ...prev,
            detail_transaksi: updatedDetails,
        }));
    };

    const calculateTotalHarga = () => {
        return formData.detail_transaksi.reduce((total, detail) => total + detail.subtotal, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { tanggal, metode_pembayaran, detail_transaksi } = formData;

        // Validasi input
        if (!tanggal || !metode_pembayaran || detail_transaksi.length === 0) {
            setErrorMessage('Semua field wajib diisi dengan benar.');
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Semua field wajib diisi dengan benar!',
            });
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await TransaksiDataService.create({
                tanggal,
                metode_pembayaran,
                total_harga: calculateTotalHarga(),
                detail_transaksi: detail_transaksi.map((detail) => ({
                    kode_barang: detail.kode_barang,
                    jumlah: parseInt(detail.jumlah, 10),
                    harga_satuan: parseFloat(detail.harga_satuan),
                })),
            });
            console.log('Transaksi berhasil ditambahkan:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Transaksi berhasil ditambahkan.',
                timer: 2000,
                showConfirmButton: false,
            });
            onSuccess();
            onClose(); // Tutup drawer setelah berhasil
        } catch (error) {
            console.error('Gagal menambahkan transaksi:', error);
            setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan.');

            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan saat menambahkan transaksi.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            id="drawer-create-transaksi"
            className={`fixed top-0 right-0 z-40 w-full h-screen max-w-md p-6 overflow-y-auto transition-transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-white dark:bg-gray-800 shadow-lg`}
            tabIndex="-1"
            aria-labelledby="drawer-label"
            aria-hidden={!isOpen}
        >
            <h5 id="drawer-label" className="mb-6 text-lg font-semibold text-gray-900 dark:text-white">
                Tambah Transaksi
            </h5>
            <button
                type="button"
                onClick={onClose}
                className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    ></path>
                </svg>
            </button>

            <form className="mb-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Detail Transaksi
                    </label>
                    {formData.detail_transaksi.map((detail, index) => (
                        <div key={index} className="flex space-x-2 mb-2">
                            <select
                                value={detail.nama_barang}
                                onChange={(e) => handleDetailChange(index, 'nama_barang', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="" disabled>
                                    Pilih Nama Barang
                                </option>
                                {produkList.map((produk) => (
                                    <option key={produk.kode_barang} value={produk.nama_barang}>
                                        {produk.nama_barang}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                placeholder="Kode Barang"
                                value={detail.kode_barang}
                                readOnly
                                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                            <input
                                type="number"
                                placeholder="Jumlah"
                                value={detail.jumlah}
                                onChange={(e) => handleDetailChange(index, 'jumlah', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            />
                            <input
                                type="number"
                                placeholder="Harga Satuan"
                                value={detail.harga_satuan}
                                readOnly
                                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddDetail}
                        className="text-blue-600 hover:underline"
                    >
                        + Tambah Detail
                    </button>
                </div>

                <div className="mb-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Total Harga
                    </label>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                        {calculateTotalHarga().toLocaleString('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                        })}
                    </p>
                </div>

                {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}

                <div className="flex space-x-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Adding...' : 'Add Transaksi'}
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-lg text-sm px-5 py-2.5 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

AddTransaksiDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default AddTransaksiDrawer;