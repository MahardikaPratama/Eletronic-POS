import http from "../http-common";

class PengeluaranDataService {
    // 🛠️ Handler untuk READ semua pengeluaran
    getAll() {
        return http.get(`/pengeluaran`);
    }

    // 🛠️ Handler untuk CREATE pengeluaran
    create(data) {
        return http.post(`/pengeluaran`, data);
    }

    // 🛠️ Handler untuk UPDATE pengeluaran
    update(id, data) {
        return http.put(`/pengeluaran/${id}`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // 🛠️ Handler untuk DELETE pengeluaran
    delete(id) {
        return http.delete(`/pengeluaran/${id}`);
    }
}

const pengeluaranDataService = new PengeluaranDataService();
export default pengeluaranDataService;