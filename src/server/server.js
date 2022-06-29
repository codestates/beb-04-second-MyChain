const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const dotenv = require("dotenv");
// const path = require("path");
dotenv.config({ path: "../../.env" });
// console.log(process.env.DATABASE_USERNAME);
// console.log(process.env.DATABASE_PASSWORD);
// console.log(process.env.DATABASE_NAME);
// import dotenv from "dotenv";
// dotenv.config({ path: "../../.env" });
var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USERNAME, //mysql의 id
  password: process.env.DATABASE_PASSWORD, //mysql의 password
  database: process.env.DATABASE_NAME, //사용할 데이터베이스
});

connection.connect();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.post("/dd", (req, res) => {
  const id = req.body.signForm.email;
  // const pw = req.body.signForm.pwd;
  // const pwChk = req.body.signForm.pwd_chk;
  // const nick = req.body.signForm.nick_name;
  //   console.log(req.body.signForm);
  // json형식의 object에서 각 value만 담아서 배열을 만든다 아래insert ?구문에 들어갈 [ary]배열을 만들기 위함
  const valExtract = req.body.signForm;
  const ary = [];
  for (key in valExtract) {
    ary.push(valExtract[key]);
  }
  //console.log(ary);
  connection.query(
    "SELECT * FROM users where userName=?",
    id,
    function (err, rows, fields) {
      if (err) {
        console.error(err);
      } else {
        // res.send(rows);
        // console.log("성공");
        // console.log("row size = " + rows.length);
        if (rows.length < 1) {
          //email을 조회에서 결과가 없다면 insert
          connection.query(
            "INSERT INTO users(userName,password,nickName,address,privateKey) values (?)",
            [ary],
            function (err, rows, fields) {
              if (err) {
                console.log(err);
              } else {
                console.log("insert 성공");
              }
            }
          );
        } else {
          //email을 조회해서 결과가 있다면 이미 등록된 아이디
          //   res.send("이미가입된 사용자 입니다.")
          console.log("이미가입된 사용자입니다.");
        }
      }
    }
  );
  res.send("myChain 코딩 중!");
});

app.post("/ff", (req, res) => {
  const email = req.body.id;
  const pwd = req.body.pw;

  console.log(req.body);
  console.log("email = " + email);
  console.log("pwd = " + pwd);
});
// app.post("/insert", (req, res) => {
//   const test = req.body.test;
//   // console.log(req.body);
//   connection.query(
//     "INSERT INTO users (test_body) values (?)",
//     [test],
//     function (err, rows, fields) {
//       if (err) {
//         console.log("실패");
//         // console.log(err);
//       } else {
//         console.log("성공");
//         // console.log(rows);
//       }
//     }
//   );
// });

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
