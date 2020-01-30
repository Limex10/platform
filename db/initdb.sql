USE `myDB`;

Create TABLE `interests`(
    `interests_id` INT NOT NULL AUTO_INCREMENT,
    `interest` VARCHAR(50),
    PRIMARY KEY (`interests_id`)
    
);



CREATE TABLE `profiles`(
    `profile_id` INT NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(50) NOT NULL UNIQUE,
    `password` VARCHAR(50) NOT NULL,
    `city` VARCHAR(50),
    `country` VARCHAR(50),
    `firstname` VARCHAR(50),
    `lastname` VARCHAR(50),
    `id_interest1` INT NOT NULL,
    `id_interest2` INT NOT NULL,
    `id_interest3` INT NOT NULL,
    `id_interest4` INT NOT NULL,
    FOREIGN KEY (id_interest1)
    REFERENCES interests(interests_id),
    FOREIGN KEY (id_interest2)
    REFERENCES interests(interests_id),
    FOREIGN KEY (id_interest3)
    REFERENCES interests(interests_id),
    FOREIGN KEY (id_interest4)
    REFERENCES interests(interests_id)
    ON DELETE CASCADE,
    PRIMARY KEY(`profile_id`) 
);

CREATE TABLE `profilemessages`(
    `profilemessages_id` INT NOT NULL AUTO_INCREMENT,
    `message` VARCHAR(50),
    `profile_id` INT NOT NULL,
    FOREIGN KEY(profile_id)
    REFERENCES profiles(profile_id)
    ON DELETE CASCADE,
    PRIMARY KEY(`profilemessages_id`)
    
);




INSERT INTO interests (interest) VALUES ('Gaming'),('Fishing'),('Cooking'),('Cocktails'),('Coding'),('Icehockey'),('Golf'),('Cars'),('Traveling'),('Training'),
('Hiking'),('Skiing'),('Horseriding'),('Hunting'),('Reading'),('Movies'),('Padel'),('Shopping'),('FoodLover'),('Socializing');