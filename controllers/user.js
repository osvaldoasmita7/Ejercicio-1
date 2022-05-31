const initModels = require("../models/init-models");
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
const bcrypt = require("bcryptjs");
const { verifyJWT } = require("../helpers/generateToken");

/**
 *
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUsers = async (req, res) => {
  try {
    const { users } = initModels(sequelize);
    let resp = await users.findAll();

    return res.json({ ok: true, usuarios: resp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};
/**
 * Trae un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const getUser = async (req, res) => {
  try {
    if (!req.params.id)
      return res.status(400).json({ ok: false, msg: "El id es requerido" });
    const { users } = initModels(sequelize);
    let resp = await users.findOne({ where: { id: req.params.id } });
    if (!resp?.dataValues)
      return res.status(404).json({ ok: false, msg: "Usuario no encontrado" });
    return res.json({ ok: true, ...resp.dataValues });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};
/**
 * Registrar a un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const postUser = async (req, res) => {
  try {
    const { firstname, lastname, password, username, email } = req.body;
    const { users } = initModels(sequelize);
    const salt = bcrypt.genSaltSync();
    let resp = await users.create({
      firstname,
      lastname,
      password: bcrypt.hashSync(`${password}`, salt),
      username,
      email,
    });

    return res.json({ ok: true, resp });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};

/**
 * Actualizar a un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const putUser = async (req, res) => {
  try {
    const { id, firstname, lastname, password, username, email } = req.body;
    if (parseInt(id) !== parseInt(req.params.id))
      return res.status(400).json({ ok: false, msg: "El id no coincide" });
    if (!id)
      return res.status(400).json({ ok: false, msg: "El id es requerido" });
    const { users } = initModels(sequelize);
    let resp = await users.findOne({ where: { id: id } });
    if (!resp?.dataValues)
      return res.status(404).json({ ok: false, msg: "Usuario no existe." });
    const salt = bcrypt.genSaltSync();
    const user = {
      firstname,
      lastname,
      password: bcrypt.hashSync(`${password}`, salt),
      username,
      email,
    };
    await users.update(user, {
      where: {
        id: id,
      },
    });

    return res.json({ ok: true, id, ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};

/**
 * Actualizar a un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const resetPassword = async (req, res) => {
  try {
    const token = req.headers.xtoken;
    const [ok, id] = verifyJWT(token);
    if (!ok)
      return res
        .status(401)
        .json({ ok: false, msg: "No estás autorizado para esta solicitud" });

    if (!id)
      return res.status(400).json({
        ok: false,
        msg: "El id del usuario es requerido, intenta con otro token",
      });
    const { users } = initModels(sequelize);
    const salt = bcrypt.genSaltSync();
    const user = {
      password: bcrypt.hashSync(`123456`, salt),
    };
    let resp = await users.update(user, {
      where: {
        id: id,
      },
    });

    return res.json({ ok: true, id, ...user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};

/**
 * Elimina a un usuario
 * @param {*} req
 * @param {*} res
 * @returns
 */
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res.status(400).json({ ok: false, msg: "El id es requerido" });
    const { users } = initModels(sequelize);

    let resp = await users.destroy({
      where: {
        id: id,
      },
    });

    return res.json({
      ok: true,
      msg: resp > 0 ? "Usuario eliminado" : "No hay registros para eliminar",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, msg: error });
  }
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  getUser,
  deleteUser,
  resetPassword,
};
