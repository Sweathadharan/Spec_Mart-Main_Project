-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2022 at 05:56 AM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `astore`
--

-- --------------------------------------------------------

--
-- Table structure for table `addresses`
--

CREATE TABLE `addresses` (
  `AddressID` int(11) NOT NULL,
  `UserID` int(11) DEFAULT NULL,
  `FullName` varchar(50) NOT NULL,
  `StreetAddress` varchar(255) NOT NULL,
  `PostCode` varchar(5) NOT NULL,
  `City` varchar(28) NOT NULL,
  `Country` varchar(28) NOT NULL,
  `Phone` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `addresses`
--

INSERT INTO `addresses` (`AddressID`, `UserID`, `FullName`, `StreetAddress`, `PostCode`, `City`, `Country`, `Phone`) VALUES
(4, 4, 'swea', 'abc nagar', '63845', 'erode', 'India', '9000000000'),
(5, 5, 'upto 30 minutes', 'moderate', 'mild', 'severe', 'severe', 'severe'),
(6, 6, 'Sweatha', 't nagar', '63845', 'Coimbatore', 'India', '789002345666'),
(7, 7, 'upto 15 minutes', 'upto 15 minutes', 'upto ', 'upto 15 minutes', 'upto 15 minutes', 'upto 15 minu'),
(8, 8, 'upto 3 hours', 'upto 3 hours', 'upto ', 'upto 3 hours', 'upto 3 hours', 'upto 3 hours'),
(9, 4, 'swea', 'abc nagar', '63845', 'erode', 'India', '9000000000'),
(10, 4, 'Sweatha', 't nagar', '63845', 'erode', 'India', '90000000000'),
(11, 1, 'Sweatha', 't nagar', '63845', 'Coimbatore', 'India', '6383777360'),
(12, 9, 'Kavya', 'abc nagar', '63845', 'erode', 'India', '9233445538');

-- --------------------------------------------------------

--
-- Table structure for table `appoint`
--

CREATE TABLE `appoint` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobileno` int(11) NOT NULL,
  `date` date NOT NULL,
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appoint`
--

INSERT INTO `appoint` (`id`, `name`, `mobileno`, `date`, `time`) VALUES
(3, 'jai', 2147483647, '2022-11-18', '01:49:00'),
(4, 'durga', 2147483647, '2022-11-18', '01:53:00'),
(5, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(6, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(7, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(8, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(9, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(10, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(11, 'sweatha', 2147483647, '2022-11-15', '01:21:00'),
(12, 'jai', 2147483647, '2022-11-19', '13:44:00');

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `CategoryID` int(11) NOT NULL,
  `CategoryName` varchar(58) NOT NULL,
  `Description` mediumtext DEFAULT NULL,
  `CategorySlug` varchar(68) NOT NULL,
  `Image` varchar(58) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`CategoryID`, `CategoryName`, `Description`, `CategorySlug`, `Image`) VALUES
(9, 'Lenses', 'Eye Lenses', 'Lenses', 'lenses.png'),
(10, 'Kids wear', 'Kids wear collections', 'Kids-wear', 'kid.png'),
(12, 'Computer Glasses', 'Computer Glasses', 'Computer-Glasses', 'Computer.png'),
(13, 'Full Rimmed Glass', 'Rimmed Glass', 'Full-Rimmed-Glass', 'rimm.png'),
(14, 'Half Rimmed Glass', 'Half Rimmed Glass', 'Half-Rimmed-Glass', 'halfrim.png'),
(15, 'Sun Glasses', 'Sun Glasses', 'Sun-Glasses', 'sun.png');

-- --------------------------------------------------------

--
-- Table structure for table `eyepower`
--

CREATE TABLE `eyepower` (
  `id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobileno` int(10) NOT NULL,
  `left_eye` float(4,2) NOT NULL,
  `right_eye` float(4,2) NOT NULL,
  `OrderID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `eyepower`
--

INSERT INTO `eyepower` (`id`, `name`, `mobileno`, `left_eye`, `right_eye`, `OrderID`) VALUES
(1, 'sweatha', 909089098, 4.50, 0.00, 0),
(2, 'swe', 2147483647, 2.01, 4.09, 0),
(3, 'Dhivs', 2147483647, -2.00, 1.00, 0);

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobileno` bigint(10) NOT NULL,
  `productName` varchar(30) NOT NULL,
  `review` varchar(50) NOT NULL,
  `rating` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `feedback`
--

INSERT INTO `feedback` (`id`, `name`, `mobileno`, `productName`, `review`, `rating`) VALUES
(1, 'swea', 9090909090, '', 'nice product', 0);

-- --------------------------------------------------------

--
-- Table structure for table `franchise`
--

CREATE TABLE `franchise` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `mobileno` int(10) NOT NULL,
  `address` varchar(25) NOT NULL,
  `city` varchar(30) NOT NULL,
  `state` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `franchise`
--

INSERT INTO `franchise` (`id`, `name`, `mobileno`, `address`, `city`, `state`) VALUES
(4, 'swea', 987654321, 'thendral nagar', 'erode', 'tamil nadu'),
(5, 'aparna', 987654321, 'tiruppur', 'erode', 'tamil nadu');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `MessageID` int(11) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Subject` varchar(128) DEFAULT NULL,
  `Content` varchar(158) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `order details`
--

CREATE TABLE `order details` (
  `OrderID` int(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `Quantity` smallint(2) NOT NULL DEFAULT 1,
  `Total` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `order details`
--

INSERT INTO `order details` (`OrderID`, `ProductID`, `Quantity`, `Total`) VALUES
(3, 16, 1, '1200.00'),
(3, 24, 2, '2000.00'),
(3, 26, 1, '700.00'),
(4, 23, 1, '2300.00'),
(5, 29, 1, '800.00'),
(6, 25, 1, '1500.00'),
(7, 25, 1, '1500.00'),
(8, 24, 1, '1000.00'),
(8, 29, 1, '800.00'),
(9, 40, 1, '650.00'),
(10, 24, 1, '1000.00'),
(11, 24, 1, '1000.00'),
(12, 25, 1, '1500.00'),
(13, 38, 1, '500.00'),
(14, 24, 1, '1000.00'),
(14, 25, 1, '1500.00');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `OrderID` int(11) NOT NULL,
  `UserID` int(11) NOT NULL,
  `AddressID` int(11) NOT NULL,
  `SubTotal` decimal(10,2) DEFAULT NULL,
  `Discount` decimal(10,2) DEFAULT NULL,
  `ShippingFee` decimal(10,2) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `OrderDate` date DEFAULT NULL,
  `Status` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`OrderID`, `UserID`, `AddressID`, `SubTotal`, `Discount`, `ShippingFee`, `Total`, `OrderDate`, `Status`) VALUES
(2, 4, 4, '1000.44', '0.00', '0.00', '1000.44', '2022-11-11', 'Delivered'),
(3, 4, 4, '3900.00', '0.00', '0.00', '3900.00', '2022-11-12', 'Order Received'),
(4, 4, 4, '2300.00', '0.00', '0.00', '2300.00', '2022-11-12', 'Order Received'),
(5, 4, 4, '800.00', '0.00', '0.00', '800.00', '2022-11-13', 'Order Received'),
(6, 4, 4, '1500.00', '0.00', '0.00', '1500.00', '2022-11-16', 'Order Received'),
(7, 4, 10, '1500.00', '0.00', '0.00', '1500.00', '2022-11-16', 'Order Received'),
(8, 4, 10, '1800.00', '0.00', '0.00', '1800.00', '2022-11-17', 'Order Received'),
(9, 4, 10, '650.00', '0.00', '0.00', '650.00', '2022-11-18', 'Order Received'),
(10, 1, 11, '1000.00', '0.00', '0.00', '1000.00', '2022-11-21', 'Delivered'),
(11, 4, 4, '1000.00', '0.00', '0.00', '1000.00', '2022-11-27', 'Order Received'),
(12, 4, 10, '1500.00', '0.00', '0.00', '1500.00', '2022-11-27', 'Order Received'),
(13, 4, 9, '500.00', '0.00', '0.00', '500.00', '2022-11-27', 'Order Received'),
(14, 4, 9, '2500.00', '0.00', '0.00', '2500.00', '2022-11-28', 'Order Received');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductID` int(11) NOT NULL,
  `ProductName` varchar(40) NOT NULL,
  `CategoryID` int(11) DEFAULT NULL,
  `ProductPrice` decimal(10,2) DEFAULT 0.00,
  `UnitsInStock` smallint(5) DEFAULT 0,
  `Description` varchar(255) NOT NULL,
  `ManufactureYear` smallint(5) NOT NULL,
  `Image` varchar(50) NOT NULL,
  `ProductSlug` varchar(50) NOT NULL,
  `Feature` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`ProductID`, `ProductName`, `CategoryID`, `ProductPrice`, `UnitsInStock`, `Description`, `ManufactureYear`, `Image`, `ProductSlug`, `Feature`) VALUES
(16, 'THEWHOOP Full Rim Computer Eye Glasses R', 13, '1200.00', 10, ' Size: Standard Free Size 54 MM ( Transparent Demo Lens Fitted )\r\nLens Change : Yes\r\nNote : This Frame use for Computer/Laptop , Reading and For The Style\r\nIdeal For Men and Women\r\nFrame Color & Material - Black , Polycarbonate\r\n', 2022, '1.png', 'THEWHOOP-Full-Rim-Computer-Eye-Glasses-Rectangular', 1),
(17, 'VINTAGE Style Designer Frame Clear Lens ', 13, '2967.00', 20, ' VINTAGE Style Designer Frame Clear Lens Eyeglasses BLACK\r\n', 2022, '2.png', 'VINTAGE-Style-Designer-Frame-Clear-Lens-Eyeglasses', 0),
(18, 'Black cat eye both for boys and girls(Un', 13, '2300.00', 10, 'TAGGY MAKE cat eyeglass frames, rimless eyeglass frames,oval, wayfarer, square glasses, round frames\r\nThis frame have demo lenses which will be used by your optician to fix lenses as per your power\r\nFrame Length -14 cm, Frame Height - 4 cm\r\nDurable optica', 2022, '3.png', 'Black-cat-eye-both-for-boys-and-girlsUnisex', 0),
(19, 'Roshfort Unisex Square Rectangular Anti ', 13, '3000.00', 10, ' Frame Size - Medium, Frame Material - Plastic, Frame Color - White/Transparent, Lens Material - Plastic, Lens Size - 53, Bridge - 18, Temple - 145\r\nFrame comes with a zero power Anti Glare lenses that can be replaced with powered lenses.\r\nNew Transparent', 2022, '4.png', 'Roshfort-Unisex-Square-Rectangular-Anti-glare-Eyeg', 1),
(20, 'Blue Transparent Full Rim Cat Eye', 13, '2050.00', 10, ' Frame Size: Small | Frame width: 133 mm | Frame Height: 47 mm | Frame Dimensions: (50-18-142)mm.\r\nFrame Style: The cateye style of frames is eternally stylish and looks good on women with round, square and triangular face shapes as they balance the facia', 2022, '5.png', 'Blue-Transparent-Full-Rim-Cat-Eye', 0),
(21, 'Silver Blue Full Rim Pilot Bluecut & Ant', 13, '2400.00', 10, ' Frame Material: Featuring in Lenskart Air Float Pop Collection Silver Blue Full Rim Pilot from Lenskart. Made from TR90 which is incredibly durable, flexible, and lightweight which makes it extremely comfortable to wear for making them the perfect pair f', 2022, '6.png', 'Silver-Blue-Full-Rim-Pilot-Bluecut-and-Antiglare-o', 1),
(22, 'Blue Gunmetal Full Rim Square | Bluecut ', 13, '1000.00', 10, ' Frame Material: Featuring in Lenskart Air Float Pop Collection Blue Gunmetal Full Rim Square from Lenskart. Made from TR90 which is incredibly durable, flexible, and lightweight which makes it extremely comfortable to wear for making them the perfect pai', 2022, '7.png', 'Blue-Gunmetal-Full-Rim-Square-or-Bluecut-and-Antig', 0),
(23, 'Gold Brown Transparent Full Rim Pilot | ', 13, '2300.00', 9, ' Frame Material: Featuring in Lenskart Air Float Pop Collection Gold Brown Transparent Full Rim Pilot from Lenskart. Made from TR90 which is incredibly durable, flexible, and lightweight which makes it extremely comfortable to wear for making them the per', 2022, '8.png', 'Gold-Brown-Transparent-Full-Rim-Pilot-or-Bluecut-a', 1),
(24, 'Diamond Eye 3 Pair Monthly Aqua Sea Blue', 9, '1000.00', 8, 'Manufacturer recommended duration 	Monthly\r\nColour 	Hazel and brown\r\nLens Correction Type 	Color lens\r\nSize 	3 Pair (Pack of 1)\r\nItem Hardness 	Soft', 2022, '9.png', 'Diamond-Eye-3-Pair-Monthly-Aqua-Sea-Blue-Brown-Col', 0),
(25, 'Soft Eye 4 Pair Monthly Colored Blue Haz', 9, '1500.00', 5, ' \r\n    3 Pair Monthly Color contact lens, 1 Lens Case, 1 Lens solution\r\n    55% water, 35% phemfilcon A\r\n    6 soft Lenses In a strile buffered saline solution\r\n    Suitable for both Male and Female\r\n    Store it in a proper case, always use fresh solutio', 2022, '10.png', 'Soft-Eye-4-Pair-Monthly-Colored-Blue-Hazel-Green-G', 0),
(26, 'Color Style Eye Blue Colour Monthly Cont', 9, '700.00', 7, ' \r\n\r\n    55% water, 35% phemfilcon A\r\n    2 soft Lenses In a strile buffered saline solution\r\n    Suitable for both Male and Female\r\n    Store it in a proper case, always use fresh solution and do not wear it Overnight\r\n\r\n', 2022, '11.png', 'Color-Style-Eye-Blue-Colour-Monthly-Contact-Lens-1', 1),
(27, 'Diamond eye lens Grey Candy Pack - Zero ', 9, '340.00', 10, ' \r\n\r\n    1 Pair Monthly Color contact lens, 1 Lens Case\r\n    55% water, 35% phemfilcon A\r\n    2 soft Lenses In a strile buffered saline solution\r\n    Suitable for both Male and Female\r\n    Store it in a proper case, always use fresh solution and do not we', 2022, '12.png', 'Diamond-eye-lens-Grey-Candy-Pack-Zero-Power-Color-', 0),
(29, 'Diamond Eye Coloured Contact Lenses (1 p', 9, '800.00', 7, ' \r\n\r\n    1 Pair Monthly Color contact lens, 1 Lens Case, 1 Lens solution\r\n    55% water, 35% phemfilcon A\r\n    2 soft Lenses In a strile buffered saline solution\r\n    Suitable for both Male and Female\r\n    Store it in a proper case, always use fresh solut', 2022, '14.png', 'Diamond-Eye-Coloured-Contact-Lenses-1-pair-lens-pe', 0),
(30, 'Iconic Eye Hazel Monthly Mont', 9, '650.00', 10, ' \r\n\r\n    1 Pair Contact Lens, 1 Lens Case, 1 Lens Solution\r\n    55% Water, 35% Phemfilcon A\r\n    2 Soft Lenses In A Strile Buffered Saline Solution\r\n    Suitable For Both Male And Female\r\n\r\n', 2022, '15.png', 'Iconic-Eye-Hazel-Monthly-Mont', 1),
(32, 'LiteForce - POlar dark green.Both fpr me', 15, '2000.00', 10, ' Sunglass with square lens. Blue shade . medium width', 2022, '17.png', 'LiteForce-POlar-dark-greenBoth-fpr-men-and-women', 1),
(33, 'Rayban cudaradas grand vita', 15, '4000.00', 5, '  Sunglass with square lens. Green shade . medium width', 2022, '18.png', 'Rayban-cudaradas-grand-vita', 0),
(34, 'Rayban New way-Medium size', 15, '5000.00', 10, ' sunglasses_explorers; sunglasses_men-s; sunglasses_new-arrivals; sunglasses_new_icons; sunglasses_polarized; sunglasses_round-style; sunglasses_view-all; sunglasses_women-s', 2022, '19.png', 'Rayban-New-way-Medium-size', 0),
(35, 'Brown cat eye cool sun glasses', 15, '2300.00', 5, ' Grab some shade with a timeless and classic rectangular frame. Their evergreen style will keep you classic and timeless.\r\n', 2022, '20.png', 'Brown-cat-eye-cool-sun-glasses', 1),
(36, 'JIM HALO Blue Light Blocking Computer Re', 12, '1200.00', 5, ' Protect your eyes from harmful blue light by electronic devices (such as computer, TV, smartphones)\r\nRetro square plastic frame is comfortable against the skin, fits both men and women\r\nAnti blue light lenses reduce eyestrain, prevent eye dry and eye fat', 2022, '21.png', 'JIM-HALO-Blue-Light-Blocking-Computer-Reading-Glas', 0),
(37, 'Meganfox | Zero Power Bluecut & Antiglar', 12, '650.00', 10, ' Meganfox Lens : ADVANCED BLUE CUT TECHNOLOGY | The anti glare glasses for men and women are made of multi-layered CR39 blue cut lenses that block out harmful blue light to ease computer eye strain.\r\nTHE ULTIMATE COMPUTER GLASSES FOR EYE PROTECTION | Our ', 2022, '22.png', 'Meganfox-or-Zero-Power-Bluecut-and-Antiglare-Compu', 1),
(38, 'BIG KING Blue Light Blocking Glasses for', 12, '500.00', 9, ' Blue light blocking glasses\r\nAnti glare\r\nUv Protected\r\nComes with a cloth and box', 2022, '23.png', 'BIG-KING-Blue-Light-Blocking-Glasses-for-Premium-B', 1),
(39, 'Royal Son Full Rim Round Spectacle Frame', 12, '700.00', 5, 'Care Instructions: Remove dust and grime by gently wiping the lens with a cloth\r\nTransparent Demo Lens With Black Frame\r\nTemple Color: Black\r\nIdeal: Men, Women (Age Group 15 to 45)\r\nComfortable and Lightweight\r\nPRODUCT DIMENSION –Size (Medium)- Lens Width', 2022, '24.png', 'Royal-Son-Full-Rim-Round-Spectacle-Frame-For-Men-a', 1),
(40, 'AFERELLE® Kids Zero Power Blue Ray Block', 10, '650.00', 4, ' Reduce eye strain, eye fatigue and sensitivity to light during long computer sessions. Allow your eyes to blink and function naturally. Great for office workers or anyone who has to look at a screen all day. Designed for all day comfort with a durable ye', 2022, '25.png', '25', 1),
(41, 'Junior For Kids Age 8-12 yrs | Zero Powe', 10, '750.00', 5, ' FRAME MATERIAL: Featuring premium spectacles in Blue Full Rim Rectangle from Lenskart. Made from TR90 which is incredibly durable, flexible, and lightweight making it extremely comfortable to wear and make them the perfect pair for your kids everyday use', 2022, '26.png', '26', 0),
(42, 'Goson Vintage Clear Lens Eyeglasses - Wo', 14, '1200.00', 10, 'Comfortable, Stylish, Sophisticated and Light Weight Eyeglasses for Unisex Kids\r\nFrame Size :- Small, Lens Width :- 46 MM, Nose Bridge :- 21 MM, Temple Length :- 135 MM\r\nFrame Material :- TR, Lens Material :- Polycarbonate\r\nFrame Color :- Crystal White\r\n', 2022, '27.png', '27', 1);

-- --------------------------------------------------------

--
-- Table structure for table `subscribers`
--

CREATE TABLE `subscribers` (
  `Email` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `supplier`
--

CREATE TABLE `supplier` (
  `id` int(10) NOT NULL,
  `name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `mobile_no` bigint(11) NOT NULL,
  `ProductID` int(11) NOT NULL,
  `CategoryID` int(11) NOT NULL,
  `Product_name` varchar(20) NOT NULL,
  `stocks` int(11) NOT NULL,
  `price` int(8) NOT NULL,
  `date` date NOT NULL DEFAULT current_timestamp(),
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `supplier`
--

INSERT INTO `supplier` (`id`, `name`, `email`, `mobile_no`, `ProductID`, `CategoryID`, `Product_name`, `stocks`, `price`, `date`, `time`) VALUES
(3, 'sweatha', 'sweathadharan1212@gmail.com', 7807807800, 1, 1, 'specs', 10, 2300, '2022-11-20', '00:22:00'),
(4, 'apars', 'apars@gmail.com', 9999999999, 21, 2, 'Rimmed glass', 12, 3000, '2022-11-22', '14:40:00'),
(5, 'apars', 'apars@gmail.com', 6383777360, 21, 2, 'Rimmed glass', 12, 3000, '2022-11-21', '14:40:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `UserID` int(11) NOT NULL,
  `FullName` varchar(50) NOT NULL,
  `StreetAddress` varchar(255) NOT NULL,
  `PostCode` varchar(5) NOT NULL,
  `City` varchar(28) NOT NULL,
  `Country` varchar(28) NOT NULL,
  `Phone` varchar(12) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Username` varchar(28) DEFAULT NULL,
  `Password` varchar(158) DEFAULT NULL,
  `Admin` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`UserID`, `FullName`, `StreetAddress`, `PostCode`, `City`, `Country`, `Phone`, `Email`, `Username`, `Password`, `Admin`) VALUES
(1, 'Admin', 'Purok 1, Brgy.Enclaro', '6107', 'Binalbagan City', 'Phippines', '0912011191', 'admin@gmail.com', 'admin', '$2a$10$mpJCYlSr762SwQVzdLwxR.KgRuWEHA2NzUanxxG/nxEStDRcRBbB6', 1),
(4, 'swea', 'abc nagar', '63845', 'erode', 'India', '9000000000', 'sweatham.19msc@kongu.edu', 'swe', '$2a$10$L/TCCDFwZ9cWaeS/LfEp3O6mFfUqzC.FSpgiwil5wSfQf.a7XD3Uq', 0),
(5, 'upto 30 minutes', 'moderate', 'mild', 'severe', 'severe', 'severe', 'mild', 'severe', '$2a$10$gEFY9cS0Ze28.RoG88viteH3uTSe.JjE3sXlgdyAXbnDGXKE3gr46', 0),
(6, 'Sweatha', 't nagar', '63845', 'Coimbatore', 'India', '7890023456', 'sweatha@gmail.com', 'swea', '$2a$10$jXS.STR7g2MZ3aNm9T/cSOC4W4TsotBuUyL7vDqdNC4Zxpi1Cqp96', 0),
(7, 'upto 15 minutes', 'upto 15 minutes', 'upto ', 'upto 15 minutes', 'upto 15 minutes', 'upto 15 minu', 'upto 15 minutes', 'upto 15 minutes', '$2a$10$.7x1QEBcqwYyBXmXn.1UKuV.EVOPhYhCVFqWOGyioKS1hPgH6D9dq', 0),
(8, 'upto 3 hours', 'upto 3 hours', 'upto ', 'upto 3 hours', 'upto 3 hours', 'upto 3 hours', 'upto 3 hours', 'upto 3 hours', '$2a$10$3A4yrdzc58/d.AtW9aRQqepDeLtdbcoqtX8MW8JMizHux/wb7dwUK', 0),
(9, 'Kavya', 'abc nagar', '63845', 'erode', 'India', '9233445538', 'kavs@gmail.com', 'kavs', '$2a$10$GkCqK3yT6jd8cKdO0ajrCuDE5cCVeStAB./drrEHxSXd/6Uet6miC', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `addresses`
--
ALTER TABLE `addresses`
  ADD PRIMARY KEY (`AddressID`),
  ADD KEY `FK_Users_UserID` (`UserID`);

--
-- Indexes for table `appoint`
--
ALTER TABLE `appoint`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`CategoryID`),
  ADD KEY `CategoryName` (`CategoryName`);

--
-- Indexes for table `eyepower`
--
ALTER TABLE `eyepower`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orderID` (`OrderID`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `franchise`
--
ALTER TABLE `franchise`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`MessageID`);

--
-- Indexes for table `order details`
--
ALTER TABLE `order details`
  ADD PRIMARY KEY (`OrderID`,`ProductID`),
  ADD KEY `FK_Order_Details_Products` (`ProductID`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrderID`),
  ADD KEY `FK_Orders_Users` (`UserID`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductID`),
  ADD KEY `FK_Products_Categories` (`CategoryID`),
  ADD KEY `ProductName` (`ProductName`);

--
-- Indexes for table `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`UserID`),
  ADD KEY `Username` (`Username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `addresses`
--
ALTER TABLE `addresses`
  MODIFY `AddressID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `appoint`
--
ALTER TABLE `appoint`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `CategoryID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `eyepower`
--
ALTER TABLE `eyepower`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `franchise`
--
ALTER TABLE `franchise`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `MessageID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `OrderID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `supplier`
--
ALTER TABLE `supplier`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `addresses`
--
ALTER TABLE `addresses`
  ADD CONSTRAINT `FK_Users_UserID` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `order details`
--
ALTER TABLE `order details`
  ADD CONSTRAINT `FK_Order_Details_Orders` FOREIGN KEY (`OrderID`) REFERENCES `orders` (`OrderID`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Order_Details_Products` FOREIGN KEY (`ProductID`) REFERENCES `products` (`ProductID`) ON DELETE CASCADE;

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `FK_Orders_Users` FOREIGN KEY (`UserID`) REFERENCES `users` (`UserID`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `FK_Products_Categories` FOREIGN KEY (`CategoryID`) REFERENCES `categories` (`CategoryID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
