FROM node:12

# Create app directory
WORKDIR /usr/src/app

RUN python -V

RUN git clone https://tom.song:fs770411%21%23%24@git.luxrobo.net/lms/scratch-web-blocks.git scratch-blocks
RUN git clone https://tom.song:fs770411%21%23%24@git.luxrobo.net/lms/scratch-web-vm.git scratch-vm

WORKDIR /usr/src/app/scratch-blocks

RUN npm install
# RUN npm run prepublish
RUN npm link

WORKDIR /usr/src/app/scratch-vm

RUN npm install
RUN npm link

WORKDIR /usr/src/app/scratch-gui

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
RUN npm link scratch-blocks
RUN npm link scratch-vm
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8601
CMD [ "npm", "start" ]
