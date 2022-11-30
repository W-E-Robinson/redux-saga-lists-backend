FROM alpine

#ENV PGUSER=postgres

#ENV PGHOST=localhost

#ENV PGPASSWORD=mysecretpassword

RUN apk add --update nodejs npm

WORKDIR /app

COPY ./package* .

COPY ./*.js .

RUN npm install

EXPOSE 8080

ENTRYPOINT ["node", "server.js"]
