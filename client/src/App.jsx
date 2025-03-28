import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
// Uncomment jika halaman lain sudah siap:
// import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Index from './pages/dashboard2/index';
import KategoriProduct from './pages/kategoriProduct/index';
import ProductManagement from './pages/productManagement/index'
// import Sidebar from './pages/dashboard2/sidebar';
// import Products from './pages/Products';
// import NewTransactions from './pages/NewTransactions';
// import TransactionHistory from './pages/TransactionHistory';
// import SalesReport from './pages/SalesReport';
// import Settings from './pages/Settings';
// import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard2" element={<Index />} />
          <Route path="/dashboard/kategori" element={<KategoriProduct />} />
          <Route path="/dashboard/produk" element={<ProductManagement />} />
          {/* <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/new-transactions" element={<NewTransactions />} />
          <Route path="/transaction-history" element={<TransactionHistory />} />
          <Route path="/sales-report" element={<SalesReport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
