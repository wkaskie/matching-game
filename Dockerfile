FROM node:current-alpine3.12

# Set app directory
WORKDIR /usr/src/app

#install dependencies
COPY package*.json ./
RUN yarn

#Bundle the source
COPY . .

EXPOSE 3050

CMD npm run build && node server/index.js