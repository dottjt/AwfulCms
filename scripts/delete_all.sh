#!/bin/bash

# example 
# sh link.sh production


declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

  rm -rf $AWFUL_DIR/production/*

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  rm -rf $AWFUL_DIR/development/*

fi 

