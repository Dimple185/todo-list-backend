const { check, validationResult } = require("express-validator");

exports.validateRequest = [
  check("userName").notEmpty().withMessage("user Name is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
  check("email").isEmail().withMessage("Valid E-mail is Required"),
];

exports.validateSigninRequest = [
  check("email").isEmail().withMessage("Valid E-mail is Required"),
  check("password")
    .isLength({ min: 6 })
    .withMessage("Password must be atleast 6 characters long"),
];

exports.isRequestValidated = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.array().length > 0) {
    return res.json({ errors: errors.array()[0].msg });
  }
  next();
};
