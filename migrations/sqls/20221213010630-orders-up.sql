CREATE TABLE
    orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES users (id) ON UPDATE CASCADE ON DELETE CASCADE,
        status VARCHAR(10)
    );