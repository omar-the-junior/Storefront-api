CREATE TABLE
    users (
        id SERIAL PRIMARY KEY,
        firstName VARCHAR(30),
        lastName VARCHAR(30),
        -- TODO: check how many characters you will need in for the password.
        -- TIP: that would be by checking the hashing method and stuff like that
        password VARCHAR(255)
    );