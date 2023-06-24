FROM node:18

WORKDIR /usr/src/app

COPY app/package*.json .

RUN npm install

COPY app .

EXPOSE 5106
CMD [ "node", "app.js" ]