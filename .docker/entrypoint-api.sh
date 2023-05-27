#!/bin/bash
set -e
sed -i "s/DB_DOMAIN_NAME_SED_PLACEHOLDER/$DB_DOMAIN_NAME/g" /app/tirith-api/dist/config/production.config.js 

# Start the main process
exec "$@"