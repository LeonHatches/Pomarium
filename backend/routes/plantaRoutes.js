const express = require("express");
const { validarFotoPlanta } = require("../controllers/geminiController");

const router = express.Router();

// POST /api/validar-planta
router.post("/validar-planta", validarFotoPlanta);

module.exports = router;
