FROM node:18

WORKDIR /usr/src/app

RUN npm i -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

COPY .env.sample ./.env

RUN pnpm build

CMD [ "pnpm", "start" ]
