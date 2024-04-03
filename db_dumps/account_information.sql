-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: account_information
-- ------------------------------------------------------
-- Server version	8.0.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `accounts_account`
--

DROP TABLE IF EXISTS `accounts_account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_account` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(254) NOT NULL,
  `username` varchar(254) NOT NULL,
  `password` longblob NOT NULL,
  `company` varchar(254) NOT NULL,
  `website` varchar(200) NOT NULL,
  `description` longtext NOT NULL,
  `date_created` datetime(6) NOT NULL,
  `date_updated` datetime(6) NOT NULL,
  `type_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_account_type_id_299d0cf5_fk_accounts_type_id` (`type_id`),
  CONSTRAINT `accounts_account_type_id_299d0cf5_fk_accounts_type_id` FOREIGN KEY (`type_id`) REFERENCES `accounts_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_account`
--

LOCK TABLES `accounts_account` WRITE;
/*!40000 ALTER TABLE `accounts_account` DISABLE KEYS */;
INSERT INTO `accounts_account` VALUES (1,'testt@gmail.com','testt',_binary '€\0\0\0\0e3\Ñ\å1¡ñ$\æö×‰»Q\Ê\Í\\Š„¿ºŒm\ÛÁ“£ª¥J˜›`;(•\Ğo]\ìORem2(¸	\ÊØ†O\0ø²Áñô8õ²sù‚4\é.ÿN\Öş›','Slav-Co','https://www.example.com','A place for all things slav.','2023-10-03 18:08:42.569391','2023-10-20 23:40:01.720727',2),(2,'test1@gmail.com','test',_binary '€\0\0\0\0eX²Oø4x°ˆz™»N±QV0K¹¼\Ñ2/!ú>Ü¡,wk\Æfÿn\Ó:/\Öğ#~ p›\ê€nxK\îYŠ8W\Åø*z(\ì4üv&\Ñb7\Õj&Ë¨J$\Ø','Slav-Co','https://www.example.com','A place for all things slav.','2023-10-03 18:08:50.645146','2023-10-03 18:08:50.645433',1),(3,'test2@gmail.com','test',_binary '€\0\0\0\0e[>‘@\æ\0«%\Ö …Ÿ3œ?\ì3\ßI\ç\Ä2¶\Z(‹‘ˆ…… ‹˜)(­ğ…¥\ÏkÇ§\Ñ\Äè¸¬H/\é?ñ\Ô0r@W:SIßHß—“ET)¡„c\êı','Slav-Co','https://www.example.com','A place for all things slav.','2023-10-03 18:19:42.442407','2023-10-03 18:19:42.442407',1),(4,'test3@gmail.com','test',_binary '€\0\0\0\0e8Zñ-*ã†°\îÅ\ä<%W\İ[\\I.O	\ÔKyy%¿°ù0œK\ß\ÃL\äNPÅ\ê\Z“CB¸r6\ä“ZG\çL\Û\ÌG\Â×™\éõ±\âRÖ²-YCŸl','Slav-Co','https://www.example.com','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-25 00:01:53.473749','2023-10-25 00:01:53.473749',1),(5,'test4@gmail.com','testt',_binary '€\0\0\0\0e¢Å›¾#\ÔB=½Î¬\íE«<µµÈ„-\Ä¼\âr5:x$D5´P¶]7\ÃzÇ™\Å\î}|±Gu\"\åı\"[ï©‰\'?Yd\ÈQC+’\É\Ö\Øx\ãQ\å\Èq\Ô','Slav-Co','https://www.example.com','A place for all things slav.','2023-10-25 00:02:19.890684','2024-01-13 05:22:32.489984',1),(6,'test5@gmail.com','testt',_binary '€\0\0\0\0e´7\ïÿ¥¡Ü´‰Á Â  Õ¥¡¾¸\Æ\n¿}w¦{Şš\ÒÎ®\àS…\Ì³\r¦˜i_Á\îƒ\æú\Ï/=ao\Îùx8Dş‚C.\r&µ­o]²„\ã\Ú€I','Slav-Co','https://www.example.com','A place for all things slav.','2023-10-25 00:45:44.978663','2024-01-26 22:53:35.606150',1),(17,'test6@gmail.com','test',_binary '€\0\0\0\0e´9\â5‘\07\â^`È¡‰N\Û\ÅIc\ZC\ëšøš›\ŞÚ´TòiZ\çù–\é8¡e”†Â¾Ø¸œŸP\n_³¯\ØbJ‹´/~v+\×\ß068‡ğ]d','Slav-Co','https://www.example.com','A place for all things slav.','2024-01-26 22:58:10.403629','2024-01-26 22:58:10.403629',1);
/*!40000 ALTER TABLE `accounts_account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_type`
--

DROP TABLE IF EXISTS `accounts_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(254) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `accounts_type_name_9fdf234e_uniq` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_type`
--

LOCK TABLES `accounts_type` WRITE;
/*!40000 ALTER TABLE `accounts_type` DISABLE KEYS */;
INSERT INTO `accounts_type` VALUES (3,'gaming'),(4,'random'),(2,'school'),(5,'shopping'),(1,'work');
/*!40000 ALTER TABLE `accounts_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `django_migrations`
--

DROP TABLE IF EXISTS `django_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `django_migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `app` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `applied` datetime(6) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'accounts','0001_initial','2023-09-27 04:50:41.201583'),(2,'accounts','0002_alter_account_password','2023-10-03 17:53:12.123159'),(3,'accounts','0003_type','2023-10-03 18:25:16.032467'),(4,'accounts','0004_account_type','2023-10-03 18:34:47.743073'),(5,'accounts','0005_alter_type_name','2023-10-03 19:08:15.126873');
/*!40000 ALTER TABLE `django_migrations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-29 16:40:25
