import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import TransaksiDataService from '../../services/transaksi.service';
import AdvancedThermalPrintService from '../../services/advancedPrintService';
import FilterArea from './components/FilterArea';
import TransaksiTable from './components/TransaksiTable';
import AddTransaksiDrawer from './components/AddTransaksiDrawer';
import DetailTransaksiDrawer from './components/DetailTransaksiDrawer';

const MainContentTransaksi = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAddDrawerOpen, setIsAddDrawerOpen] = useState(false);
    const [isDetailDrawerOpen, setIsDetailDrawerOpen] = useState(false);
    const [selectedTransaksi, setSelectedTransaksi] = useState(null);
    
    // Inisialisasi service printer
    const printService = new AdvancedThermalPrintService();

    // Fetch data transaksi dari server
    const fetchData = async () => {
        try {
            const response = await TransaksiDataService.getAll();
            console.log('Data transaksi:', response.data);
            setData(response.data.data);
            setFilteredData(response.data.data);
        } catch (error) {
            console.error('Gagal mengambil data transaksi:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal!',
                text: 'Terjadi kesalahan saat mengambil data transaksi.',
            });
        }
    };

    // Fungsi untuk mencetak struk
    const handlePrint = async (transaksi) => {
        try {
            // Tampilkan loading
            Swal.fire({
                title: 'Mempersiapkan cetak...',
                allowOutsideClick: false,
                showConfirmButton: false,
                willOpen: () => {
                    Swal.showLoading();
                }
            });

            // Ambil detail transaksi lengkap
            const response = await TransaksiDataService.getById(transaksi.id_transaksi);
            const transaksiLengkap = response.data.data;

            // Tutup loading
            Swal.close();

            // Tampilkan pilihan cetak atau preview
            const result = await Swal.fire({
                title: 'Pilih Mode Cetak',
                text: 'Pilih cara mencetak struk belanja',
                icon: 'question',
                showCancelButton: true,
                showDenyButton: true,
                confirmButtonText: '🖨️ Printer Default',
                denyButtonText: '👁️ Preview Dulu',
                cancelButtonText: '❌ Batal',
                confirmButtonColor: '#28a745',
                denyButtonColor: '#17a2b8',
                cancelButtonColor: '#6c757d',
                html: `
                    <div style="text-align: left; margin: 15px 0;">
                        <p><strong>🖨️ Printer Default:</strong> Cetak langsung ke printer thermal yang terpasang</p>
                        <p><strong>👁️ Preview Dulu:</strong> Lihat tampilan struk sebelum mencetak</p>
                    </div>
                `
            });

            if (result.isConfirmed) {
                // Cetak langsung ke printer thermal
                await printService.printReceipt(transaksiLengkap, 'browser');
                
                Swal.fire({
                    icon: 'success',
                    title: 'Berhasil!',
                    text: 'Struk berhasil dicetak ke printer thermal.',
                    timer: 2000,
                    showConfirmButton: false,
                });
            } else if (result.isDenied) {
                // Preview struk
                printService.previewReceipt(transaksiLengkap);
            }

        } catch (error) {
            console.error('Error saat mencetak:', error);
            Swal.fire({
                icon: 'error',
                title: 'Gagal Cetak!',
                text: 'Terjadi kesalahan saat mencetak struk. Pastikan printer terhubung.',
            });
        }
    };

    const handleDelete = async (transaksi) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: `Transaksi dengan ID ${transaksi.id_transaksi} akan dihapus secara permanen!`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await TransaksiDataService.delete(transaksi.id_transaksi);
                    Swal.fire({
                        icon: 'success',
                        title: 'Berhasil!',
                        text: 'Transaksi berhasil dihapus.',
                        timer: 2000,
                        showConfirmButton: false,
                    });
                    fetchData();
                } catch (error) {
                    console.error('Gagal menghapus transaksi:', error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Gagal!',
                        text: 'Terjadi kesalahan saat menghapus transaksi.',
                    });
                }
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Fungsi untuk membuka drawer tambah transaksi
    const handleAdd = () => {
        setIsAddDrawerOpen(true);
    };

    // Fungsi untuk membuka drawer detail transaksi
    const handleDetail = (transaksi) => {
        setSelectedTransaksi(transaksi);
        setIsDetailDrawerOpen(true);
    };

    // Fungsi untuk menangani pencarian
    const handleSearch = (term) => {
        setSearchTerm(term);
        if (term.trim() === '') {
            setFilteredData(data);
        } else {
            const filtered = data.filter((item) =>
                item.metode_pembayaran.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    // Fungsi untuk menutup drawer tambah/detail
    const handleCloseDrawer = () => {
        setIsAddDrawerOpen(false);
        setIsDetailDrawerOpen(false);
        setSelectedTransaksi(null);
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
            <TransaksiTable
                data={filteredData}
                onDetail={handleDetail}
                onDelete={handleDelete}
                onPrint={handlePrint}
                startIndex={0}
            />
            <AddTransaksiDrawer
                isOpen={isAddDrawerOpen}
                onClose={handleCloseDrawer}
                onSuccess={handleSuccess}
            />
            <DetailTransaksiDrawer
                transaksi={selectedTransaksi}
                isOpen={isDetailDrawerOpen}
                onClose={handleCloseDrawer}
            />
        </div>
    );
};

export default MainContentTransaksi;