FROM php:7.4-apache

LABEL name="Fumiko"
LABEL desc="This challenge addresses Remote File Inclusion"

WORKDIR /var/www/html

COPY ./app /var/www/html

RUN echo "allow_url_include = On" >> /usr/local/etc/php/php.ini

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80

CMD ["apache2-foreground"]
