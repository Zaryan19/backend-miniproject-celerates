const express = require('express');
const router = express.Router();
const desaController = require('../controllers/desaController')

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


module.exports = router;