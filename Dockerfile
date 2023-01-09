FROM alpine

RUN apk add --update nodejs npm

WORKDIR /app

COPY ./package* .

COPY ./*.js .

RUN npm install

EXPOSE 8080

ENTRYPOINT ["nodemon", "server.js"]
