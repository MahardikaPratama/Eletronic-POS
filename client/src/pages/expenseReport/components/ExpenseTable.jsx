import PropTypes from 'prop-types';

const ExpenseTable = ({ data, onEdit, onDelete, startIndex = 0 }) => {
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
                            Keterangan
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Jumlah
                        </th>
                        <th scope="col" className="px-6 py-3 text-right">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((pengeluaran, index) => (
                            <tr
                                key={pengeluaran.id_pengeluaran}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <td className="px-6 py-4">
                                    {startIndex + index + 1}
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                                    {pengeluaran.tanggal}
                                </td>
                                <td className="px-6 py-4">
                                    {pengeluaran.keterangan}
                                </td>
                                <td className="px-6 py-4">
                                    {pengeluaran.jumlah.toLocaleString('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR',
                                    })}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end space-x-3">
                                        <button
                                            onClick={() => onEdit(pengeluaran)}
                                            className="p-2 text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 dark:text-blue-500 dark:bg-blue-900 dark:hover:bg-blue-800"
                                            title="Edit"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                                ></path>
                                            </svg>
                                        </button>
                                        <button
                                            onClick={() => onDelete(pengeluaran)}
                                            className="p-2 text-red-600 bg-red-100 rounded-lg hover:bg-red-200 dark:text-red-500 dark:bg-red-900 dark:hover:bg-red-800"
                                            title="Delete"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                ></path>
                                            </svg>
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

ExpenseTable.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            tanggal: PropTypes.string.isRequired,
            keterangan: PropTypes.string.isRequired,
            jumlah: PropTypes.number.isRequired,
        })
    ).isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    startIndex: PropTypes.number,
};

export default ExpenseTable;