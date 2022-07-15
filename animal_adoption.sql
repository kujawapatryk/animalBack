-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Wersja serwera:               10.4.24-MariaDB - mariadb.org binary distribution
-- Serwer OS:                    Win64
-- HeidiSQL Wersja:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Zrzut struktury bazy danych animal_adoption
CREATE DATABASE IF NOT EXISTS `animal_adoption` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `animal_adoption`;

-- Zrzut struktury tabela animal_adoption.animal
CREATE TABLE IF NOT EXISTS `animal` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `title` varchar(255) NOT NULL,
  `name` varchar(48) NOT NULL,
  `gender` varchar(10) NOT NULL,
  `age` tinyint(4) NOT NULL,
  `breed` varchar(30) NOT NULL,
  `dog_size` varchar(16) NOT NULL,
  `reproduction` tinyint(4) DEFAULT NULL,
  `child_friendly` tinyint(4) DEFAULT NULL,
  `pet_friendly` tinyint(4) DEFAULT NULL,
  `author` varchar(36) NOT NULL,
  `date` date NOT NULL,
  PRIMARY KEY (`id`),
  KEY `breed` (`breed`),
  KEY `author` (`author`),
  CONSTRAINT `animal_ibfk_1` FOREIGN KEY (`breed`) REFERENCES `breeds` (`breed`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `animal_ibfk_2` FOREIGN KEY (`author`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eksport danych został odznaczony.

-- Zrzut struktury tabela animal_adoption.breeds
CREATE TABLE IF NOT EXISTS `breeds` (
  `breed` varchar(30) NOT NULL,
  PRIMARY KEY (`breed`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eksport danych został odznaczony.

-- Zrzut struktury tabela animal_adoption.moderators
CREATE TABLE IF NOT EXISTS `moderators` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `user_id` varchar(36) NOT NULL,
  `organization_id` varchar(36) NOT NULL,
  `permissions` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`,`organization_id`),
  KEY `organization_id` (`organization_id`),
  CONSTRAINT `moderators_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `moderators_ibfk_2` FOREIGN KEY (`organization_id`) REFERENCES `organizations` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eksport danych został odznaczony.

-- Zrzut struktury tabela animal_adoption.organizations
CREATE TABLE IF NOT EXISTS `organizations` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `name` varchar(256) NOT NULL,
  `description` text NOT NULL,
  `owner_id` varchar(36) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `organizations_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eksport danych został odznaczony.

-- Zrzut struktury tabela animal_adoption.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` varchar(36) NOT NULL DEFAULT 'uuid()',
  `name` varchar(64) NOT NULL,
  `password` varchar(60) NOT NULL,
  `mail` varchar(256) NOT NULL,
  `date_reg` datetime DEFAULT NULL,
  `login_key` varchar(36) DEFAULT NULL,
  `login_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Eksport danych został odznaczony.

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
