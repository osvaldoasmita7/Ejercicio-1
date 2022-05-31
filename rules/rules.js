const { check } = require("express-validator");
const loginRules = [
  check("username", "El nombre de usuario es obligatorio").not().isEmpty(),
  check("password", "El password es obligatorio").not().isEmpty(),
];

const tokenRules = [check("token", "El token es obligatorio").not().isEmpty()];

const UserRules = [
  check("firstname", "El password es obligatorio").not().isEmpty(),
  check("lastname", "El password es obligatorio").not().isEmpty(),
  check("password", "La contraseña no puede ir vacía")
    .trim()
    .escape()
    .not()
    .isEmpty(),
  check("username", "El nombre de usuario no puede ir vacío")
    .escape()
    .not()
    .isEmpty(),
  check("email", "El email es obligatorio").isEmail(),
];
const UserPutRules = [
  check("firstname", "El password es obligatorio").not().isEmpty(),
  check("lastname", "El password es obligatorio").not().isEmpty(),
  check("username", "El nombre de usuario no puede ir vacío")
    .escape()
    .not()
    .isEmpty(),
  check("email", "El email es obligatorio").isEmail(),
];
module.exports = {
  loginRules,
  tokenRules,
  UserRules,
  UserPutRules,
};
