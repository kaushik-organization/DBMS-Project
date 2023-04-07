# DBMS-Project

Querys :-

DDL :-
  Rutvik :-
// CREATE TABLE Author (author_id char(8) , PRIMARY KEY (author_id), name varchar(20) , about varchar(400) , gender varchar(10) ,country varchar(20))
// CREATE TABLE Publisher (publisher_id char(8) , PRIMARY KEY (publisher_id), name varchar(20) , contact_no int(10) , address varchar(200))
// CREATE TABLE Genre (genre_id char(8) , PRIMARY KEY (genre_id) , name varchar(20) )
// CREATE TABLE Books (book_id char(8) , PRIMARY KEY (book_id) , title varchar(100) NOT NULL , description varchar(400) , publisher_id char(8) , likes int(100) , release_data DATE , price int(100) , discount int(100))
// CREATE TABLE Books_Author (book_id char(8) NOT NULL , author_id char(8) NOT NULL);
// CREATE TABLE Books_Genre (book_id char(8) NOT NULL , genre_id char(8) NOT NULL);
// CREATE TABLE User (user_id char(8) , PRIMARY KEY (user_id) , email varchar(30) NOT NULL , name varchar(20) NOT NULL , profile_pic varchar(100) , address varchar(100) , contact_no int(10) , basket_id char(8) NOT NULL );
// CREATE TABLE Basket_Books (basket_id char(8) , book_id char(8) , PRIMARY KEY (basket_id , book_id) , count int(10) NOT NULL );
// CREATE TABLE Sales (book_id char(8) , PRIMARY KEY (book_id) , books_sold int(10) default 0 , quantity int(10) default 100 );
// ALTER TABLE Publisher MODIFY COLUMN name varchar(20) NOT NULL ;
// ALTER TABLE Genre MODIFY COLUMN name varchar(20) NOT NULL ;
// ALTER TABLE Books MODIFY COLUMN publisher_id char(8) NOT NULL ;
// alter table Books_Author add constrain PRIMARY KEY(book_id , author_id);
// alter table Author add CONSTRAINT check_author_id check(author_id between 'AUTH0000' and 'AUTH9999');
