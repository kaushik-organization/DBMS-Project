# DBMS-Project

Querys :-<br /><br />

DDL :-<br /><br />
  Rutvik :-<br />
// CREATE TABLE Author (author_id char(8) , PRIMARY KEY (author_id), name varchar(20) , about varchar(400) , gender varchar(10) ,country varchar(20))<br />
// CREATE TABLE Publisher (publisher_id char(8) , PRIMARY KEY (publisher_id), name varchar(20) , contact_no int(10) , address varchar(200))<br />
// CREATE TABLE Genre (genre_id char(8) , PRIMARY KEY (genre_id) , name varchar(20) )<br />
// CREATE TABLE Books (book_id char(8) , PRIMARY KEY (book_id) , title varchar(100) NOT NULL , description varchar(400) , publisher_id char(8) , likes int(100) , release_data DATE , price int(100) , discount int(100))<br />
// CREATE TABLE Books_Author (book_id char(8) NOT NULL , author_id char(8) NOT NULL);<br />
// CREATE TABLE Books_Genre (book_id char(8) NOT NULL , genre_id char(8) NOT NULL);<br />
// CREATE TABLE User (user_id char(8) , PRIMARY KEY (user_id) , email varchar(30) NOT NULL , name varchar(20) NOT NULL , profile_pic varchar(100) , address varchar(100) , contact_no int(10) , basket_id char(8) NOT NULL );<br />
// CREATE TABLE Basket_Books (basket_id char(8) , book_id char(8) , PRIMARY KEY (basket_id , book_id) , count int(10) NOT NULL );<br />
// CREATE TABLE Sales (book_id char(8) , PRIMARY KEY (book_id) , books_sold int(10) default 0 , quantity int(10) default 100 );<br />
// ALTER TABLE Publisher MODIFY COLUMN name varchar(20) NOT NULL ;<br />
// ALTER TABLE Genre MODIFY COLUMN name varchar(20) NOT NULL ;<br />
// ALTER TABLE Books MODIFY COLUMN publisher_id char(8) NOT NULL ;<br />
// alter table Books_Author add constrain PRIMARY KEY(book_id , author_id);<br />
// alter table Author add CONSTRAINT check_author_id check(author_id between 'AUTH0000' and 'AUTH9999');<br />
// alter table Books add CONSTRAINT check_book_id check(book_id between 'BOOK0000' and 'BOOK9999');<br />
// alter table Books add CONSTRAINT check_publisher_id check(publisher_id between 'PUBL0000' and 'PUBL9999');<br />
// alter table Publisher add CONSTRAINT check_publisher_id_ check(publisher_id between 'PUBL0000' and 'PUBL9999');<br />
// alter table Basket_Books add CONSTRAINT check_basket_id check(basket_id between 'BASK0000' and 'BASK9999');<br />
// alter table Basket_Books add CONSTRAINT check_book_id_ check(book_id between 'BOOK0000' and 'BOOK9999');<br />
// alter table Books_Author add CONSTRAINT check_book_id_1 check(book_id between 'BOOK0000' and 'BOOK9999');<br />
// alter table Books_Author add CONSTRAINT check_author_id_1 check(author_id between 'AUTH0000' and 'AUTH9999');<br />
// alter table Books_Genre add CONSTRAINT check_book_id_2 check(book_id between 'BOOK0000' and 'BOOK9999');<br />
// alter table Books_Genre add CONSTRAINT check_genre_id check(genre_id between 'GENR0000' and 'GENR9999');<br />
// alter table Genre add CONSTRAINT check_genre_id_ check(genre_id between 'GENR0000' and 'GENR9999');<br />
// alter table Sales add CONSTRAINT check_book_id_3 check(book_id between 'BOOK0000' and 'BOOK9999');<br />
// alter table User add CONSTRAINT check_user_id check(user_id between 'USER0000' and 'USER9999');<br />
// alter table User add CONSTRAINT check_basket_id_1 check(basket_id between 'BASK0000' and 'BASK9999');<br />
// alter table User modify contact_no varchar(15);
