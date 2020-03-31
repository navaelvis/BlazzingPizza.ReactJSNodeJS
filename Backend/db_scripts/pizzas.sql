CREATE TABLE `PizzaStore`.`pizzas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `orderId` INT(11) NOT NULL,
  `specialId` INT(11) NOT NULL,
  `size` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `pizzas_orderId_idx` (`orderId` ASC) VISIBLE,
  INDEX `pizzas_specialId_idx` (`specialId` ASC) VISIBLE,
  CONSTRAINT `pizzas_orderId`
    FOREIGN KEY (`orderId`)
    REFERENCES `PizzaStore`.`orders` (`orderId`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `pizzas_specialId`
    FOREIGN KEY (`specialId`)
    REFERENCES `PizzaStore`.`specials` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION);
