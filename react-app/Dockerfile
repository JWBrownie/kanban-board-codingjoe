# Use an official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before other files
# This ensures that dependencies are cached unless package.json changes
COPY package.json package-lock.json ./

# Install dependencies as root
RUN npm install

# Change ownership of the node_modules directory to the node user
RUN chown -R node:node /app/node_modules

# Copy the rest of the application code as the node user
COPY --chown=node:node . .

# Switch to the node user
USER node

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
