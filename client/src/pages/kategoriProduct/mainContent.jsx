import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import KategoriProdukDataService from '../../services/kategoriProduk.service';
import FilterArea from './components/FilterArea';
import KategoriTable from './components/KategoriTable';
import AddKategoriDrawer from './components/AddKategoriDrawer';
import EditKategoriDrawer from './components/EditKategoriDrawer';
import Pagination from '../../components/Pagination';
import PropTypes from 'prop-types';

const MainContent = () => {
    const [data, setData] = useState([]);    
    const [selectedKategori, setSelectedKategori] = useState(null);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [itemsPerPage, setItemsPerPage] = useState(10);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await KategoriProdukDataService.getAll();
            setData(response.data.data);
        } catch (error) {
            alert(error.response?.data?.message || "Gagal mengambil data kategori");
            console.error('Error fetching data:', error);
        }
    };

    const filteredData = searchTerm 
        ? data.filter(item => item.nama_kategori.toLowerCase().includes(searchTerm.toLowerCase()))
        : data;

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = filteredData.slice(startIndex, endIndex);
        
    const handleEdit = (kategori) => {
        setSelectedKategori(kategori);
        setIsEditDrawerOpen(true);
    };

    const handleDelete = async (kategori) => {
        setSelectedKategori(kategori);
        
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Kategori "${kategori.nama_kategori}" akan dihapus secara permanen!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await KategoriProdukDataService.delete(kategori.id_kategori);
                    fetchData();
                    Swal.fire('Dihapus!', 'Kategori telah berhasil dihapus.', 'success');
                } catch (error) {
                    Swal.fire('Error!', error.response?.data?.message || 'Terjadi kesalahan saat menghapus kategori.', 'error');
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
        setSelectedKategori(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1);
    };

    const handleItemsPerPageChange = (value) => {
        setItemsPerPage(value);
        setCurrentPage(1); 
    };

    return (
        <div className="flex-1 p-1 md:p-3">
            <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <div className="p-2 sm:p-3">
                    <FilterArea 
                        onAdd={handleAdd} 
                        onSearch={handleSearch}
                        searchTerm={searchTerm} 
                        onItemsPerPageChange={handleItemsPerPageChange}
                        itemsPerPage={itemsPerPage}
                    />
                </div>
                <KategoriTable 
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
            
            <AddKategoriDrawer 
                isOpen={isAddDrawerOpen} 
                onClose={handleCloseDrawers}
                onSuccess={fetchData}
            />
            <EditKategoriDrawer 
                kategori={selectedKategori} 
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