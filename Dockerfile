FROM node:alpine
WORKDIR /src
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
COPY ./public ./public
RUN npm i
CMD ["npm", "run", "start"]
