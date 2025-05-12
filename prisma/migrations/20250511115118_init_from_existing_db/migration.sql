/*
  Warnings:

  - You are about to drop the `developer` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `developer`;

-- CreateTable
CREATE TABLE `developers` (
    `developer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `country` VARCHAR(50) NULL,
    `founded_year` INTEGER NULL,
    `website` VARCHAR(255) NULL,

    PRIMARY KEY (`developer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `games` (
    `game_id` INTEGER NOT NULL AUTO_INCREMENT,
    `genre_id` INTEGER NULL,
    `title` VARCHAR(100) NOT NULL,
    `release_date` DATE NULL,
    `developer_id` INTEGER NULL,
    `publisher_id` INTEGER NULL,
    `price` DECIMAL(10, 2) NULL,
    `rating` DECIMAL(3, 1) NULL,

    INDEX `developer_id`(`developer_id`),
    INDEX `genre_id`(`genre_id`),
    INDEX `publisher_id`(`publisher_id`),
    PRIMARY KEY (`game_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `genres` (
    `genre_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`genre_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `publishers` (
    `publisher_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `country` VARCHAR(50) NULL,
    `founded_year` INTEGER NULL,
    `website` VARCHAR(255) NULL,

    PRIMARY KEY (`publisher_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_ibfk_1` FOREIGN KEY (`developer_id`) REFERENCES `developers`(`developer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_ibfk_2` FOREIGN KEY (`publisher_id`) REFERENCES `publishers`(`publisher_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_ibfk_3` FOREIGN KEY (`genre_id`) REFERENCES `genres`(`genre_id`) ON DELETE RESTRICT ON UPDATE RESTRICT;
