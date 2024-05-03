# syntax=docker/dockerfile:1

FROM  eclipse-mosquitto
COPY mosquitto.conf /mosquitto/config/mosquitto.conf
EXPOSE 9001