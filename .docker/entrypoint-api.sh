#!/bin/bash
set -e
sed -i "s/DB_DOMAIN_NAME_SED_PLACEHOLDER/$DB_DOMAIN_NAME/g" /app/tirith-api/dist/config/production.config.js 
sed -i "s/DISCORD_OAUTH_CLIENT_ID_SED_PLACEHOLDER/$DISCORD_OAUTH_CLIENT_ID/g" /app/tirith-api/dist/config/production.config.js 
sed -i "s/DISCORD_OAUTH_CLIENT_SECRET_SED_PLACEHOLDER/$DISCORD_OAUTH_CLIENT_SECRET/g" /app/tirith-api/dist/config/production.config.js 
sed -i "s/DISCORD_OAUTH_REDIRECT_SED_PLACEHOLDER/$DISCORD_OAUTH_REDIRECT/g" /app/tirith-api/dist/config/production.config.js 

# Start the main process
exec "$@"