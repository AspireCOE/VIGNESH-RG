create table programmer(firstname varchar(8) NOT NULL,DOB date NOT NULL,DOJ date NOT NULL,age int NOT NULL,sex varchar(1) NOT NULL,prof1 varchar(8),prof2 varchar(8),salary int NOT NULL);
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('abc','2003-03-01','2022-03-22',24,'m','java','basics',20000);
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('abcd','2003-04-08','2022-03-22',24,'m','java','basics',20000);
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('ab','2002-02-01','2022-03-22',25,'f','phyton','basics',20000);

 create table software(firstname varchar(8) NOT NULL,title varchar(20) NOT NULL,Dev_in varchar(8) NOT NULL,scost int,dcost int,sold int);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('abc','todle','basics',700,6000,43);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('abcd','joy','basics',700,6000,43);
insert into software (firstname, title, dev_in,scost,dcost,sold) values('ab','boa','basics',700,6000,43);

 create table studies(
firstname varchar(8) NOT NULL,
splace varchar(9) NOT NULL,
course varchar(5) NOT NULL,
cost int);

insert into studies (firstname,splace,course,cost) values('abc','bnm','java',3000);
insert into studies (firstname,splace,course,cost) values('abcd','fms','java',3000);
insert into studies (firstname,splace,course,cost) values('abc','tui','phy',3000);

/*queries 1*/

select avg(scost) from software where dev_in='pascal';
select age,firstname from programmer;
select p.firstname,p.age from programmer p join studies s on p.firstname=s.firstname where course='dsa';
select title, sold from software where sold=(select max(sold) from software);
select firstname,dob from programmer where month(dob)=1;
select min(cost) as lowest_cost from Studies;
select firstname from studies where course='java';
select sum(sold*scost)-sum(dcost) as total_rev from software where dev_in='c';
select title,dev_in,scost,dcost,sold from software where firstname='ramesh';
select count(firstname) as tot_count from studies where splace='subhari';
select firstname,title,dev_in,scost,dcost,sold from software where (sold*scost)>20000;
select title from software where dcost=(select max(dcost) from software);
select count(title) from software where dev_in='dbase';
select count(firstname) from studies where splace='paragathi';
select firstname from studies where cost >=5000 and cost<=10000;
select avg(cost) from studies;
select firstname,dob,doj,age,sex,salary from programmer where prof1='c' or prof2='c';
select firstname from programmer where prof1='pascal' or prof1='cobol';
select firstname from programmer where prof1!='pascal' or prof1!='cobol';
select max(age) as oldest_aged_male from programmer where sex='m';
select avg(age) as avg_ageof_female_programmer from programmer where sex='f';
select firstname ,timestampdiff(year,doj,now()) as experience from programmer order by experience desc;
select firstname as bday_mnth from programmer where month(dob)= month(now());
select count(firstname) from programmer where sex='f';
select distinct firstname,prof1 from programmer union select firstname,prof2 from programmer;
select distinct prof1 from programmer;
select distinct prof as lang_known from (select prof1 as prof from programmer where sex='m'union select prof2 as prof from programmer where sex='m') as lang;
select avg(salary) as average_salary from programmer;
select count(firstname) from programmer where salary>=2000 and salary<=4000;
select * from programmer where prof1 not in('pascal','clipper','cobol') and prof2 not in ('pascal','clipper','cobol');
select count(firstname) from programmer where sex='f' and age>=24;
select firstname from programmer where month(dob)=month(now()) and (day(now())-day(dob))<=7;
select * from programmer where timestampdiff(month,dob,now())<12;
select * from programmer where timestampdiff(year,doj,curdate())=2;
select title,dcost-(scost*sold) from software where dcost > scost*sold;
select title from software where sold=0;
select scost from software where firstname='merry';
select distinct splace from studies;
select count(distinct course) as num_of_courses from studies;
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('abab','2002-02-01','2022-03-22',25,'f','phyton','basics',20000);
select firstname from programmer where (length(firstname)-length(replace(firstname,'a','')))=2;
select firstname from programmer where length(firstname)<=5;
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('a','2003-03-01','2020-03-22',24,'f','java','cobol',20000);
select firstname from programmer where sex='f' and( prof1='cobol' or prof2='cobol' ) and timestampdiff(year,doj,now())>=2;
select min(length(firstname)) as shortest_name from programmer;
select avg(dcost),dev_in from software where title='cobol' group by dev_in;
select firstname,sex,concat(day(dob),'/',month(dob),'/',year(dob)) as dob,concat(day(dob),'/',month(dob),'/',year(dob)) as doj from programmer;
select firstname from programmer where day(dob)=day(last_day(dob));
insert into programmer (firstname,dob,doj,age,sex,prof1,prof2,salary) values ('ababd','2002-02-28','2022-03-22',25,'f','phyton','basics',20000);
select sum(salary) as amount_paid from programmer where sex='m' and prof1!='cobol' and prof2!='cobol';
select title, scost, dcost,(dcost-scost)as diff from software order by diff desc;
select firstname, dob, doj from programmer where month(dob)=month(doj);
select title from software where length(firstname)>1;
