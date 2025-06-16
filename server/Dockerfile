FROM node:18-alpine
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install
COPY . .
EXPOSE 4001
CMD ["node", "index.js"]
