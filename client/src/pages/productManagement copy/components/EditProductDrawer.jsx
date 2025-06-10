import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Produk from '../../../services/produk.service';
import KategoriProdukDataService from '../../../services/kategoriProduk.service';

const EditProductDrawer = ({ product, isOpen, onClose, onSuccess }) => {
    const [formData, setFormData] = useState({
        kode_barang: '',
        nama_barang: '',
        harga_grosir: '',
        harga_jual: '',
        harga_modal: '',
        stok: '',
        batas_grosir: '',
        id_kategori: ''
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [categories, setCategories] = useState([]);

    // Update form data when product changes
    useEffect(() => {
        if (product) {
            setFormData({
                kode_barang: product.kode_barang,
                nama_barang: product.nama_barang,
                harga_grosir: product.harga_grosir,
                harga_jual: product.harga_jual,
                harga_modal: product.harga_modal,
                stok: product.stok,
                batas_grosir: product.batas_grosir,
                id_kategori: product.id_kategori
            });
            setErrorMessage('');
        }
        fetchCategories();
    }, [product], []);

    const fetchCategories = async () => {
        try {
            const response = await KategoriProdukDataService.getAll();
            setCategories(response.data.data);
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengambil data kategori");
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.kode_barang.trim() || !formData.nama_barang.trim() || !formData.id_kategori) {
            setErrorMessage('Tolong isi semua fields.');
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Tolong isi semua field!',
            });
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await Produk.update(product.id_barang, formData);
            console.log('Produk berhasil diperbarui:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Produk berhasil diperbarui.',
                timer: 2000,
                showConfirmButton: false,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Gagal memperbarui produk:', error);
            setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan.');

            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui produk.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name.includes('harga') || name === 'stok' ? 
                (value === '' ? '' : Number(value)) : 
                value
        }));
    };

    return (
        <div 
            id="drawer-update-product"
            className={`fixed top-0 right-0 z-40 w-full h-screen max-w-md p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-gray-800`}
            tabIndex="-1" 
            aria-labelledby="drawer-label" 
            aria-hidden={!isOpen}
        >
            <h5 id="drawer-label" className="inline-flex items-center mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
                Edit Product
            </h5>
            <button 
                type="button" 
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
                <span className="sr-only">Close menu</span>
            </button>
            
            <form onSubmit={handleSubmit} className="mb-6">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="kode_barang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Kode Barang <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="kode_barang" 
                            name="kode_barang"
                            value={formData.kode_barang}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="PRD001" 
                            required
                            readOnly
                        />
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Product code cannot be changed</p>
                    </div>
                    
                    <div>
                        <label htmlFor="nama_barang" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                            Nama Barang <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            id="nama_barang" 
                            name="nama_barang"
                            value={formData.nama_barang}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            placeholder="Laptop Asus" 
                            required 
                        />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="id_kategori" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Kategori <span className="text-red-500">*</span>
                            </label>
                            <select 
                                id="id_kategori" 
                                name="id_kategori"
                                value={formData.id_kategori} // Gunakan id_kategori, bukan nama_kategori
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                required
                            >
                                <option value="">Select a category</option>
                                {categories.map(category => (
                                    <option key={category.id_kategori} value={category.id_kategori}>
                                        {category.nama_kategori}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label htmlFor="stok" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Stok <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                id="stok" 
                                name="stok"
                                value={formData.stok}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="15" 
                                required
                                min="0"
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="harga_modal" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Harga Modal <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    Rp
                                </span>
                                <input 
                                    type="number" 
                                    id="harga_modal" 
                                    name="harga_modal"
                                    value={formData.harga_modal}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="8500000" 
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        

                        <div>
                            <label htmlFor="harga_jual" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Harga Jual <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    Rp
                                </span>
                                <input 
                                    type="number" 
                                    id="harga_jual" 
                                    name="harga_jual"
                                    value={formData.harga_jual}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="10500000" 
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="harga_grosir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Harga Grosir <span className="text-red-500">*</span>
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                                    Rp
                                </span>
                                <input 
                                    type="number" 
                                    id="harga_grosir" 
                                    name="harga_grosir"
                                    value={formData.harga_grosir}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-r-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                    placeholder="9000000" 
                                    required
                                    min="0"
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label htmlFor="batas_grosir" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                Batas Grosir <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="number" 
                                id="batas_grosir" 
                                name="batas_grosir"
                                value={formData.batas_grosir}
                                onChange={handleChange}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                                placeholder="10" 
                                required
                                min="0"
                            />
                        </div>
                    </div>
                </div>

                {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}
                
                <div className="bottom-0 left-0 flex justify-center w-full pb-4 mt-6 space-x-4">
                    <button 
                        type="submit" 
                        disabled={loading}
                        className="text-white w-full justify-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Updating...' : 'Update Product'}
                    </button>
                    <button 
                        type="button" 
                        onClick={onClose}
                        className="inline-flex w-full justify-center text-gray-500 items-center bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

EditProductDrawer.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    product: PropTypes.shape({
        id_barang: PropTypes.number.isRequired,
        kode_barang: PropTypes.string.isRequired,
        nama_barang: PropTypes.string.isRequired,
        harga_grosir: PropTypes.number.isRequired,
        harga_jual: PropTypes.number.isRequired,
        harga_modal: PropTypes.number.isRequired,
        stok: PropTypes.number.isRequired,
        batas_grosir: PropTypes.number.isRequired,
        id_kategori: PropTypes.number.isRequired,
    }),
    onSuccess: PropTypes.func.isRequired
};

export default EditProductDrawer; 