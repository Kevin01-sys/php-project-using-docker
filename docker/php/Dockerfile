# se toma la variable recibida del docker-compose.yml
ARG php_version

FROM php:${php_version}

RUN docker-php-ext-install mysqli pdo pdo_mysql
#RUN docker-php-ext-install mysqli
RUN a2enmod rewrite
