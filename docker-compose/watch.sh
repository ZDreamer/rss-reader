#!/bin/sh
sudo service ssh start
cd rss
docker-compose run --rm --service-ports npm run watch

#Ku