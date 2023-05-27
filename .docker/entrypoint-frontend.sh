#!/bin/sh
set -e
sed -i "s/API_DOMAIN_NAME_SED_PLACEHOLDER/$API_DOMAIN_NAME/g" /usr/share/nginx/html/main.*.js

# Start the main process
exec "$@"