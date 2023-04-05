# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index: GET /products
- Show: GET /products/:id
- Create [token required]: POST /products
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]: GET /users
- Show [token required]: GET /users/:id
- Create N[token required]: POST /users

#### Orders
- Current Order by user (args: user id)[token required]: GET /users/:user_id/orders/current
- [OPTIONAL] Completed Orders by user (args: user id)[token required]: GET /users/:user_id/orders/complete

## Data Shapes
#### Product
- id SERIAL PRIMARY KEY,
- name VARCHAR(150),
- price integer,
- category VARCHAR

#### User
- id SERIAL PRIMARY KEY,
- firstname VARCHAR(50),
- lastname VARCHAR(50),
- password_digest VARCHAR

#### Orders
- id SERIAL PRIMARY KEY,
- user_id integer REFERENCES users(id),
- status VARCHAR(10)

#### Orders_Products
- id SERIAL PRIMARY KEY,
- order_id integer REFERENCES orders(id),
- product_id integer REFERENCES products(id),
- quantity integer


