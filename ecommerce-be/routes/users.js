const { User } = require("../models/user");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const BaseResponse = require("../helpers/baseResponse");
const HTTP_STATUS = require("../helpers/httpStatus");

router.get(`/`, async (req, res) => {
  const userList = await User.find().select("-password");

  if (!userList) {
    res.status(500).json({ success: false });
  }
  res.send(userList);
});

router.get("/getUserInfo", async (req, res) => {
  const token = req.headers.authorization;

  const tokenData = jwt.decode(token.substring(7));
  const userId = tokenData?.userId;
  const user = await User.findById(userId).select("-password");
  if (!user) {
    res
      .status(500)
      .json({ message: "The user with the given ID was not found." });
  }
  res.status(200).send(new BaseResponse(HTTP_STATUS.OK, "Successfully", user));
});

router.post("/", async (req, res) => {
  let user = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    street: req.body.street,
    apartment: req.body.apartment,
    zip: req.body.zip,
    city: req.body.city,
    country: req.body.country,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.put("/:id", async (req, res) => {
  const userExist = await User.findById(req.params.id);
  let newPassword;
  if (req.body.password) {
    newPassword = bcrypt.hashSync(req.body.password, 10);
  } else {
    newPassword = userExist.passwordHash;
  }

  const user = await User.findByIdAndUpdate(
    req.params.id,
    {
      fullName: req.body.name,
      email: req.body.email,
      passwordHash: newPassword,
      phone: req.body.phone,
      isAdmin: req.body.isAdmin,
      street: req.body.street,
      apartment: req.body.apartment,
      zip: req.body.zip,
      city: req.body.city,
      country: req.body.country,
    },
    { new: true }
  );

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const secret = process.env.secret;
  if (!user) {
    return res.status(400).send("The user not found");
  }

  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    const token = jwt.sign(
      {
        userId: user.id,
        isAdmin: user.isAdmin,
      },
      secret,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .send(new BaseResponse(200, "Đăng nhập thành công", token));
  } else {
    return res.status(400).send("password is wrong!");
  }
});

router.post("/checkEmail", async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({ email });
  if (userExist) {
    return res.send(
      new BaseResponse(400, "Email is existed", { isRegistered: true })
    );
  }

  return res.send(
    new BaseResponse(200, "Successfully", { isRegistered: false })
  );
});

router.post("/register", async (req, res) => {
  console.log(req.body.password);
  let user = new User({
    fullName: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
  });
  user = await user.save();

  if (!user) return res.status(400).send("the user cannot be created!");

  res.send(user);
});

router.delete("/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then((user) => {
      if (user) {
        return res
          .status(200)
          .json({ success: true, message: "the user is deleted!" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "user not found!" });
      }
    })
    .catch((err) => {
      return res.status(500).json({ success: false, error: err });
    });
});

router.get(`/get/count`, async (req, res) => {
  const userCount = await User.countDocuments((count) => count);

  if (!userCount) {
    res.status(500).json({ success: false });
  }
  res.send({
    userCount: userCount,
  });
});

module.exports = router;
