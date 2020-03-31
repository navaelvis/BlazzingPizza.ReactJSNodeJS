CREATE TABLE `PizzaStore`.`address` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL,
  `line1` VARCHAR(100) NULL,
  `line2` VARCHAR(100) NULL,
  `city` VARCHAR(50) NULL,
  `region` VARCHAR(20) NULL,
  `postalCode` VARCHAR(20) NULL,
  PRIMARY KEY (`id`));