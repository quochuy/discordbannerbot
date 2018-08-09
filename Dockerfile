FROM node:8

ENV TZ=Australia/Sydney
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

RUN apt-get update && apt-get install -y libgd2-dev

COPY ./bot /opt/bot

WORKDIR /opt/bot

RUN npm install
