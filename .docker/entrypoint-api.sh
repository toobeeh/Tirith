#!/bin/bash
set -e
sed -i "s!GRPC_CHANNEL_SED_PLACEHOLDER!$GRPC_CHANNEL!g" /app/tirith-api/dist/config/production.config.js
sed -i "s!CONTENT_GRPC_CHANNEL_SED_PLACEHOLDER!$CONTENT_GRPC_CHANNEL!g" /app/tirith-api/dist/config/production.config.js
sed -i "s/DISCORD_OAUTH_CLIENT_ID_SED_PLACEHOLDER/$DISCORD_OAUTH_CLIENT_ID/g" /app/tirith-api/dist/config/production.config.js 
sed -i "s/DISCORD_OAUTH_CLIENT_SECRET_SED_PLACEHOLDER/$DISCORD_OAUTH_CLIENT_SECRET/g" /app/tirith-api/dist/config/production.config.js 
sed -i "s!DISCORD_OAUTH_REDIRECT_SED_PLACEHOLDER!$DISCORD_OAUTH_REDIRECT!g" /app/tirith-api/dist/config/production.config.js 
sed -i "s!DISCORD_API_TOKEN_SED_PLACEHOLDER!$DISCORD_API_TOKEN!g" /app/tirith-api/dist/config/production.config.js 

# Start the main process
exec "$@"