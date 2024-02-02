#!/bin/sh
set -e
sed -i "s/API_DOMAIN_NAME_SED_PLACEHOLDER/$API_DOMAIN_NAME/g" /app/tirith-frontend/dist/Tirith/browser/main.*.js
sed -i "s/API_DOMAIN_NAME_SED_PLACEHOLDER/$API_DOMAIN_NAME/g" /app/tirith-frontend/dist/Tirith/server/main.js

# Start the main process
exec "$@"