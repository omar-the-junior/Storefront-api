# Storefront Backend Project

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

## Npm commands 

`npm test` to test the API

`npm start` to start the API in production

`npm watchTS` to start the API in development without converting typescript code to JS

## Valid url Examples

### Products 
#### CREATE
`POST` http://127.0.0.1:3000/products/create?name=sugar&price=30&category=grocery 
#### index
`GET` http://127.0.0.1:3000/products/
#### show
`GET` http://127.0.0.1:3000/products/1

### Orders
#### show current orders
`GET` http://127.0.0.1:3000/orders/current?user_id=1
#### show completed orders
`GET` http://127.0.0.1:3000/orders/complete?user_id=1

### Users 

#### show user
`GET` http://127.0.0.1:3000/users/1

#### create user
`POST` http://127.0.0.1:3000/users/create?first_name=omar&last_name=masoud&password=password123

#### index users
`GET` http://127.0.0.1:3000/users
