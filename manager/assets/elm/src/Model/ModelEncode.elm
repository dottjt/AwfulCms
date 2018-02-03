module Model.ModelEncode exposing (..)


import Model.ModelProduct exposing (..)
import Model.ModelConfig exposing (..)
import Model.ModelMisc exposing (..)
import Model.ModelBuild exposing (..)

import Json.Encode as Encode

import Json.Encode.Extra exposing (..)



consoleItemWrapperEncoder : ConsoleItem -> Encode.Value
consoleItemWrapperEncoder consoleItem =
        Encode.object [ ("message", consoleItemEncoder consoleItem) ]


consoleItemEncoder : ConsoleItem -> Encode.Value
consoleItemEncoder consoleItem =
        Encode.object [ ("inserted_at", Encode.string  consoleItem.inserted_at) -- (toString consoleItem.inserted_at))
                      , ("command", Encode.string consoleItem.command)
                      , ("console_type", Encode.string (consoleItemTypeString consoleItem.console_type))
                      , ("text", Encode.string consoleItem.text) ]


consoleItemTypeString : ConsoleItemType -> String 
consoleItemTypeString consoleItemType = 
  case consoleItemType of 
    NewSession -> 
      "new_session"
    Begin ->
      "begin"
    Toggle ->
      "toggle"
    Load ->
      "load"
    NonExistent ->
      "non_existent"      
    Success ->
      "success"
    Failure -> 
      "failure"


commonEnvDataEncoder : CommonEnvData -> Encode.Value
commonEnvDataEncoder commonEnvData =
    Encode.object [ ("mailgun_key", Encode.string commonEnvData.mailgun_key)
                  , ("amazon_associate_tag", Encode.string commonEnvData.amazon_associate_tag)
                  , ("aws_access_key_id", Encode.string commonEnvData.aws_access_key_id)
                  , ("aws_secret_access_key", Encode.string commonEnvData.aws_secret_access_key)
                  , ("marketplace_host", Encode.string commonEnvData.marketplace_host)
                  , ("amazon_s3_access_key", Encode.string commonEnvData.amazon_s3_access_key)
                  , ("amazon_s3_secret_access_key", Encode.string commonEnvData.amazon_s3_secret_access_key)
                  , ("etsy_api_key", Encode.string commonEnvData.etsy_api_key)
                  , ("etsy_secret_key", Encode.string commonEnvData.etsy_secret_key)
                  , ("tumblr_access_token", Encode.string commonEnvData.tumblr_access_token)
                  , ("tumblr_access_token_secret", Encode.string commonEnvData.tumblr_access_token_secret)]



individualEnvDataEncoder : IndividualEnvData -> Encode.Value
individualEnvDataEncoder individualEnvData =
    Encode.object [ ("mailgun_domain", Encode.string individualEnvData.mailgun_domain)
                  , ("amazon_s3_bucket_name", Encode.string individualEnvData.amazon_s3_bucket_name)
                  , ("recaptcha_public_key", Encode.string individualEnvData.recaptcha_public_key)
                  , ("recaptcha_private_key", Encode.string individualEnvData.recaptcha_private_key)
                  , ("twitter_api_key", Encode.string individualEnvData.twitter_api_key)
                  , ("twitter_secret_key", Encode.string individualEnvData.twitter_secret_key)
                  , ("twitter_access_token", Encode.string individualEnvData.twitter_access_token)
                  , ("twitter_access_token_secret", Encode.string individualEnvData.twitter_access_token_secret)
                  , ("facebook_api_key", Encode.string individualEnvData.facebook_api_key)
                  , ("facebook_secret_key", Encode.string individualEnvData.facebook_secret_key)
                  , ("facebook_page_id", Encode.string individualEnvData.facebook_page_id)
                  , ("facebook_redirect_url", Encode.string individualEnvData.facebook_redirect_url)
                  , ("tumblr_api_key", Encode.string individualEnvData.tumblr_api_key)
                  , ("tumblr_secret_key", Encode.string individualEnvData.tumblr_secret_key)
                  , ("tumblr_blog_identifier", Encode.string individualEnvData.tumblr_blog_identifier)
                  , ("pintrest_api_key", Encode.string individualEnvData.pintrest_api_key)
                  , ("pintrest_secret_key", Encode.string individualEnvData.pintrest_secret_key)]


