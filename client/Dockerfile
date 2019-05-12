FROM node:11-alpine

WORKDIR  /src/app

RUN npm install -g serve

ADD yarn.lock package.json ./
RUN yarn install

COPY . .

RUN yarn build

EXPOSE 5000
CMD ["serve", "-s", "build"]
