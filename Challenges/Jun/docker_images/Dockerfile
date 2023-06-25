FROM node:18

LABEL name="Jun"
LABEL desc="This challenge addresses Command Injection - Space Bypass"

RUN apt-get update && apt-get install -y iputils-ping

WORKDIR /usr/src/app

COPY app/package*.json .

RUN npm install

COPY app .

EXPOSE 5108
CMD [ "node", "app.js" ]