newWebsiteEncoder : BuildForm -> Encode.Value
newWebsiteEncoder newWebsite =
    Encode.object [ ("website_acronym", Encode.string newWebsite.website_acronym)
                  , ("website_lower", Encode.string newWebsite.website_lower)
                  , ("website_capital", Encode.string newWebsite.website_capital)
                  , ("num_of_categories", Encode.string newWebsite.num_of_categories)
                  , ("c1_name", Encode.string newWebsite.c1_name)
                  , ("c1_display_name", Encode.string newWebsite.c1_display_name)
                  , ("c1_model", Encode.string newWebsite.c1_model)
                  , ("c1_icon", Encode.string newWebsite.c1_icon)
                  , ("c2_name", Encode.string newWebsite.c2_name)
                  , ("c2_display_name", Encode.string newWebsite.c2_display_name)
                  , ("c2_model", Encode.string newWebsite.c2_model)
                  , ("c2_icon", Encode.string newWebsite.c2_icon)
                  , ("c3_name", Encode.string newWebsite.c3_name)
                  , ("c3_display_name", Encode.string newWebsite.c3_display_name)
                  , ("c3_model", Encode.string newWebsite.c3_model)
                  , ("c3_icon", Encode.string newWebsite.c3_icon)
                  , ("c4_name", Encode.string newWebsite.c4_name)
                  , ("c4_display_name", Encode.string newWebsite.c4_display_name)
                  , ("c4_model", Encode.string newWebsite.c4_model)
                  , ("c4_icon", Encode.string newWebsite.c4_icon)
                  , ("c5_name", Encode.string newWebsite.c5_name)
                  , ("c5_display_name", Encode.string newWebsite.c5_display_name)
                  , ("c5_model", Encode.string newWebsite.c5_model)
                  , ("c5_icon", Encode.string newWebsite.c5_icon)
                  , ("c6_name", Encode.string newWebsite.c6_name)
                  , ("c6_display_name", Encode.string newWebsite.c6_display_name)
                  , ("c6_model", Encode.string newWebsite.c6_model)
                  , ("c6_icon", Encode.string newWebsite.c6_icon)
                  , ("c7_name", Encode.string newWebsite.c7_name)
                  , ("c7_display_name", Encode.string newWebsite.c7_display_name)
                  , ("c7_model", Encode.string newWebsite.c7_model)
                  , ("c7_icon", Encode.string newWebsite.c7_icon)]



configEncoder : ConfigEnvData -> Encode.Value
configEncoder config =
    Encode.object [ ("website_acronym", Encode.string config.website_acronym)
                  , ("website_name", Encode.string config.website_name)
                  , ("website_name_lower", Encode.string config.website_name_lower)
                  , ("website_domain", Encode.string config.website_domain)
                  , ("website_logo_png", Encode.string config.website_logo_png)
                  , ("website_logo_svg", Encode.string config.website_logo_svg)
                  , ("website_favicon", Encode.string config.website_favicon)
                  , ("website_title", Encode.string config.website_title)
                  , ("website_description", Encode.string config.website_description)
                  , ("website_keywords", Encode.string config.website_keywords)
                  , ("website_twitter", Encode.string config.website_twitter)
                  , ("website_alt_image", Encode.string config.website_alt_image)
                  , ("blog_meta_description", Encode.string config.blog_meta_description)
                  , ("categories_meta_description", Encode.string config.categories_meta_description)
                  , ("updates_meta_description", Encode.string config.updates_meta_description)
                  , ("about_meta_description", Encode.string config.about_meta_description)
                  , ("contact_meta_description", Encode.string config.contact_meta_description)
                  , ("submit_meta_description", Encode.string config.submit_meta_description)
                  , ("login_meta_description", Encode.string config.login_meta_description)
                  , ("register_meta_description", Encode.string config.register_meta_description)
                  , ("search_meta_description", Encode.string config.search_meta_description)
                  , ("about_copy", Encode.string config.about_copy)
                  , ("submit_copy", Encode.string config.submit_copy)
                  , ("letter_copy", Encode.string config.letter_copy)
                  , ("google_analytics_tracking_id", Encode.string config.google_analytics_tracking_id)
                  , ("google_site_verification", Encode.string config.google_site_verification)
                  , ("primary_email", Encode.string config.primary_email)
                  , ("password", Encode.string config.google_site_verification)]



