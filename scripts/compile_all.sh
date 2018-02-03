#!/bin/bash
# try on template_symbolic

# example 
# sh link.sh production

declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

# rm -rf websites


if [ "$1" == "production" ] ; then 

  for i in "${arr[@]}"
  do
    cd $AWFUL_DIR/production/"$i"/
    mix deps.get
    mix compile
  
    cd $AWFUL_DIR/production/"$i"/assets
    npm install --save https://github.com/brunch/sass-brunch.git
    npm run deploy
  done

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  for i in "${arr[@]}"
  do
    cd $AWFUL_DIR/development/"$i"/
    mix deps.get
    mix compile
  
    cd $AWFUL_DIR/development/"$i"/assets
    npm install --save https://github.com/brunch/sass-brunch.git
    npm run deploy
  done

fi 


