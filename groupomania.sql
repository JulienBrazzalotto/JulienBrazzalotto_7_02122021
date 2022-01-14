DROP DATABASE IF EXISTS groupomania;
CREATE DATABASE groupomania CHARACTER SET 'utf8';

USE groupomania;

CREATE TABLE Users
(
  id            SMALLINT      	UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
  nom           VARCHAR(50)   	NOT NULL,
  prenom    	  VARCHAR(50)   	NOT NULL,
  image         VARCHAR(250),
  email         VARCHAR(100)  	NOT NULL  UNIQUE,
  password      VARCHAR(100)  	NOT NULL,
  role          SMALLINT        NOT NULL
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Posts
(
  id            SMALLINT        UNSIGNED  PRIMARY KEY AUTO_INCREMENT,
  title         VARCHAR(50)     NOT NULL,
  image         VARCHAR(250),
  date          DATETIME        NOT NULL,
  content       TEXT            NOT NULL,
  moderate      BOOLEAN         NOT NULL,
  user_id       SMALLINT        UNSIGNED      NOT NULL,
  CONSTRAINT    fk_user_id_posts      FOREIGN KEY   (user_id)     REFERENCES      Users(id) ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

CREATE TABLE Comments
(
  id            SMALLINT        UNSIGNED      PRIMARY KEY   AUTO_INCREMENT,
  content       TEXT            NOT NULL,
  date          DATETIME        NOT NULL,
  moderate      BOOLEAN         NOT NULL,
  post_id       SMALLINT        UNSIGNED      NOT NULL,
  user_id       SMALLINT        UNSIGNED      NOT NULL,
  CONSTRAINT    fk_post_id      FOREIGN KEY   (post_id)     REFERENCES      Posts(id) ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT    fk_user_id_comments      FOREIGN KEY   (user_id)     REFERENCES      Users(id)ON UPDATE CASCADE ON DELETE CASCADE
)
ENGINE=INNODB DEFAULT CHARSET=utf8;

INSERT INTO `Users` VALUES (1,'Admin','Admin', NULL, 'admin@groupomania.com', '$2b$10$tG8.lNoNGJEnNVIVSb1Ck.od4w7kXs.E7idkQvGmP/IW9pBeZgdxq', 0)