import PropTypes from 'prop-types';

const formatTanggal = (tanggal) => {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    return new Date(tanggal).toLocaleDateString('id-ID', options);
};

const DetailTransaksiDrawer = ({ transaksi, isOpen, onClose }) => {
    return (
        <div
            id="drawer-detail-transaksi"
            className={`fixed top-0 right-0 z-40 w-full h-screen max-w-md p-6 overflow-y-auto transition-transform ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
            } bg-white dark:bg-gray-800 shadow-lg`}
            tabIndex="-1"
            aria-labelledby="drawer-label"
            aria-hidden={!isOpen}
        >
            <div className="flex items-center justify-between mb-6">
                <h5 id="drawer-label" className="text-lg font-semibold text-gray-900 dark:text-white">
                    Detail Transaksi
                </h5>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </button>
            </div>

            {transaksi ? (
                <div>
                    <div className="mb-6">
                        <h6 className="text-lg font-semibold text-gray-900 dark:text-white">Informasi Transaksi</h6>
                        <div className="mt-2 space-y-2">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                            <strong>Tanggal:</strong> {formatTanggal(transaksi.tanggal)}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Total Harga:</strong>{' '}
                                {transaksi.total_harga.toLocaleString('id-ID', {
                                    style: 'currency',
                                    currency: 'IDR',
                                })}
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                <strong>Metode Pembayaran:</strong> {transaksi.metode_pembayaran}
                            </p>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h6 className="text-lg font-semibold text-gray-900 dark:text-white">Detail Transaksi</h6>
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-2">
                                        Kode Barang
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Jumlah
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Harga Satuan
                                    </th>
                                    <th scope="col" className="px-4 py-2">
                                        Subtotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaksi.detail_transaksi.map((detail, index) => (
                                    <tr
                                        key={index}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                    >
                                        <td className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                                            {detail.kode_barang}
                                        </td>
                                        <td className="px-4 py-2">{detail.jumlah}</td>
                                        <td className="px-4 py-2">
                                            {detail.harga_satuan.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            })}
                                        </td>
                                        <td className="px-4 py-2">
                                            {detail.subtotal.toLocaleString('id-ID', {
                                                style: 'currency',
                                                currency: 'IDR',
                                            })}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
                        >
                            Kembali
                        </button>
                    </div>
                </div>
            ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">Tidak ada data transaksi yang dipilih.</p>
            )}
        </div>
    );
};

DetailTransaksiDrawer.propTypes = {
    transaksi: PropTypes.shape({
        tanggal: PropTypes.string.isRequired,
        total_harga: PropTypes.number.isRequired,
        metode_pembayaran: PropTypes.string.isRequired,
        detail_transaksi: PropTypes.arrayOf(
            PropTypes.shape({
                kode_barang: PropTypes.string.isRequired,
                jumlah: PropTypes.number.isRequired,
                harga_satuan: PropTypes.number.isRequired,
                subtotal: PropTypes.number.isRequired,
            })
        ).isRequired,
    }),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default DetailTransaksiDrawer;