const express = require('express');
const router = express.Router();
const Login = require('../models/login'); //login.js 에서 모델을 가져와서 사용하기

// 모든 사용자 정보 뿌리기.
router.get("/", (req, res) => {
    Login.find({})
    .then(info => res.send(info))
    .catch(err => res.status(500).send(err));
});

// 새로운 사용자 정보를 생성하지 않는 이상 크게 상관없슴. 시간나면 로그인 폼 만들어서 사용
router.post("/", (req, res) => {
  Login.createUser(req.body)
    .then(() => Login.findAll())
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

router.patch("/", (req,res) => {
  // body는 우리가 전송한 메시지 의 body 부분이다.
  const login = new Login({
    id : req.body.id,
    time : req.body.time
  })
  //  console.log('RES', res);
  // let test = Login.findOne().select("-_id time");
   Login.updateUserById({"id" : login.id}, { time : login.time })
    //  .then(console.log)
     .then(result => res.send(result))
    //  .then(res => console.log(res["req"].body))
     .catch(err => res.status(500).send(err));
    //  console.log(req.body);
});


module.exports = router;