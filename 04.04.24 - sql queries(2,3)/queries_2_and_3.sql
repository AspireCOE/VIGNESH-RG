create table programmer(firstname varchar(8) NOT NULL,DOB date NOT NULL,DOJ date NOT NULL,age int NOT NULL,sex varchar(1) NOT NULL,prof1 varchar(8),prof2 varchar(8),salary int NOT NULL);
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('abc','2003-03-01','2022-03-22',24,'m','java','basics',20000);
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('abcd','2003-04-08','2022-03-22',24,'m','java','basics',20000);
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('ab','2002-02-01','2022-03-22',25,'f','phyton','basics',20000);

create table software(firstname varchar(8) NOT NULL,title varchar(20) NOT NULL,Dev_in varchar(8) NOT NULL,scost int,dcost int,sold int);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('abc','todle','basics',700,6000,43);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('abcd','joy','basics',700,6000,43);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('ab','boa','basics',700,6000,43);

create table studies(firstname varchar(8) NOT NULL,splace varchar(9) NOT NULL,course varchar(5) NOT NULL,cost int);

insert into studies (firstname,splace,course,cost) values('abc','bnm','java',3000);
insert into studies (firstname,splace,course,cost) values('abcd','fms','java',3000);
insert into studies (firstname,splace,course,cost) values('abc','tui','phy',3000);
insert into studies (firstname,splace,course,cost) values('abc','tui','phy',3000);
insert into studies (firstname,splace,course,cost) values('am','tui','phy',3000);
select * from studies;

/*queries 2*/


/*queries 2*/
truncate table software;
insert into software (firstname, title, dev_in,scost,dcost,sold) values('a','t1','basic1',700,6500,43);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('b','t2','basic2',700,6000,23);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('c','t2','basic2',700,7000,21);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('c','t1','basic2',700,7000,21);
select * from software;
-- 1:
insert into software (firstname, title, dev_in,scost,dcost,sold) values('abce','todle','basics1',700,6000,43);
select title,count(dev_in) from software group by title;
select firstname,count(dev_in) from software group by firstname;
select sex,count(sex) from programmer group by sex;
select title,max(dcost) from software group by title;
select title,max(dcost),max(sold) from software group by title;
select year(dob),count(firstname) from programmer group by year(dob);
select year(doj),count(firstname) from programmer group by year(doj);
select month(dob),count(firstname) from programmer group by month(dob);
select month(doj),count(firstname) from programmer group by month(doj);
select prof1,count(prof1) from programmer group by(prof1);
select prof2,count(prof2) from programmer group by(prof2);
select salary,count(firstname) from programmer group by salary;
select splace,count(splace) from studies group by splace;
select course,count(course) from studies group by course;
select dev_in,sum(dcost) as total_cost from software group by dev_in;
select dev_in,sum(scost) as total_sells from software group by dev_in;
select firstname,sum(dcost) from software group by firstname;
select firstname,sum((scost*sold)) from software group by firstname;
select firstname,(count(distinct dev_in)) from software group by firstname;
select title,firstname,sum(scost*sold) from software group by title,firstname;
select firstname,max(dcost),min(dcost) from software group by firstname;
select title,avg(dcost),avg(scost*sold),avg(scost*1) from software group by title;
select splace,count(course),avg(cost) from studies group by splace;
select splace,count(firstname) from studies group by splace;
select firstname from programmer where sex='m' or sex='f'; 
select p.firstname,s.dev_in from programmer p join software s on p.firstname=s.firstname;
select title,count(dev_in) from software where dcost<1000 group by title;
select title,(avg(dcost) - avg(scost)) from software group by(title);
select firstname,sum(scost),sum(dcost),(sum(dcost)-sum(scost * sold)) from software group by firstname having sum(scost*sold) > sum(dcost);
select max(salary),min(salary),avg(salary) from programmer where salary>2000;

/*queries 3*/

