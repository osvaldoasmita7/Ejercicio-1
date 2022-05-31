/**
 * Path: api/users
 */
const { Router } = require("express");
const {
  getUsers,
  postUser,
  putUser,
  getUser,
  deleteUser,
  resetPassword,
} = require("../controllers/user");
const { validateToken } = require("../middlewares/validateToken");
const { validationModels } = require("../middlewares/validationModels");
const { UserRules, UserPutRules, PasswordRules } = require("../rules/rules");
const router = Router();
// Endpoint
/**
 * Traer un viaje pro unidad en programar salida
 * GET: api/users
 */
router.get("/", [], validateToken, validationModels, getUsers);
router.get("/:id", [], validateToken, validationModels, getUser);
router.post("/", UserRules, validateToken, validationModels, postUser);
router.put("/reset-password", validateToken, validationModels, resetPassword);
router.put("/:id", UserPutRules, validateToken, validationModels, putUser);

router.delete("/:id", UserRules, validateToken, validationModels, deleteUser);

module.exports = router;
