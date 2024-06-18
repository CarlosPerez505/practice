# Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Copy the wait-for-it.sh script
COPY wait-for-it.sh /usr/local/bin/wait-for-it.sh
RUN chmod +x /usr/local/bin/wait-for-it.sh

CMD ["./wait-for-it.sh", "db:3306", "--", "npm", "start"]
