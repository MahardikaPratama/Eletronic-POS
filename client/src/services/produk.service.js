import http from "../http-common";

class ProdukDataService {
    // 🛠️ Handler untuk READ semua produk
    getAll() {
        return http.get(`/produk`);
    }

    // 🛠️ Handler untuk CREATE produk
    create(data) {
        return http.post(`/produk`, data);
    }

    // 🛠️ Handler untuk UPDATE produk
    update(id, data) {
        return http.put(`/produk/${id}`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // 🛠️ Handler untuk DELETE produk
    delete(id) {
        return http.delete(`/produk/${id}`);
    }
    
}

const produkDataService = new ProdukDataService();
export default produkDataService;