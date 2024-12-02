# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code to the container
COPY . .

# Expose both ports (5173 for Vite, 3000 for additional mapping)
# Expose the port Vite runs on
EXPOSE 5173 8888

# Set the default command to start the development server
CMD ["npm", "run", "start"]
