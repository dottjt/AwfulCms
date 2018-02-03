module Helper.DataEmptyHelper exposing (..)

import Model.ModelProduct exposing (..)
import Model.ModelValidation exposing (..)
import Model.ModelConfig exposing (..)
import Model.ModelBuild exposing (..)


emptyStringValidation : ValidationAlias
emptyStringValidation =
    { isEmpty = True
    , validationMessage = "Please input a text value"
    , validationType = StringValidation 
    }

emptyIntValidation : ValidationAlias
emptyIntValidation =
    { isEmpty = True
    , validationMessage = "Please input a number value"
    , validationType = IntValidation 
    }

emptyFloatValidation : ValidationAlias
emptyFloatValidation =
    { isEmpty = True
    , validationMessage = "Please input a float value"
    , validationType = FloatValidation 
    }

emptyBoolValidation : ValidationAlias
emptyBoolValidation =
    { isEmpty = True
    , validationMessage = "Please provide checkbox value"
    , validationType = BoolValidation 
    }

emptyTagIdValidation : ValidationAlias
emptyTagIdValidation =
    { isEmpty = True
    , validationMessage = "Please select tag values"
    , validationType = StringValidation 
    }



stringValidation : ValidationAlias
stringValidation =
    { isEmpty = False
    , validationMessage = "Please input a text value"
    , validationType = StringValidation 
    }

intValidation : ValidationAlias
intValidation =
    { isEmpty = False
    , validationMessage = "Please input a number value"
    , validationType = IntValidation 
    }

floatValidation : ValidationAlias
floatValidation =
    { isEmpty = False
    , validationMessage = "Please input a float value"
    , validationType = FloatValidation 
    }

boolValidation : ValidationAlias
boolValidation =
    { isEmpty = False
    , validationMessage = "Please provide checkbox value"
    , validationType = BoolValidation 
    }

tagIdValidation : ValidationAlias
tagIdValidation =
    { isEmpty = False
    , validationMessage = "Please select tag values"
    , validationType = StringValidation 
    }




emptyCommonEnvData : CommonEnvData 
emptyCommonEnvData =
    { mailgun_key = ""
    
    , amazon_associate_tag = ""
    , aws_access_key_id = ""
    , aws_secret_access_key = ""
    , marketplace_host = ""
    
    , amazon_s3_access_key = ""
    , amazon_s3_secret_access_key = ""
    
    , etsy_api_key = ""
    , etsy_secret_key = ""

    , tumblr_access_token = ""
    , tumblr_access_token_secret = ""
    }


emptyIndividualEnvData : IndividualEnvData
emptyIndividualEnvData = 
    { mailgun_domain = ""

    , amazon_s3_bucket_name = ""
    
    , recaptcha_public_key = ""
    , recaptcha_private_key = ""
    
    , twitter_api_key = ""
    , twitter_secret_key = ""
    , twitter_access_token = ""
    , twitter_access_token_secret = ""
    
    , facebook_api_key = ""
    , facebook_secret_key = ""
    , facebook_page_id = ""
    , facebook_redirect_url = ""
    
    , tumblr_api_key = ""
    , tumblr_secret_key = ""
    , tumblr_blog_identifier = ""
    
    , pintrest_api_key = ""
    , pintrest_secret_key = ""
    }

emptyProductAssoc : ProductAssoc
emptyProductAssoc =
    { id = ""
    , name = ""
    , display_name = ""
    , description = ""   
    , blog_description = ""  
    , featured_image = ""
    , schedule_date = emptyScheduleDate
    , draft = False
    , cta = ""
    , price = 0.0
    , product_type = ""
    , url = ""
    , url_text = ""
    , inserted_at = ""
    , category = 
        { id = ""
        , name = ""
        , display_name = ""
        , description = "" 
        , icon = ""   
        }
    , product_tags = []
    , product_like =
        { id = ""
        , total = 0
        }
    }

