const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const secretKey = "secret";
const { Member } = require("../models");

// create
exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Member.findOne({ where: { email } });
    if (user) {
      return res.status(400).send({
        message: "Member already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newMember = await Member.create({
      email,
      password: hashPassword,
    });
    res.send({
      message: "Member created",
      Data: {
        id: newMember.id,
        email: newMember.email,
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
    const user = await Member.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send({
        message: "Member not found",
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
      },
      secretKey
    );
    res.send({
      message: "Login success",
      role: "member",
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
