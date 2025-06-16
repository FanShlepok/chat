
FROM node:18

WORKDIR /app

COPY package.json ./
COPY vite.config.js ./
COPY postcss.config.js ./
COPY tailwind.config.js ./
COPY ./src ./src
COPY index.html .
COPY index.css .

RUN npm install

EXPOSE 3000
CMD ["npm", "run", "dev"]
