FROM node:16-slim as node-builder

WORKDIR /app/

EXPOSE 3000

ARG NODE_ENV="production"
ENV NODE_ENV "${NODE_ENV}"

# Install npm modules for app
COPY package.json ./
COPY tirith-frontend/package.json ./tirith-frontend/
COPY tirith-api/package.json ./tirith-api/

RUN echo "Installing nest and ng cli..." && \
    npm install -g @nestjs/cli @angular/cli
RUN echo "Installing npm modules..." && \
    NODE_ENV=development npm install || exit 1 && \
    echo "npm modules installed." && \
    npm cache clean --force

# Copy files for app
COPY . /app/

# Build for production env
RUN echo "Building app...\n" && \
    npm run build || exit 1 && \
    echo "build was completed."

FROM nginx:1.21-alpine as hoster

COPY --from=node-builder /app/tirith-frontend/dist/tirith /usr/share/nginx/html
COPY --from=node-builder /app/tirith-api/dist /app/api

RUN apk add --update nodejs npm

EXPOSE 80 3000

CMD ["sh", "-c", "node /app/api/main.js & nginx -g 'daemon off;'"]