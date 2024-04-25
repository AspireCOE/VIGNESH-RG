create database customer;

use customer;

create table custable( customerid int,customername varchar(25),email varchar(25),Address varchar(25));
alter table custable add column phone_no int after email;

insert into custable (customerid,customername,email,phone_no,Address) values(1,'abcd','abcd123@gmail.com','1234567990','coimbatore');
insert into custable (customerid,customername,email,phone_no,Address) values(2,'abc','abc123@gmail.com','1234567890','coimbatore');
insert into custable (customerid,customername,email,phone_no,Address) values(2,'vignesh','vignesh@gmail.com','1224567890','chennai');

alter table custable rename column customername to customerfirstname;
alter table custable add column customerlastname varchar(255) after customerfirstname;
alter table custable add column pan_no int ;
alter table custable drop column email;
alter table custable rename customertable;
delete from customertable where address='chennai';
set sql_safe_updates=0;

UPDATE customertable SET customerid = '3' WHERE customerfirstname ='vignesh';

update customertable set pan_no=234567 where Address='coimbatore';
insert into customertable(customerid,customerfirstname,customerlastname,phone_no,Address,pan_no) values(3,'krish','krish@gmail.com',1223367890,'Tirupur',null);
delete from customertable where pan_no is null;