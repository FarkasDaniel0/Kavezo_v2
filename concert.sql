-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2025. Már 14. 22:25
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `koncertek`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `concert`
--

CREATE TABLE `concert` (
  `id` int(11) NOT NULL,
  `performer` varchar(191) NOT NULL,
  `startTime` datetime(3) NOT NULL,
  `duration` int(11) NOT NULL,
  `cancelled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- A tábla adatainak kiíratása `concert`
--

INSERT INTO `concert` (`id`, `performer`, `startTime`, `duration`, `cancelled`) VALUES
(1, 'Ms. Susie Hilpert', '2026-03-21 07:46:00.000', 80, 1),
(2, 'Dr. Jacob Hintz', '2025-07-04 19:41:00.000', 167, 1),
(3, 'Erica Goodwin', '2025-10-15 19:28:10.385', 111, 1),
(4, 'Wanda Rempel', '2025-12-27 20:54:10.430', 112, 0),
(5, 'Orville Ernser', '2025-12-27 13:36:35.699', 130, 0),
(6, 'Seth Fahey DVM', '2025-05-03 21:44:33.801', 164, 1),
(7, 'Willie Fahey', '2025-04-17 18:16:20.278', 133, 0),
(8, 'Steve Rolfson', '2025-12-13 23:26:09.030', 82, 0),
(9, 'Angela Herman MD', '2026-02-09 20:06:08.189', 113, 0),
(10, 'Naomi Gleason DVM', '2025-03-23 06:25:33.539', 119, 0),
(11, 'Tamara Feeney', '2025-11-05 02:05:53.921', 134, 0),
(12, 'Brendan Cummings', '2025-09-03 18:20:41.294', 78, 0),
(13, 'Courtney Kertzmann', '2025-03-22 02:06:35.147', 85, 0),
(14, 'Bert Olson', '2025-09-09 07:26:50.883', 128, 0),
(15, 'Emmett Kutch', '2025-07-17 08:39:36.455', 172, 0),
(16, 'Jane Doe', '2025-02-15 08:11:00.000', 0, 1),
(17, 'Jane Doe', '2024-12-21 09:11:00.000', 123, 1),
(18, 'Alma', '2025-12-21 10:11:00.000', 1, 0),
(19, 'Dr. Jacob Hintz', '2025-03-15 10:11:00.000', 1, 0),
(20, 'asd', '2026-12-12 11:12:00.000', 12, 1);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `concert`
--
ALTER TABLE `concert`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `concert`
--
ALTER TABLE `concert`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
