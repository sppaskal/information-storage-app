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
INSERT INTO `accounts_account` VALUES (1,'sppaskal@outlook.com','sppaskal',_binary 'Ä\0\0\0\0fùkD\Õ|\ﬂ\\jñh˘é1Mî>D\«M3&à≥.\Ìuàπõ	5\r\Õ7\'F.∏Û¥lJ\nb`n\”\‰áùøßÅ\≈\ËutófÅj˚N≤\Õ\≈b','University of Calgary','https://www.ucalgary.ca/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-03 18:08:42.569391','2024-04-09 01:44:11.373313',2),(2,'sppaskal@gmail.com','sppaskal',_binary 'Ä\0\0\0\0fùl:ßßs$\n\ rk#>LZÛÆTÛ\ÊWeÛ∂\◊\“E\’Z\‘>™\…jØ\'yêñ\„àÙ∑7íkt¥+\Ô)kp™öŒôqI]b¢\‰Ñ\Ÿ\Ìª]\›T4\“\ÿŸÄ','GBCS','https://www.gbcsgroup.com/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-03 18:08:50.645146','2024-04-09 01:44:12.934667',1),(3,'sppaskal@gmail.com','sppaskal',_binary 'Ä\0\0\0\0fùnØ9.G˛µk÷ö\Á1ú\»ÛëU†w.E;B\ {sq∂πæwD6˚¥cˆ∏\∆ı“∑9nc©œ¥j\«\ËéXMØ\÷r˛n™ôπ¥vπd‹∞R\∆DÙ','SkyIT','https://www.skyit.services/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-03 18:19:42.442407','2024-04-09 01:44:14.598746',1),(4,'paskalevslavi@yahoo.ca','paskalevs',_binary 'Ä\0\0\0\0fùp<ú\Âä˝riÄï.=Ñ∫RÉ\n[9¯\„ÕÄ6´ú+£(Å—ÖJ!Òîñg ¨ä\”zÕ≠;DXAÚ\‡ô\·FØ@	ƒù§]ï˜\nCp%™x','Amazon','https://www.amazon.ca/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-25 00:01:53.473749','2024-04-09 01:44:16.036551',4),(5,'paskalevslavi@yahoo.ca','slavoid',_binary 'Ä\0\0\0\0fùq(dˆ l˙ˇ˙\ﬁˆkº\Í=˙áˆk!tSW≤Ωì\ﬁ;í<ú˝ß∂ÅÖB#Wó\Z\ÂFz\ÍÚKí hs\·-LJ°í\«?pDfı\Ó=b‡ÆÅ\ÊÆu&ª\ÃX','Ebay','https://www.ebay.ca/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-25 00:02:19.890684','2024-04-09 01:44:17.392631',4),(6,'paskalevslavi@yahoo.ca','slavoid',_binary 'Ä\0\0\0\0fùs)rB≤(’Ü¡åPU˙\Óõ\Á\„Ù8[\«\Õ˜˚?\¬¬®yk\È≥\‘˚≈öåFßoæ+D\’kç\È¬£çdisû∫ªâ∑I˙C\ÍZ™äF-*˚ñŒ°|IYg','Steam','https://store.steampowered.com/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2023-10-25 00:45:44.978663','2024-04-09 01:44:19.008711',3),(17,'sppaskal@gmail.com','sppaskal',_binary 'Ä\0\0\0\0fùwYÆ¡¿\Œ\√@\È	Gº\‚æ\ﬂOiáØ\Œ8Û’™>Y¡FrŒû\Î(˚vZcñ\„ô^xñã\Ì“©n±≠\Ê\Ì\…\ÏI»¥\À\¬GB\—·Öü?‚≥Åê','Instagram','https://www.instagram.com/','Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of \"de Finibus Bonorum et Malorum\" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, \"Lorem ipsum dolor sit amet..\", comes from a line in section 1.10.32.','2024-01-26 22:58:10.403629','2024-04-09 01:44:23.286362',4);
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

-- Dump completed on 2024-04-08 20:23:41
