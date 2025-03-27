import BreadCrumb from "../breadCrumb";
import MainContent from "./mainContent";

const Index = () => {
    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700">
            <div className="w-full mb-1">
                <BreadCrumb title={"Kategori Product"}/>  
                <MainContent />
            </div>
        </div>
    )
}

export default Index;