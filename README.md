# Microservices Architecture Project README

This project demonstrates a simple microservices architecture implemented using Node.js, Express.js, and various databases. The architecture consists of three microservices:

1. **User Management Microservice** - Responsible for managing user data.
2. **Order Placement Microservice** - Handles order-related operations.
3. **Inventory Management Microservice** - Manages product inventory.

A Gateway microservice is used to route requests to the appropriate microservice based on the request URL.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Project Structure](#project-structure)
3. [Setting Up Microservices](#setting-up-microservices)
4. [Database Integration](#database-integration)
5. [Microservices Communication](#microservices-communication)
6. [Running the Project](#running-the-project)
7. [Testing with Postman](#testing-with-postman)
8. [Postman Collection](#postman-collection)
9. [Git Repository](#git-repository)
10. [Contributing](#contributing)
11. [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js and npm
- MongoDB, PostgreSQL, and MySQL (depending on the microservices)
- Postman (for testing)
- Git (optional, for version control)

## Project Structure

The project is organized into the following directories:

- **User Management**: User-related microservice.
- **Order Placement**: Order management microservice.
- **Inventory Management**: Inventory-related microservice.
- **Gateway**: Microservices communication and routing.

Each microservice has its own folder containing code, routes, and database configurations.

## Setting Up Microservices

### User Management Microservice

- Navigate to the `User Management` directory.
- Create a `.env` file and set the MySQL database connection details.
- Run `npm install` to install dependencies.
- Run `npm start` to start the User Management microservice.

### Order Placement Microservice

- Navigate to the `Order Placement` directory.
- Create a `.env` file and set the PostgreSQL database connection details.
- Run `npm install` to install dependencies.
- Run `npm start` to start the Order Placement microservice.

### Inventory Management Microservice

- Navigate to the `Inventory Management` directory.
- Create a `.env` file and set the MongoDB connection string.
- Run `npm install` to install dependencies.
- Run `npm start` to start the Inventory Management microservice.

## Database Integration

Each microservice uses a different database:

- User Management: MySQL
- Order Placement: PostgreSQL
- Inventory Management: MongoDB

Refer to the `.env` files in each microservice's directory for database configuration.

## Microservices Communication

The Gateway microservice handles communication between microservices by routing requests to the appropriate service based on the URL path.

## Running the Project

1. Start each microservice as described in the "Setting Up Microservices" section.
2. Start the Gateway microservice from its directory:
 - cd Gateway
 - npm install
 - npm start


## Testing with Postman

You can use Postman to test the microservices' endpoints. Import the provided Postman script to simplify testing.

## Postman Collection

Access our Postman collection to explore and test the API endpoints: [Postman Collection](https://www.postman.com/avionics-operator-73461619/workspace/adbms-assignment-01/collection/26510408-ba20ad31-6b5c-4721-a991-0183ffb3b232?action=share&creator=26510388)

## Git Repository

Find the project's source code and documentation on our GitHub repository: [GitHub Repository](https://github.com/GevinN99/NodeJS-Microservice.git)

## Contributing

Contributions are welcome! Please follow our [contributing guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).

