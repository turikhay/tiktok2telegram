FROM node:18-alpine

WORKDIR /usr/src/app

COPY package.json package-lock.json* ./

RUN npm install

COPY . .

COPY .env.sample ./.env

RUN npm run build

ENV NODE_ENV production

USER node

CMD npm run start
