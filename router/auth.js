/**
 * Path: api/login
 */
const { Router } = require("express");
const { login, renewToken } = require("../controllers/auth");
const { validationModels } = require("../middlewares/validationModels");
const { validateToken } = require("../middlewares/validateToken");
const { loginRules } = require("../rules/rules");
const router = Router();
// Endpoint
/**
 * Iniciar sesión
 * POST: api/login
 */
router.post("/", loginRules, validationModels, login);
router.post("/renew-token", validateToken, validationModels, renewToken);
/**
 * Revalidar token
 * GET api/login/renew
 */
// router.get("/renew", validateToken, renewToken); //Se manda el validateToken cuando se quiere trabajar con las sesiones o decimos que ese endpoint requiere una validación

module.exports = router;
