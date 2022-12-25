# Storefront Backend Project

## To install packages use
`npm install`

------
## Npm commands 

`npm test` to run API tests

`npm start` to start the API in production

`npm watchTS` to start the API in development without converting typescript code to JS

---
## Valid url Examples

### Products 
- #### CREATE
   - `POST` http://127.0.0.1:3000/products/create?name={Product_name}&price={product_price}&category={product_category}
- #### index
    - `GET` http://127.0.0.1:3000/products/
- #### show
    - `GET` http://127.0.0.1:3000/products/{product_id}

### Orders
  - #### show current orders
    - `GET` http://127.0.0.1:3000/orders/current?user_id={user_id}
  - #### show completed orders
    - `GET` http://127.0.0.1:3000/orders/complete?user_id={user_id}

### Users 

- #### show user
  - `GET` http://127.0.0.1:3000/users/{user_id}

- #### create user
  - `POST` http://127.0.0.1:3000/users/create?first_name={user_firsname}&last_name={user_lastname}&password={userpassword}

- #### index users
  - `GET` http://127.0.0.1:3000/users
