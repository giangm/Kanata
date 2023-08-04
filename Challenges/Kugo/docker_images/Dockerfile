FROM node:16

LABEL name="Kugo"
LABEL desc="This challenge addresses NoSQL Injection - Authentication Bypass"

WORKDIR /app

COPY app/backend/package*.json ./

RUN npm install

COPY app/backend/* ./
COPY app/frontend/* ./frontend/

ENV envs=secret
ENV envu=admin
ENV envp=6KZe8UX-LSX@KJu
ENV DB_URL=mongodb://db:27017/nosql_challenge

EXPOSE 3000

CMD ["node", "app.js"]
