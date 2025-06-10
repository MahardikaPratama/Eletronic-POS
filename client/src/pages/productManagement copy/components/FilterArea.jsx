import { useState, useEffect } from 'react';
import KategoriProdukDataService from '../../../services/kategoriProduk.service';
import PropTypes from 'prop-types';


const FilterArea = ({ onAdd, onSearch, searchTerm, onFilterChange, filterKategori, onItemsPerPageChange, itemsPerPage }) => {
    const [categories, setCategories] = useState([]);
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    const handleFilterChange = (e) => {
        onFilterChange(e.target.value);
    };

    const handleItemsPerPageChange = (e) => {
        onItemsPerPageChange(Number(e.target.value));
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await KategoriProdukDataService.getAll();
            setCategories(response.data.data);
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengambil data kategori");
            console.error('Error fetching data:', error);
        }
    }

    return (
        <div className="flex flex-col items-start justify-between gap-4 mb-4 lg:flex-row lg:items-center">
            <div className="flex flex-col w-full gap-3 sm:flex-row lg:w-auto">
                <div className="relative w-full sm:w-auto">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="product-search" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg sm:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search products (name or code)" 
                    />
                </div>

                <div className="w-full sm:w-auto">
                    <select 
                        id="kategori-filter" 
                        value={filterKategori} 
                        onChange={handleFilterChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="">All Categories</option>
                        {categories.map(category => (
                            <option key={category.id_kategori} value={category.id_kategori}>
                                {category.nama_kategori}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full sm:w-auto">
                    <select 
                        id="items-per-page" 
                        value={itemsPerPage} 
                        onChange={handleItemsPerPageChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    >
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                    </select>
                </div>
            </div>

            <button 
                onClick={onAdd} 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 whitespace-nowrap"
            >
                Add new product
            </button>
        </div>
    );
};

FilterArea.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    searchTerm: PropTypes.string,
    onFilterChange: PropTypes.func.isRequired,
    filterKategori: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired,
    onItemsPerPageChange: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired
};

export default FilterArea; 