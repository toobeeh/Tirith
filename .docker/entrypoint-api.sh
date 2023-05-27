echo $DB_DOMAIN_NAME
sed -i "s/DB_DOMAIN_NAME_SED_PLACEHOLDER/$DB_DOMAIN_NAME/g" /app/tirith-api/dist/config/production.config.js
cat /app/tirith-api/dist/config/production.config.js
sh -c node /app/tirith-api/dist/main.js