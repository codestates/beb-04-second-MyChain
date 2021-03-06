const express = require("express");
const app = express();
const port = 3001; // react의 기본값은 3000이니까 3000이 아닌 아무 수
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql"); // mysql 모듈 사용
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });

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
  //   console.log(req.body.signForm);
  // json형식의 object에서 각 value만 담아서 배열을 만든다 아래insert ?구문에 들어갈 [ary]배열을 만들기 위함
  const valExtract = req.body.signForm;
  const ary = [];
  for (key in valExtract) {
    ary.push(valExtract[key]);
  }

  connection.query("SELECT * FROM users where userName=?", id, function(
    err,
    rows,
    fields
  ) {
    if (err) {
      console.error(err);
    } else {
      if (rows.length < 1) {
        //email을 조회에서 결과가 없다면 insert
        connection.query(
          "INSERT INTO users(userName,password,nickName,address,privateKey) values (?)",
          [ary],
          function(err, rows, fields) {
            if (err) {
              console.log(err);
            } else {
              console.log("insert 성공");
            }
          }
        );
      } else {
        //email을 조회해서 결과가 있다면 이미 등록된 아이디
        console.log("이미가입된 사용자입니다.");
      }
    }
  });
  res.send("myChain 코딩 중!");
});

app.post("/ff", (req, res) => {
  const email = req.body.id;
  const pwd = req.body.pw;
  const loginInfo = [email, pwd];

  connection.query(
    "SELECT * FROM users where userName=? and password=?",
    loginInfo,
    function(err, rows, fields) {
      if (rows.length < 1) {
        console.log("입력정보가 맞지 않습니다.");
      } else {
        console.log("로그인됨");
        res.status(200).send({ message: "login success", id: email });
      }
    }
  );
});

app.post("/selectBoard", (req, res) => {
  connection.query(
    "SELECT b.id, b.title, b.writer, b.created_at, b.views, u.nickName FROM users as u JOIN board as b on u.userName = b.writer;",
    function(err, rows, fields) {
      if (err) {
        console.log("실패");
      } else {
        if (rows.length < 1) {
          console.log("조회된결과가 하나도 없습니다.");
        } else {
          console.log(rows);
          res.send(rows);
        }
      }
    }
  );
});
app.post("/boardWriting", (req, res) => {
  const valExtract = req.body.boardForm;
  const ary = [];
  for (key in valExtract) {
    ary.push(valExtract[key]);
  }

  connection.query(
    "INSERT INTO board (title, content, writer) values (?)",
    [ary],
    function(err, rows, fields) {
      if (err) {
        console.log(err);
      } else {
        console.log("board insert 성공");
        res.status(200).send({ message: "board insert success" });
      }
    }
  );
});

app.post("/postView", (req, res) => {
  const id = req.body.id;
  connection.query("SELECT * FROM board where id=?", id, function(
    err,
    rows,
    fields
  ) {
    if (err) {
      console.log(err);
    } else {
      if (rows.length < 1) {
        console.log("error");
      } else {
        console.log("조회성공");
        res.send(rows);
      }
    }
  });
});

app.listen(port, () => {
  console.log(`Connect at http://localhost:${port}`);
});
