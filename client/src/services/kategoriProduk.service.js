import http from "../http-common";

class KategoriProdukDataService {
    // 🛠️ Handler untuk READ semua kategori
    getAll() {
        return http.get(`/kategori-produk`);
    }

    // 🛠️ Handler untuk CREATE kategori
    create(data) {
        return http.post(`/kategori-produk`, data);
    }

    // 🛠️ Handler untuk UPDATE kategori
    update(id, data) {
        console.log("id:", id);
        console.log("data:", data);
        return http.put(`/kategori-produk/${id}`, JSON.stringify(data), {
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    // 🛠️ Handler untuk DELETE kategori
    delete(id) {
        return http.delete(`/kategori-produk/${id}`);
    }
    
}

const kategoriProdukDataService = new KategoriProdukDataService();
export default kategoriProdukDataService;