// services/advancedPrintService.js
class AdvancedThermalPrintService {
    constructor() {
        this.pageWidth = 48; // Lebar kertas thermal 58mm
        this.companyInfo = {
            name: "TOKO SAYA",
            address: "Jl. Contoh No. 123",
            city: "Bandung, Jawa Barat",
            phone: "Telp: 022-1234567"
        };
        
        // ESC/POS Commands
        this.ESC = '\x1B';
        this.commands = {
            INIT: this.ESC + '@',           // Initialize printer
            ALIGN_CENTER: this.ESC + 'a1',  // Center alignment
            ALIGN_LEFT: this.ESC + 'a0',    // Left alignment
            ALIGN_RIGHT: this.ESC + 'a2',   // Right alignment
            BOLD_ON: this.ESC + 'E1',       // Bold text on
            BOLD_OFF: this.ESC + 'E0',      // Bold text off
            DOUBLE_HEIGHT: this.ESC + '!1', // Double height
            NORMAL_SIZE: this.ESC + '!0',   // Normal size
            CUT_PAPER: '\x1D' + 'V1',       // Cut paper
            LINE_FEED: '\n',                // Line feed
            UNDERLINE_ON: this.ESC + '-1',  // Underline on
            UNDERLINE_OFF: this.ESC + '-0', // Underline off
        };
    }

    // Fungsi untuk membuat garis pemisah
    createSeparatorLine(char = '-') {
        return char.repeat(this.pageWidth);
    }

    // Fungsi untuk memusatkan teks
    centerText(text) {
        const padding = Math.max(0, Math.floor((this.pageWidth - text.length) / 2));
        return ' '.repeat(padding) + text;
    }

    // Fungsi untuk membuat baris dengan alignment kiri-kanan
    createLeftRightLine(left, right) {
        const totalLength = left.length + right.length;
        const spaces = Math.max(1, this.pageWidth - totalLength);
        return left + ' '.repeat(spaces) + right;
    }

