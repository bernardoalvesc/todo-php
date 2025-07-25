FROM php:8.2-fpm

RUN apt-get update && \
    apt-get install -y sqlite3 libsqlite3-dev && \
    docker-php-ext-install pdo_sqlite

WORKDIR /var/www/html
RUN chmod 666 /var/www/html/database.sqlite

