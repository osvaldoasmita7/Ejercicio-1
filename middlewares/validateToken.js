const jwt = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  try {
    const token = req.headers.xtoken;
    if (!token) {
      return res
        .status(401)
        .json({ ok: false, msg: "No estás autorizado para esta operación" });
    }
    const { id } = jwt.verify(token, process.env.JWT_KEY);
    req.id = id;
    next();
  } catch (error) {
    console.log("error en token", error);
    return res.status(401).json({
      ok: false,
      msg: "Token no es válido o ha caducado",
    });
  }
};
module.exports = { validateToken };
