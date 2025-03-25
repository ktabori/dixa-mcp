# Use Node.js 22
FROM node:22-slim

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies and build tools
RUN npm install -g npm@latest && \
    npm install && \
    npm cache clean --force

# Copy source code
COPY . .

# Build the project
RUN npm run build

# Remove dev dependencies
RUN npm prune --production

# Expose the port the server will run on
EXPOSE 3000

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Start the server
CMD ["npm", "start"] 