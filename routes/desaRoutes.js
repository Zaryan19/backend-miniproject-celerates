// Mengimpor library Express untuk mengelola routing
const express = require('express');

// Membuat instance router modular dari Express
const router = express.Router();

// Mengimpor controller desa yang berisi logika manipulasi data database
const desaController = require('../controllers/desaController');

// GET semua data "potensi desa"
router.get('/', desaController.getAllDesa)

// GET data "potensi desa" berdasaarkan id
router.get('/:id', desaController.getDesaById)  

// POST data "potensi desa" baru
router.post('/', desaController.createDesa)

// PUT UPDATE data "potensi desa"
router.post('/:id', desaController.updateDesa)

// DELETE data "potensi desa"
router.post('/:id', desaController.deleteDesa)

// Mengekspor router agar bisa digunakan di server.js
module.exports = router;