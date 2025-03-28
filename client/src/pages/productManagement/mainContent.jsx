import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import Produk from '../../services/produk.service';
import FilterArea from './components/FilterArea';
import ProductTable from './components/ProductTable';
import AddProductDrawer from './components/AddProductDrawer';
import EditProductDrawer from './components/EditProductDrawer';
import Pagination from '../../components/Pagination';
import PropTypes from 'prop-types';


const MainContent = () => {
    const [data, setData] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [filterKategori, setFilterKategori] = useState('');


    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await Produk.getAll();
            setData(response.data.data);
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengambil data produk");
            console.error('Error fetching data:', error);
        }
    };

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

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handleEdit = (product) => {
        setSelectedProduct(product);
        setIsEditDrawerOpen(true);
    };

    const handleDelete = async (product) => {
        setSelectedProduct(product);

        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Produk "${product.nama_barang}" akan dihapus secara permanen!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await Produk.delete(product.id_barang);
                    fetchData();
                    Swal.fire('Dihapus!', 'Produk telah berhasil dihapus.', 'success');
                } catch (error) {
                    Swal.fire('Error!', error.response?.data?.message || 'Terjadi kesalahan saat menghapus produk.', 'error');
                }
            }
        });
    };

    const handleAdd = () => {
        setIsAddDrawerOpen(true);
    };

    const handleCloseDrawers = () => {
        setIsAddDrawerOpen(false);
        setIsEditDrawerOpen(false);
        setSelectedProduct(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    const handleFilterChange = (kategoriId) => {
        setFilterKategori(kategoriId);
        setCurrentPage(1); // Reset to first page when filtering
    };


    const isAnyDrawerOpen = isAddDrawerOpen || isEditDrawerOpen;

    return (
        <div className="flex-1 p-1 md:p-3">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div className="p-2 sm:p-3">
                    <FilterArea 
                        onAdd={handleAdd} 
                        onSearch={handleSearch}
                        searchTerm={searchTerm}
                        onFilterChange={handleFilterChange}
                        onItemsPerPageChange={handleItemsPerPageChange}
                        filterKategori={filterKategori}
                    />
                </div>
                <ProductTable 
                    data={currentData} 
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    startIndex={startIndex}
                />
                
                {filteredData.length > 0 && (
                    <div className="p-4">
                        <Pagination 
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            itemsPerPage={itemsPerPage}
                            totalItems={filteredData.length}
                            showInfo={true}
                            showPreviousNext={true}
                            maxVisiblePages={5}
                        />
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
            
            <AddProductDrawer 
                isOpen={isAddDrawerOpen} 
                onClose={handleCloseDrawers}
                onSuccess={fetchData}
            />
            <EditProductDrawer 
                product={selectedProduct} 
                isOpen={isEditDrawerOpen}
                onClose={handleCloseDrawers}
                onSuccess={fetchData}
            />
        </div>
    );
};

MainContent.propTypes = {
    title: PropTypes.string
};

export default MainContent; 