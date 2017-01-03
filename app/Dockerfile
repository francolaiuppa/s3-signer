FROM node:latest
VOLUME /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3001
RUN ["npm","i","-g","nodemon","forever","jsdoc","istanbul","jscs","npm-check"]
CMD ["npm","start"]
