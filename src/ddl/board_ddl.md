create table `board` ( -- 게시판 ddl
`id` int PRIMARY KEY AUTO_INCREMENT,
`title` varchar(255),
`writer` varchar(255),
`created_at` timestamp default now(),
`views` int
);

select \* from board; -- 조회쿼리

insert into board (title, writer, created_at, views) values ('제목3', '글쓴이3', now(), 3); -- insert쿼리 예시
