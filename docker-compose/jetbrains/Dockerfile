FROM ubuntu:20.04

RUN apt update && apt install  openssh-server sudo -y

RUN useradd -rm -d /home/jetbrains -s /bin/bash -g root -G sudo -u 1000 jetbrains

RUN  echo 'jetbrains:password' | chpasswd

RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y git

RUN service ssh start

EXPOSE 22

CMD ["/usr/sbin/sshd","-D"]
