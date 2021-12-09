DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania CHARACTER SET 'utf8';

USE groupomania;

CREATE TABLE article
(
  id            SMALLINT      UNSIGNED      PRIMARY KEY     AUTO_INCREMENT,
  title         VARCHAR(50)   NOT NULL      UNIQUE,
  image         VARCHAR(50)   NOT NULL      UNIQUE,
  created_date  DATETIME      NOT NULL,
  updated_date  DATETIME      NOT NULL,
  content       TEXT          NOT NULL,
  user_id       SMALLINT      UNSIGNED      NOT NULL,
  CONSTRAINT    fk_user_id      FOREIGN KEY   (user_id)     REFERENCES      user(id)
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE user
(
  id            SMALLINT      	UNSIGNED    PRIMARY KEY     AUTO_INCREMENT,
  nom    	    VARCHAR(50)   	NOT NULL,
  prenom    	VARCHAR(50)   	NOT NULL,
  email         VARCHAR(100)  	NOT NULL    UNIQUE,
  password      VARCHAR(100)  	NOT NULL,
  image         VARCHAR(50)	    UNIQUE,
  role_id       SMALLINT        NOT NULL,
  CONSTRAINT    fk_role_id      FOREIGN KEY   (role_id)     REFERENCES      role(id)
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE commentaire
(
  id            SMALLINT        UNSIGNED      PRIMARY KEY   AUTO_INCREMENT,
  content       TEXT            NOT NULL,
  created_date  DATETIME        NOT NULL,
  article_id    SMALLINT        UNSIGNED      NOT NULL,
  user_id       SMALLINT        UNSIGNED      NOT NULL,
  CONSTRAINT    fk_article_id   FOREIGN KEY   (article_id)  REFERENCES      article(id),
  CONSTRAINT    fk_user_id      FOREIGN KEY   (user_id)     REFERENCES      user(id)
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE role
(
  id            SMALLINT        UNSIGNED      PRIMARY KEY   AUTO_INCREMENT,
  role          VARCHAR(50)     NOT NULL,
)
ENGINE=INNODB DEFAULT CHARSET=utf8;