import SearchBar from "./SearchBar.tsx";
import Header from "./Header.tsx";
import CompanyList from "./CompanyList.tsx";

const Dashboard = () => {
    return (
        <div data-cy="dashboard" className="h-screen w-[439px] p-4 flex flex-col">
            <Header />
            <div className="flex flex-col h-full overflow-hidden bg-gray-light rounded-lg p-4">
                <SearchBar />
                <div className="flex-1 overflow-y-auto scrollbar-custom">
                    <CompanyList />
                </div>
            </div>
        </div>
    );
};


export default Dashboard
