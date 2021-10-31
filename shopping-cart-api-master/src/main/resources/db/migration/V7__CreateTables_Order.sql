create table customer (id int8 not null, address varchar(255), city varchar(255), country varchar(255), pincode varchar(255), email varchar(255), name varchar(255), primary key (id));
create table order_item (id int8 not null, book_id int8 not null, name varchar(255), price float8 not null, quantity int4 not null, orderid int8, primary key (id));
create table orders (id int8 not null, total_price float8, customer_id int8, primary key (id));
alter table if exists order_item add constraint FK6qdi17749hl3bd01qyvxkid49 foreign key (orderid) references orders;
alter table if exists orders add constraint FK624gtjin3po807j3vix093tlf foreign key (customer_id) references customer;
