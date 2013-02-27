use meku;

CREATE TABLE  IF NOT EXISTS meku_users (
	id int(10) not null auto_increment primary key,
	notify boolean default true
) DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lectures (
	id int(10) not null auto_increment primary key,
	number varchar(10) not null UNIQUE,
	name varchar(100) not null,
	semester varchar(7) not null
) DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_users_lectures (
	id int(10) not null auto_increment primary key,
	user_id int(10) not null,
	lecture_id int(10) not null
) DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lecture_notices {
	id int(10) not null auto_increment primary key,
	lecture_id int(10) not null,
	title varchar(128) not null,
	body varchar (1024) not null,
	created datetime not null
} DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lecture_materials {
	id int(10) not null auto_increment primary key,
	lecture_id int(10) not null,
	title varchar(128) not null,
	body varchar (1024) not null,
	created datetime not null
} DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lecture_stdBoards {
	id int(10) not null auto_increment primary key,
	lecture_id int(10) not null,
	title varchar(128) not null,
	body varchar (1024) not null,
	created datetime not null
} DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lecture_assignments {
	id int(10) not null auto_increment primary key,
	lecture_id int(10) not null,
	title varchar(128) not null,
	body varchar (1024) not null,
	created datetime not null
} DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lecture_notices {
	id int(10) not null auto_increment primary key,
	lecture_id int(10) not null,
	title varchar(128) not null,
	body varchar (1024) not null,
	created datetime not null
} DEFAULT CHARSET = utf8;

CREATE TABLE IF NOT EXISTS meku_lecture_teamprojects {
	id int(10) not null auto_increment primary key,
	lecture_id int(10) not null,
	title varchar(128) not null,
	body varchar (1024) not null,
	created datetime not null
} DEFAULT CHARSET = utf8;