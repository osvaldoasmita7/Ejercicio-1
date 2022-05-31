/**
 * Path: api/users
 */
const { Router } = require("express");
const { uploadFiles } = require("../controllers/files");
const { validateToken } = require("../middlewares/validateToken");
const { validationModels } = require("../middlewares/validationModels");
const router = Router();

// Endpoint
/**
 * Traer un viaje pro unidad en programar salida
 * GET: api/users
 */
router.post("/", [], validateToken, validationModels, uploadFiles);

module.exports = router;
