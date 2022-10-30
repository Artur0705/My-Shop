const express = require("express");
const nodemailer = require("nodemailer");
const User = require("../../models/userModel");
const { getToken, isAuth } = require("../../utils/auth.js");
const bcrypt = require("bcrypt");

const router = express.Router();

router.put("/:id", isAuth, async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = req.body.password || user.password;
    const updatedUser = await user.save();
    res.send({
      _id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User Not Found" });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const signinUser = await User.findOne({
      email: req.body.email,
    });
    const verified = bcrypt.compareSync(req.body.password, signinUser.password);
    if (signinUser && verified) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser),
      });
    } else {
      res.status(401).send({ message: "Invalid Email or Password." });
    }
  } catch (error) {
    res.status(401).send({ message: "Invalid Email or Password." });
  }
});

router.post("/register", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const newUser = await user.save();
    if (newUser) {
      res.send({
        _id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin,
        token: getToken(newUser),
      });
    } else {
      res.status(401).send({ message: "Invalid User Data." });
    }
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
});

router.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  sendEmail(email, message, name);
  res.json("email sent");
});

const sendEmail = (from, text, name) => {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  let mailOptions = {
    from,
    to: "artlil420@gmail.com",
    subject: "[SHOES_ON]: from " + name,
    text,
    html: "Name: " + name + "<br> Email: " + from + "<br> Message: " + text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

router.get("/createadmin", async (req, res) => {
  try {
    const user = new User({
      name: "admin",
      email: "admin@gmail.com",
      password: "$2b$10$HCwGpaaw.GsUzDX1seZYmuKAVbDJKsvlHJrg6t2cO9Ul/kJoYALra", // password=123
      isAdmin: true,
    });
    const newUser = await user.save();
    res.send(newUser);
  } catch (error) {
    res.send({ message: error.message });
  }
});

module.exports = router;
