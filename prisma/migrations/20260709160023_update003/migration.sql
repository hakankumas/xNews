-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_author_fkey`;

-- DropForeignKey
ALTER TABLE `news` DROP FOREIGN KEY `news_topic_fkey`;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_author_fkey` FOREIGN KEY (`author`) REFERENCES `Author`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `News` ADD CONSTRAINT `News_topic_fkey` FOREIGN KEY (`topic`) REFERENCES `Topic`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
