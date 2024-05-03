#!/bin/sh

# TODO: replace owner of the generated logs
mkdir -p session_log/zips
exec python3 -m src.main "$@"