prefilNewProductEncoder : String -> Encode.Value
prefilNewProductEncoder input = 
    Encode.object [ ("input", Encode.string input)]



productAssocEncoder : ProductAssoc -> Encode.Value
productAssocEncoder productAssoc = 
    Encode.object [ ("id", Encode.string productAssoc.id )
                  , ("name", Encode.string productAssoc.name )
                  , ("display_name", Encode.string productAssoc.display_name )
                  , ("description", Encode.string productAssoc.description )
                  , ("blog_description", Encode.string productAssoc.blog_description )
                  , ("featured_image", Encode.string productAssoc.featured_image )
                  , ("draft", Encode.bool productAssoc.draft )
                  , ("cta", Encode.string productAssoc.cta )
                  , ("price", Encode.float productAssoc.price )
                  , ("product_type", Encode.string productAssoc.product_type )
                  , ("url", Encode.string productAssoc.url )
                  , ("url_text", Encode.string productAssoc.url_text )  

                  , ("category", categoryEncoder productAssoc.category )
                  , ("product_tags", Encode.list (List.map tagEncoder productAssoc.product_tags)   )
                  , ("product_like", likeEncoder productAssoc.product_like )]


                  

categoryEncoder : Category -> Encode.Value
categoryEncoder productCategory = 
    Encode.object [ ("id", Encode.string productCategory.id )
                  , ("name", Encode.string productCategory.name )
                  , ("display_name", Encode.string productCategory.display_name )
                  , ("description", Encode.string productCategory.description )
                  , ("icon", Encode.string productCategory.icon )]


tagEncoder : Tag -> Encode.Value
tagEncoder productTag = 
    Encode.object [ ("id", Encode.string productTag.id )
                  , ("name", Encode.string productTag.name)
                  , ("display_name", Encode.string productTag.display_name)
                  , ("description", Encode.string productTag.description)]




likeEncoder : Like -> Encode.Value
likeEncoder productLike = 
    Encode.object [ ("id", Encode.string productLike.id )
                  , ("total", Encode.int productLike.total )]



postsEncoder : PostAssoc -> Encode.Value
postsEncoder formItem =
        Encode.object [ ("id", Encode.string formItem.id)
                      , ("name", Encode.string formItem.name)
                      , ("display_name", Encode.string formItem.display_name)
                      , ("author", Encode.string formItem.author)
                      , ("excerpt", Encode.string formItem.excerpt)
                      , ("featured_image", Encode.string formItem.featured_image)
                      , ("post_type", Encode.string formItem.post_type)
                      , ("post_type", Encode.string formItem.post_type)
                      , ("tag", tagMaybeEncoder formItem.tag)
                      , ("product_limit", maybe Encode.int formItem.product_limit)
                      , ("product_offset", maybe Encode.int formItem.product_offset)]



tagMaybeEncoder : Maybe Tag -> Encode.Value
tagMaybeEncoder productTag = 
  case productTag of 
    Just value -> 
      Encode.object [ ("id", Encode.string value.id )
                    , ("name", Encode.string value.name)
                    , ("display_name", Encode.string value.display_name)
                    , ("description", Encode.string value.description)]
    Nothing -> 
      Encode.object [ ("id", Encode.string "yolo" )
                    , ("name", Encode.string "yolo")
                    , ("display_name", Encode.string "yolo")
                    , ("description", Encode.string "yolo")]

-- FORM ENCODERS 



productFormDataEncoder : ProductForm -> Encode.Value
productFormDataEncoder data = 
        Encode.object [ ("data", productFormEncoder data )]


