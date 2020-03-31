CREATE TABLE `PizzaStore`.`orders` (
  `orderId` INT NOT NULL AUTO_INCREMENT,
  `userId` VARCHAR(255) NULL,
  `createdTime` DATETIME NULL,
  `deliveryAddressId` INT(11) NULL,
  `deliveryLocation_Latitude` FLOAT NULL,
  `deliveryLocation_Longitude` FLOAT NULL,
  PRIMARY KEY (`orderId`),
  UNIQUE INDEX `orderId_UNIQUE` (`userId` ASC) VISIBLE,
  INDEX `deliveryAddressId_idx` (`deliveryAddressId` ASC) VISIBLE,
  CONSTRAINT `deliveryAddressId`
    FOREIGN KEY (`deliveryAddressId`)
    REFERENCES `PizzaStore`.`address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
