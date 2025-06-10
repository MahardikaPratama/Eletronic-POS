import BreadCrumb from "../breadCrumb";
import MainContent from "./mainContent";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

const Index = () => {
    return (
        <div className="flex h-screen">
            {/* Sidebar dengan header di dalamnya */}
            <Sidebar />

            {/* Main Content Wrapper */}
            <div className="flex flex-col flex-1 min-h-screen bg-gray-100 lg:ml-64">
                {/* Breadcrumb di bawah header, tetap terlihat */}
                <div className="px-4 pt-16 mt-4 lg:px-6 lg:mt-0">
                    <BreadCrumb/>
                </div>

                {/* Main Content */}
                <div className="flex-1 px-4 overflow-auto lg:px-6">
                    <MainContent />
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </div>
        
    );
}

export default Index;