FROM node:8.11.3-alpine
WORKDIR /usr/app
COPY package.json .
RUN apk --no-cache --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install && apk del build-dependencies
COPY . .
ADD https://github.com/ufoscout/docker-compose-wait/releases/download/2.2.1/wait /wait
RUN chmod +x /wait
CMD /wait && npm start