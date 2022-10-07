#!/bin/bash
profile="check_orders"

if [ $1 = "start" ]; then
sudo docker-compose -f docker-compose-indirect.yml --env-file ./.production.env -p $profile up -d --build
else
sudo docker-compose -f docker-compose-indirect.yml --env-file ./.production.env -p $profile down
fi
