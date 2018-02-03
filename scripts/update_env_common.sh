#!/bin/bash

# example 
# sh link.sh production


# 2 mailgun_key
# 3 amazon_associate_tag
# 4 aws_access_key_id
# 5 aws_secret_access_key
# 6 marketplace_host
# 7 amazon_s3_access_key
# 8 amazon_s3_secret_access_key
# 9 etsy_api_key
# 10 etsy_secret_key
# 11 tumblr_access_token
# 12 tumblr_access_token_secret


###### 
###### PART ONE - UPDATE DEVELOPMENT SHARED/ENV
######

if [ "$1" == "production" ] ; then 

  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export MAILGUN_KEY=".*"/export MAILGUN_KEY=\"$2\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export AMAZON_ASSOCIATE_TAG=".*"/export AMAZON_ASSOCIATE_TAG=\"$3\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export AWS_ACCESS_KEY_ID=".*"/export AWS_ACCESS_KEY_ID=\"$4\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export AWS_SECRET_ACCESS_KEY=".*"/export AWS_SECRET_ACCESS_KEY=\"$5\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export MARKETPLACE_HOST=".*"/export MARKETPLACE_HOST=\"$6\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export AMAZON_S3_ACCESS_KEY=".*"/export AMAZON_S3_ACCESS_KEY=\"$7\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export AMAZON_S3_SECRET_ACCESS_KEY=".*"/export AMAZON_S3_SECRET_ACCESS_KEY=\"$8\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export ETSY_API_KEY=".*"/export ETSY_API_KEY=\"$9\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export ETSY_SECRET_KEY=".*"/export ETSY_SECRET_KEY=\"${10}\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export TUMBLR_ACCESS_TOKEN=".*"/export TUMBLR_ACCESS_TOKEN=\"${11}\"/g"
  find $AWFUL_DIR/shared/env/.env -type f -print0 | xargs -0 sed -i '' "export TUMBLR_ACCESS_TOKEN_SECRET=".*"/export TUMBLR_ACCESS_TOKEN_SECRET=\"${12}\"/g"




  # ######
  # ###### PART TWO - UPDATE DEVELOPMENT WEBSITE
  # ###### - no longer necessary, as env is no longer kept in directory aka ac folder

  # sh $AWFUL_DIR/scripts/update_single.sh "development" "$2"
  # sh $AWFUL_DIR/scripts/push_single.sh "development" "$2"

  ######
  ###### PART THREE - UPDATE AND KILL PRODUCTION WEBSITE
  ######

  sh $AWFUL_DIR/scripts/stop_single.sh "production" "$2"
  sh $AWFUL_DIR/scripts/pull_single.sh "production" "$2"

  ######
  ###### PART FOUR - UPDATE PRODUCTION ENV FILE
  ######

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export MAILGUN_KEY=".*"/export MAILGUN_KEY=\"$2\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export AMAZON_ASSOCIATE_TAG=".*"/export AMAZON_ASSOCIATE_TAG=\"$3\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export AWS_ACCESS_KEY_ID=".*"/export AWS_ACCESS_KEY_ID=\"$4\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export AWS_SECRET_ACCESS_KEY=".*"/export AWS_SECRET_ACCESS_KEY=\"$5\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export MARKETPLACE_HOST=".*"/export MARKETPLACE_HOST=\"$6\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export AMAZON_S3_ACCESS_KEY=".*"/export AMAZON_S3_ACCESS_KEY=\"$7\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export AMAZON_S3_SECRET_ACCESS_KEY=".*"/export AMAZON_S3_SECRET_ACCESS_KEY=\"$8\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ETSY_API_KEY=".*"/export ETSY_API_KEY=\"$9\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ETSY_SECRET_KEY=".*"/export ETSY_SECRET_KEY=\"${10}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export TUMBLR_ACCESS_TOKEN=".*"/export TUMBLR_ACCESS_TOKEN=\"${11}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export TUMBLR_ACCESS_TOKEN_SECRET=".*"/export TUMBLR_ACCESS_TOKEN_SECRET=\"${12}\"/g"


  ###### 
  ###### PART FIVE - SOURCE ENV_FILE
  ######

  source $ENV_FILE

  ###### 
  ###### PART SIX - START PRODUCTION WEBSITE
  ######

  sh $AWFUL_DIR/scripts/start_single.sh "production" "$1"

fi 


if [ "$1" == "development" ] ; then 

  echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi