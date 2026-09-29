FROM node:20-alpine

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Build the Docusaurus site
RUN npm run build

# Install a simple static server
RUN npm install -g serve

# Cloud Run uses the PORT environment variable (defaults to 8080)
ENV PORT=8080
EXPOSE 8080

# Serve the static build output
CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:8080"]
