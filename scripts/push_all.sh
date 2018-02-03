#!/bin/bash
# try on template_symbolic

# example 
# sh link.sh ac

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw") 


if [ "$1" == "production" ] ; then 

  echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi 

if [ "$1" == "development" ] ; then 

  for i in "${arr[@]}"
  do
    cd $AWFUL_DIR/development/"$i"/
    echo "$PWD"
    git add .
    git commit -m "automated commit"
    git push -fu origin master
  done

fi 


