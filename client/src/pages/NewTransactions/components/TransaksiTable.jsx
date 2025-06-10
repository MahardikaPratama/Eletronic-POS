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

const TransaksiTable = ({ data, onDetail, onDelete, onPrint, startIndex = 0 }) => {
    return (
        <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            No
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Tanggal
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Total Harga
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Metode Pembayaran
                        </th>
                        <th scope="col" className="px-6 py-3 text-center">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((transaksi, index) => (
                            <tr
                                key={transaksi.id_transaksi}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4">
                                    {startIndex + index + 1}
                                </td>
                                <td className="px-6 py-4 text-gray-900 dark:text-white">
                                    {formatTanggal(transaksi.tanggal)}
                                </td>
                                <td className="px-6 py-4">
                                    {transaksi.total_harga.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    })}
                                </td>
                                <td className="px-6 py-4">
                                    {transaksi.metode_pembayaran}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-3">
                                        {/* Tombol untuk mencetak transaksi */}
                                        <button
                                            onClick={() => onPrint(transaksi)}
                                            className="p-2 text-green-600 bg-green-100 rounded-lg hover:bg-green-200 dark:text-green-500 dark:bg-green-900 dark:hover:bg-green-800"
                                            title="Print"
                                        >
                                            <i className="fas fa-print"></i> {/* Ikon Font Awesome */}
                                        </button>

                                        {/* Tombol untuk melihat detail transaksi */}
                                        <button
                                            onClick={() => onDetail(transaksi)}
                                            className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:text-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800"
                                            title="Detail"
                                        >
                                            <i className="fas fa-eye"></i> {/* Ikon Font Awesome */}
                                        </button>

                                        {/* Tombol untuk menghapus transaksi */}
                                        <button
                                            onClick={() => onDelete(transaksi)}
                                            className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:text-red-500 dark:bg-red-900 dark:hover:bg-red-800"
                                            title="Delete"
                                        >
                                            <i className="fas fa-trash"></i> {/* Ikon Font Awesome */}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr className="bg-white dark:bg-gray-800">
                            <td
                                colSpan="5"
                                className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                            >
                                No records found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

TransaksiTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id_transaksi: PropTypes.number.isRequired,
            tanggal: PropTypes.string.isRequired,
            total_harga: PropTypes.number.isRequired,
            metode_pembayaran: PropTypes.string.isRequired,
        })
    ).isRequired,
    onDetail: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    startIndex: PropTypes.number,
};

export default TransaksiTable;