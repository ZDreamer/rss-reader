echo 'Run watch'
npm run watch > /var/www/var/log/watch.log &

sleep 10 #Не успевает иначе запуститься сервис, надо бы проверку сделать.
echo 'Run messenger'
symfony run --daemon --watch=config,src,templates,vendor symfony console messenger:consume async -vv

/usr/sbin/sshd -D