const express = require('express');
const router = express.Router();
const Login = require('../models/login'); 

router.get("/", (req, res) => {
    Login.find({})
    .then(info => res.send(info))
    .catch(err => res.status(500).send(err));
});


router.post("/", (req, res) => {
  Login.createUser(req.body)
    .then(() => Login.findAll())
    .then(result => res.send(result))
    .catch(err => res.status(500).send(err));
});

router.patch("/", (req,res) => {
  const login = new Login({
    id : req.body.id,
    time : req.body.time
  });
   Login.updateUserById({id : login.id}, { time : login.time })
     .then(result => res.send(result))
     .catch(err => res.status(500).send(err));
});


module.exports = router;