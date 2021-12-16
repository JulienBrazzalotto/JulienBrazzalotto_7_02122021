DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania CHARACTER SET 'utf8';

USE groupomania;

CREATE TABLE Articles
(
  id            SMALLINT      UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
  title         VARCHAR(50)   NOT NULL  UNIQUE,
  image         VARCHAR(50)   NOT NULL  UNIQUE,
  created_date  DATETIME      NOT NULL,
  updated_date  DATETIME      NOT NULL,
  link          VARCHAR(255)  NOT NULL  UNIQUE,
  content       TEXT          NOT NULL
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Users
(
  id            SMALLINT      	UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
  nom           VARCHAR(50)   	NOT NULL,
  prenom    	VARCHAR(50)   	NOT NULL,
  image         VARCHAR(50),
  email         VARCHAR(100)  	NOT NULL  UNIQUE,
  password      VARCHAR(100)  	NOT NULL,
  role          SMALLINT        NOT NULL
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Comments
(
  id            SMALLINT        UNSIGNED      PRIMARY KEY   AUTO_INCREMENT,
  content       TEXT            NOT NULL,
  created_date  DATETIME        NOT NULL,
  article_id    SMALLINT        UNSIGNED      NOT NULL,
  user_id       SMALLINT        UNSIGNED      NOT NULL,
  CONSTRAINT    fk_article_id   FOREIGN KEY   (article_id)  REFERENCES      Articles(id),
  CONSTRAINT    fk_user_id      FOREIGN KEY   (user_id)     REFERENCES      Users(id)
)
ENGINE=INNODB DEFAULT CHARSET=utf8;