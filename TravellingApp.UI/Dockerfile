FROM node:14 as react-build

WORKDIR ./

COPY ./package.json ./package-lock.json ./

RUN npm install

COPY ./ ./

CMD ["npm", "start"]