select firstname from programmer where (salary=(select max(salary) from programmer)) and (prof1='c' or prof2='c');
select firstname from programmer where (salary=(select max(salary) from programmer)) and (prof1='c' or prof2='c') and sex='f';
select prof1,max(salary) from programmer group by prof1;
select firstname,timestampdiff(month,doj,now()) as least_experienced from programmer where timestampdiff(month,doj,now())=(select min(timestampdiff(month,doj,now())) as junior from programmer);
select firstname,timestampdiff(month,doj,now()) as most_experienced from programmer where timestampdiff(month,doj,now())=(select max(timestampdiff(month,doj,now())) as senior from programmer);
select prof1 as lang from programmer group by lang having count(distinct firstname)=1 union (select prof2 as lang from programmer group by lang having count(distinct firstname)=1); 
select firstname as youngest_programmer from programmer where timestampdiff(day,dob,now())=(select min(timestampdiff(day,dob,now())) from programmer);
select splace,count(distinct firstname) as num_std from studies group by splace having count(distinct firstname)=(select max(std) from (select count(distinct firstname) as std from studies group by splace) as max_std);
-- 9
select firstname from programmer where sex='f' and prof1 not in ( 'C', 'C++', 'Oracle','Dbase') and prof2 not in ( 'C', 'C++', 'Oracle','Dbase') and salary>3000;
select distinct course from studies where cost=(select max(cost) from studies);
select course,count(distinct firstname) from studies group by course having count(distinct firstname)=(select max(cnt) from (select count(distinct firstname)as cnt from studies group by course)as max_cnt);
select distinct splace,course from studies where (cost)=(select avg(cost) from studies);
select distinct splace,course from studies where cost=(select max(cost) from studies);
select * from studies;
select course,count(distinct firstname) from studies group by course having count(distinct firstname)<(select avg(std) from (select count(distinct firstname)as std from studies)as std_min); 
-- 16
select course from studies where (cost)-(select avg(cost) from studies)<=1000 or (cost)-(select avg(cost) from studies)>=-1000;
select dev_in from software where dcost=(select max(dcost) from software);
select dev_in from software where scost=(select min(scost) from software);
select firstname from software where sold=(select min(sold) from software);
select sold from software where (dcost-scost)=(select min(dcost-scost) from software);
select dev_in from software where (dcost=(select max(dcost) from software)) and title='pascal';
select title,count(distinct dev_in) from software group by title having (count(distinct dev_in))=(select max(std) from(select count(distinct dev_in)as std from software)as max_std);
select title,count(distinct dev_in) from software group by title having (count(distinct dev_in))=(select max(std) from(select count(distinct dev_in)as std from software)as max_std);
select firstname from software where scost*sold =(select max(scost*sold) from software);
select dev_in from software where sold<(select avg(sold) from software); 
select firstname from programmer where sex='f' and salary>(select max(salary) from programmer where sex='m');
select prof1,count(distinct firstname) from programmer group by prof1 having count(firstname) =(select max(std) from (select count(distinct firstname) as std from programmer group by prof1)as max_std);
select firstname from software where scost*sold>=2*dcost;
select firstname,title,dev_in from software where dcost in(select min(dcost) from software group by firstname,title); 
select firstname from programmer where sex='m' and year(dob)=1965 order by dob limit 1;
select distinct firstname,title,sold from software where sold in (select max(sold) from software group by firstname) union select distinct firstname,title,sold as min_sold from software where sold in (select min(sold) from software group by firstname);
select distinct firstname,title,max_sold,min_sold from(select firstname,title,max(sold)as max_sold,min(sold) as min_sold from software group by firstname,title)as std;
select firstname from programmer where sex='m' and year(dob)=1992 order by dob desc limit 1;
select year(dob) from programmer group by year(dob) having count(year(dob))= (select max(std) from (select count(year(dob))as std from programmer group by year(dob))as max_std);
select month(doj) from programmer group by month(doj) having count(month(doj))=(select max(std) from (select count(month(doj))as std from programmer group by month(doj))as max_std);
select prof1,count(firstname) from programmer group by prof1 having count(firstname)=(select max(std) from(select count(firstname) as std from programmer group by prof1)as max_std);
select firstname from programmer where sex='m' and salary<(select avg(salary) from programmer where sex='f');