emptyConfigEnvData : ConfigEnvData
emptyConfigEnvData =
    { website_acronym = ""
    , website_name = ""
    , website_name_lower = ""
    , website_domain = ""
    , website_logo_png = ""
    , website_logo_svg = ""
    , website_favicon = ""
    , website_title = ""
    , website_description = ""
    , website_keywords = ""
    , website_twitter = ""
    , website_alt_image = ""
    , blog_meta_description = ""
    , categories_meta_description = ""
    , updates_meta_description = ""
    , about_meta_description = ""
    , contact_meta_description = ""
    , submit_meta_description = ""
    , login_meta_description = ""
    , register_meta_description = ""
    , search_meta_description = ""
    , about_copy = ""
    , submit_copy = ""
    , letter_copy = ""
    , google_analytics_tracking_id = ""
    , google_site_verification = ""
    , primary_email = ""
    , password = ""
    }



emptyBuildFormValidation : BuildFormValidation
emptyBuildFormValidation =
    { website_acronym = emptyStringValidation
    , website_lower = emptyStringValidation
    , website_capital = emptyStringValidation
    , num_of_categories = emptyStringValidation
    , c1_name = emptyStringValidation
    , c1_display_name = emptyStringValidation
    , c1_model = emptyStringValidation
    , c1_icon = emptyStringValidation
    , c2_name = emptyStringValidation
    , c2_display_name = emptyStringValidation
    , c2_model = emptyStringValidation
    , c2_icon = emptyStringValidation
    , c3_name = emptyStringValidation
    , c3_display_name = emptyStringValidation
    , c3_model = emptyStringValidation
    , c3_icon = emptyStringValidation
    , c4_name = emptyStringValidation
    , c4_display_name = emptyStringValidation
    , c4_model = emptyStringValidation
    , c4_icon = emptyStringValidation
    , c5_name = emptyStringValidation
    , c5_display_name = emptyStringValidation
    , c5_model = emptyStringValidation
    , c5_icon = emptyStringValidation
    , c6_name = emptyStringValidation
    , c6_display_name = emptyStringValidation
    , c6_model = emptyStringValidation
    , c6_icon = emptyStringValidation
    , c7_name = emptyStringValidation
    , c7_display_name = emptyStringValidation
    , c7_model = emptyStringValidation
    , c7_icon = emptyStringValidation
    }



emptyBuildForm : BuildForm 
emptyBuildForm =
    { website_acronym = "ac"
    , website_lower = "christmas"
    , website_capital = "Christmas"
    , num_of_categories = "6" 
    , c1_name = "toys"
    , c1_display_name = "Toys"
    , c1_model = "Toys"
    , c1_icon = "fa-none"
    , c2_name = "fashion"
    , c2_display_name = "Fashion"
    , c2_model = "Fashion"
    , c2_icon = "fae-shirt"
    , c3_name = "video-games"
    , c3_display_name = "Videogames"
    , c3_model = "VideoGames"
    , c3_icon = "fa-90s-n64"
    , c4_name = "home-office"
    , c4_display_name = "Home & Office"
    , c4_model = "HomeOffice"
    , c4_icon = "fa-home"
    , c5_name = "sports-outdoors"
    , c5_display_name = "Sports Outdoors"
    , c5_model = "SportsOutdoors"
    , c5_icon = "fae-sun-cloud"
    , c6_name = "food"
    , c6_display_name = "Food"
    , c6_model = "Food"
    , c6_icon = "fae-pizza"
    , c7_name = "wtf"
    , c7_display_name = "WTF"
    , c7_model = "WTF"
    , c7_icon = "fa-bomb"
    }



emptyProductForm : ProductForm
emptyProductForm =
    { display_name = ""
    , description = ""  
    , blog_description = ""  
    , original_featured_image = "" 
    , featured_image = ""
    , draft = False
    , schedule_date = emptyScheduleDate
    , cta = "Save"
    , price = 0.0
    , url = "" 
    , url_text = "" 
    , category = emptyCategory 
    , category_id = ""
    , tag_id = []
    , product_like = 0 
    , product_type = "general" 
    }



emptyProductFormValidation : ProductFormValidation
emptyProductFormValidation =
    { display_name = emptyStringValidation
    , description = emptyStringValidation  
    , blog_description = emptyStringValidation  
    -- , original_featured_image = emptyStringValidation 
    , featured_image = emptyStringValidation
    -- , draft = emptyBoolValidation
    -- , schedule_date = emptyScheduleDateValidation
    , cta = stringValidation
    , price = emptyFloatValidation
    , url = emptyStringValidation
    , url_text = emptyStringValidation 
    -- , category = emptyCategory 
    -- , category_id = ""
    , tag_id = emptyTagIdValidation
    , product_like = intValidation
    -- , product_type = emptyStringValidation
    }






