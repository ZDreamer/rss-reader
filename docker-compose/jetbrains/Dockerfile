FROM ubuntu:22.04

ENV DEBIAN_FRONTEND noninteractive

#Install SSH
RUN apt update && apt install  openssh-server sudo -y
RUN useradd -rm -d /home/jetbrains -s /bin/bash -g root -G sudo -u 1000 jetbrains
RUN  echo 'jetbrains:password' | chpasswd

#Install GIT
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

#Install NPM
RUN apt-get update && apt-get install -y npm nodejs

#Install PHP
RUN apt-get update && apt-get install -y php
RUN apt-get update && apt-get install libcurl4-openssl-dev
RUN apt-get update && apt-get install -y \
    php-mbstring \
    php-curl \
    php-pgsql \
    php-xml

RUN apt-get update && apt-get install -y php-amqp

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

#Copy SSH Keys
COPY  ./docker-compose/jetbrains/ssh/authorized_keys /home/jetbrains/.ssh/authorized_keys

#Install Symfony CLI
COPY  ./docker-compose/jetbrains/scripts/symfony-cli.list /etc/apt/sources.list.d/
RUN apt-get update
RUN apt-get install symfony-cli

RUN service ssh start

EXPOSE 22

COPY ./docker-compose/jetbrains/scripts/ /init-scripts/
RUN chmod +x /init-scripts/startup.sh

CMD /init-scripts/startup.sh

#CMD sh /home/jetbrains/.cache/JetBrains/RemoteDev/dist/cc1b278e0185f_PhpStorm-2021.3/bin/remote-dev-server.sh \
#	run /var/www \
#	--ssh-link-host 127.0.0.1 \
#	--ssh-link-user jetbrains \
#	--ssh-link-port 22 \
#	--listenOn 0.0.0.0

#https://youtrack.jetbrains.com/issue/GTW-780 - Docker image issue
#https://youtrack.jetbrains.com/issue/CWM-3983 - Without ssh connection
