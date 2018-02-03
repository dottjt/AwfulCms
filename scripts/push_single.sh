#!/bin/bash
# try on template_symbolic

# example 
# sh link.sh ac


if [ "$1" == "production" ] ; then 

  echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi 

if [ "$1" == "development" ] ; then 

    cd $AWFUL_DIR/development/"$2"/
    echo "$PWD"
    git add .
    git commit -m "automated commit"
    git push -fu origin master

fi 


