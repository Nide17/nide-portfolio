FROM node:alpine

ENV PORT 3000

WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# Copy source files
COPY . ./

# Build the app
RUN npm run build

# The port that this container will listen to
EXPOSE 3000

# Running the app
CMD [ "npm", "run", "dev" ]