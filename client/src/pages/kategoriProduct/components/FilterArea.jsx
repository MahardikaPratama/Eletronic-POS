import PropTypes from 'prop-types';

const FilterArea = ({ onAdd, onSearch, searchTerm }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value);
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
            <form className="flex items-center w-full sm:w-auto mb-4 sm:mb-0" onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input 
                        type="text" 
                        id="table-search" 
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                        placeholder="Search for kategori" 
                    />
                </div>
            </form>
            <button 
                onClick={onAdd} 
                type="button" 
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
                Add new kategori
            </button>
        </div>
    );
};

FilterArea.propTypes = {
    onAdd: PropTypes.func.isRequired,
    onSearch: PropTypes.func.isRequired,
    searchTerm: PropTypes.string
};

export default FilterArea; 