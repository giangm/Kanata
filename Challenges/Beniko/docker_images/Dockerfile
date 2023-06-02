FROM php:7.4-apache

LABEL name="Beniko"
LABEL desc="This challenge address Local File Inclusion - Log File Contamination"

WORKDIR /var/www/html

ADD ./app /var/www/html

RUN a2enmod rewrite
RUN a2enmod headers

ADD apache-config.conf /etc/apache2/sites-enabled/000-default.conf

EXPOSE 80

CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]