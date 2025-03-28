import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Swal from 'sweetalert2';
import KategoriProdukDataService from '../../../services/kategoriProduk.service';

const EditKategoriDrawer = ({ kategori, isOpen, onClose, onSuccess }) => {
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (isOpen && kategori) {
            setName(kategori.nama_kategori || '');
            setErrorMessage('');
        }
    }, [isOpen, kategori]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setErrorMessage('Nama kategori tidak boleh kosong.');
            Swal.fire({
                icon: 'warning',
                title: 'Oops...',
                text: 'Nama kategori tidak boleh kosong!',
            });
            return;
        }

        setLoading(true);
        setErrorMessage('');

        try {
            const response = await KategoriProdukDataService.update(kategori.id_kategori, { nama_kategori: name });
            console.log('Kategori berhasil diperbarui:', response.data);
            Swal.fire({
                icon: 'success',
                title: 'Berhasil!',
                text: 'Kategori berhasil diperbarui.',
                timer: 2000,
                showConfirmButton: false,
            });
            onSuccess();
            onClose();
        } catch (error) {
            console.error('Gagal memperbarui kategori:', error);
            setErrorMessage(error.response?.data?.message || 'Terjadi kesalahan.');

            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: error.response?.data?.message || 'Terjadi kesalahan saat memperbarui kategori.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            id="drawer-update-kategori" 
            className={`fixed top-0 right-0 z-40 w-full h-screen max-w-xs p-4 overflow-y-auto transition-transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} bg-white dark:bg-gray-800`}
            tabIndex="-1" 
            aria-labelledby="drawer-label" 
            aria-hidden={!isOpen}
        >
            <h5 id="drawer-label" className="mb-6 text-sm font-semibold text-gray-500 uppercase dark:text-gray-400">
                Edit Kategori
            </h5>
            <button 
                type="button" 
                onClick={onClose}
                className="absolute top-2.5 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            >
                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
            </button>

            <form className="mb-8" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Name
                    </label>
                    <input 
                        type="text" 
                        id="name" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Type kategori name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                </div>
                {errorMessage && <p className="mb-4 text-sm text-red-500">{errorMessage}</p>}

                <div className="flex space-x-4">
                    <button 
                        type="submit" 
                        disabled={loading} 
                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        {loading ? 'Updating...' : 'Update Kategori'}
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

EditKategoriDrawer.propTypes = {
    kategori: PropTypes.shape({
        id_kategori: PropTypes.number.isRequired,
        nama_kategori: PropTypes.string.isRequired
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSuccess: PropTypes.func.isRequired,
};

export default EditKategoriDrawer;