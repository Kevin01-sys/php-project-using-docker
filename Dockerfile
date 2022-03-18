FROM php:8.1.3-apache

# then install extension mysqli for php
RUN docker-php-ext-install mysqli

