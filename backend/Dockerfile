# mern-auth-app/backend/Dockerfile
# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
# This allows npm install to leverage Docker's caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 5000

# Command to run the application. This will be overridden by docker-compose's 'command' for dev.
CMD ["npm", "start"]