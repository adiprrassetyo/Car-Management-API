const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";
const { Admin } = require("../models");

// create
exports.create = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email } });
    if (admin) {
      return res.status(400).send({
        message: "Admin already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      email,
      password: hashPassword,
    });
    res.send({
      message: "Admin created",
      Data: {
        id: newAdmin.id,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
    });
  }
};

// login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Admin.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({
        message: "Admin not found",
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
        role: "Admin",
      },
      secretKey
    );
    res.send({
      message: "Login success",
      role: "admin",
      data: { email },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Server error",
    });
  }
};
