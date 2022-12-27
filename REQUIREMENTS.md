# API Requirements

## Ports
### db port: `5432`
### API port: `3000` is the default you could specify it in the environment variables 
----
## Environment variables (MUST BE SPECIFIED IN THE .env file)
`POSTGRES_HOST` specify the postgres host

`PORT` specify api port (Defaults to 3000)

`POSTGRES_USER` specify postgres username

`POSTGRES_PASSWORD` specify postgres password

`POSTGRES_DEV_DB` specify postgres development database

`POSTGRES_TEST_DB` specify postgres test database

`POSTGRES_PROD_DB` specify postgres production database

`ENV` environment (Set it to development)

`SALT_ROUNDS` Specify number of salt rounds (RECOMMENDED: 10 rounds)

`JWT_SECRET` Specify a jwt secret

`PEPPER` specify a pepper to add to the password

----
## DB setup instructions

**Create User**
1. ```sh
   CREATE USER mockuser WITH SUPERUSER PASSWORD 'mockPassword123';
    ```
**Create User production, test and development dbs**

2. ```sh
   CREATE DATABASE mockdb;
   CREATE DATABASE test_mockdb;
   CREATE DATABASE dev_mockdb;
    ```
**GRANT privileges on the created databases to the newely created user**

3. ```sh
   GRANT ALL PRIVILEGES ON DATABASE mockdb TO mockuser;
   GRANT ALL PRIVILEGES ON DATABASE test_mockdb TO mockuser;
   GRANT ALL PRIVILEGES ON DATABASE deb_mockdb TO mockuser;
    ```
---

## Server setup instructions

### **Note** Database migrations happen automatically before starting the server 

### Incase you need to migrate the db manually 

`npx db-migrate -e test up` to migrate test tables

`npx db-migrate -e dev up` to migrate development tables

`npx db-migrate -e prod up` to migrate production tables

`npm start` to migrate tables and start the API in production

`npm watchTS` to migrate tables and start the API in development without converting typescript code to JS

---
## TESTING

`npm test` to start run tests

---

## database schemas
**products**
```sql
     id SERIAL PRIMARY KEY,
     name VARCHAR(100),
     price INTEGER,
     category VARCHAR(50)
```

**users**
```sql
     id SERIAL PRIMARY KEY,
     firstName VARCHAR(30),
     lastName VARCHAR(30),
     password VARCHAR
```

**orders**
```sql
     id SERIAL PRIMARY KEY,
     user_id INTEGER,
     status VARCHAR(10)
```

**order_products**
```sql
     id SERIAL PRIMARY KEY,
     order_id INTEGER ,
     product_id INTEGER,
     product_quantity INTEGER
```

---
## API Endpoints
### **NOTE**: To obtain a token create a user first through that endpoint and use it as a bearer token.

#### Products
- Index `GET` /products
- Show `GET` /products/{product_id}
- Create [token required] `POST` /products/create?name={Product_name}&price={product_price}&category={product_category}
- Products by category 

#### Users
- Index [token required] `GET` /users 
- Show [token required]  `GET` /users/show/{user_id}
- Create [Generates a token] `POST` /users/create?first_name={user_firstname}&last_name={user_lastname}&password={user_password}

#### Orders
- Current Order by user [token required] `GET` /current?user_id={user_id}
- Completed Orders by user [token required] `GET` /complete?user_id={user_id}

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

