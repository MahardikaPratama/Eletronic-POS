import { useState } from 'react';
import FilterArea from './components/FilterArea';
import ProductTable from './components/ProductTable';
import AddProductDrawer from './components/AddProductDrawer';
import EditProductDrawer from './components/EditProductDrawer';
import DeleteProductDrawer from './components/DeleteProductDrawer';
import Pagination from '../../components/Pagination';
import PropTypes from 'prop-types';

const ITEMS_PER_PAGE = 5;

const MainContent = () => {
    // Sample data
    const data = [
        {
            kode_barang: 'PRD001', 
            nama_barang: 'Laptop Asus', 
            harga_grosir: 9000000, 
            harga_jual: 10500000, 
            harga_modal: 8500000, 
            stok: 15, 
            id_kategori: 1,
            kategori: 'Elektronik'
        },
        {
            kode_barang: 'PRD002', 
            nama_barang: 'Smartphone Samsung', 
            harga_grosir: 4500000, 
            harga_jual: 5300000, 
            harga_modal: 4000000, 
            stok: 25, 
            id_kategori: 1,
            kategori: 'Elektronik'
        },
        {
            kode_barang: 'PRD003', 
            nama_barang: 'Headphone Sony', 
            harga_grosir: 800000, 
            harga_jual: 1000000, 
            harga_modal: 600000, 
            stok: 30, 
            id_kategori: 2,
            kategori: 'Aksesoris'
        },
        {
            kode_barang: 'PRD004', 
            nama_barang: 'Mouse Logitech', 
            harga_grosir: 150000, 
            harga_jual: 200000, 
            harga_modal: 120000, 
            stok: 50, 
            id_kategori: 2,
            kategori: 'Aksesoris'
        },
        {
            kode_barang: 'PRD005', 
            nama_barang: 'Monitor LG', 
            harga_grosir: 2000000, 
            harga_jual: 2500000, 
            harga_modal: 1800000, 
            stok: 10, 
            id_kategori: 1,
            kategori: 'Elektronik'
        },
        {
            kode_barang: 'PRD006', 
            nama_barang: 'Keyboard Mechanical', 
            harga_grosir: 500000, 
            harga_jual: 650000, 
            harga_modal: 450000, 
            stok: 20, 
            id_kategori: 2,
            kategori: 'Aksesoris'
        }
    ];

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterKategori, setFilterKategori] = useState('');

    // Filter data based on search term and kategori
    const filteredData = data.filter(item => {
        const matchesSearch = searchTerm 
            ? item.nama_barang.toLowerCase().includes(searchTerm.toLowerCase()) || 
              item.kode_barang.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        
        const matchesKategori = filterKategori
            ? item.id_kategori.toString() === filterKategori
            : true;
            
        return matchesSearch && matchesKategori;
    });

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditDrawerOpen(true);
    };

    const handleDelete = (product) => {
        setSelectedProduct(product);
        setIsDeleteDrawerOpen(true);
    };

    const handleAdd = () => {
        setIsAddDrawerOpen(true);
    };

    const handleCloseDrawers = () => {
        setIsAddDrawerOpen(false);
        setIsEditDrawerOpen(false);
        setIsDeleteDrawerOpen(false);
        setSelectedProduct(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleFilterChange = (kategoriId) => {
        setFilterKategori(kategoriId);
        setCurrentPage(1); // Reset to first page when filtering
    };

    const isAnyDrawerOpen = isAddDrawerOpen || isEditDrawerOpen || isDeleteDrawerOpen;

    // List of all available categories for the filter
    const categories = [
        { id: 1, name: 'Elektronik' },
        { id: 2, name: 'Aksesoris' }
    ];

    return (
        <div className="p-4 md:p-10">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div className="p-4">
                    <FilterArea 
                        onAdd={handleAdd} 
                        onSearch={handleSearch}
                        searchTerm={searchTerm}
                        onFilterChange={handleFilterChange}
                        filterKategori={filterKategori}
                        categories={categories} 
                    />
                </div>
                <ProductTable 
                    data={currentData} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    startIndex={startIndex}
                />
                
                {filteredData.length > 0 ? (
                    <div className="p-4">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            itemsPerPage={ITEMS_PER_PAGE}
                            totalItems={filteredData.length}
                            showInfo={true}
                            showPreviousNext={true}
                            maxVisiblePages={5}
                        />
                    </div>
                ) : (
                    <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                        No data found
                    </div>
                )}
            </div>
            
            {/* Overlay */}
            {isAnyDrawerOpen && (
                <div 
                    className="fixed inset-0 z-30 transition-opacity bg-gray-900 bg-opacity-50"
                    onClick={handleCloseDrawers}
                />
            )}

            {/* Drawers */}
            <AddProductDrawer 
                isOpen={isAddDrawerOpen} 
                onClose={handleCloseDrawers}
                categories={categories}
            />
            <EditProductDrawer 
                product={selectedProduct} 
                isOpen={isEditDrawerOpen}
                onClose={handleCloseDrawers}
                categories={categories}
            />
            <DeleteProductDrawer 
                product={selectedProduct} 
                isOpen={isDeleteDrawerOpen}
                onClose={handleCloseDrawers}
            />
        </div>
    );
};

MainContent.propTypes = {
    title: PropTypes.string
};

export default MainContent; 