FROM node:20-alpine3.17

RUN apk update && apk add git

RUN apk --update add redis 

RUN set -ex && apk --no-cache add sudo

RUN sudo npm i -g pm2

USER node

WORKDIR /app

CMD npm start