// Mengimpor koneksi pool database PostgreSQL dari folder config
const pool = require('../config/db');

// 1. GET: Mengambil seluruh data potensi desa
exports.getAllDesa = async (req, res) => {
  try {
    // Menjalankan query untuk mengambil seluruh data diurutkan dari id terkecil
    const result = await pool.query('SELECT * FROM potensi_desa ORDER BY id ASC');

    // Mengembalikan status 200 (OK) dan data hasil query dalam bentuk JSON
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    // Mengembalikan status 500 jika terjadi kendala pada server atau database
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 2. GET by ID: Mengambil 1 data potensi desa berdasarkan parameter ID di URL
exports.getDesaById = async (req, res) => {
  // Mengambil nilai id dari parameter request (req.params.id)
  const { id } = req.params;

  try {
    // Menggunakan parameterized query ($1) untuk mencegah celah SQL Injection
    const result = await pool.query('SELECT * FROM potensi_desa WHERE id = $1', [id]);

    // Validasi jika data dengan ID tersebut tidak ditemukan
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data potensi desa tidak ditemukan',
      });
    }

    // Mengembalikan 1 objek data yang ditemukan
    res.status(200).json({
      success: true,
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 3. POST: Menambahkan data potensi desa baru ke database
exports.createDesa = async (req, res) => {
  // Mengekstrak field dari body JSON yang dikirim client
  const { kategori, nama_potensi, deskripsi, pengelola, lokasi } = req.body;

  // Validasi kolom wajib agar tidak ada data kosong yang masuk
  if (!kategori || !nama_potensi || !deskripsi || !lokasi) {
    return res.status(400).json({
      success: false,
      message: 'Kategori, nama potensi, deskripsi, dan lokasi wajib diisi',
    });
  }

  try {
    // Query INSERT dengan klausa RETURNING * agar data yang baru terbuat langsung dikembalikan
    const query = `
      INSERT INTO potensi_desa (kategori, nama_potensi, deskripsi, pengelola, lokasi)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [kategori, nama_potensi, deskripsi, pengelola || 'BUMDES', lokasi];
    const result = await pool.query(query, values);

    // Mengembalikan status 201 (Created) untuk data baru yang berhasil dibuat
    res.status(201).json({
      success: true,
      message: 'Data potensi desa berhasil ditambahkan',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 4. PUT: Memperbarui data potensi desa berdasarkan ID
exports.updateDesa = async (req, res) => {
  const { id } = req.params;
  const { kategori, nama_potensi, deskripsi, pengelola, lokasi } = req.body;

  try {
    // Mengecek terlebih dahulu apakah data yang ingin diubah benar-benar ada di tabel
    const checkData = await pool.query('SELECT * FROM potensi_desa WHERE id = $1', [id]);
    if (checkData.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data potensi desa tidak ditemukan',
      });
    }

    // Menjalankan query UPDATE dan memperbarui waktu di updated_at
    const query = `
      UPDATE potensi_desa
      SET kategori = $1, nama_potensi = $2, deskripsi = $3, pengelola = $4, lokasi = $5, updated_at = CURRENT_TIMESTAMP
      WHERE id = $6
      RETURNING *
    `;
    const values = [kategori, nama_potensi, deskripsi, pengelola, lokasi, id];
    const result = await pool.query(query, values);

    res.status(200).json({
      success: true,
      message: 'Data potensi desa berhasil diperbarui',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// 5. DELETE: Menghapus data potensi desa berdasarkan ID
exports.deleteDesa = async (req, res) => {
  const { id } = req.params;

  try {
    // Menjalankan query DELETE dengan klausa RETURNING * untuk memeriksa apakah baris terhapus
    const result = await pool.query('DELETE FROM potensi_desa WHERE id = $1 RETURNING *', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data potensi desa tidak ditemukan',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Data potensi desa berhasil dihapus',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};