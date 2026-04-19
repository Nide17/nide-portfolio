# Using official Node.js image as the base image
FROM node:20-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies: using npm ci for clean install based on package-lock.json
RUN npm ci

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN npm run build

# Set environment variables for the application
ENV NODE_ENV=production PORT=3001 HOSTNAME="0.0.0.0"

# Expose the port on which the application will run
EXPOSE 3001

# Start the application
CMD ["node_modules/.bin/next", "start"]
