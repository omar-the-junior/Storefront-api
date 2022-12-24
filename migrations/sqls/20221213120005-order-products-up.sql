CREATE TABLE
    order_products (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES orders(id) ON UPDATE CASCADE ON DELETE CASCADE,
        product_id INT REFERENCES products(id) ON UPDATE CASCADE,
        product_quantity INT
    );