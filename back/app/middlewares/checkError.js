const { validationResult } = require("express-validator");

function validatorMapper(req, res, next) {
  const error = validationResult(req);
  let obj = {};
  error?.errors?.forEach((err) => {
    obj[err.param] = err.msg;
  });
  if (Object.keys(obj).length > 0) {
    throw {
      status: 400,
      error: obj,
      message: obj,
    };
  } else next();
}
module.exports = { validatorMapper };
