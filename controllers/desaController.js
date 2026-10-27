const pool = require('../config/db');

// GET semua data potensi desa
exports.getAllDesa = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM potensi_desa ORDER BY id ASC');
    res.status(200).json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET data potensi desa berdasarkan ID
exports.getDesaById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM potensi_desa WHERE id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data potensi desa nggak ditemukan',
      });
    }

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

// POST data potensi desa baru
exports.createDesa = async (req, res) => {
  const { kategori, nama_potensi, deskripsi, pengelola, lokasi } = req.body;

  if (!kategori || !nama_potensi || !deskripsi || !lokasi) {
    return res.status(400).json({
      success: false,
      message: 'Kategori, nama potensi, deskripsi, dan lokasi wajib diisi',
    });
  }

  try {
    const query = `
      INSERT INTO potensi_desa (kategori, nama_potensi, deskripsi, pengelola, lokasi)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const values = [kategori, nama_potensi, deskripsi, pengelola || 'BUMDES', lokasi];
    const result = await pool.query(query, values);

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

// PUT update data potensi desa
exports.updateDesa = async (req, res) => {
  const { id } = req.params;
  const { kategori, nama_potensi, deskripsi, pengelola, lokasi } = req.body;

  try {
    const checkData = await pool.query('SELECT * FROM potensi_desa WHERE id = $1', [id]);
    if (checkData.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data potensi desa nggak ditemukan',
      });
    }

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

// DELETE data potensi desa
exports.deleteDesa = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM potensi_desa WHERE id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Data potensi desa nggak ditemukan',
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