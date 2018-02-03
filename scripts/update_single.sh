#!/bin/bash

# example 
# sh link.sh production ac


### PRODUCTION

if [ "$1" == "production" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  mkdir -p $AWFUL_DIR/development/"$2"
  rsync -rtv $AWFUL_DIR/template/. $AWFUL_DIR/development/"$2"

  ### edit template
  # controllers and templates folders
  find $AWFUL_DIR/development/"$2"/lib/ac_web/controllers -type f -print0 | xargs -0 sed -i '' "s/env(:ac/env(:$2/g"
  find $AWFUL_DIR/development/"$2"/lib/ac_web/templates -type f -print0 | xargs -0 sed -i '' "s/env(:ac/env(:$2/g"

  # ac_web folder
  find $AWFUL_DIR/development/"$2"/lib/ac_web/endpoint.ex -type f -print0 | xargs -0 sed -i '' "s/:ac/:$2/g"
  find $AWFUL_DIR/development/"$2"/lib/ac_web/gettext.ex -type f -print0 | xargs -0 sed -i '' "s/otp_app: :ac/otp_app: :$2/g"
  find $AWFUL_DIR/development/"$2"/lib/ac_web/scheduler.ex -type f -print0 | xargs -0 sed -i '' "s/otp_app: :ac/otp_app: :$2/g"

  # ac folder
  find $AWFUL_DIR/development/"$2"/lib/ac/release.ex -type f -print0 | xargs -0 sed -i '' "s/:ac/:$2/g"
  find $AWFUL_DIR/development/"$2"/lib/ac/repo.ex -type f -print0 | xargs -0 sed -i '' "s/otp_app: :ac/otp_app: :$2/g"
  find $AWFUL_DIR/development/"$2"/lib/ac/sitemap -type f -print0 | xargs -0 sed -i '' "s/env(:ac/env(:$2/g"

  # mix file
  find $AWFUL_DIR/development/"$2"/mix.exs -type f -print0 | xargs -0 sed -i '' "s/:ac,/:$2,/g"

  # other
  find $AWFUL_DIR/development/"$2"/priv/repo/seeds.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$2/g"
  find $AWFUL_DIR/development/"$2"/rel/config.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$2/g"
  find $AWFUL_DIR/development/"$2"/.deliver/config -type f -print0 | xargs -0 sed -i '' "s/\"ac\"/\"$2\"/g"


  ### create shared
  banner script
  if [ -f $AWFUL_DIR/shared/banner_script/"$2"/bannerScript.js ]; then
    rsync -rtv $AWFUL_DIR/shared/banner_script/"$2"/bannerScript.js $AWFUL_DIR/development/"$2"/assets/js/
    echo "import bannerScript from './bannerScript';" >> $AWFUL_DIR/development/"$2"/assets/js/app.js 
    echo "awful christmas script copied"
  else
    echo "$2 script doesn't exist"
  fi 

  # css variables
  rsync -rtv $AWFUL_DIR/shared/css_variables/"$2"_variables.scss $AWFUL_DIR/development/"$2"/assets/css/variables.scss

  # elm src
  rsync -rtv $AWFUL_DIR/shared/elm/"$2"/src $AWFUL_DIR/development/"$2"/assets/elm/

  # env variables
  rsync -rtv $AWFUL_DIR/shared/env/."$2"_env $AWFUL_DIR/development/"$2"/
  rsync -rtv $AWFUL_DIR/shared/env/.env $AWFUL_DIR/development/"$2"/

  # seed files
  rsync -rtv $AWFUL_DIR/shared/seeds/"$2"_seeds.exs $AWFUL_DIR/development/"$2"/priv/repo/seeds/

  # config file
  rsync -rtv $AWFUL_DIR/shared/config/"$2"/* $AWFUL_DIR/development/"$2"/config/

  # images
  if [ -f $AWFUL_DIR/shared/images/"$2"/"$2".png ]; then
    mkdir -p $AWFUL_DIR/development/"$2"/assets/static/images/"$2"/
    rsync -rtv $AWFUL_DIR/shared/images/"$2"/* $AWFUL_DIR/development/"$2"/assets/static/images/"$2"/
  else
    echo "no images found"
  fi

  ### create dependencies
  rsync -rtv $AWFUL_DIR/dependencies/node_modules $AWFUL_DIR/development/$2/assets/
  rsync -rtv $AWFUL_DIR/dependencies/deps $AWFUL_DIR/development/$2/

  ### create git
  cd $AWFUL_DIR/development/"$2"
  git init
  git remote add origin ssh://git@bitbucket.org/juliusreade/"$2".git
  cd $AWFUL_DIR
  echo "local website done"

fi