FROM node:16-alpine
WORKDIR /appl1
COPY /front_sld/package*.json ./
RUN npm install
COPY /front_sld .
RUN npm run build
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build"]