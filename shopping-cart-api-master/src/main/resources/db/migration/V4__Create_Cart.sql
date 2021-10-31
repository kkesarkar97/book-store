create table cart (id int8 not null, primary key (id));
create table cart_items (cart_id int8 not null, book_id int8, quantity int4 not null);
alter table if exists cart_items add constraint FKd5p1jgglnj3gl89odc95hurot foreign key (book_id) references book;
alter table if exists cart_items add constraint FK99e0am9jpriwxcm6is7xfedy3 foreign key (cart_id) references cart;
