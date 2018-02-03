#!/bin/bash

# 2 acronym
# 3 mailgun_domain
# 4 amazon_s3_bucket_name
# 5 recaptcha_public_key
# 6 recaptcha_private_key
# 7 twitter_api_key
# 8 twitter_secret_key
# 9 twitter_access_token
# 10 twitter_access_token_secret
# 11 facebook_api_key
# 12 facebook_secret_key
# 13 facebook_page_id
# 14 facebook_redirect_url
# 15 tumblr_api_key
# 16 tumblr_secret_key
# 17 tumblr_blog_identifier
# 18 pintrest_api_key
# 19 pintrest_secret_key



if [ "$1" == "production" ] ; then 

  uppercaseacroymn="$(echo "$2" | awk '{print toupper($0)}')"

  ###### 
  ###### PART ONE - UPDATE DEVELOPMENT SHARED/ENV
  ######

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_MAILGUN_DOMAIN=".*"/export ${uppercaseacroymn}_MAILGUN_DOMAIN=\"$3\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_AMAZON_S3_BUCKET_NAME=".*"/export ${uppercaseacroymn}_AMAZON_S3_BUCKET_NAME=\"$4\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_RECAPTCHA_PUBLIC_KEY=".*"/export ${uppercaseacroymn}_RECAPTCHA_PUBLIC_KEY=\"$5\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_RECAPTCHA_PRIVATE_KEY=".*"/export ${uppercaseacroymn}_RECAPTCHA_PRIVATE_KEY=\"$6\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_API_KEY=".*"/export ${uppercaseacroymn}_TWITTER_API_KEY=\"$7\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_SECRET_KEY=".*"/export ${uppercaseacroymn}_TWITTER_SECRET_KEY=\"$8\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN=".*"/export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN=\"$9\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN_SECRET=".*"/export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN_SECRET=\"$10\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_API_KEY=".*"/export ${uppercaseacroymn}_FACEBOOK_API_KEY=\"${11}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_SECRET_KEY=".*"/export ${uppercaseacroymn}_FACEBOOK_SECRET_KEY=\"${12}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_PAGE_ID=".*"/export ${uppercaseacroymn}_FACEBOOK_PAGE_ID=\"${13}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_REDIRECT_URL=".*"/export ${uppercaseacroymn}_FACEBOOK_REDIRECT_URL=\"${14}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TUMBLR_API_KEY=".*"/export ${uppercaseacroymn}_TUMBLR_API_KEY=\"${15}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TUMBLR_SECRET_KEY=".*"/export ${uppercaseacroymn}_TUMBLR_SECRET_KEY=\"${16}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TUMBLR_BLOG_IDENTIFIER=".*"/export ${uppercaseacroymn}_TUMBLR_BLOG_IDENTIFIER=\"${17}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_PINTREST_API_KEY=".*"/export ${uppercaseacroymn}_PINTREST_API_KEY=\"${18}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_PINTREST_SECRET_KEY=".*"/export ${uppercaseacroymn}_PINTREST_SECRET_KEY=\"${19}\"/g"


  ###### 
  ###### PART TWO - UPDATE DEVELOPMENT WEBSITE
  ######

  sh $AWFUL_DIR/scripts/update_single.sh "development" "$2"
  sh $AWFUL_DIR/scripts/push_single.sh "development" "$2"

  ###### 
  ###### PART THREE - UPDATE AND KILL PRODUCTION WEBSITE
  ######

  sh $AWFUL_DIR/scripts/stop_single.sh "production" "$2"
  sh $AWFUL_DIR/scripts/pull_single.sh "production" "$2"

  ###### 
  ###### PART FOUR - UPDATE PRODUCTION ENV FILE 
  ######

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_MAILGUN_DOMAIN=".*"/export ${uppercaseacroymn}_MAILGUN_DOMAIN=\"$3\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_AMAZON_S3_BUCKET_NAME=".*"/export ${uppercaseacroymn}_AMAZON_S3_BUCKET_NAME=\"$4\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_RECAPTCHA_PUBLIC_KEY=".*"/export ${uppercaseacroymn}_RECAPTCHA_PUBLIC_KEY=\"$5\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_RECAPTCHA_PRIVATE_KEY=".*"/export ${uppercaseacroymn}_RECAPTCHA_PRIVATE_KEY=\"$6\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_API_KEY=".*"/export ${uppercaseacroymn}_TWITTER_API_KEY=\"$7\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_SECRET_KEY=".*"/export ${uppercaseacroymn}_TWITTER_SECRET_KEY=\"$8\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN=".*"/export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN=\"$9\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN_SECRET=".*"/export ${uppercaseacroymn}_TWITTER_ACCESS_TOKEN_SECRET=\"$10\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_API_KEY=".*"/export ${uppercaseacroymn}_FACEBOOK_API_KEY=\"${11}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_SECRET_KEY=".*"/export ${uppercaseacroymn}_FACEBOOK_SECRET_KEY=\"${12}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_PAGE_ID=".*"/export ${uppercaseacroymn}_FACEBOOK_PAGE_ID=\"${13}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_FACEBOOK_REDIRECT_URL=".*"/export ${uppercaseacroymn}_FACEBOOK_REDIRECT_URL=\"${14}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TUMBLR_API_KEY=".*"/export ${uppercaseacroymn}_TUMBLR_API_KEY=\"${15}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TUMBLR_SECRET_KEY=".*"/export ${uppercaseacroymn}_TUMBLR_SECRET_KEY=\"${16}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_TUMBLR_BLOG_IDENTIFIER=".*"/export ${uppercaseacroymn}_TUMBLR_BLOG_IDENTIFIER=\"${17}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_PINTREST_API_KEY=".*"/export ${uppercaseacroymn}_PINTREST_API_KEY=\"${18}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "export ${uppercaseacroymn}_PINTREST_SECRET_KEY=".*"/export ${uppercaseacroymn}_PINTREST_SECRET_KEY=\"${19}\"/g"


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