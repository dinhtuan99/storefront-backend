/* Replace with your SQL commands */
CREATE TABLE orders_products (
    id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(id),
    product_id integer REFERENCES products(id),
    quantity integer
);