FROM node:14 as RestorantSuggestService-build

WORKDIR ./

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

# EXPOSE 3050:3050

CMD ["npm", "start"]