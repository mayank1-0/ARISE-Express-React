FROM node:16
WORKDIR /ARISE1
COPY package.json /ARISE1
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]