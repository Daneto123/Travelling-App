FROM node:14 as RentCarService-build

WORKDIR ./

ENV PATH ./node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY . ./

# EXPOSE 3060:3060

CMD ["npm", "start"]