from typing import Callable, Union

import os

import src.context as ctx
from .api import ServerAPI
from .mqtt import BrokerWrapper


API_PORT = int(os.getenv("API_PORT", 8080))


def start_services(
    on_start_cb: Callable[[Union[BrokerWrapper, ServerAPI]], None]=None
):
    # print("Starting services")

    ctx.AppContext.api_service = ServerAPI(port=API_PORT)
    # if on_start_cb:
    #     ctx.AppContext.api_service.on_start.connect(lambda: on_start_cb(ctx.AppContext.api_service))
    ctx.AppContext.api_service.start()

    # print("Services up and running")

def stop_services():
    pass
    # ctx.AppContext.api_service.shutdown()
    # ctx.AppContext.mqtt_broker.stop()