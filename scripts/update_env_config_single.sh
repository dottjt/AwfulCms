#!/bin/bash

# example 
# sh link.sh production ac 




### PRODUCTION

if [ "$1" == "production" ] ; then 

  ###### 
  ###### PART ONE - UPDATE DEVELOPMENT SHARED/CONFIG
  ######

  uppercaseacroymn="$(echo "$2" | awk '{print toupper($0)}')"


  # 2  acronym

  # 3  website_acronym
  # 4  website_name
  # 5  website_name_lower
  # 6  website_domain

  # edit shared 
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_ACRONYM=".*"/${uppercaseacronym}_WEBSITE_ACRONYM=\"$3\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_NAME=".*"/${uppercaseacronym}_WEBSITE_NAME=\"$4\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_NAME_LOWER=".*"/${uppercaseacronym}_WEBSITE_NAME_LOWER=\"$4\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_DOMAIN=".*"/${uppercaseacronym}_WEBSITE_DOMAIN=\"$5\"/g"

  # 7  website_logo_png
  # 8  website_logo_svg

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_LOGO_PNG=".*"/${uppercaseacronym}_WEBSITE_LOGO_PNG=\"$6\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_LOGO_SVG=".*"/${uppercaseacronym}_WEBSITE_LOGO_SVG=\"$7\"/g"

  # 9  website_favicon

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_FAVICON=".*"/${uppercaseacronym}_WEBSITE_FAVICON=\"$8\"/g"

  # 10  website_title
  # 11  website_description
  # 12  website_keywords
  # 13  website_twitter
  # 14  website_alt_image

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_TITLE=".*"/${uppercaseacronym}_WEBSITE_TITLE=\"$9\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_DESCRIPTION=".*"/${uppercaseacronym}_WEBSITE_DESCRIPTION=\"$10\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_KEYWORDS=".*"/${uppercaseacronym}_WEBSITE_KEYWORDS=\"${11}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_TWITTER=".*"/${uppercaseacronym}_WEBSITE_TWITTER=\"${12}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_ALT_IMAGE=".*"/${uppercaseacronym}_WEBSITE_ALT_IMAGE=\"${13}\"/g"

  # 15  blog_meta_description
  # 16  categories_meta_description
  # 17  updates_meta_description
  # 18  about_meta_description
  # 19  contact_meta_description
  # 20  submit_meta_description
  # 21  login_meta_description
  # 22  register_meta_description
  # 23  search_meta_description

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_BLOG_META_DESCRIPTION=".*"/${uppercaseacronym}_BLOG_META_DESCRIPTION=\"${14}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_CATEGORIES_META_DESCRIPTION=".*"/${uppercaseacronym}_CATEGORIES_META_DESCRIPTION=\"${15}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_UPDATES_META_DESCRIPTION=".*"/${uppercaseacronym}_UPDATES_META_DESCRIPTION=\"${16}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_GRID_META_DESCRIPTION=".*"/${uppercaseacronym}_GRID_META_DESCRIPTION=\"${17}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_ABOUT_META_DESCRIPTION=".*"/${uppercaseacronym}_ABOUT_META_DESCRIPTION=\"${18}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_CONTACT_META_DESCRIPTION=".*"/${uppercaseacronym}_CONTACT_META_DESCRIPTION=\"${19}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_SUBMIT_META_DESCRIPTION=".*"/${uppercaseacronym}_SUBMIT_META_DESCRIPTION=\"${20}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_LOGIN_META_DESCRIPTION=".*"/${uppercaseacronym}_LOGIN_META_DESCRIPTION=\"${21}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_REGISTER_META_DESCRIPTION=".*"/${uppercaseacronym}_REGISTER_META_DESCRIPTION=\"${22}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_SEARCH_META_DESCRIPTION=".*"/${uppercaseacronym}_SEARCH_META_DESCRIPTION=\"${23}\"/g"

  # 24  about_copy
  # 25  submit_copy

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_ABOUT_COPY=\"\"\".*/${uppercaseacronym}_ABOUT_COPY=\"\"\"${24}/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_SUBMIT_COPY=\"\"\".*/${uppercaseacronym}_SUBMIT_COPY=\"\"\"${25}/g"

  # 26  google_analytics_tracking_id
  # 27  google_site_verification

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_GOOGLE_ANALYTICS_TRACKING_ID=".*"/${uppercaseacronym}_GOOGLE_ANALYTICS_TRACKING_ID=\"${26}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_GOOGLE_SITE_VERIFICATION=".*"/${uppercaseacronym}_GOOGLE_SITE_VERIFICATION=\"${27}\"/g"

  # 28 primary_email 
  # 29 password 

  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_PRIMARY_EMAIL=".*"/${uppercaseacronym}_PRIMARY_EMAIL=\"${28}\"/g"
  find $AWFUL_DIR/shared/env/."$2"_env -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_PASSWORD=".*"/${uppercaseacronym}_PASSWORD=\"${29}\"/g"


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

  # 3  website_acronym
  # 4  website_name
  # 5  website_name_lower
  # 6  website_domain

  # edit shared 
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_ACRONYM=".*"/${uppercaseacronym}_WEBSITE_ACRONYM=\"$3\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_NAME=".*"/${uppercaseacronym}_WEBSITE_NAME=\"$4\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_NAME_LOWER=".*"/${uppercaseacronym}_WEBSITE_NAME_LOWER=\"$4\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_DOMAIN=".*"/${uppercaseacronym}_WEBSITE_DOMAIN=\"$5\"/g"

  # 7  website_logo_png
  # 8  website_logo_svg

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_LOGO_PNG=".*"/${uppercaseacronym}_WEBSITE_LOGO_PNG=\"$6\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_LOGO_SVG=".*"/${uppercaseacronym}_WEBSITE_LOGO_SVG=\"$7\"/g"

  # 9  website_favicon

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_FAVICON=".*"/${uppercaseacronym}_WEBSITE_FAVICON=\"$8\"/g"

  # 10  website_title
  # 11  website_description
  # 12  website_keywords
  # 13  website_twitter
  # 14  website_alt_image

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_TITLE=".*"/${uppercaseacronym}_WEBSITE_TITLE=\"$9\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_DESCRIPTION=".*"/${uppercaseacronym}_WEBSITE_DESCRIPTION=\"$10\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_KEYWORDS=".*"/${uppercaseacronym}_WEBSITE_KEYWORDS=\"${11}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_TWITTER=".*"/${uppercaseacronym}_WEBSITE_TWITTER=\"${12}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_WEBSITE_ALT_IMAGE=".*"/${uppercaseacronym}_WEBSITE_ALT_IMAGE=\"${13}\"/g"

  # 15  blog_meta_description
  # 16  categories_meta_description
  # 17  updates_meta_description
  # 18  about_meta_description
  # 19  contact_meta_description
  # 20  submit_meta_description
  # 21  login_meta_description
  # 22  register_meta_description
  # 23  search_meta_description

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_BLOG_META_DESCRIPTION=".*"/${uppercaseacronym}_BLOG_META_DESCRIPTION=\"${14}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_CATEGORIES_META_DESCRIPTION=".*"/${uppercaseacronym}_CATEGORIES_META_DESCRIPTION=\"${15}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_UPDATES_META_DESCRIPTION=".*"/${uppercaseacronym}_UPDATES_META_DESCRIPTION=\"${16}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_GRID_META_DESCRIPTION=".*"/${uppercaseacronym}_GRID_META_DESCRIPTION=\"${17}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_ABOUT_META_DESCRIPTION=".*"/${uppercaseacronym}_ABOUT_META_DESCRIPTION=\"${18}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_CONTACT_META_DESCRIPTION=".*"/${uppercaseacronym}_CONTACT_META_DESCRIPTION=\"${19}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_SUBMIT_META_DESCRIPTION=".*"/${uppercaseacronym}_SUBMIT_META_DESCRIPTION=\"${20}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_LOGIN_META_DESCRIPTION=".*"/${uppercaseacronym}_LOGIN_META_DESCRIPTION=\"${21}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_REGISTER_META_DESCRIPTION=".*"/${uppercaseacronym}_REGISTER_META_DESCRIPTION=\"${22}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_SEARCH_META_DESCRIPTION=".*"/${uppercaseacronym}_SEARCH_META_DESCRIPTION=\"${23}\"/g"

  # 24  about_copy
  # 25  submit_copy

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_ABOUT_COPY=\"\"\".*/${uppercaseacronym}_ABOUT_COPY=\"\"\"${24}/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_SUBMIT_COPY=\"\"\".*/${uppercaseacronym}_SUBMIT_COPY=\"\"\"${25}/g"

  # 26  google_analytics_tracking_id
  # 27  google_site_verification

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_GOOGLE_ANALYTICS_TRACKING_ID=".*"/${uppercaseacronym}_GOOGLE_ANALYTICS_TRACKING_ID=\"${26}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_GOOGLE_SITE_VERIFICATION=".*"/${uppercaseacronym}_GOOGLE_SITE_VERIFICATION=\"${27}\"/g"

  # 28 primary_email 
  # 29 password 

  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_PRIMARY_EMAIL=".*"/${uppercaseacronym}_PRIMARY_EMAIL=\"${28}\"/g"
  find $ENV_FILE -type f -print0 | xargs -0 sed -i '' "s/${uppercaseacronym}_PASSWORD=".*"/${uppercaseacronym}_PASSWORD=\"${29}\"/g"


  ###### 
  ###### PART FIVE - SOURCE ENV_FILE
  ######

  source $ENV_FILE

  ###### 
  ###### PART SIX - START PRODUCTION WEBSITE
  ######

  sh $AWFUL_DIR/scripts/start_single.sh "production" "$1"

fi


### DEVELOPMENT

if [ "$1" == "development" ] ; then 

  echo "Function deactivated as it was deemed unnecessary. Please active script. Julius Reade TM."

fi 