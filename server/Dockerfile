
FROM node:18

WORKDIR /app

COPY package.json ./
COPY index.js ./

RUN npm install

EXPOSE 4001
CMD ["npm", "start"]
