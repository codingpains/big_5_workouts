#!/bin/sh

## Set all ips for production servers
declare -a webServersIps=("45.55.31.59")

## Deploy WEB SERVERS
for ip in "${webServersIps[@]}"
do
   echo "Deploying big_5_workouts::WebServer on ip: $ip"
   echo " -- Executing command"
   echo "(cd /home/deploy/apps/big_5_workouts/ && git reset --hard && git checkout master && git pull && sh deploy/deploy_webserver.sh)"
   ssh -y root@$ip "(cd /home/deploy/apps/big_5_workouts/ && git reset --hard && git checkout master && git pull && sh deploy/deploy_webserver.sh)"
done
