CREATE TABLE `PizzaStore`.`pizzaTopping` (
  `toppingId` INT(11) NOT NULL,
  `pizzaId` INT(11) NOT NULL,
  PRIMARY KEY (`pizzaId`, `toppingId`),
  INDEX `pizzaTopping_toppingId_idx` (`toppingId` ASC) VISIBLE,
  CONSTRAINT `pizzaTopping_toppingId`
    FOREIGN KEY (`toppingId`)
    REFERENCES `PizzaStore`.`toppings` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION,
  CONSTRAINT `pizzaTopping_pizzaId`
    FOREIGN KEY (`pizzaId`)
    REFERENCES `PizzaStore`.`pizzas` (`id`)
    ON DELETE RESTRICT
    ON UPDATE NO ACTION);
