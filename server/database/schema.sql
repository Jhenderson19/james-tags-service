CREATE DATABASE IF NOT EXISTS fec_pathfinder_tags;
USE fec_pathfinder_tags;
-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'tags'
--
-- ---

DROP TABLE IF EXISTS `tags`;

CREATE TABLE `tags` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'game_tag_joinTable'
--
-- ---

DROP TABLE IF EXISTS `game_tag_joinTable`;

CREATE TABLE `game_tag_joinTable` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `id_tags` INTEGER NOT NULL,
  `id_games` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE `game_tag_joinTable` ADD FOREIGN KEY (id_tags) REFERENCES `tags` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `tags` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `game_tag_joinTable` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `tags` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `game_tag_joinTable` (`id`,`id_tags`,`id_games`) VALUES
-- ('','','');