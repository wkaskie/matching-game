FROM node:12

# Set app directory
WORKDIR /usr/src/app

#install dependencies
COPY package*.json ./
RUN npm i ci --only=production

#Bundles the source
COPY . .

EXPOSE 3050

CMD yarn build && node server/index.js