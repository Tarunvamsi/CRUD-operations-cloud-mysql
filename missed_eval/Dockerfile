# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application files to the working directory
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]
