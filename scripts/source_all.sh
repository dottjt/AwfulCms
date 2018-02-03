#!/bin/bash

# example 
# sh link.sh production

# They are both the same. 

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

  for i in "${arr[@]}"

    source $AWFUL_DIR/shared/env/${i}/.${i}_env  

  done

    source $AWFUL_DIR/shared/env/${i}/.env  
    source $AWFUL_DIR/manager/.env  

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."
  
fi 



