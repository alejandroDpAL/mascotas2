-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 13-06-2024 a las 14:52:41
-- Versión del servidor: 8.0.30
-- Versión de PHP: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `mascotasestudio`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id_categoria` int NOT NULL,
  `nombre_categoria` varchar(200) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id_categoria`, `nombre_categoria`) VALUES
(1, 'Perro'),
(2, 'Gato');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `generos`
--

CREATE TABLE `generos` (
  `id_genero` int NOT NULL,
  `nombre_genero` enum('macho','hembra') COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `generos`
--

INSERT INTO `generos` (`id_genero`, `nombre_genero`) VALUES
(1, 'macho'),
(2, 'hembra');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mascotas`
--

CREATE TABLE `mascotas` (
  `id` int NOT NULL,
  `nombre_mascota` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `fk_raza` int NOT NULL,
  `fk_categoria` int NOT NULL,
  `imagen` varchar(200) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `fk_genero` int NOT NULL,
  `fk_user` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mascotas`
--

INSERT INTO `mascotas` (`id`, `nombre_mascota`, `fk_raza`, `fk_categoria`, `imagen`, `fk_genero`, `fk_user`) VALUES
(26, 'lukas', 7, 2, 'photo-sm-4.svg', 1, 2),
(30, 'can', 3, 1, 'canario.jpg', 1, 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `razas`
--

CREATE TABLE `razas` (
  `id_raza` int NOT NULL,
  `nombre_raza` varchar(200) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `razas`
--

INSERT INTO `razas` (`id_raza`, `nombre_raza`) VALUES
(1, 'Bulldog'),
(2, 'Pastor Alemán'),
(3, 'Labrador Retriever'),
(4, 'Holstein-Friesian'),
(5, 'Angus'),
(6, 'Jersey'),
(7, 'Siamés'),
(8, 'Bengala'),
(9, 'Persa'),
(10, 'pitbull'),
(11, 'presa canario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id_user` int NOT NULL,
  `nombres` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(200) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(200) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id_user`, `nombres`, `email`, `password`) VALUES
(1, 'alejo', 'alejo@gmail.com', '12345'),
(2, 'admin', 'admin@gmail.com', '$2b$12$wNmIGYKgWwyaAhxLyUWkfuCJkCsO0rZmSBZTQZqUSEhllYw0WYRZm'),
(3, 'undefined', 'undefined', '$2b$12$lli94.4DeKj0HvVp70mWQ.9rEJKjEUJj4xpB3xO32v1l36qKURQQe'),
(4, 'slejo', 'alejo@gmail.com', '$2b$12$rcqsieN/yNBUBW7BQiFAe.bqu4WNKD1gtalqxtI2BcK6q/6nPMaKa'),
(5, 'maria', 'maria@', '$2b$12$SbsohqKZZQve0vI3B7401uTfHg0eaUiaq6v4pmsWrtih5DVzxKRyy'),
(6, 'maria', 'maria@gmail.com', '$2b$12$OWvTtotNpHqoD5Bs7hj2K.ufe159uswVX7aoanqQtR2DvOhZ8cjhy');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id_categoria`);

--
-- Indices de la tabla `generos`
--
ALTER TABLE `generos`
  ADD PRIMARY KEY (`id_genero`);

--
-- Indices de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pertenecer` (`fk_user`),
  ADD KEY `ser` (`fk_raza`),
  ADD KEY `hacer` (`fk_categoria`),
  ADD KEY `identificar` (`fk_genero`);

--
-- Indices de la tabla `razas`
--
ALTER TABLE `razas`
  ADD PRIMARY KEY (`id_raza`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id_categoria` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `generos`
--
ALTER TABLE `generos`
  MODIFY `id_genero` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mascotas`
--
ALTER TABLE `mascotas`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `razas`
--
ALTER TABLE `razas`
  MODIFY `id_raza` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `mascotas`
--
ALTER TABLE `mascotas`
  ADD CONSTRAINT `hacer` FOREIGN KEY (`fk_categoria`) REFERENCES `categorias` (`id_categoria`),
  ADD CONSTRAINT `identificar` FOREIGN KEY (`fk_genero`) REFERENCES `generos` (`id_genero`),
  ADD CONSTRAINT `pertenecer` FOREIGN KEY (`fk_user`) REFERENCES `user` (`id_user`),
  ADD CONSTRAINT `ser` FOREIGN KEY (`fk_raza`) REFERENCES `razas` (`id_raza`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
