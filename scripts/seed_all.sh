#!/bin/bash
# try on template_symbolic

# example 
# sh link.sh production

   
declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")


### PRODUCTION

if [ "$1" == "production" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

    for i in "${arr[@]}"
    do

      cd $AWFUL_DIR/production/"$i"
      echo "$PWD"
      # mix ecto.reset
      mix truncate 
      mix run priv/repo/seeds/"$i"_seed.exs
    done

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

    for i in "${arr[@]}"
    do
    
      cd $AWFUL_DIR/development/"$i"
      echo "$PWD"
      # mix ecto.reset
      mix truncate 
      mix ecto.seed

    done

fi 

