const express = require('express');
const router = express.Router();
const Login = require('../models/login'); //login.js 에서 모델을 가져와서 사용하기


router.get("/", (req, res) => {
    Login.findAll()
      .then(todos => res.send(todos))
      .catch(err => res.status(500).send(err));
//   try {
//     const login = await Login.find();
//     res.json(login);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
});

router.post("/", async (req, res) => {
  // login 은 도큐먼트이다.
  const login = new Login({
    id: req.body.id,
    userName: req.body.userName,
    passWord: req.body.passWord,
    time: req.body.time
  });

  try {
    const newLogin = await login.save();
    res.status(201).json(newLogin);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/", async(req,res) => {
  // 인스턴스 생성
  const login = new Login({
    id : req.body.id,
    time : req.body.time
  });
  try{
    const changeTimer = await Login.updateOne({id:login.id},{time:login.time});
    res.status(201).json(changeTimer)
  } catch(err) {
    res.status(400).json({message:err.message});
  }
});


module.exports = router;