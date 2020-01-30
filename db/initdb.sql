USE `myDB`;

CREATE TABLE `accounts` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`id`)
);

CREATE TABLE `profiles`(
    `accounts_id` INT,
    `city` VARCHAR(50),
    `country` VARCHAR(50),
    `firstname` VARCHAR(50),
    `lastname` VARCHAR(50),
    `interest1` VARCHAR(50),
    `interest2` VARCHAR(50),
    `interest3` VARCHAR(50),
    `interest4` VARCHAR(50),
    FOREIGN KEY(accounts_id)
    REFERENCES accounts(id)
    ON DELETE CASCADE
);

Create TABLE `interests`(
    `interest1` VARCHAR(50),
    `interest2` VARCHAR(50),
    `interest3` VARCHAR(50),
    `interest4` VARCHAR(50),
    `interest5` VARCHAR(50),
    `interest6` VARCHAR(50),
    `interest7` VARCHAR(50),
    `interest8` VARCHAR(50),
    `interest9` VARCHAR(50),
    `interest10` VARCHAR(50),
    `interest11` VARCHAR(50),
    `interest12` VARCHAR(50),
    `interest13` VARCHAR(50),
    `interest14` VARCHAR(50),
    `interest15` VARCHAR(50),
    `interest16` VARCHAR(50),
    `interest17` VARCHAR(50),
    `interest18` VARCHAR(50),
    `interest19` VARCHAR(50),
    `interest20` VARCHAR(50)
);

CREATE TABLE `profilemessage`(
    `profile_id` INT,
    `message` VARCHAR(50),
    FOREIGN KEY(profile_id)
    REFERENCES accounts(id)
    ON DELETE CASCADE
);

INSERT INTO interests VALUES ('Gaming','Fishing','Cooking','Cocktails','Coding','Icehockey','Golf','Cars','Traveling','Training',
'Hiking','Skiing','Horseriding','Hunting','Reading','Movies','Padel','Shopping','FoodLover','Socializing');