require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');

// 라우팅
const port = process.env.PORT || 5100;
const router = require('./routes/login');
app.use(cors());

// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// mongoose.connection.on("error", error => console.error(error));
// mongoose.connection.once("open", () => console.log("connected to database"));

// 미드웨어
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/login", router);

// nodejs 의 native promise 사용
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log("Successfully connected to mongodb"))
  .catch(console.error);

// 서버 listen
app.listen(port, () => console.log(`connected to localhost:5100`))