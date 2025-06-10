import http from "../http-common";

class TransaksiDataService {
    // 🛠️ Handler untuk READ semua transaksi
    getAll() {
        return http.get("/transaksi");
    }

    // 🛠️ Handler untuk CREATE transaksi
    create(data) {
        return http.post("/transaksi", data);
    }

    // 🛠️ Handler untuk READ transaksi berdasarkan ID
    getById(id) {
        return http.get(`/transaksi/${id}`);
    }

    // 🛠️ Handler untuk mendapatkan data print transaksi
    getPrintData(id) {
        return http.get(`/transaksi/${id}/print`);
    }

    // 🛠️ Handler untuk DELETE transaksi berdasarkan ID
    delete(id) {
        return http.delete(`/transaksi/${id}`);
    }
}

const transaksiDataService = new TransaksiDataService();
export default transaksiDataService;