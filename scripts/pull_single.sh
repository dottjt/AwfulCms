#!/bin/bash

# example 
# sh link.sh production ac 

if [ "$1" == "production" ] ; then 

    cd $AWFUL_DIR/production/"$2"/

    git pull

fi 

if [ "$1" == "development" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

    # cd $AWFUL_DIR/development/"$i"/

    # git pull
    
fi 

