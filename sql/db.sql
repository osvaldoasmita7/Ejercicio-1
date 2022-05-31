/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 100424
 Source Host           : localhost:3306
 Source Schema         : db

 Target Server Type    : MySQL
 Target Server Version : 100424
 File Encoding         : 65001

 Date: 30/05/2022 10:56:29
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `lastname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (2, '1', '2', '3', '$2a$10$.gINZ3nwiQka/rK9evhqx.edQjOWzyGRaSVVQMimUp4GLEK9fRLk.', '4@mail.com');
INSERT INTO `users` VALUES (3, '23', '45', '67', '$2a$10$EYFz0GUHTb5LQfUr/Uy3COwfB275C.kXoE5vzNhrznRq2i3p/ABCW', 'aasdasd@mail.com');
INSERT INTO `users` VALUES (4, 'osvaldo', 'ponce', 'osvaldo', '123456', 'a@mail.com');
INSERT INTO `users` VALUES (5, 'osvaldo', 'ponce', 'osvaldo', '123456', 'a@mail.com');
INSERT INTO `users` VALUES (6, 'osvaldo', 'ponce', 'osvaldo123123123', '$2a$10$X5uPeJlUli95U97bzOYPCeLYO0zCUTflpXHO3NS5ltkozXliC/52u', 'a@mail.com');
INSERT INTO `users` VALUES (7, 'osvaldo', 'ponce', 'osvaldo', '$2a$10$E1rmhCGOq56XOHFBy/6DOeZ3podoYAQCXeUybAZgS5.YGH9f0fFlm', 'a@mail.com');
INSERT INTO `users` VALUES (8, 'osvaldo', 'ponce', 'osvaldoasmita7@gmail.com', '$2a$10$0.aRjIFmMnghyX3gmw9yfunfM7oBKHWdTQIYQcmYcC4nOTEvh6.Y.', 'osvaldoasmita7@gmail.com');

SET FOREIGN_KEY_CHECKS = 1;
