USE UnixPizza;

CREATE TABLE users
(
   `user_id`      INT NOT NULL AUTO_INCREMENT,
   `user_name`        VARCHAR(255) NOT NULL,
   `email`     VARCHAR(255) NOT NULL,
   `password`       VARCHAR(255) NOT NULL,
   PRIMARY KEY (`user_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;

CREATE TABLE pizzas
(
   `pizza_id`      INT NOT NULL AUTO_INCREMENT,
   `pizza_name`        VARCHAR(255) NOT NULL,
   `ingridients`     VARCHAR(255) NOT NULL,
   `cost`       INT NOT NULL,
   PRIMARY KEY (`pizza_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;

