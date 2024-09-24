FROM node:16

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./ /usr/src/app

RUN npm install && npm cache clean --force

ENV PORT 5001
EXPOSE 5001
CMD [ "npm", "run build" ]
