
const SearchBar = () => {

    return (
        <div className="relative w-full mb-4">
            <input
                className="w-full h-14 rounded-md pl-12 pr-4 border border-gray-300 focus:outline-none focus:ring-1 focus:ring-orange"
                type="text"
                placeholder="Search"
            />
            <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray hover:text-gray-700 focus:outline-none "
                onClick={() => alert('Search icon clicked!')}
            >
                <i className="ri-search-line"></i>
            </button>
        </div>

    )
}

export default SearchBar;