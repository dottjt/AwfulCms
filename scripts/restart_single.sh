#!/bin/bash

# example 
# sh link.sh production ac 

if [ "$1" == "production" ] ; then 

  sh $AWFUL_DIR/scripts/stop_single.sh "production" "$2"
  sh $AWFUL_DIR/scripts/start_single.sh "production" "$2"

fi 

if [ "$1" == "development" ] ; then 

  sh $AWFUL_DIR/scripts/stop_single.sh "development" "$2"
  sh $AWFUL_DIR/scripts/start_single.sh "development" "$2"

fi 




