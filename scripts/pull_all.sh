#!/bin/bash

# example 
# sh link.sh production ac 

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

    for i in "${arr[@]}"

      cd $AWFUL_DIR/production/"$i"/

      git pull

    done

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

    # cd $AWFUL_DIR/development/"$i"/

    # git pull
    
fi 

