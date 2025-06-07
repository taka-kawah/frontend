FROM node:23-slim

WORKDIR /app

COPY package.json ./
RUN npm i

COPY . .

RUN apt-get update && apt-get install -y git

EXPOSE 5137
CMD [ "npm", "run", "dev", "--", "--host" ]