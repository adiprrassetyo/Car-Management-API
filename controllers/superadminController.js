const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";
const { Superadmin } = require("../models");

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const superadmin = await Superadmin.findOne({ where: { email } });
    if (!superadmin) {
      return res.status(400).send({
        message: "Superadmin not found",
      });
    }
    const validPassword = await bcrypt.compare(password, superadmin.password);
    if (!validPassword) {
      return res.status(400).send({
        message: "Wrong password",
      });
    }
    const token = jwt.sign({ id: superadmin.id }, secretKey);
    res.send({
      message: "Login success",
      role: "superadmin",
      Data: { email },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
    });
  }
};
