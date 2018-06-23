FROM ubuntu:16.04
MAINTAINER ugur cekmez <ucekmez@gmail.com>
RUN apt-get update


# Install system-wide packages
RUN apt-get update && apt-get install -y --no-install-recommends \
        build-essential \
        curl \
        wget \
        vim \
        git \
        python3-setuptools \
        python3.5 \
        python3.5-dev \
        ca-certificates \
        sudo \
        fish


# Make python3 default
RUN ln -s -f /usr/bin/python3 /usr/bin/python

# Install pip
RUN wget https://bootstrap.pypa.io/get-pip.py && python get-pip.py && rm get-pip.py

# install dev packages from requirements.txt
COPY requirements.txt requirements.txt
RUN pip install --no-cache -r requirements.txt --upgrade # python3


WORKDIR /app

COPY ./test-admin test-admin
COPY ./__init__.py __init__.py
COPY ./API.py API.py
COPY ./db.py db.py

#ENTRYPOINT ["gunicorn", "--reload API"] 






# EOF
