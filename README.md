# HANS platform
This is the source code for the HANS platform.
## Deployment
To deploy it, you need to install `docker`.

First, create a file with the name `.env` placed next to the file `compose.yml`. This file defines the following env variables

```
HOST=<this machines IP or domain name>
API_PORT=
MQTT_PORT=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
```

You need to set a value for the variables `HOST`, `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. The last two variables are not necessary if you are running the application on a EC2 instance with a IAM role. If `API_PORT` or `MQTT_PORT` are not given value, they default to 80 and 9001, respectively.

Then, run the following command
```bash
docker compose up -d
```

To stop the application, use the following command
```bash
docker compose down
```