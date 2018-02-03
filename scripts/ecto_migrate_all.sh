#!/bin/bash
# try on template_symbolic

# example 
# sh link.sh production


declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

    for i in "${arr[@]}"
    do
      cd $AWFUL_DIR/production/"$i"/
      
      mix ecto.migrate
    
    done

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

    for i in "${arr[@]}"
  do
      cd $AWFUL_DIR/production/"$i"/
      
      mix ecto.migrate
    
    done

fi 

