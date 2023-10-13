FROM node:18-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install
RUN npm run build

ENV APP_PORT 3000
ENV REDIS_HOST redis
ENV REDIS_PORT 6379

EXPOSE 3000

CMD ["npm", "start"]
