#!/bin/bash

# example 
# sh link.sh production


declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")

### PRODUCTION

if [ "$1" == "production" ] ; then 

  bash $AWFUL_DIR/scripts/delete_all.sh "production"
  bash $AWFUL_DIR/scripts/update_all.sh "production"
  bash $AWFUL_DIR/scripts/push_all.sh "production"
  # sh $AWFUL_DIR/scripts/ecto_reset_all.sh "production"
  bash $AWFUL_DIR/scripts/seed_all.sh "production"

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  bash $AWFUL_DIR/scripts/delete_all.sh "development"
  bash $AWFUL_DIR/scripts/update_all.sh "development"
  bash $AWFUL_DIR/scripts/push_all.sh "development"
  # sh $AWFUL_DIR/scripts/ecto_reset_all.sh "development"
  bash $AWFUL_DIR/scripts/seed_all.sh "development"
    
fi 

