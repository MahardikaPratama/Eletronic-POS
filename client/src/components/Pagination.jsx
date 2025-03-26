import PropTypes from 'prop-types';

const Pagination = ({ 
    currentPage, 
    totalPages, 
    onPageChange, 
    itemsPerPage, 
    totalItems, 
    showInfo = true,
    showPreviousNext = true,
    maxVisiblePages = 5,
    className = ''
}) => {
    // Calculate the range of visible page numbers
    const getVisiblePageNumbers = () => {
        const pages = [];
        
        // Calculate start and end pages to show
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = startPage + maxVisiblePages - 1;
        
        if (endPage > totalPages) {
            endPage = totalPages;
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }
        
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        
        return pages;
    };

    // Calculate showing items text
    const getShowingText = () => {
        const start = (currentPage - 1) * itemsPerPage + 1;
        const end = Math.min(currentPage * itemsPerPage, totalItems);
        return `Showing ${start}-${end} of ${totalItems} items`;
    };

    // Handle previous page click
    const handlePrevious = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    // Handle next page click
    const handleNext = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    // Handle first page click
    const handleFirst = () => {
        if (currentPage !== 1) {
            onPageChange(1);
        }
    };

    // Handle last page click
    const handleLast = () => {
        if (currentPage !== totalPages) {
            onPageChange(totalPages);
        }
    };

    const pages = getVisiblePageNumbers();

    return (
        <div className={`flex flex-col md:flex-row justify-between items-center mt-4 ${className}`}>
            {showInfo && totalItems > 0 && (
                <div className="mb-4 md:mb-0 text-sm text-gray-700 dark:text-gray-400">
                    {getShowingText()}
                </div>
            )}

            <div className="inline-flex -space-x-px text-sm h-8">
                {/* First Page */}
                {totalPages > maxVisiblePages && (
                    <button
                        onClick={handleFirst}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                        } bg-white border border-gray-300 rounded-l-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                    >
                        <span className="sr-only">First</span>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                )}

                {/* Previous Page */}
                {showPreviousNext && (
                    <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            currentPage === 1
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                        } bg-white border border-gray-300 ${!totalPages > maxVisiblePages ? 'rounded-l-lg' : ''} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4"/>
                        </svg>
                    </button>
                )}

                {/* Page Numbers */}
                {pages.map(page => (
                    <button
                        key={page}
                        onClick={() => onPageChange(page)}
                        aria-current={currentPage === page ? "page" : undefined}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            currentPage === page
                                ? 'text-blue-600 bg-blue-50 border-blue-300 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white'
                                : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                        }`}
                    >
                        {page}
                    </button>
                ))}

                {/* Next Page */}
                {showPreviousNext && (
                    <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                        } bg-white border border-gray-300 ${!totalPages > maxVisiblePages ? 'rounded-r-lg' : ''} dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                    >
                        <span className="sr-only">Next</span>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                )}

                {/* Last Page */}
                {totalPages > maxVisiblePages && (
                    <button
                        onClick={handleLast}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center px-3 h-8 leading-tight ${
                            currentPage === totalPages
                                ? 'text-gray-400 cursor-not-allowed'
                                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-gray-700 dark:hover:text-white'
                        } bg-white border border-gray-300 rounded-r-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400`}
                    >
                        <span className="sr-only">Last</span>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                        <svg className="w-2.5 h-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    showInfo: PropTypes.bool,
    showPreviousNext: PropTypes.bool,
    maxVisiblePages: PropTypes.number,
    className: PropTypes.string
};

export default Pagination; 