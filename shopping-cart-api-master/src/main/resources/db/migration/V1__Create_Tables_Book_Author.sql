create table book (id int8 not null, description varchar(255), image_url varchar(255), name varchar(255), primary key (id));

create table book_authors (book_id int8 not null, authors varchar(255));

alter table if exists book_authors add constraint FKs4xm7q8i3uxvaiswj1c35nnxw foreign key (book_id) references book;

create sequence hibernate_sequence start 1 increment 1;
