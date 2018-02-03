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
  bash $AWFUL_DIR/scripts/compile_all.sh "production"
  bash $AWFUL_DIR/scripts/seed_all.sh "production"    

fi 

MIX_ENV=prod PORT=4000 elixir --name=manager -S mix phx.server

### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  bash $AWFUL_DIR/scripts/delete_all.sh "development"
  bash $AWFUL_DIR/scripts/update_all.sh "development"
  bash $AWFUL_DIR/scripts/push_all.sh "development"
  # sh $AWFUL_DIR/scripts/ecto_reset_all.sh "development"
  bash $AWFUL_DIR/scripts/compile_all.sh "development"
  bash $AWFUL_DIR/scripts/seed_all.sh "development"    
    
fi 

