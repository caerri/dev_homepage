# Node.js Dockerfile for node_sandbox
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the port your server uses
EXPOSE 4000

# Start the server
CMD ["node", "server.js"]