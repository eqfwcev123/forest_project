require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');

// 라우팅
const router = require('./routes/login');

// Mongoose 데이터 베이스 연결
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
mongoose.connection.on("error", error => console.error(error));
mongoose.connection.once("open", () => console.log("connected to database"));

// 미들웨어
// app.use(static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/login',router);


// 서버 listen
app.get('/', (req, res) => res.send('Hello World!'))
app.listen(4800, () => console.log(`connected to localhost:4800`))