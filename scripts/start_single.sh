#!/bin/bash

# example 
# sh link.sh production ac 


if [ "$1" == "production" ] ; then 

    cd $AWFUL_DIR/production/"$2"/
    
    MIX_ENV=prod elixir --detached --name=${2}_prod  -S mix phx.server 
    
fi 

if [ "$1" == "development" ] ; then 

    cd $AWFUL_DIR/development/"$2"/
    
    elixir --detached --name=${2}_dev -S mix phx.server 

fi 

