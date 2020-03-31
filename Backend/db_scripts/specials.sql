CREATE TABLE `PizzaStore`.`specials` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `basePrice` DECIMAL(18,2) NULL,
  `description` VARCHAR(100) NULL,
  `imageUrl` VARCHAR(200) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC) VISIBLE);