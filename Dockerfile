FROM node:16-slim as node-builder

WORKDIR /app/

EXPOSE 3000

ARG NODE_ENV="production"
ENV NODE_ENV "${NODE_ENV}"

# Copy files for app
COPY . /app/

RUN echo "Installing nest and ng cli..." && \
    npm install -g @nestjs/cli @angular/cli
RUN echo "Installing npm modules..." && \
    NODE_ENV=development npm install || exit 1 && \
    echo "npm modules installed." && \
    npm cache clean --force

# build and link palantir lib
RUN echo "installing tsc..." && \
    npm install -g typescript
RUN echo "building lib..." && \
    cd ./palantir-db && \
    tsc
RUN echo "linking lib..." && \
    npm link palantir-db -w tirith-frontend -w tirith-api

# Build for production env
RUN echo "Building app...\n" && \
    npm run build || exit 1 && \
    echo "build was completed."

FROM nginx:1.21-alpine as hoster

COPY --from=node-builder /app/tirith-frontend/dist/tirith /usr/share/nginx/html
COPY --from=node-builder /app/tirith-frontend/nginx.conf /etc/nginx/nginx.conf 
COPY --from=node-builder /app /app

RUN apk add --update nodejs npm

EXPOSE 80 3000

CMD ["sh", "-c", "node /app/tirith-api/dist/main.js & nginx -g 'daemon off;'"]