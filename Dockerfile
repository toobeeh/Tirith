FROM node:16-slim

WORKDIR /opt/app/

EXPOSE 3000

ARG NODE_ENV="production"
ENV NODE_ENV "${NODE_ENV}"

# Install npm modules for app
COPY package.json ./
COPY tirith-frontend/package.json ./client/
COPY tirith-api/package.json ./server/

RUN echo "Installing nest and ng cli..." && \
    npm install -g @nestjs/cli @angular/cli
RUN echo "Installing npm modules..." && \
    npm install || exit 1 && \
    echo "npm modules installed." && \
    npm cache clean --force

# Copy files for app
COPY . /opt/app/

# Build for production env
RUN echo "Building app...\n" && \
    npm run build || exit 1 && \
    echo "build was completed."

# Start app
CMD ["npm", "start"]