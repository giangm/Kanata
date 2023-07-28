FROM php:7.4-apache

LABEL name="Goro"
LABEL desc="This challenge addresses XML External Entity Injection"

WORKDIR /var/www/html

COPY ./app /var/www/html

RUN chmod 666 /var/www/html/utils/database.db
RUN chmod 777 /var/www/html/utils/

RUN echo "allow_url_include = On" >> /usr/local/etc/php/php.ini

RUN echo "ServerName localhost" >> /etc/apache2/apache2.conf

EXPOSE 80

CMD ["apache2-foreground"]
