FROM ubuntu:16.04
MAINTAINER ugur cekmez <ucekmez@gmail.com>
RUN apt-get update

RUN apt-get install -y curl

# Install latest nodejs
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash -
RUN apt-get install -y --no-install-recommends \
  nodejs       \
  build-essential \
  unzip

RUN npm install -g serve

COPY ./admin /admin
WORKDIR /admin

RUN npm install
RUN npm run build

EXPOSE 9999

ENTRYPOINT serve -s build --listen 9999


# EOF
