FROM node:argon

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g parse-dashboard

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

EXPOSE 4040
EXPOSE 3000

# RUN /usr/src/app/run_dashboard.sh
# CMD [ "parse-dashboard", "--allowInsecureHTTP", "--config", "/usr/src/app/parse-dashboard-config.json"]
CMD [ "npm", "start" ]
