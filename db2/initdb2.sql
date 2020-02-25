
/*Create TABLE interests(
    interests_id SERIAL PRIMARY KEY,
    interest VARCHAR(50) UNIQUE

);



CREATE TABLE profiles(
    profile_id SERIAL PRIMARY KEY,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    country VARCHAR(50),
    firstname VARCHAR(50),
    lastname VARCHAR(50),
    id_interest1 INT NOT NULL,
    id_interest2 INT NOT NULL,
    id_interest3 INT NOT NULL,
    id_interest4 INT NOT NULL,
    FOREIGN KEY (id_interest1)
    REFERENCES interests(interests_id),
    FOREIGN KEY (id_interest2)
    REFERENCES interests(interests_id),
    FOREIGN KEY (id_interest3)
    REFERENCES interests(interests_id),
    FOREIGN KEY (id_interest4)
    REFERENCES interests(interests_id)
    ON DELETE CASCADE
);

CREATE TABLE profilemessages(
    profilemessages_id SERIAL PRIMARY KEY,
    message VARCHAR(50),
    profile_id INT NOT NULL,
    FOREIGN KEY(profile_id)
    REFERENCES profiles(profile_id)
    ON DELETE CASCADE
);


INSERT INTO interests (interest) VALUES ('Gaming'),('Fishing'),('Cooking'),('Cocktails'),('Coding'),('Icehockey'),('Golf'),('Cars'),('Traveling'),('Training'),
('Hiking'),('Skiing'),('Horseriding'),('Hunting'),('Reading'),('Movies'),('Padel'),('Shopping'),('FoodLover'),('Socializing');
*/