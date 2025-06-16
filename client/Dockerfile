FROM node:18-alpine as build
WORKDIR /app
COPY package.json package-lock.json* yarn.lock* ./
RUN npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/dist ./dist
RUN npm install -g serve
EXPOSE 4000
CMD ["serve", "-s", "dist", "-l", "4000"]
