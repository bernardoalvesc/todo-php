FROM php:8.2-fpm

RUN apt-get update && apt-get install -y \
    sqlite3 \
    && docker-php-ext-install pdo pdo_sqlite

WORKDIR /var/www/html
