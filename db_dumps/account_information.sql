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
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_account`
--

LOCK TABLES `accounts_account` WRITE;
/*!40000 ALTER TABLE `accounts_account` DISABLE KEYS */;
INSERT INTO `accounts_account` VALUES (1,'test@yahoo.com','test-user',_binary '�\0\0\0\0h�*�JA3B;2F\�(�UI\�׻e�wz\�\nI\�*\�\�GY��V\n��\��{Y��/\��X�\�=`~�ӱ����<C�5q\�^��͚)w','Yahoo','https://www.yahoo.com','An email account','2023-10-03 18:08:42.569391','2025-08-27 15:56:40.010929',5,1),(2,'sppaskal@gmail.com','sppaskal',_binary '�\0\0\0\0h\�\0\�\�\�x���e��*C\�p��*o�6�F\�Ο\�\�ܾ�d��\'�f�<BL{\�*�\��\rK�\�&�\'8����\�Z��\r�q\�_\�A\�','GBCS','https://www.gbcsgroup.com/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-03 18:08:50.645146','2025-09-11 17:03:11.462653',1,1),(3,'sppaskal@gmail.com','sppaskal',_binary '�\0\0\0\0f�n�9.G��k֚\�1�\��U�w.E;B\�{sq���wD6��c��\��ҷ9nc�ϴj\�\�XM�\�r�n����v�dܰR\�D�','SkyIT','https://www.skyit.services/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-03 18:19:42.442407','2024-04-09 01:44:14.598746',1,1),(39,'paskalevslavi@yahoo.ca','test',_binary '�\0\0\0\0h\��]lm:bg�[0��\�7�4785�xN��&�(p5Ls�D��\�6I��^\�ϖ`���\���v?�im�\�N��ѨHIG�s��n6�\�D','test','https://www.amazon.ca/','test','2025-09-09 00:23:59.006008','2025-09-11 16:57:01.353648',3,1),(41,'paskalevslavi@yahoo.ca','test',_binary '�\0\0\0\0h��;q���L\�FM9pyˈ|*�q+{)\�n)\�W�\�GB\�?#+�(��\�WZaa�\�\�$=\"h]\�	4��\n\�=83{\�H�ԍ�\r4','test','https://www.amazon.ca/','','2025-09-09 18:50:01.997877','2025-09-09 21:55:07.421774',2,1),(44,'paskalevslavi@yahoo.ca','test',_binary '�\0\0\0\0h\�\0\�f\�y�0�B�����\�\�t����c`��jj�\�k�\�7G\�X�l\\�\�\�e\�Gz©o����4\�4�j\��\�X=�/�\�{','tset','https://www.amazon.ca/','','2025-09-11 17:03:24.951112','2025-09-11 17:03:24.951130',3,1),(46,'test@test.com','Mentozen',_binary '�\0\0\0\0hɦ\�\�=\�o?�F\�.�v%1\���Yca\�wSa��x���Ɂlf�LD*7��\�\�QHƪ\�]=��1Z,Ŧt�h\'��{!G�|�,\�<p\�\�','Blizzard','https://www.blizzard.com/en-us/','This account is used to manage all blizzard products.','2025-09-16 17:42:39.129930','2025-09-16 18:05:10.101439',3,1),(47,'schoo@test.ca','student',_binary '�\0\0\0\0hɥ\�\��\�\�\"�\�	^�\�\\�jT\��A�n\Z|\�ﷲ\�O�.EOJ#�n�t\�%�B��\�\�\Z\�ꩨ\�o�\��{Ф\�\�\�٧��M�(','University of Calgary','https://ucalgary.ca/','This is a university account.','2025-09-16 18:01:12.811860','2025-09-16 18:01:12.811883',2,1),(48,'teschoo@test.ca','test',_binary '�\0\0\0\0hɩ%*\��\�ĕ\�-�9\�^�\�\�b.�\'-�p\Z�q�F�|��U�VC{\�v�XNSc�GSm�,p=\\$�O%�|4n��-�Q��(','University of Calgary','https://ucalgary.ca/','','2025-09-16 18:14:07.378074','2025-09-16 18:15:01.212557',1,1),(49,'testteschoo@test.ca','test',_binary '�\0\0\0\0h\�7��8��Q����U?��\"hJ,\�9�ő\�<��\�\��6���\�\�G�G�\��\'am9����*0rh\�u*!�N��:ʀ�+�g�','test','https://ucalgary.ca/','','2025-09-17 04:23:00.281966','2025-09-17 04:23:00.282000',4,3);
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

-- Dump completed on 2025-09-16 22:24:34
