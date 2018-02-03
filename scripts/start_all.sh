#!/bin/bash

# example 
# sh link.sh production 

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

  for i in "${arr[@]}"

    cd $AWFUL_DIR/production/"$i"/
    
    MIX_ENV=prod elixir --detached --name=${i}_prod  -S mix phx.server 

  done 

fi 

if [ "$1" == "development" ] ; then 

  for i in "${arr[@]}"

    cd $AWFUL_DIR/development/"$i"/
    
    elixir --detached --name=${i}_dev -S mix phx.server 

  done 

fi 

