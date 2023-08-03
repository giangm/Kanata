FROM node:18

LABEL name="Sora"
LABEL desc="This challenge addresses Command Injection - Bypass Blacklisted Commands"

RUN apt-get update && apt-get install -y iputils-ping

WORKDIR /usr/src/app

COPY app/package*.json ./

RUN npm install

COPY app .

EXPOSE 5109
CMD [ "node", "app.js" ]
