const { validationResult } = require("express-validator");
const validationModels = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors.mapped());
    return res.status(400).json({
      ok: false,
      error: errors.mapped(),
      status: 400,
    });
  }
  next();
};

module.exports = { validationModels };
