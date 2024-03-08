# Step 1: Build the React app in production mode
FROM node:18 as build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json, package-lock.json, and vite.config.js
COPY package*.json vite.config.js ./

# Install dependencies
RUN npm install

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app for production to the build folder
RUN npm run build

# Step 2: Serve the React app using a static file server
FROM nginx:stable-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80 to the Docker host, so we can access it
# from the outside.
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
