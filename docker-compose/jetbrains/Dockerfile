FROM ubuntu:21.04

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

RUN service ssh start

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]
