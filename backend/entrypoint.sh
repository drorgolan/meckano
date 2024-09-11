#!/bin/sh
PARENT_DIR="/app/backend"
cd $PARENT_DIR

# Start PHP-FPM in the background
php-fpm &

# # Wait for the database to be ready before running migrations
# until nc -z -v -w30 $DB_HOST 3306; do
#   echo "Waiting for database connection..."
#   sleep 5
# done

# Run database migrations
php artisan migrate --force &
rm xdebug.ini &
# Test the server functionality/customer functionality also check user auth and JWT bearer
php artisan test

# Start the Laravel server
exec php artisan serve --host=0.0.0.0 --port=8000
