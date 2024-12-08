FROM node:22.9

WORKDIR /app

COPY package*.json ./

RUN yarn

COPY . .

EXPOSE 3000