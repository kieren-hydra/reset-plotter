import SearchBar from "./SearchBar.tsx";
import Header from "./Header.tsx";
import CompanyList from "./CompanyList.tsx";

const Dashboard = () => {

    return (
        <div className="h-screen w-[439px] p-4">

            <Header/>

            <div className={"h-fit overflow-y-auto w-full bg-gray-light rounded-lg p-4"}>

                <SearchBar/>
                <CompanyList/>
            </div>
        </div>
    )
}

export default Dashboard
