FROM ubuntu:20.04

COPY requirements.txt /tmp/
RUN apt-get update && apt-get install -y python3.8 && \
    pip3 install -I --no-cache-dir -r "/tmp/requirements.txt" && \
