FROM node:14

WORKDIR /usr/src/app
COPY package*.json ./

RUN npm install
COPY ./main.js ./

RUN npm init -y
RUN npm install express

EXPOSE 8001

CMD ["node", "main.js"]

