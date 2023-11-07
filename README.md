# vendi-man

`vendi-man` is RESTful APIs for a vending machine which allow users to sell and buy products.

## Technology stack

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- React.js

## Prerequisites

- Node.js 16+
- Local MongoDB

## Local setup

- Clone https://github.com/sprakash57/vendi-man and cd into `vendi-man/server`
- Use `.env.example` to create your own `.env` file.
- Install dependencies: `npm install`
- Run application: `npm run dev`. Base url is `http://localhost:4000/api/v1`
- To run the client, cd into `vendi-man/client` and run `npm install`. After the dependencies have been installed run `npm start` to boot the application.

## Test

- cd into `vendi-man/server`
- Run `npm run dev` to spin up local
- Run `npm run test` to run all the test cases.

## Endpoints

Import `Vendi-Man.postman_collection.json` to your postman.

| Endpoint                   | Method | Description            |
| -------------------------- | ------ | ---------------------- |
| `/`                        | GET    | Health check           |
| `/users`                   | POST   | Create a new user      |
| `/users/profile`           | GET    | Get user details       |
| `/users/deposit`           | POST   | Add deposit amount     |
| `/users/deposit`           | DELETE | Reset deposit amount   |
| `/sessions`                | POST   | Create a new session   |
| `/sessions`                | GET    | Get session details    |
| `/sessions/logout`         | PUT    | Delete current session |
| `/sessions/logout/all`     | PUT    | Delete all sessions    |
| `/products`                | POST   | Add new product        |
| `/products`                | GET    | Get all products       |
| `/products/:productId`     | GET    | Get product details    |
| `/products/:productId`     | PUT    | Update product details |
| `/products/:productId`     | DELETE | Delete product         |
| `/products/:productId/buy` | POST   | Buy a product          |

## Improvement areas

- Better client. Right now frontend is not complete and it needs more time and effort.
- More test cases.
- Enhanced security.
