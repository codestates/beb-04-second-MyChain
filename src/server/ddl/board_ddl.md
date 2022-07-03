<!-- 로그인 테이블 생성 -->

CREATE TABLE users (
id int PRIMARY KEY AUTO_INCREMENT,
userName varchar(255),
password varchar(255),
created_at timestamp default now(),
nickName varchar(255),
address varchar(255),
privateKey varchar(255)
);

<!-- 게시판 테이블 생성 -->

create table board (
id int PRIMARY KEY AUTO_INCREMENT,
title varchar(255),
content varchar(1000),
writer varchar(255),
created_at timestamp default now(),
views int default 0
);

<!-- 조회 -->

select \* from users;

select \* from board;

<!-- 게시물 임의로 밀어넣는 insert 쿼리 (test용) -->

insert into board (title, writer, created_at, views) values ('제목3', '글쓴이3', now(), 3);

<!--  -->

show databases;
use MyChain;
DESC users;
DESC board;

<!-- 테이블을 삭제하고 다시 만들경우 -->

drop table users;
drop table board;
