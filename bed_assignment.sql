DROP DATABASE IF EXISTS SPTRAVEL;
CREATE DATABASE SPTRAVEL;
use SPTRAVEL;

CREATE TABLE `users` (
  `userid` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `profile_pic_url` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salt` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
);

INSERT INTO `users` VALUES (1,'Pikachu','haha@gmail.com','Pikachu.png','$2b$08$IjVnDxl8kw147nDbB51J6ey0obVyTvUrEl3a.q1gVHm/t6u0pfHsy','$2b$08$IjVnDxl8kw147nDbB51J6e','2020-06-09 05:11:40','user'),(2,'imsorry','lol@lol.com','imsorry','$2b$08$7ZfqQuMAeXinsXEFIHUnsOECh8pZvQB81suUXz./geZ2ejdJLGTxK','$2b$08$7ZfqQuMAeXinsXEFIHUnsO','2020-06-09 06:34:12','user'),(3,'hahaha','yeet@gmail.com','hahaha.png','$2b$08$.OTRmSuzd10rSXh69p/PWOg/kPhG1leuZRcPzRena.nTXa1MnBRHS','$2b$08$.OTRmSuzd10rSXh69p/PWO','2020-06-09 05:14:04','user'),(4,'boom','hehe@gmail.com','boom.png','$2b$08$5iaCJNF0/QxCqOKUPsJrCOCfWHIUUMJY85V3yh7hoYfkB4l7z6lni','$2b$08$5iaCJNF0/QxCqOKUPsJrCO','2020-07-14 16:44:45','admin');


CREATE TABLE `travel_listings` (
  `travel_id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `price` int(11) NOT NULL,
  `country` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `travel_period` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`travel_id`)
);
'4D3N Taiwan Fun!','Taiwan No.1!',4600,'Taiwan','Jul 16, 2020 - Jul 19, 2020','1594888100594.jpg'

INSERT INTO `travel_listings` (title, description, price, country, travel_period, image_url) VALUES ('4D3N Taiwan Fun!','Taiwan No.1!',4600,'Taiwan','Jul 16, 2020 - Jul 19, 2020','1594888100594.jpg');


CREATE TABLE `itinerary` (
  `itinerary_id` int(11) NOT NULL AUTO_INCREMENT,
  `day` int(11) NOT NULL,
  `activity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fk_travel_id` int(11) NOT NULL,
  PRIMARY KEY (`itinerary_id`),
  KEY `fk_travel_id` (`fk_travel_id`),
  CONSTRAINT `itinerary_ibfk_1` FOREIGN KEY (`fk_travel_id`) REFERENCES `travel_listings` (`travel_id`) ON DELETE CASCADE
);

INSERT INTO `itinerary` (day, activity, fk_travel_id) VALUES (1,'cancelled due to covid',1);
INSERT INTO `itinerary` (day, activity, fk_travel_id) VALUES (2,'Going Fishing',1);



CREATE TABLE `reviews` (
  `review_id` int(11) NOT NULL AUTO_INCREMENT,
  `travel_id` int(11) NOT NULL,
  `content` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `rating` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`review_id`),
  KEY `travel_id` (`travel_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `reviews_ibfk_3` FOREIGN KEY (`travel_id`) REFERENCES `travel_listings` (`travel_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_4` FOREIGN KEY (`user_id`) REFERENCES `users` (`userid`) ON DELETE CASCADE
);


INSERT INTO `reviews` (travel_id, content, rating, user_id) VALUES (1,'yo this is so good must try yoooooo',5,3);
INSERT INTO `reviews` (travel_id, content, rating, user_id) VALUES (1,'ok only la',3,1);



