const jwt = require("jsonwebtoken");
const generateToken = (userId, username) => {
  return new Promise((resolve, reject) => {
    let payload = { userId, username };
    jwt.sign(
      payload,
      process.env.JWT_KEY,
      { expiresIn: "24h" },
      function (error, token) {
        if (error) {
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
const verifyJWT = (token = "") => {
  try {
    const { userId, username } = jwt.verify(token, process.env.JWT_KEY);
    return [true, userId, username];
  } catch (error) {
    return [false, null];
  }
};

module.exports = { generateToken, verifyJWT };
