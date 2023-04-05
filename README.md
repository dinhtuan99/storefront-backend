# Storefront Backend Project
#### Requirements
Your task is to build an API for a shopping application.
- Draft a database schema that covers all the data requirements.
- Draft a map of endpoints to expose for the frontend.
##### Database Setup
- Create a connection to a Postgres database from the provided Node application.
- Add tables and columns according to the database schema doc from step 1.
##### Create Models
- Create models that facilitate CRUD operations on the database tables.
- Create a test suite for each model in Jasmine.
##### Create API Endpoints
- Create handler files for each model.
- In each handler file, create RESTful endpoints for each model method.
- Create a test suite that covers each endpoint with Jasmine.
## Required Technologies

```bash
"bcrypt": "^5.1.0",
"body-parser": "^1.19.0",
"cors": "^2.8.5",
"express": "^4.17.1",
"jsonwebtoken": "^9.0.0",
"pg": "^8.5.1",
"supertest": "^6.3.3",
"typescript": "^4.1.3"
"@types/bcrypt": "^5.0.0",
"@types/cors": "^2.8.13",
"@types/express": "^4.17.9",
"@types/jasmine": "^3.6.3",
"@types/jsonwebtoken": "^9.0.1",
"@types/pg": "^7.14.7",
"@types/supertest": "^2.0.12",
"dotenv": "^16.0.3",
"jasmine": "^3.6.4",
"jasmine-spec-reporter": "^6.0.0",
"jasmine-ts": "^0.3.0",
"ts-node": "^9.1.1",
"tsc-watch": "^4.2.9"
```

## Scripts

```bash
"start": "node src/server.ts",
"watch": "tsc-watch --esModuleInterop src/server.ts --outDir ./dist --onSuccess \"node ./dist/server.js\"",
"test": "set ENV=test&& npx tsc && db-migrate db:create full_stack_test && db-migrate --env test up && jasmine && db-migrate db:drop full_stack_test",
"create-db-test": "db-migrate db:create full_stack_test",
"drop-db-test": "db-migrate db:drop full_stack_test",
"tsc": "tsc"
```

## Env

```bash
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=full_stack_dev
POSTGRES_DB_TEST=full_stack_test
POSTGRES_USER=full_stack_user
POSTGRES_PASSWORD=password123
ENV=dev
BCRYPT_PASSWORD=motconsuonbeo
SALT_ROUNDS=10
TOKEN_SECRET=haiconsuonbeo
```

## Installation

```bash
yarn install
```
### Run watch backend

```bash
yarn watch
```
backend running on port 3000

### Run database

```bash
docker-compose up
```
database are running on 5432

## Testing

```bash
yarn test
yarn create-db-test: to create full_stack_test db
yarn drop-db-test: to drop full_stack_test db
```