productFormEncoder : ProductForm -> Encode.Value
productFormEncoder formItem =
        Encode.object [ ("display_name", Encode.string formItem.display_name)
                      , ("description", Encode.string formItem.description)
                      , ("blog_description", Encode.string formItem.blog_description)
                      , ("original_featured_image", Encode.string formItem.original_featured_image)
                      , ("featured_image", Encode.string formItem.featured_image)
                      , ("draft", Encode.bool formItem.draft)
                      , ("schedule_date", scheduleDateEncoder formItem.schedule_date)
                      , ("cta", Encode.string formItem.cta)
                      , ("price", Encode.float formItem.price)
                      , ("product_type", Encode.string formItem.product_type)
                      , ("url", Encode.string formItem.url)
                      , ("url_text", Encode.string formItem.url_text)
                      -- , ("category", categoryEncoder formItem.category)
                      , ("category_id", Encode.string formItem.category_id)
                      
                      , ("tag_id", Encode.list (List.map Encode.string formItem.tag_id))
                      , ("product_like", Encode.int formItem.product_like)
                      , ("product_type", Encode.string formItem.product_type)]


postFormDataEncoder : PostForm -> Encode.Value
postFormDataEncoder data = 
        Encode.object [ ("data", postFormEncoder data )]


postFormEncoder : PostForm -> Encode.Value
postFormEncoder formItem =
        Encode.object [ ("display_name", Encode.string formItem.display_name)
                      , ("author", Encode.string formItem.author)
                      , ("excerpt", Encode.string formItem.excerpt)
                      , ("featured_image", Encode.string formItem.featured_image)
                      , ("post_type", Encode.string formItem.post_type)
                      , ("post_type", Encode.string formItem.post_type)
                      , ("tag", tagMaybeEncoder formItem.tag)
                      , ("product_limit", maybe Encode.int formItem.product_limit)
                      , ("product_offset", maybe Encode.int formItem.product_offset)]



socialFormDataEncoder : SocialForm -> Encode.Value
socialFormDataEncoder data = 
        Encode.object [ ("data", socialFormEncoder data )]



socialFormEncoder : SocialForm -> Encode.Value
socialFormEncoder formItem =
        Encode.object [ ("display_name", Encode.string formItem.display_name)
                      , ("description", Encode.string formItem.description)
                      , ("tags", Encode.string formItem.tags)
                      , ("draft", Encode.bool formItem.draft)
                      , ("schedule_date", scheduleDateEncoder formItem.schedule_date)
                      , ("facebook_code", Encode.string formItem.facebook_code)
                      , ("featured_image", Encode.string formItem.featured_image)
                      , ("url", Encode.string formItem.url)
                      , ("image_caption", Encode.string formItem.image_caption)
                      , ("social_media_type", Encode.string formItem.social_media_type)]



tagFormDataEncoder : TagForm -> Encode.Value
tagFormDataEncoder data = 
        Encode.object [ ("data", tagFormEncoder data )]


tagFormEncoder : TagForm -> Encode.Value
tagFormEncoder formItem =
        Encode.object [ ("display_name", Encode.string formItem.display_name)
                      , ("description", Encode.string formItem.description)]




updateFormDataEncoder : UpdateForm -> Encode.Value
updateFormDataEncoder data = 
        Encode.object [ ("data", updateFormEncoder data )]


updateFormEncoder : UpdateForm -> Encode.Value
updateFormEncoder formItem =
        Encode.object [ ("display_name", Encode.string formItem.display_name)
                      , ("title", Encode.string formItem.title)
                      , ("excerpt", Encode.string formItem.excerpt)
                      , ("author", Encode.string formItem.author)
                      , ("schedule_date", scheduleDateEncoder formItem.schedule_date)]


scheduleDateEncoder : ScheduleDate -> Encode.Value 
scheduleDateEncoder scheduleDate =
        Encode.object [ ("day", Encode.int scheduleDate.day)
                      , ("month", Encode.int scheduleDate.month)
                      , ("year", Encode.int scheduleDate.year)]
