# vendi-man

`vendi-man` is RESTful APIs for a vending machine which allow users to sell and buy products.

## Technology stack

- Node.js
- Express.js
- React.js
- TypeScript
- MongoDB
- Mongoose
- Axios

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
| `/users`                   | GET    | Get user details       |
| `/users`                   | POST   | Create a new user      |
| `/users`                   | DELETE | Delete user details    |
| `/users/deposit`           | POST   | Add deposit amount     |
| `/users/deposit/reset`     | DELETE | Reset deposit amount   |
| `/sessions`                | GET    | Get session details    |
| `/sessions`                | POST   | Create a new session   |
| `/sessions/refresh`        | POST   | Get access token       |
| `/sessions/logout`         | DELETE | Delete current session |
| `/sessions/logout/all`     | DELETE | Delete all sessions    |
| `/products`                | GET    | Get all products       |
| `/products/:productId`     | GET    | Get product details    |
| `/products`                | POST   | Add new product        |
| `/products/:productId/buy` | POST   | Buy a product          |
| `/products/:productId`     | PUT    | Update product details |
| `/products/:productId`     | DELETE | Delete product         |

## Improvement areas

- ~~Whitelist urls to avoid CORS issue~~
- ~~Include Content Security Policy~~
- Add filter by seller name feature and can be triggered by a toggle button on client
- Store list of transactions for buyers and sellers
