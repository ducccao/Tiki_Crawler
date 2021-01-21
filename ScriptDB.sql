/*
Source Server: 
Source Server Type: MySQL
Source Server Version:
Source Host: 127.0.0.1:3306
Source Schema: titkicrawler

Target Server Type: MySQL
Terget Server Version:
File Encoding:

Date: 18/01/2021 19:36:44

*/
SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

DROP DATABASE IF EXISTS titkicrawler;
CREATE DATABASE titkicrawler CHARACTER SET 'utf8' COLLATE 'utf8_general_ci';

use titkicrawler;

-- --------------------------
-- Table structure for Users
-- --------------------------
DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users`(
`userID` int unsigned NOT NULL AUTO_INCREMENT,
`userName` nvarchar(5000) COLLATE utf8_unicode_ci NOT NULL,
PRIMARY KEY (`userID`)
) ENGINE=MyISAM auto_increment=1 default  charset=utf8 COLLATE=utf8_unicode_ci;
-- --------------------------
-- Records of Users
-- --------------------------


-- BEGIN;
-- INSERT INTO `Users` VALUES(1,"duccao",1);
-- INSERT INTO `Users` VALUES(2,"nghihua",2);
-- INSERT INTO `Users` VALUES(3,"khanhbui",3);
-- INSERT INTO `Users` VALUES(4,"ngankim",4);
-- COMMIT;


-- --------------------------
-- Table structure for Comments
-- --------------------------
DROP TABLE IF EXISTS `Comments`;
CREATE TABLE `Comments`(
`userID` int unsigned NOT NULL AUTO_INCREMENT,
`comment` nvarchar(5000) COLLATE utf8_unicode_ci NOT NULL,
PRIMARY KEY (`userID`),
FOREIGN KEY (`userID`) REFERENCES  `Users` (`userID`)
) ENGINE=MyISAM auto_increment=1 default  charset=utf8 COLLATE=utf8_unicode_ci;
-- --------------------------
-- Records of Comments
-- --------------------------


-- BEGIN;
-- INSERT INTO `Comments` VALUES(1,"duccao",1);
-- INSERT INTO `Comments` VALUES(2,"nghihua",2);
-- INSERT INTO `Comments` VALUES(3,"khanhbui",3);
-- INSERT INTO `Comments` VALUES(4,"ngankim",4);
-- COMMIT;



-- --------------------------
-- Table structure for Rating
-- --------------------------
DROP TABLE IF EXISTS `Rating`;
CREATE TABLE `Rating`(
`userID` int unsigned NOT NULL AUTO_INCREMENT,
`rate` int,
PRIMARY KEY (`userID`),
FOREIGN KEY (`userID`) REFERENCES  `Users` (`userID`)
) ENGINE=MyISAM auto_increment=1 default  charset=utf8 COLLATE=utf8_unicode_ci;
-- --------------------------
-- Records of Comments
-- --------------------------


-- BEGIN;
-- INSERT INTO `Rating` VALUES(1,"duccao",1);
-- INSERT INTO `Rating` VALUES(2,"nghihua",2);
-- INSERT INTO `Rating` VALUES(3,"khanhbui",3);
-- INSERT INTO `Rating` VALUES(4,"ngankim",4);
-- COMMIT;





-- --------------------------
-- Table structure for Products
-- --------------------------
DROP TABLE IF EXISTS `Products`;
CREATE TABLE `Products`(
`proID` int unsigned NOT NULL AUTO_INCREMENT,
`proName`  nvarchar(5000) COLLATE utf8_unicode_ci NOT NULL,
`price` nvarchar(5000) COLLATE utf8_unicode_ci NOT NULL,
`proDetailURL`  nvarchar(5000) COLLATE utf8_unicode_ci NOT NULL,
PRIMARY KEY (`proID`)
) ENGINE=MyISAM auto_increment=1 default  charset=utf8 COLLATE=utf8_unicode_ci;
-- --------------------------
-- Records of Products
-- --------------------------


-- BEGIN;
-- INSERT INTO `Products` VALUES(1,"xe dap","xedap@html.com" ,'/xe-dap-cho-be-gai-banh-12-14-16-18-20-inch-cho-be-mau-moi-nhat-p52626294.html?spid=74198844&src=search_ads');
-- INSERT INTO `Products` VALUES(2,"xe may","xemay@html.com" ,'/xe-dap-cho-be-gai-banh-12-14-16-18-20-inch-cho-be-mau-moi-nhat-p52626294.html?spid=74198844&src=search_ads');
-- INSERT INTO `Products` VALUES(3,"xe hoi","xehoi@html.com" ,'/xe-dap-cho-be-gai-banh-12-14-16-18-20-inch-cho-be-mau-moi-nhat-p52626294.html?spid=74198844&src=search_ads');
-- INSERT INTO `Products` VALUES(4,"xe lan","xelan@html.com" ,'/xe-dap-cho-be-gai-banh-12-14-16-18-20-inch-cho-be-mau-moi-nhat-p52626294.html?spid=74198844&src=search_ads');
-- COMMIT;



-- --------------------------
-- Table structure for ProductDescription
-- --------------------------
DROP TABLE IF EXISTS `ProductDescription`;
CREATE TABLE `ProductDescription`(
`proID` int unsigned NOT NULL AUTO_INCREMENT,
`fullDes` text COLLATE utf8_unicode_ci NOT NULL ,
PRIMARY KEY (`proID`),
FOREIGN KEY (`proID`) REFERENCES `Products` (`proID`)
) ENGINE=MyISAM auto_increment=1 default  charset=utf8 COLLATE=utf8_unicode_ci;
-- --------------------------
-- Records of Products
-- --------------------------



-- BEGIN;
-- INSERT INTO `ProductDescription` VALUES(1,"xeeeeeee dap");
-- INSERT INTO `ProductDescription` VALUES(2,'xeeeeeee may');
-- INSERT INTO `ProductDescription` VALUES(3,'xeeeeeee hoii');
-- INSERT INTO `ProductDescription` VALUES(4,'xeeeeeee lan');
-- COMMIT;





-- --------------------------
-- Table structure for ProductDetails
-- --------------------------
DROP TABLE IF EXISTS `ProductDetails`;
CREATE TABLE `ProductDetails`(
`proID` int(20) unsigned NOT NULL AUTO_INCREMENT,
`tradeMark` nvarchar(5000) COLLATE utf8_unicode_ci ,
`branchOrigin`  nvarchar(5000) COLLATE utf8_unicode_ci ,
`branch`  text,
`expiryDate` nvarchar(5000) COLLATE utf8_unicode_ci,
`SKU`  nvarchar(5000) COLLATE utf8_unicode_ci,
PRIMARY KEY (`proID`),
FOREIGN KEY (`proID`) REFERENCES `Products` (`proID`)
) ENGINE=MyISAM auto_increment=1 default  charset=utf8 COLLATE=utf8_unicode_ci;
-- --------------------------
-- Records of ProductDetails
-- --------------------------


-- BEGIN;
-- INSERT INTO `ProductDetails` VALUES(1, "OEM","Viet Nam",'VN','Hết hạn sau 20 năm','1219366796178');
-- INSERT INTO `ProductDetails` VALUES(2,"OEM","Nhat Bon",'Japan','Hết hạn sau 40 năm','1219366796171');
-- INSERT INTO `ProductDetails` VALUES(3,"OEM","Duc",'Germany','Hết hạn sau 60 năm','1219366796177');
-- INSERT INTO `ProductDetails` VALUES(4,"OEM","Viet Nam",'VN','Hết hạn sau 80 năm','1219366796172');
-- COMMIT;




SET FOREIGN_KEY_CHECKS = 1




