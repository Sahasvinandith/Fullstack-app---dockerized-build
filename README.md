# Full-Stack MERN Authentication App with Docker

This is a full-stack web application that provides user registration and login functionality. It's built with the MERN stack (MongoDB, Express.js, React.js, Node.js) and is fully containerized using Docker for easy setup and deployment.

## Features

*   User registration
*   User login
*   JWT-based authentication
*   Protected routes for authenticated users
*   Fully containerized for development with Docker Compose

## Tech Stack

*   **Frontend**: [React.js](https://reactjs.org/), [Vite](https://vitejs.dev/), [Axios](https://axios-http.com/), [Tailwind CSS](https://tailwindcss.com/)
*   **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/), [Mongoose](https://mongoosejs.com/)
*   **Database**: [MongoDB](https://www.mongodb.com/)
*   **Authentication**: [JSON Web Tokens (JWT)](https://jwt.io/)
*   **Containerization**: [Docker](https://www.docker.com/) & [Docker Compose](https://docs.docker.com/compose/)

## Prerequisites

Before you begin, ensure you have the following installed on your system:
*   [Docker](https://docs.docker.com/get-docker/)
*   [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

Follow these steps to get the application running in a development environment.

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <repository-folder>
```

### 2. Configure Environment Variables

The backend service requires a `.env` file for configuration. You can create one by copying the example file.

```bash
cp backend/.env.example backend/.env
```

The default values in `.env` are configured to work with the Docker Compose setup. However, you should change `JWT_SECRET` to a long, random string for security.

**`backend/.env`**
```
# MongoDB connection string (uses the service name from docker-compose)
MONGO_URI=mongodb://mongodb:27017/auth_db

# JWT secret key for signing tokens
JWT_SECRET=youshouldchangethistosomethingsecure

# Port for the backend server
PORT=5000
```

### 3. Build and Run the Application

Use Docker Compose to build the images and start all the services.

```bash
docker-compose up --build
```

*   The `--build` flag tells Docker Compose to build the images before starting the containers. You only need to use this the first time or after making changes to the `Dockerfile` or application dependencies.

Once the containers are running:
*   The **React frontend** will be accessible at [http://localhost:5173](http://localhost:5173)
*   The **Node.js backend API** will be running at [http://localhost:5000](http://localhost:5000)

### 4. Stopping the Application

To stop the containers, press `Ctrl + C` in the terminal where `docker-compose` is running, and then run:

```bash
docker-compose down
```

## Project Structure

```
.
├── docker-compose.yml      # Defines and configures all services
├── backend/                # Node.js & Express.js API
│   ├── Dockerfile          # Instructions to build the backend image
│   ├── package.json
│   ├── server.js           # Main entry point for the backend
│   ├── .env                # Environment variables (ignored by git)
│   ├── .env.example        # Example environment variables
│   └── ...
└── frontend/               # React.js UI
    ├── Dockerfile.dev      # Instructions to build the frontend dev image
    ├── package.json
    ├── vite.config.js
    └── src/                # React application source code
```

## API Endpoints

The backend server provides the following API endpoints under the `/api/auth` prefix:

*   `POST /api/auth/register`: Register a new user.
    *   **Body**: `{ "email": "user@example.com", "password": "yourpassword" }`
*   `POST /api/auth/login`: Authenticate a user and receive a JWT.
    *   **Body**: `{ "email": "user@example.com", "password": "yourpassword" }`
*   `GET /api/auth/protected`: An example protected route.
    *   **Headers**: `{ "Authorization": "Bearer <your_jwt_token>" }`
