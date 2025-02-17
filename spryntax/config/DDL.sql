-- phpMyAdmin SQL Dump
-- version 5.2.1-1.el7.remi
-- https://www.phpmyadmin.net/
--
-- Host: engr-db.engr.oregonstate.edu:3307
-- Generation Time: Feb 16, 2025 at 05:13 PM
-- Server version: 10.6.20-MariaDB-log
-- PHP Version: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs362_polasekj`
--

-- --------------------------------------------------------

--
-- Table structure for table `algorithm`
--

CREATE TABLE `algorithm` (
  `algorithm_id` int(11) NOT NULL,
  `algorithm_name` varchar(25) NOT NULL,
  `code_snip` text NOT NULL,
  `data_structure` varchar(25) NOT NULL,
  `time_complexity` varchar(50) DEFAULT NULL,
  `difficulty` varchar(20) NOT NULL,
  `explanation_markdown` text DEFAULT NULL,
  `program_language` varchar(25) NOT NULL,
  `approach` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `completed_algorithm`
--

CREATE TABLE `completed_algorithm` (
  `user_id` int(11) NOT NULL,
  `algorithm_id` int(11) NOT NULL,
  `completed_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `user_id` int(11) NOT NULL,
  `algorithm_id` int(11) NOT NULL,
  `added_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `leaderboard`
--

CREATE TABLE `leaderboard` (
  `leaderboard_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `rank_place` int(11) NOT NULL,
  `wpm` float NOT NULL,
  `date_achieved` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `program_language` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `session`
--

CREATE TABLE `session` (
  `user_id` int(11) DEFAULT NULL,
  `session_id` int(11) NOT NULL,
  `start_time` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `end_time` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `total_time` time NOT NULL,
  `wpm` float NOT NULL,
  `raw_wpm` float NOT NULL,
  `accuracy` float NOT NULL,
  `correct_characters` int(11) NOT NULL,
  `incorrect_characters` int(11) NOT NULL,
  `consistency` float NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `profile_pic` blob DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `algorithm`
--
ALTER TABLE `algorithm`
  ADD PRIMARY KEY (`algorithm_id`);

--
-- Indexes for table `completed_algorithm`
--
ALTER TABLE `completed_algorithm`
  ADD PRIMARY KEY (`user_id`,`algorithm_id`),
  ADD KEY `algorithm_id` (`algorithm_id`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`user_id`,`algorithm_id`),
  ADD KEY `algorithm_id` (`algorithm_id`);

--
-- Indexes for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD PRIMARY KEY (`leaderboard_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `session`
--
ALTER TABLE `session`
  ADD PRIMARY KEY (`session_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `algorithm`
--
ALTER TABLE `algorithm`
  MODIFY `algorithm_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `leaderboard`
--
ALTER TABLE `leaderboard`
  MODIFY `leaderboard_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `session`
--
ALTER TABLE `session`
  MODIFY `session_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `completed_algorithm`
--
ALTER TABLE `completed_algorithm`
  ADD CONSTRAINT `completed_algorithm_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `completed_algorithm_ibfk_2` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`algorithm_id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`algorithm_id`) REFERENCES `algorithm` (`algorithm_id`);

--
-- Constraints for table `leaderboard`
--
ALTER TABLE `leaderboard`
  ADD CONSTRAINT `leaderboard_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `session`
--
ALTER TABLE `session`
  ADD CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
