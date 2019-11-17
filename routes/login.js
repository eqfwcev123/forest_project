const express = require('express');
const router = express.Router();
const Login = require('../models/login');


router.get("/", async (req, res) => {
  try {
    const login = await Login.find();
    res.json(login);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  const login = new Login({
    id: req.body.id,
    userName: req.body.userName,
    passWord: req.body.password
  });

  try {
    const newLogin = await login.save();
    res.status(201).json(newLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/", async(req,res) => {

});

router.delete("/", async(req,res) => {

});

module.exports = router;