    // Format tanggal Indonesia
    formatTanggalIndonesia(tanggal) {
        const options = {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        return new Date(tanggal).toLocaleDateString('id-ID', options);
    }

    // Format mata uang Rupiah
    formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Fungsi untuk memotong teks jika terlalu panjang
    truncateText(text, maxLength) {
        return text.length > maxLength ? text.substring(0, maxLength - 3) + '...' : text;
    }

    // Generate struk belanja dengan ESC/POS commands
    generateESCPOSReceipt(transaksi) {
        let receipt = '';
        
        // Initialize printer
        receipt += this.commands.INIT;
        
        // Header toko dengan format
        receipt += this.commands.ALIGN_CENTER;
        receipt += this.commands.BOLD_ON;
        receipt += this.commands.DOUBLE_HEIGHT;
        receipt += this.companyInfo.name + this.commands.LINE_FEED;
        receipt += this.commands.NORMAL_SIZE;
        receipt += this.commands.BOLD_OFF;
        receipt += this.companyInfo.address + this.commands.LINE_FEED;
        receipt += this.companyInfo.city + this.commands.LINE_FEED;
        receipt += this.companyInfo.phone + this.commands.LINE_FEED;
        
        // Garis pemisah
        receipt += this.commands.ALIGN_LEFT;
        receipt += this.createSeparatorLine('=') + this.commands.LINE_FEED;
        
        // Info transaksi
        receipt += this.createLeftRightLine('No. Transaksi:', transaksi.id_transaksi.toString()) + this.commands.LINE_FEED;
        receipt += this.createLeftRightLine('Tanggal:', this.formatTanggalIndonesia(transaksi.tanggal)) + this.commands.LINE_FEED;
        receipt += this.createLeftRightLine('Kasir:', 'Admin') + this.commands.LINE_FEED;
        receipt += this.createSeparatorLine('-') + this.commands.LINE_FEED;
        
        // Header item
        receipt += this.commands.BOLD_ON;
        receipt += 'DAFTAR ITEM' + this.commands.LINE_FEED;
        receipt += this.commands.BOLD_OFF;
        receipt += this.createSeparatorLine('-') + this.commands.LINE_FEED;
        
        // Daftar item
        let totalQty = 0;
        
        if (transaksi.detail_transaksi && transaksi.detail_transaksi.length > 0) {
            transaksi.detail_transaksi.forEach(detail => {
                const namaBarang = this.truncateText(detail.produk.nama_barang, this.pageWidth - 2);
                const qty = detail.jumlah;
                const harga = this.formatRupiah(detail.harga_satuan);
                const subtotal = this.formatRupiah(detail.subtotal);
                
                // Nama barang
                receipt += namaBarang + this.commands.LINE_FEED;
                
                // Qty x Harga = Subtotal
                const qtyHarga = `${qty} x ${harga}`;
                receipt += this.createLeftRightLine(qtyHarga, subtotal) + this.commands.LINE_FEED;
                
                totalQty += qty;
            });
        }
        
        receipt += this.createSeparatorLine('-') + this.commands.LINE_FEED;
        
        // Total
        receipt += this.createLeftRightLine(`Total Item: ${totalQty}`, '') + this.commands.LINE_FEED;
        receipt += this.commands.BOLD_ON;
        receipt += this.commands.DOUBLE_HEIGHT;
        receipt += this.createLeftRightLine('TOTAL:', this.formatRupiah(transaksi.total_harga)) + this.commands.LINE_FEED;
        receipt += this.commands.NORMAL_SIZE;
        receipt += this.commands.BOLD_OFF;
        receipt += this.createLeftRightLine('Pembayaran:', transaksi.metode_pembayaran) + this.commands.LINE_FEED;
        
        // Footer
        receipt += this.createSeparatorLine('=') + this.commands.LINE_FEED;
        receipt += this.commands.ALIGN_CENTER;
        receipt += this.commands.BOLD_ON;
        receipt += 'TERIMA KASIH' + this.commands.LINE_FEED;
        receipt += 'ATAS KUNJUNGAN ANDA' + this.commands.LINE_FEED;
        receipt += this.commands.BOLD_OFF;
        receipt += 'BARANG YANG SUDAH DIBELI' + this.commands.LINE_FEED;
        receipt += 'TIDAK DAPAT DIKEMBALIKAN' + this.commands.LINE_FEED;
        receipt += this.createSeparatorLine('=') + this.commands.LINE_FEED;
        
        // Cut paper
        receipt += this.commands.CUT_PAPER;
        
        return receipt;
    }

    // Generate regular text receipt (fallback)
    generateTextReceipt(transaksi) {
        let receipt = '';
        
        // Header toko
        receipt += this.centerText(this.companyInfo.name) + '\n';
        receipt += this.centerText(this.companyInfo.address) + '\n';
        receipt += this.centerText(this.companyInfo.city) + '\n';
        receipt += this.centerText(this.companyInfo.phone) + '\n';
        receipt += this.createSeparatorLine('=') + '\n';
        
        // Info transaksi
        receipt += this.createLeftRightLine('No. Transaksi:', transaksi.id_transaksi.toString()) + '\n';
        receipt += this.createLeftRightLine('Tanggal:', this.formatTanggalIndonesia(transaksi.tanggal)) + '\n';
        receipt += this.createLeftRightLine('Kasir:', 'Admin') + '\n';
        receipt += this.createSeparatorLine('-') + '\n';
        
        // Header item
        receipt += 'DAFTAR ITEM\n';
        receipt += this.createSeparatorLine('-') + '\n';
        
        // Daftar item
        let totalQty = 0;
        
        if (transaksi.detail_transaksi && transaksi.detail_transaksi.length > 0) {
            transaksi.detail_transaksi.forEach(detail => {
                const namaBarang = this.truncateText(detail.produk.nama_barang, this.pageWidth - 2);
                const qty = detail.jumlah;
                const harga = this.formatRupiah(detail.harga_satuan);
                const subtotal = this.formatRupiah(detail.subtotal);
                
                // Nama barang
                receipt += namaBarang + '\n';
                
                // Qty x Harga = Subtotal
                const qtyHarga = `${qty} x ${harga}`;
                receipt += this.createLeftRightLine(qtyHarga, subtotal) + '\n';
                
                totalQty += qty;
            });
        }
        
        receipt += this.createSeparatorLine('-') + '\n';
        
        // Total
        receipt += this.createLeftRightLine(`Total Item: ${totalQty}`, '') + '\n';
        receipt += this.createLeftRightLine('TOTAL:', this.formatRupiah(transaksi.total_harga)) + '\n';
        receipt += this.createLeftRightLine('Pembayaran:', transaksi.metode_pembayaran) + '\n';
        
        // Footer
        receipt += this.createSeparatorLine('=') + '\n';
        receipt += this.centerText('TERIMA KASIH') + '\n';
        receipt += this.centerText('ATAS KUNJUNGAN ANDA') + '\n';
        receipt += this.centerText('BARANG YANG SUDAH DIBELI') + '\n';
        receipt += this.centerText('TIDAK DAPAT DIKEMBALIKAN') + '\n';
        receipt += this.createSeparatorLine('=') + '\n';
        
        return receipt;
    }

    // Fungsi untuk mencetak menggunakan Web Serial API (untuk printer USB)
    async printViaSerial(transaksi) {
        if ('serial' in navigator) {
            try {
                const port = await navigator.serial.requestPort();
                await port.open({ baudRate: 9600 });
                
                const writer = port.writable.getWriter();
                const receiptData = this.generateESCPOSReceipt(transaksi);
                
                await writer.write(new TextEncoder().encode(receiptData));
                writer.releaseLock();
                await port.close();
                
                return true;
            } catch (error) {
                console.error('Error printing via serial:', error);
                throw error;
            }
        } else {
            throw new Error('Web Serial API tidak didukung di browser ini');
        }
    }

    // Fungsi untuk mencetak ke printer default (browser print dialog)
    async printViaBrowser(transaksi) {
        try {
            const receiptText = this.generateTextReceipt(transaksi);
            
            const printWindow = window.open('', '_blank');
            printWindow.document.write(`
                <!DOCTYPE html>
                <html>
                <head>
                    <title>Struk Belanja - #${transaksi.id_transaksi}</title>
                    <style>
                        @page {
                            size: 58mm auto;
                            margin: 0;
                        }
                        body {
                            font-family: 'Courier New', monospace;
                            font-size: 11px;
                            line-height: 1.3;
                            margin: 0;
                            padding: 2mm;
                            white-space: pre-wrap;
                            word-wrap: break-word;
                            color: #000;
                            background: #fff;
                        }
                        @media print {
                            body {
                                font-size: 9px;
                                line-height: 1.2;
                            }
                            .no-print {
                                display: none;
                            }
                        }
                        .print-button {
                            position: fixed;
                            top: 10px;
                            right: 10px;
                            background: #007bff;
                            color: white;
                            border: none;
                            padding: 10px 15px;
                            border-radius: 4px;
                            cursor: pointer;
                            font-size: 14px;
                        }
                        .print-button:hover {
                            background: #0056b3;
                        }
                    </style>
                </head>
                <body>
                    <button class="print-button no-print" onclick="window.print()">
                        🖨️ Cetak Struk
                    </button>
                    <div id="receipt">${receiptText}</div>
                </body>
                </html>
            `);
            
            printWindow.document.close();
            
            // Auto print setelah 1 detik
            setTimeout(() => {
                printWindow.focus();
                printWindow.print();
            }, 1000);
            
            return true;
        } catch (error) {
            console.error('Error printing via browser:', error);
            throw error;
        }
    }

    // Main print function dengan fallback
    async printReceipt(transaksi, method = 'browser') {
        try {
            if (method === 'serial') {
                return await this.printViaSerial(transaksi);
            } else {
                return await this.printViaBrowser(transaksi);
            }
        } catch (error) {
            console.error('Print error:', error);
            // Fallback ke browser print jika serial gagal
            if (method === 'serial') {
                console.log('Fallback ke browser print...');
                return await this.printViaBrowser(transaksi);
            }
            throw error;
        }
    }

    // Preview receipt
    previewReceipt(transaksi) {
        const receiptText = this.generateTextReceipt(transaksi);
        
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Preview Struk - #${transaksi.id_transaksi}</title>
                <style>
                    body {
                        font-family: 'Courier New', monospace;
                        font-size: 14px;
                        line-height: 1.4;
                        margin: 20px;
                        background-color: #f5f5f5;
                    }
                    .receipt-container {
                        background-color: white;
                        padding: 20px;
                        max-width: 320px;
                        margin: 0 auto;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    }
                    .receipt {
                        white-space: pre-wrap;
                        word-wrap: break-word;
                        font-size: 12px;
                    }
                    .button-group {
                        text-align: center;
                        margin: 20px 0;
                    }
                    .btn {
                        display: inline-block;
                        margin: 0 5px;
                        padding: 10px 20px;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        font-size: 14px;
                        text-decoration: none;
                    }
                    .btn-primary {
                        background-color: #007bff;
                        color: white;
                    }
                    .btn-secondary {
                        background-color: #6c757d;
                        color: white;
                    }
                    .btn:hover {
                        opacity: 0.8;
                    }
                </style>
            </head>
            <body>
                <div class="button-group">
                    <button class="btn btn-primary" onclick="window.print()">
                        🖨️ Cetak Struk
                    </button>
                    <button class="btn btn-secondary" onclick="window.close()">
                        ❌ Tutup
                    </button>
                </div>
                <div class="receipt-container">
                    <div class="receipt">${receiptText}</div>
                </div>
            </body>
            </html>
        `);
        
        previewWindow.document.close();
    }
}

export default AdvancedThermalPrintService;