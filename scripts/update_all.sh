#!/bin/bash

# example 
# sh link.sh production


declare -a arr=("ac" "af" "ap" "ach" "ahp" "apo" "a9" "aw")


### PRODUCTION

if [ "$1" == "production" ] ; then 

    echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

  # for i in "${arr[@]}"

  #   cd $AWFUL_DIR/development/"$i"/

  #   git pull

  # done

fi 


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  for i in "${arr[@]}"
  do
    ### create template
    mkdir -p $AWFUL_DIR/development/"$i"
    rsync -rtv $AWFUL_DIR/template/. $AWFUL_DIR/development/"$i"

    ### edit template
    # controllers and templates folders
    find $AWFUL_DIR/development/"$i"/lib/ac_web/controllers -type f -print0 | xargs -0 sed -i '' "s/env(:ac/env(:$i/g"
    find $AWFUL_DIR/development/"$i"/lib/ac_web/templates -type f -print0 | xargs -0 sed -i '' "s/env(:ac/env(:$i/g"

    # ac_web folder
    find $AWFUL_DIR/development/"$i"/lib/ac_web/endpoint.ex -type f -print0 | xargs -0 sed -i '' "s/:ac/:$i/g"
    find $AWFUL_DIR/development/"$i"/lib/ac_web/gettext.ex -type f -print0 | xargs -0 sed -i '' "s/otp_app: :ac/otp_app: :$i/g"
    find $AWFUL_DIR/development/"$i"/lib/ac_web/scheduler.ex -type f -print0 | xargs -0 sed -i '' "s/otp_app: :ac/otp_app: :$i/g"

    # ac folder
    find $AWFUL_DIR/development/"$i"/lib/ac/release.ex -type f -print0 | xargs -0 sed -i '' "s/:ac/:$i/g"
    find $AWFUL_DIR/development/"$i"/lib/ac/repo.ex -type f -print0 | xargs -0 sed -i '' "s/otp_app: :ac/otp_app: :$i/g"
    find $AWFUL_DIR/development/"$i"/lib/ac/sitemap -type f -print0 | xargs -0 sed -i '' "s/env(:ac/env(:$i/g"
    
    # mix file
    find $AWFUL_DIR/development/"$i"/mix.exs -type f -print0 | xargs -0 sed -i '' "s/:ac,/:$i,/g"

    # other
    find $AWFUL_DIR/development/"$i"/priv/repo/seeds.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$i/g"
    find $AWFUL_DIR/development/"$i"/rel/config.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$i/g"
    find $AWFUL_DIR/development/"$i"/.deliver/config -type f -print0 | xargs -0 sed -i '' "s/\"ac\"/\"$i\"/g"


    ### create shared
    banner script
    if [ -f $AWFUL_DIR/shared/banner_script/"$i"/bannerScript.js ]; then
      rsync -rtv $AWFUL_DIR/shared/banner_script/"$i"/bannerScript.js $AWFUL_DIR/development/"$i"/assets/js/
      echo "import bannerScript from './bannerScript';" >> $AWFUL_DIR/development/"$i"/assets/js/app.js 
      echo "awful christmas script copied"
    else
      echo "$1 script doesn't exist"
    fi 

    # css variables
    rsync -rtv $AWFUL_DIR/shared/css_variables/"$i"_variables.scss $AWFUL_DIR/development/"$i"/assets/css/variables.scss

    # elm src
    rsync -rtv $AWFUL_DIR/shared/elm/"$i"/src $AWFUL_DIR/development/"$i"/assets/elm/

    # env variables - I don't see why they need to be in their directories, and can't just exist in shared :)
    # rsync -rtv $AWFUL_DIR/shared/env/."$i"_env $AWFUL_DIR/development/"$i"/
    # rsync -rtv $AWFUL_DIR/shared/env/.env $AWFUL_DIR/development/"$i"/

    # seed files
    rsync -rtv $AWFUL_DIR/shared/seeds/"$i"_seeds.exs $AWFUL_DIR/development/"$i"/priv/repo/seeds/

    # config file
    rsync -rtv $AWFUL_DIR/shared/config/"$i"/* $AWFUL_DIR/development/"$i"/config/

    # images
    if [ -f $AWFUL_DIR/shared/images/"$i"/"$i".png ]; then
      mkdir -p $AWFUL_DIR/development/"$i"/assets/static/images/"$i"/icomoon
      rsync -rtv $AWFUL_DIR/shared/images/"$i"/* $AWFUL_DIR/development/"$i"/assets/static/images/"$i"/
      rsync -rtv $AWFUL_DIR/shared/images/"$i"/icomoon $AWFUL_DIR/development/"$i"/assets/css
    else
      echo "no images found"
    fi

    ### create dependencies
    rsync -rtv $AWFUL_DIR/dependencies/node_modules $AWFUL_DIR/development/$i/assets/
    rsync -rtv $AWFUL_DIR/dependencies/deps $AWFUL_DIR/development/$i/

    ### create git
    cd $AWFUL_DIR/development/"$i"
    git init
    git remote add origin ssh://git@bitbucket.org/juliusreade/"$i".git
    cd $AWFUL_DIR
    echo "local website done"
    
  done

fi 


