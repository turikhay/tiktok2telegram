FROM node:18-alpine

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

COPY .env.sample ./.env

RUN pnpm build

ENV NODE_ENV production

USER node

CMD [ "pnpm", "start" ]
