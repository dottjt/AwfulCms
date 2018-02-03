module Model.ModelConfig exposing (..)



type EnvDataFormType
    = CommonEnvDataFormType CommonEnvData
    | IndividualEnvDataFormType IndividualEnvData
    | ConfigEnvDataFormType ConfigEnvData


type alias CommonEnvData = 
    { mailgun_key : String
    
    , amazon_associate_tag : String
    , aws_access_key_id : String
    , aws_secret_access_key : String
    , marketplace_host : String
    
    , amazon_s3_access_key : String
    , amazon_s3_secret_access_key : String
    
    , etsy_api_key : String
    , etsy_secret_key : String

    , tumblr_access_token : String
    , tumblr_access_token_secret : String
    }


type alias IndividualEnvData = 
    { mailgun_domain : String

    , amazon_s3_bucket_name : String
    
    , recaptcha_public_key : String
    , recaptcha_private_key : String
    
    , twitter_api_key : String
    , twitter_secret_key : String
    , twitter_access_token : String
    , twitter_access_token_secret : String
    
    , facebook_api_key : String
    , facebook_secret_key : String
    , facebook_page_id : String
    , facebook_redirect_url : String
    
    , tumblr_api_key : String
    , tumblr_secret_key : String
    , tumblr_blog_identifier : String
    
    , pintrest_api_key : String
    , pintrest_secret_key : String
    }


type alias ConfigEnvData = 
    { website_acronym : String
    , website_name : String
    , website_name_lower : String
    , website_domain : String
    , website_logo_png : String
    , website_logo_svg : String
    , website_favicon : String
    , website_title : String
    , website_description : String
    , website_keywords : String
    , website_twitter : String
    , website_alt_image : String
    , blog_meta_description : String
    , categories_meta_description : String
    , updates_meta_description : String
    , about_meta_description : String
    , contact_meta_description : String
    , submit_meta_description : String
    , login_meta_description : String
    , register_meta_description : String
    , search_meta_description : String
    , about_copy : String
    , submit_copy : String
    , letter_copy : String
    , google_analytics_tracking_id : String
    , google_site_verification : String
    , primary_email : String
    , password : String
    }
