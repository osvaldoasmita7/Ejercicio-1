// Importamos modelos a usar
const bcrypt = require("bcryptjs");
const { generateToken } = require("../helpers/generateToken");
const initModels = require("../models/init-models");
const { verifyJWT } = require("../helpers/generateToken");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
  { timestamps: false }
);
// Login
const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const { users } = initModels(sequelize);

    let resp = await users.findAll({
      where: {
        username: username,
      },
    });
    if (resp.length === 0)
      return res.status(404).json({ ok: false, msg: "Usuario no existe" });
    let find = resp.find((x) => bcrypt.compareSync(password, x.password));
    if (!find)
      return res
        .status(404)
        .json({ ok: false, msg: "Usuario o contraseña incorrectos" });
    const token = await generateToken(find.id, find.username);
    return res.json({ ok: true, username: find.username, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Ha ocurrido un error, hable con el administrador",
    });
  }
};

/**
 * Actualizar a un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const renewToken = async (req, res) => {
  try {
    let token = req.headers.xtoken;
    const [ok, id, username] = verifyJWT(token);
    if (!ok)
      return res
        .status(401)
        .json({ ok: false, msg: "No estás autorizado para esta solicitud" });
    token = await generateToken(id, username);

    return res.json({ ok: true, id, token, username });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};
module.exports = {
  login,
  renewToken,
};
