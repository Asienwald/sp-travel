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
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`)
);

INSERT INTO `users` VALUES (1,'Pikachu','haha@gmail.com','Pikachu.png','$2b$08$IjVnDxl8kw147nDbB51J6ey0obVyTvUrEl3a.q1gVHm/t6u0pfHsy','$2b$08$IjVnDxl8kw147nDbB51J6e','2020-06-09 05:11:40'),(2,'imsorry','lol@lol.com','imsorry','$2b$08$7ZfqQuMAeXinsXEFIHUnsOECh8pZvQB81suUXz./geZ2ejdJLGTxK','$2b$08$7ZfqQuMAeXinsXEFIHUnsO','2020-06-09 06:34:12'),(3,'hahaha','yeet@gmail.com','hahaha.png','$2b$08$.OTRmSuzd10rSXh69p/PWOg/kPhG1leuZRcPzRena.nTXa1MnBRHS','$2b$08$.OTRmSuzd10rSXh69p/PWO','2020-06-09 05:14:04');


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

INSERT INTO `travel_listings` (title, description, price, country, travel_period, image_url) VALUES ('3D2N Tokyo, Japan','Tokyo is a very cool place with lots of very nice buildings. Going there during the sakura season is a plus as you get to eat good food and sit under the sakura trees.',2450,'Japan','Mar 2021','1591712009990.jpg');
insert into `travel_listings` (title, description, price, country, travel_period, image_url) values ("7D6N Pompeii, Italy", "Pompeii is a vast archaeological site in southern Italy’s Campania region, near the coast of the Bay of Naples. Once a thriving and sophisticated Roman city, Pompeii was buried under meters of ash and pumice after the catastrophic eruption of Mount Vesuvius in 79 A.D. The preserved site features excavated ruins of streets and houses that visitors can freely explore.", 1800, "Italy", "Oct 2020", "pompeii.jpg");
insert into `travel_listings` (title, description, price, country, travel_period, image_url) values ("2D1N Bangkok, Thailand", "Bangkok, Thailand’s capital, is a large city known for ornate shrines and vibrant street life. The boat-filled Chao Phraya River feeds its network of canals, flowing past the Rattanakosin royal district, home to opulent Grand Palace and its sacred Wat Phra Kaew Temple. Nearby is Wat Pho Temple with an enormous reclining Buddha and, on the opposite shore, Wat Arun Temple with its steep steps and Khmer-style", 1400, "Thailand", "Jan 2021", "bangkok.jpg");

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
INSERT INTO `itinerary` (day, activity, fk_travel_id) VALUES (1,'Get some big chungus',2);
INSERT INTO `itinerary` (day, activity, fk_travel_id) VALUES (2,'Drink Milo',3);


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
INSERT INTO `reviews` (travel_id, content, rating, user_id) VALUES (2,'very cool! history much!!',5,2);
INSERT INTO `reviews` (travel_id, content, rating, user_id) VALUES (3,'had a bad time. do not recommend',1,3);




