import { useState } from 'react';
import FilterArea from './components/FilterArea';
import KategoriTable from './components/KategoriTable';
import AddKategoriDrawer from './components/AddKategoriDrawer';
import EditKategoriDrawer from './components/EditKategoriDrawer';
import DeleteKategoriDrawer from './components/DeleteKategoriDrawer';
import Pagination from '../../components/Pagination';
import PropTypes from 'prop-types';

const ITEMS_PER_PAGE = 5;

const MainContent = () => {
    const data = [
        {id: 1, name: 'Kategori 1'}, 
        {id: 2, name: 'Kategori 2'}, 
        {id: 3, name: 'Kategori 3'},
        {id: 4, name: 'Kategori 4'},
        {id: 5, name: 'Kategori 5'},
        {id: 6, name: 'Kategori 6'},
        {id: 7, name: 'Kategori 7'},
        {id: 8, name: 'Kategori 8'},
        {id: 9, name: 'Kategori 9'},
        {id: 10, name: 'Kategori 10'}
    ];

    const [selectedKategori, setSelectedKategori] = useState(null);
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
    const [isDeleteDrawerOpen, setIsDeleteDrawerOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    // Filter data based on search term
    const filteredData = searchTerm 
        ? data.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : data;

    const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentData = filteredData.slice(startIndex, endIndex);

    const handleEdit = (kategori) => {
        setSelectedKategori(kategori);
        setIsEditDrawerOpen(true);
    };

    const handleDelete = (kategori) => {
        setSelectedKategori(kategori);
        setIsDeleteDrawerOpen(true);
    };

    const handleAdd = () => {
        setIsAddDrawerOpen(true);
    };

    const handleCloseDrawers = () => {
        setIsAddDrawerOpen(false);
        setIsEditDrawerOpen(false);
        setIsDeleteDrawerOpen(false);
        setSelectedKategori(null);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleSearch = (term) => {
        setSearchTerm(term);
        setCurrentPage(1); // Reset to first page when searching
    };

    const isAnyDrawerOpen = isAddDrawerOpen || isEditDrawerOpen || isDeleteDrawerOpen;

    return (
        <div className="p-4 md:p-10">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
                <div className="p-4">
                    <FilterArea 
                        onAdd={handleAdd} 
                        onSearch={handleSearch}
                        searchTerm={searchTerm} 
                    />
                </div>
                <KategoriTable 
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
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity z-30"
                    onClick={handleCloseDrawers}
                />
            )}

            {/* Drawers */}
            <AddKategoriDrawer 
                isOpen={isAddDrawerOpen} 
                onClose={handleCloseDrawers}
            />
            <EditKategoriDrawer 
                kategori={selectedKategori} 
                isOpen={isEditDrawerOpen}
                onClose={handleCloseDrawers}
            />
            <DeleteKategoriDrawer 
                kategori={selectedKategori} 
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