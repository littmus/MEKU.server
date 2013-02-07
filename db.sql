use meku;

CREATE TABLE  IF NOT EXISTS meku_users (
	id int(10) not null auto_increment primary key,
	hash varchar(32) not null
) DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lectures (
	id int(10) not null auto_increment primary key,
	number varchar(10) not null,
	name varchar(100) not null
) DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_users_lectures (
	id int(10) not null auto_increment primary key,
	user_id int(10) not null,
	lecture_id int(10) not null
) DEFAULT CHARSET = utf8;