USE UnixPizza;

CREATE TABLE orders
(
   `order_id`      INT NOT NULL AUTO_INCREMENT,
   `user_id`       INT NOT NULL,
   `address`        VARCHAR(255) NOT NULL,
   `phone`         VARCHAR(255) NOT NULL,
   `date`          DATETIME NOT NULL,
   PRIMARY KEY (`order_id`)
) ENGINE = InnoDB
CHARACTER SET = utf8mb4
COLLATE utf8mb4_unicode_ci
;