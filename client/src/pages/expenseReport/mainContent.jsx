import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import PengeluaranDataService from '../../services/pengeluaran.service';
import FilterArea from './components/FilterArea';
import ExpenseTable from './components/ExpenseTable';
import AddExpenseDrawer from './components/AddExpenseDrawer';
import EditExpenseDrawer from './components/EditExpenseDrawer';

const MainContent = () => {
    const [data, setData] = useState([]); // Data pengeluaran
    const [filteredData, setFilteredData] = useState([]); // Data yang difilter
    const [searchTerm, setSearchTerm] = useState(''); // Kata kunci pencarian
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false); // Drawer tambah pengeluaran
    const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false); // Drawer edit pengeluaran
    const [selectedExpense, setSelectedExpense] = useState(null); // Pengeluaran yang dipilih untuk edit

    // Fetch data pengeluaran dari server
    const fetchData = async () => {
        try {
            const response = await PengeluaranDataService.getAll();
            console.log('Data pengeluaran:', response.data);
            setData(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Gagal mengambil data pengeluaran:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat mengambil data pengeluaran.',
            });
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fungsi untuk membuka drawer tambah pengeluaran
    const handleAdd = () => {
        setIsAddDrawerOpen(true);
    };

    // Fungsi untuk membuka drawer edit pengeluaran
    const handleEdit = (pengeluaran) => {
        setSelectedExpense(pengeluaran);
        setIsEditDrawerOpen(true);
    };

    // Fungsi untuk menghapus pengeluaran
    const handleDelete = async (pengeluaran) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Pengeluaran dengan keterangan "${pengeluaran.keterangan}" akan dihapus secara permanen!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await PengeluaranDataService.delete(pengeluaran.id_pengeluaran);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Pengeluaran berhasil dihapus.',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    fetchData(); // Refresh data setelah penghapusan
                } catch (error) {
                    console.error('Gagal menghapus pengeluaran:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: error.response?.data?.message || 'Terjadi kesalahan saat menghapus pengeluaran.',
                    });
                }
            }
        });
    };

    // Fungsi untuk menangani pencarian
    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                item.keterangan.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    // Fungsi untuk menutup drawer tambah/edit
    const handleCloseDrawer = () => {
        setIsAddDrawerOpen(false);
        setIsEditDrawerOpen(false);
        setSelectedExpense(null);
    };

    // Fungsi untuk refresh data setelah operasi CRUD
    const handleSuccess = () => {
        fetchData();
        handleCloseDrawer();
    };

    return (
        <div className="p-4">
            <FilterArea
                onAdd={handleAdd}
                onSearch={handleSearch}
                searchTerm={searchTerm}
            />
            <ExpenseTable
                data={filteredData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AddExpenseDrawer
                isOpen={isAddDrawerOpen}
                onClose={handleCloseDrawer}
                onSuccess={handleSuccess}
            />
            <EditExpenseDrawer
                pengeluaran={selectedExpense}
                isOpen={isEditDrawerOpen}
                onClose={handleCloseDrawer}
                onSuccess={handleSuccess}
            />
        </div>
    );
};

export default MainContent;