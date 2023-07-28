FROM node:18

LABEL name="Fumika"
LABEL desc="This challenge addresses EJS Server-Side Template Injection"

RUN apt-get update && apt-get install -y netcat-traditional

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install

COPY app .

EXPOSE 5105
CMD [ "node", "app.js" ]
