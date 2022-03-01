FROM node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY ./src ./src

CMD ["npm", "run", "build"]