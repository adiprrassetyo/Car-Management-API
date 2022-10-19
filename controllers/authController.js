const jwt = require("jsonwebtoken");
const secretKey = "secret";
const { Superadmin } = require("../models");
const { Admin } = require("../models");
const { Member } = require("../models");

// authorize
exports.authorize = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const tokenPayload = jwt.verify(token, secretKey);
    console.log(tokenPayload);
    if (tokenPayload.role === "Superadmin") {
      req.user = await Superadmin.findByPk(tokenPayload.user.id);
    } else if (tokenPayload.role === "Admin") {
      req.user = await Admin.findByPk(tokenPayload.user.id);
    } else {
      req.user = await Member.findByPk(tokenPayload.user.id);
    }
    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

//  authorize superadmin
exports.authorizeSuperadmin = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const tokenPayload = jwt.verify(token, secretKey);
    if (tokenPayload.role !== "Superadmin") {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// authorize admin
exports.authorizeAdmin = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;
    const token = bearerToken.split(" ")[1];
    const tokenPayload = jwt.verify(token, secretKey);
    if (tokenPayload.role === "Superadmin") {
      req.user = await Superadmin.findByPk(tokenPayload.user.id);
    } else if (tokenPayload.role === "Admin") {
      req.user = await Admin.findByPk(tokenPayload.user.id);
    } else {
      throw new Error();
    }
    next();
  } catch (error) {
    res.status(401).send({
      message: "Unauthorized",
    });
  }
};

// Who Am I
exports.whoAmI = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      message: "Success",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
