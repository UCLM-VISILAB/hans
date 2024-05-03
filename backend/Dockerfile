# syntax=docker/dockerfile:1

FROM python:3.10.14
WORKDIR /app

COPY requirements.txt docker-entrypoint.sh ./
RUN pip install --no-cache-dir --upgrade -r requirements.txt

COPY src/ ./src

ENTRYPOINT ["./docker-entrypoint.sh"]
EXPOSE 8080