# Backend POS - Bubun Elektronik

Backend ini dikembangkan menggunakan **Node.js, Express.js, dan Sequelize** sebagai ORM untuk MySQL.

## **1. Persyaratan**
Sebelum memulai, pastikan Anda telah menginstal perangkat lunak berikut:
- **Node.js** (disarankan versi terbaru LTS)
- **MySQL Server** (atau MariaDB)
- **Postman** (opsional, untuk testing API)
- **Git** (opsional, untuk version control)

## **2. Clone Repository**
Jalankan perintah berikut untuk meng-clone project ini:
```sh
git clone https://github.com/MahardikaPratama/Eletronic-POS.git
cd Eletronic-POS/server
```

## **3. Install Dependencies**
Jalankan perintah berikut untuk menginstal semua dependency yang diperlukan:
```sh
npm install
```

## **4. Konfigurasi Environment**
Buat file **`.env`** di dalam folder ./app dan isi dengan konfigurasi database:
```ini
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=eletronic_pos
DB_DIALECT=mysql
PORT=3000

```
Gantilah `yourpassword` dengan password database MySQL Anda.

## **5. Buat Database**
Sebelum menjalankan aplikasi, buat database MySQL secara manual atau menggunakan perintah berikut:
```sql
CREATE DATABASE eletronic_pos;
```
Atau jalankan perintah ini di terminal MySQL:
```sh
mysql -u root -p -e "CREATE DATABASE eletronic_pos;"
```

## **6. Konfigurasi Sequelize**
Setelah database dibuat, jalankan migrasi untuk membuat tabel:
```sh
npx sequelize-cli db:migrate
```
Kemudian jalankan seeder untuk memasukkan data awal:
```sh
npx sequelize-cli db:seed:all
```

## **7. Menjalankan Server**
Jalankan perintah berikut untuk memulai backend:
```sh
node server.js
```
Atau gunakan **nodemon** agar server restart otomatis saat ada perubahan kode:
```sh
npx nodemon server.js
```

## **8. Testing API dengan Postman**
Gunakan **Postman** atau **cURL** untuk menguji endpoint. Contoh:
```sh
curl -X GET http://localhost:3000/kategori-produk
```
Atau buka **Postman**, lalu buat request **GET** ke:
```
http://localhost:3000/kategori-produk
```

## **9. Endpoint API**
Berikut adalah daftar endpoint utama:

### **Kategori Produk**
- `GET /kategori-produk` → Mendapatkan semua kategori
- `GET /kategori-produk/:id` → Mendapatkan kategori berdasarkan ID
- `POST /kategori-produk` → Menambahkan kategori baru
- `PUT /kategori-produk/:id` → Mengedit kategori
- `DELETE /kategori-produk/:id` → Menghapus kategori


## **10. Troubleshooting**
- **Port Sudah Digunakan**
  Jika muncul error `EADDRINUSE: address already in use :::3000`, ubah **PORT** di `.env` atau hentikan proses lain yang menggunakan port tersebut:
  ```sh
  npx kill-port 3000
  ```

- **Tidak Bisa Terhubung ke Database**
  - Pastikan MySQL sudah berjalan (`service mysql start` di Linux/Mac atau jalankan XAMPP di Windows)
  - Periksa kembali file `.env` dan sesuaikan dengan kredensial database Anda.

## **11. Lisensi**
MIT License. Silakan gunakan dan modifikasi sesuai kebutuhan.

---
Jika ada kendala atau pertanyaan, silakan hubungi tim pengembang! 🚀

