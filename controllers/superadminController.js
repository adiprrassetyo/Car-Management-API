const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";
const { Superadmin } = require("../models");

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Superadmin.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({
        message: "Superadmin not found",
      });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send({
        message: "Wrong password",
      });
    }
    const token = jwt.sign(
      {
        user,
        role: "Superadmin",
      },
      secretKey
    );
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
