// Mengimpor framework Express untuk membuat server dan REST API
const express = require('express');

// Memuat variabel konfigurasi dari file .env (port, kredensial database, dll.)
require('dotenv').config();

// Mengimpor file rute khusus modul desa
const desaRoutes = require('./routes/desaRoutes');

// Inisialisasi aplikasi Express
const app = express();

// Middleware agar server bisa membaca data body request dalam format JSON
app.use(express.json());

// Endpoint base untuk seluruh rute desa (http://localhost:3000/desa)
app.use('/desa', desaRoutes);

// Menentukan port server dari file .env atau default ke port 3000
const PORT = process.env.PORT || 3000;

// Menjalankan server agar siap menerima request masuk
app.listen(PORT, () => {
    console.log(`Server aktif di http://localhost:${PORT}`);
});