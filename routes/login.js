const express = require('express');
const router = express.Router();
const Login = require('../models/login'); //login.js 에서 모델을 가져와서 사용하기

// 모든 사용자 정보 뿌리기.
router.get("/", (req, res) => {
    Login.find()
    .then(info => res.send(info))
    .then(info => console.log(info))
    .catch(err => res.status(500).send(err));
});

// 새로운 사용자 정보를 생성하지 않는 이상 크게 상관없슴. 시간나면 로그인 폼 만들어서 사용
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