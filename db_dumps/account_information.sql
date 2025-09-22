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
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `accounts_account_type_id_299d0cf5_fk_accounts_type_id` (`type_id`),
  CONSTRAINT `accounts_account_type_id_299d0cf5_fk_accounts_type_id` FOREIGN KEY (`type_id`) REFERENCES `accounts_type` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_account`
--

LOCK TABLES `accounts_account` WRITE;
/*!40000 ALTER TABLE `accounts_account` DISABLE KEYS */;
INSERT INTO `accounts_account` VALUES (1,'paskals@yahoo.ca','paskal_amazon',_binary '€\0\0\0\0h\ÐA¨OC\Ðl»\'%Ñ¿ÀK‚P]z4ï§µ\ÌZ^½R\Óþ¤¤¾`tXŠ·\rª\"6?EÜ•´ƒ¶\à\Ë_ü\Í^Pi\å¯qƒÄ…\Ù\í\Ø—óbÐ©vp','Amazon','https://www.amazon.ca/','My Amazon shopping account.','2023-10-03 18:08:42.569391','2025-09-21 18:19:20.173045',5,1),(2,'sppaskal@skyit.com','',_binary '€\0\0\0\0h\ÐB(+\Äf£§TÚž·ùNÀ»Ñ£¸£\à\Õý’1]Ž\æ9\í¶:›Wpˆ½W\Û@›=ò}“\ä1!t2š·i˜£\í{²vóÒ«\ïƒ±\ÇÉ¤•\Üû','GBCS','https://www.microsoft.com/en-us/microsoft-365/outlook/log-in','Work email for GBCS.','2023-10-03 18:08:50.645146','2025-09-21 18:21:28.620566',1,1),(3,'sppaskal@gmail.com','sppaskal',_binary '€\0\0\0\0h\ÐBh–˜£	©t¶±Wþ•b„b?&idŠa/\Ãþ~ºÎ°\Z2\Ëoô\è³T{ZIö\\±@d²§ðŠOØ¹¸„$Å’¡¯·G{\é\Æõ>xD¬xŠ\ên ¡','SkyIT','https://www.networksolutions.com/ppc/DomainEmailOffer?siteid=8&channelid=P13C8S570N0B5578A1D4499E0000V126&promo=5DOMAINEMAIL&gad_campaignid=8971979693','DNS provider account.','2023-10-03 18:19:42.442407','2025-09-21 18:22:32.956220',1,1),(39,'paskalevslavi@yahoo.ca','paskalevslavi',_binary '€\0\0\0\0hÑ“s,®ñ†¹ö,O\Íd\äD†^\0¡0:#\'~D!=û_n¹¨\Æ=|ò‰xC\îªA%Ó¤þŒm›@Š\â\×$T‚\Ê\Î\Ãó\Î\0¼\Æ\âžÒ†zR£\ÞÂ¡;€\íú','Wanderlog','https://wanderlog.com/home','A site for planning your itinerary.','2025-09-09 00:23:59.006008','2025-09-22 18:20:35.244729',4,1),(41,'sppaskal@ucalgary.ca','sppaskal',_binary '€\0\0\0\0hÑóV™ôJ\áñ£Ï“\èu;K\Â.¿þ\Ç?q¸er]†s}\Ý|\ã	;\à\Zä§ )\Ëô}AI¦m¸š\ÉS6c\çP.v}:ú\éÈ¹÷l\r\ÜÀ©j\áðó','University of Calgary','https://www.ucalgary.ca/startsomething?gad_campaignid=22689923901','My U of C student account.','2025-09-09 18:50:01.997877','2025-09-22 18:09:55.153424',2,1),(44,'paskalevslavi@yahoo.ca','paskalevs',_binary '€\0\0\0\0hÑ’Aõ\ÒHI¹M¬\ÆD~¨S›¥+ƒ$K>\ÎÞ‡\r^€\rr<òm²\Æo\n›q®\Üw®QÉ †fŒÒ½8–uÀª*…(ò\Zo•c\Ìj,&\Ï•\n’','Codecademy','https://www.codecademy.com/','My codecademy account used for learning various programming languages/concepts.','2025-09-11 17:03:24.951112','2025-09-22 18:15:29.216447',2,1),(46,'paskalevslavi@yahoo.ca','Mentozen',_binary '€\0\0\0\0hÑ‘½ C‘\'\îö\Öa’ñ(‚k\ÕLhš&fˆ\åÿ>\Ó÷\ÛË‹\Ä>z¢aÛ›\Ü\×3˜¶_À\ÒuC¹ö~E\ÏòY\"½\ÔñT©røŠØ´¬(D€','Blizzard','https://www.blizzard.com/en-us/','This account is used to manage all blizzard products.','2025-09-16 17:42:39.129930','2025-09-22 18:10:39.715042',3,1);
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
INSERT INTO `accounts_type` VALUES (3,'gaming'),(4,'other'),(2,'school'),(5,'shopping'),(1,'work');
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `django_migrations`
--

LOCK TABLES `django_migrations` WRITE;
/*!40000 ALTER TABLE `django_migrations` DISABLE KEYS */;
INSERT INTO `django_migrations` VALUES (1,'accounts','0001_initial','2023-09-27 04:50:41.201583'),(2,'accounts','0002_alter_account_password','2023-10-03 17:53:12.123159'),(3,'accounts','0003_type','2023-10-03 18:25:16.032467'),(4,'accounts','0004_account_type','2023-10-03 18:34:47.743073'),(5,'accounts','0005_alter_type_name','2023-10-03 19:08:15.126873'),(6,'accounts','0006_account_user_id','2025-09-16 16:50:02.945572');
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

-- Dump completed on 2025-09-22 11:39:17
