#!/bin/bash

# example 
# sh link.sh production 

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

  echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."
  exit 1

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  for i in "${arr[@]}"
  do 
    # upper= echo "$i" | awk '{print toupper($0)}'
    upper="$(echo $i | tr '[:lower:]' '[:upper:]')"
    
    rsync -rtv /Users/dottjt/Documents/Awful/${i}/${upper}.png /Users/dottjt/Code/PER/awful/shared/images/${i}/${upper}.png
    rsync -rtv /Users/dottjt/Documents/Awful/${i}/${upper}.svg /Users/dottjt/Code/PER/awful/shared/images/${i}/${upper}.svg
    rsync -rtv /Users/dottjt/Documents/Awful/${i}/${upper}P.svg /Users/dottjt/Code/PER/awful/shared/images/${i}/${upper}P.svg
    rsync -rtv /Users/dottjt/Documents/Awful/${i}/${upper}S.png /Users/dottjt/Code/PER/awful/shared/images/${i}/${upper}S.png

    rsync -rtv /Users/dottjt/Documents/Awful/${i}/icomoon/fonts /Users/dottjt/Code/PER/awful/shared/images/${i}/icomoon
    rsync -rtv /Users/dottjt/Documents/Awful/${i}/icomoon/style.css /Users/dottjt/Code/PER/awful/shared/images/${i}/icomoon/style.scss 

  done 

  bash $AWFUL_DIR/scripts/update_all.sh "development"

fi 

