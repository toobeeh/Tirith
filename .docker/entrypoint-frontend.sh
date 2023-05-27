#!/bin/bash
sed -i "s/API_DOMAIN_NAME_SED_PLACEHOLDER/$API_DOMAIN_NAME/g" /usr/share/nginx/html/main.*.js
sh -c nginx -g 'daemon off;'