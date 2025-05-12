-- CreateTable
CREATE TABLE `Developer` (
    `developer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(100) NOT NULL,
    `country` VARCHAR(50) NULL,
    `founded_year` INTEGER NULL,
    `website` VARCHAR(255) NULL,

    PRIMARY KEY (`developer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
