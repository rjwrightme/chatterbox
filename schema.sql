-- Drops the chatterbox db if it exists currently --
DROP DATABASE IF EXISTS chatterbox;
-- Creates the "chatterbox" database --
CREATE DATABASE chatterbox;
use chatterbox;

CREATE TABLE app_user
(
	id int NOT NULL AUTO_INCREMENT,
	name varchar(50) NOT NULL,
    email varchar (50) NOT NULL,
    password varchar (50) NOT NULL,
    age INT,
    location varchar (50) NOT NULL,
    avatar varchar (200),
	PRIMARY KEY (id)
);

CREATE TABLE user_chat
(
	id int NOT NULL AUTO_INCREMENT,
	message varchar(1000),
    user_id INT,
    PRIMARY KEY (id),    
    FOREIGN KEY (user_id) REFERENCES app_user(id)
);