emptyPostAssoc : PostAssoc
emptyPostAssoc =
    { id = ""
    , name = ""
    , display_name = ""
    , author = "Julius Reade"
    , excerpt = ""
    , featured_image = ""
    , post_type = "product_list"
    , tag = Just emptyTag
    , product_limit = Just 10
    , product_offset = Just 0
    }


emptyPost : Post
emptyPost =
    { id = ""
    , name = ""
    , display_name = ""
    , author = "Julius Reade"
    , excerpt = ""
    , featured_image = ""
    , post_type = "product_list"
    , product_limit = Just 10
    , product_offset = Just 0
    }


emptyPostForm : PostForm
emptyPostForm =
    { author = "Julius Reade"
    , display_name = ""
    , excerpt = ""
    , featured_image = ""
    , post_type = "product_list"
    , product_limit = Just 10
    , product_offset = Just 0
    , tag = Just emptyTag
    }


emptyPostFormValidation : PostFormValidation
emptyPostFormValidation =
    { author = stringValidation
    , display_name = emptyStringValidation
    , excerpt = emptyStringValidation
    , featured_image = emptyStringValidation
    -- , post_type = emptyStringValidation
    -- , product_limit = Just 10
    -- , product_offset = Just 0
    -- , tag = Just emptyTag
    }



emptySocial  : Social
emptySocial =
    { id = ""
    , name = ""
    , display_name = ""
    , description = ""   
    , tags = "" 
    , draft = False 
    , schedule_date = emptyScheduleDate
    , facebook_code = "" 
    , featured_image = "" 
    , url = "" 
    , image_caption = "" 
    , social_media_type = "" 
    }

emptySocialForm  : SocialForm
emptySocialForm =
    { display_name = ""
    , description = ""   
    , tags = "" 
    , draft = False 
    , schedule_date = emptyScheduleDate
    , facebook_code = "" 
    , featured_image = "" 
    , url = "" 
    , image_caption = "" 
    , social_media_type = "" 
    }

emptySocialFormValidation  : SocialFormValidation
emptySocialFormValidation =
    { display_name = emptyStringValidation
    , description = emptyStringValidation   
    , tags = emptyStringValidation 
    -- , draft = emptyBoolValidation 
    -- , schedule_date = emptyScheduleDate
    -- , facebook_code = emptyStringValidation 
    , featured_image = emptyStringValidation 
    , url = emptyStringValidation 
    , image_caption = emptyStringValidation 
    -- , social_media_type = emptyStringValidation 
    }




emptyCategory : Category
emptyCategory =
    { id = ""
    , name = ""
    , display_name = ""
    , description = ""
    , icon = ""
    }

emptyTagAssoc : TagAssoc
emptyTagAssoc =
    { id = ""
    , name = ""
    , display_name = ""
    , description = ""
    , posts = []
    , products = []
    }

emptyTag : Tag
emptyTag =
    { id = ""
    , name = ""
    , display_name = ""
    , description = ""
    }

emptyTagForm : TagForm
emptyTagForm =
    { display_name = ""
    , description = "" 
    }

emptyTagFormValidation : TagFormValidation
emptyTagFormValidation =
    { display_name = emptyStringValidation
    , description = emptyStringValidation 
    }





emptyUpdate : Update
emptyUpdate =
    { id = ""
    , name = ""
    , display_name = ""
    , title = ""
    , excerpt = "" 
    , author = "" 
    , schedule_date = emptyScheduleDate
    , draft = False
    }

emptyUpdateForm : UpdateForm
emptyUpdateForm =
    { display_name = ""
    , title = ""
    , excerpt = "" 
    , author = "Julius Reade" 
    , schedule_date = emptyScheduleDate
    , draft = False
    }

emptyUpdateFormValidation : UpdateFormValidation
emptyUpdateFormValidation =
    { display_name = emptyStringValidation
    , title = emptyStringValidation
    , excerpt = emptyStringValidation 
    , author = stringValidation 
    -- , schedule_date = emptyScheduleDate
    -- , draft = emptyBoolValidation
    }



emptyScheduleDate : ScheduleDate 
emptyScheduleDate =
    { day = 1
    , month = 1
    , year = 2018
    }