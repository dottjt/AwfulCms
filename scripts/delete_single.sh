#!/bin/bash

# example 
# sh link.sh production ac


declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  rm -rf $AWFUL_DIR/development/"$2"

fi 

