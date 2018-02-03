module Model.ModelDecode exposing (..)

import Model.ModelMisc exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelOverview exposing (..)
import Model.ModelDevelopment exposing (..)
import Model.ModelConfig exposing (..)

import Model.ModelMessage exposing (..)

import Json.Decode as Decode
import Json.Decode.Pipeline as Pipeline


googleAnalyticsDecoder : Decode.Decoder GoogleAnalyticsItem
googleAnalyticsDecoder =
    Pipeline.decode GoogleAnalyticsItem
        |> Pipeline.required "domain" Decode.string        
        |> Pipeline.required "link" Decode.string   
        |> Pipeline.required "month" Decode.string        
        |> Pipeline.required "today" Decode.string
        |> Pipeline.required "week" Decode.string        
        |> Pipeline.required "yesterday" Decode.string        

            
googleAnalyticsMESSAGEDecoder : Decode.Decoder GoogleAnalyticsItemMESSAGEList
googleAnalyticsMESSAGEDecoder =
    Pipeline.decode GoogleAnalyticsItemMESSAGEList
        |> Pipeline.required "googleAnalytics" (Decode.list googleAnalyticsDecoder) 
        |> Pipeline.required "message" messageDecoder





domainExpirationDecoder : Decode.Decoder DomainExpirationItem
domainExpirationDecoder =
    Pipeline.decode DomainExpirationItem
        |> Pipeline.required "domain" Decode.string        
        |> Pipeline.required "daysTillExpiration" Decode.string
        |> Pipeline.required "expirationDate" Decode.string        
        |> Pipeline.required "autoRenewStatus" Decode.string        
        |> Pipeline.required "renew" Decode.string        
        

domainExpirationMESSAGEDecoder : Decode.Decoder DomainExpirationItemMESSAGEList
domainExpirationMESSAGEDecoder =
    Pipeline.decode DomainExpirationItemMESSAGEList
        |> Pipeline.required "domainExpirations" (Decode.list domainExpirationDecoder) 
        |> Pipeline.required "message" messageDecoder




commonEnvDataDecoder : Decode.Decoder CommonEnvData
commonEnvDataDecoder =
    Pipeline.decode CommonEnvData
        |> Pipeline.required "mailgun_key" Decode.string        

        |> Pipeline.required "amazon_associate_tag" Decode.string
        |> Pipeline.required "aws_access_key_id" Decode.string        
        |> Pipeline.required "aws_secret_access_key" Decode.string        
        |> Pipeline.required "marketplace_host" Decode.string        

        |> Pipeline.required "amazon_s3_access_key" Decode.string        
        |> Pipeline.required "amazon_s3_secret_access_key" Decode.string        

        |> Pipeline.required "etsy_api_key" Decode.string        
        |> Pipeline.required "etsy_secret_key" Decode.string        
        
        |> Pipeline.required "tumblr_access_token" Decode.string        
        |> Pipeline.required "tumblr_access_token_secret" Decode.string        
        

commonEnvMESSAGEDecoder : Decode.Decoder CommonEnvMESSAGEData
commonEnvMESSAGEDecoder =
    Pipeline.decode CommonEnvMESSAGEData
        |> Pipeline.required "commonEnv" commonEnvDataDecoder
        |> Pipeline.required "message" messageDecoder




individualEnvDataDecoder : Decode.Decoder IndividualEnvData
individualEnvDataDecoder =
    Pipeline.decode IndividualEnvData
        |> Pipeline.required "mailgun_domain" Decode.string
        |> Pipeline.required "amazon_s3_bucket_name" Decode.string
        |> Pipeline.required "recaptcha_public_key" Decode.string
        |> Pipeline.required "recaptcha_private_key" Decode.string
        |> Pipeline.required "twitter_api_key" Decode.string
        |> Pipeline.required "twitter_secret_key" Decode.string
        |> Pipeline.required "twitter_access_token" Decode.string
        |> Pipeline.required "twitter_access_token_secret" Decode.string
        |> Pipeline.required "facebook_api_key" Decode.string
        |> Pipeline.required "facebook_secret_key" Decode.string
        |> Pipeline.required "facebook_page_id" Decode.string
        |> Pipeline.required "facebook_redirect_url" Decode.string
        |> Pipeline.required "tumblr_api_key" Decode.string
        |> Pipeline.required "tumblr_secret_key" Decode.string
        |> Pipeline.required "tumblr_blog_identifier" Decode.string
        |> Pipeline.required "pintrest_api_key" Decode.string
        |> Pipeline.required "pintrest_secret_key" Decode.string


individualEnvMESSAGEDecoder : Decode.Decoder IndividualEnvMESSAGEData
individualEnvMESSAGEDecoder =
    Pipeline.decode IndividualEnvMESSAGEData
        |> Pipeline.required "individualEnv" individualEnvDataDecoder
        |> Pipeline.required "message" messageDecoder





websitesItemDecoder : Decode.Decoder WebsitesItem
websitesItemDecoder =
    Pipeline.decode WebsitesItem
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "acronym" Decode.string
        |> Pipeline.required "total_products" Decode.int
        |> Pipeline.required "total_products_week" Decode.int
        |> Pipeline.required "total_products_month" Decode.int
        |> Pipeline.required "total_products_draft" Decode.int
        |> Pipeline.required "total_posts" Decode.int


websitesItemMESSAGEDecoder : Decode.Decoder WebsitesItemMESSAGEList
websitesItemMESSAGEDecoder =
    Pipeline.decode WebsitesItemMESSAGEList
        |> Pipeline.required "websites" (Decode.list websitesItemDecoder) 
        |> Pipeline.required "message" messageDecoder






configDecoder : Decode.Decoder ConfigEnvData
configDecoder =
    Pipeline.decode ConfigEnvData
        |> Pipeline.required "website_acronym" Decode.string
        |> Pipeline.required "website_name" Decode.string
        |> Pipeline.required "website_name_lower" Decode.string
        |> Pipeline.required "website_domain" Decode.string
        |> Pipeline.required "website_logo_png" Decode.string
        |> Pipeline.required "website_logo_svg" Decode.string
        |> Pipeline.required "website_favicon" Decode.string
        |> Pipeline.required "website_title" Decode.string
        |> Pipeline.required "website_description" Decode.string
        |> Pipeline.required "website_keywords" Decode.string
        |> Pipeline.required "website_twitter" Decode.string
        |> Pipeline.required "website_alt_image" Decode.string
        |> Pipeline.required "blog_meta_description" Decode.string
        |> Pipeline.required "categories_meta_description" Decode.string
        |> Pipeline.required "updates_meta_description" Decode.string
        |> Pipeline.required "about_meta_description" Decode.string
        |> Pipeline.required "contact_meta_description" Decode.string
        |> Pipeline.required "submit_meta_description" Decode.string
        |> Pipeline.required "login_meta_description" Decode.string
        |> Pipeline.required "register_meta_description" Decode.string
        |> Pipeline.required "search_meta_description" Decode.string
        |> Pipeline.required "about_copy" Decode.string
        |> Pipeline.required "submit_copy" Decode.string
        |> Pipeline.required "letter_copy" Decode.string
        |> Pipeline.required "google_analytics_tracking_id" Decode.string
        |> Pipeline.required "google_site_verification" Decode.string
        |> Pipeline.required "primary_email" Decode.string
        |> Pipeline.required "password" Decode.string


configMESSAGEDecoder : Decode.Decoder ConfigEnvDataMESSAGE
configMESSAGEDecoder =
    Pipeline.decode ConfigEnvDataMESSAGE
        |> Pipeline.required "config" configDecoder
        |> Pipeline.required "message" messageDecoder





messageListDecoder : Decode.Decoder ConsoleItemMESSAGEList
messageListDecoder =
    Pipeline.decode ConsoleItemMESSAGEList
        |> Pipeline.required "messages" (Decode.list messageDecoder) 
        |> Pipeline.required "message" messageDecoder


messageDecoder : Decode.Decoder ConsoleItem
messageDecoder =
    Pipeline.decode ConsoleItem
        |> Pipeline.required "inserted_at" Decode.string 
        |> Pipeline.required "command" Decode.string
        |> Pipeline.required "console_type" messageTypeDecoder
        |> Pipeline.required "text" Decode.string



messageTypeDecoder : Decode.Decoder ConsoleItemType
messageTypeDecoder =
    Decode.string
        |> Decode.andThen (\str ->
           case str of
                "new_session" -> 
                    Decode.succeed NewSession
                "begin" ->
                    Decode.succeed Begin 
                "non_existent" ->
                    Decode.succeed NonExistent
                "toggle" ->
                    Decode.succeed Toggle       
                "load" ->
                    Decode.succeed Load
                "success" ->
                    Decode.succeed Success
                "failure" ->
                    Decode.succeed Failure
                somethingElse ->
                    Decode.fail <| "Unknown theme: " ++ somethingElse
        )



serverStatusDecoder : Decode.Decoder ServerStatusItem
serverStatusDecoder =
    Pipeline.decode ServerStatusItem
        |> Pipeline.required "status" Decode.bool
        |> Pipeline.required "acronym" Decode.string



serverStatusMESSAGEDecoder : Decode.Decoder ServerStatusMESSAGEList
serverStatusMESSAGEDecoder =
    Pipeline.decode ServerStatusMESSAGEList
        |> Pipeline.required "serverStatusList" (Decode.list serverStatusDecoder)
        |> Pipeline.required "status_type" Decode.string
        |> Pipeline.required "message" messageDecoder






websiteIndividualDecoder : Decode.Decoder WebsiteIndividualData
websiteIndividualDecoder =
    Pipeline.decode WebsiteIndividualData
        |> Pipeline.required "productsAssoc" (Decode.list productAssocDecoder)
        |> Pipeline.required "categories" (Decode.list categoryDecoder)
        |> Pipeline.required "tagsAssoc" (Decode.list tagAssocDecoder)
        |> Pipeline.required "posts" (Decode.list postAssocDecoder)
        |> Pipeline.required "productsDraft" (Decode.list productDecoder)
        |> Pipeline.required "social" (Decode.list socialDecoder)
        |> Pipeline.required "updates" (Decode.list updateDecoder)
        |> Pipeline.required "message" messageDecoder


productAssocDecoder : Decode.Decoder ProductAssoc
productAssocDecoder =
    Pipeline.decode ProductAssoc
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string
        |> Pipeline.required "description" Decode.string
        |> Pipeline.required "blog_description" Decode.string
        |> Pipeline.required "featured_image" Decode.string
        |> Pipeline.required "schedule_date" scheduleDateDecoder
        |> Pipeline.required "draft" Decode.bool
        |> Pipeline.required "cta" Decode.string
        |> Pipeline.required "price" Decode.float
        |> Pipeline.required "product_type" Decode.string
        |> Pipeline.required "url" Decode.string
        |> Pipeline.required "url_text" Decode.string
        |> Pipeline.required "inserted_at" Decode.string

        |> Pipeline.required "category" categoryDecoder
        -- |> Pipeline.required "sub_category" productSubCategoryDecoder
        |> Pipeline.required "product_tags" tagAssocListDecoder
        -- |> Pipeline.required "product_comments" productCommentListDecoder
        |> Pipeline.required "product_like" likeDecoder
        

productAssocMESSAGEDecoder : Decode.Decoder ProductAssocMESSAGE
productAssocMESSAGEDecoder =
    Pipeline.decode ProductAssocMESSAGE
        |> Pipeline.required "product" productAssocDecoder
        |> Pipeline.required "message" messageDecoder


scheduleDateDecoder : Decode.Decoder ScheduleDate 
scheduleDateDecoder =
    Pipeline.decode ScheduleDate
        |> Pipeline.required "day" Decode.int
        |> Pipeline.required "month" Decode.int
        |> Pipeline.required "year" Decode.int




tagAssocDecoder : Decode.Decoder TagAssoc
tagAssocDecoder =
    Pipeline.decode TagAssoc
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string        
        |> Pipeline.required "products" (Decode.list productDecoder)       
        |> Pipeline.required "posts" (Decode.list postDecoder)        

tagAssocListDecoder : Decode.Decoder (List Tag)
tagAssocListDecoder =
    Decode.list tagDecoder

tagDecoder : Decode.Decoder Tag
tagDecoder =
    Pipeline.decode Tag
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string        





productDecoder : Decode.Decoder Product
productDecoder =
    Pipeline.decode Product
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string
        |> Pipeline.required "blog_description" Decode.string        
        |> Pipeline.required "featured_image" Decode.string
        |> Pipeline.required "schedule_date" scheduleDateDecoder
        |> Pipeline.required "draft" Decode.bool
        |> Pipeline.required "cta" Decode.string
        |> Pipeline.required "price" Decode.float
        |> Pipeline.required "product_type" Decode.string
        |> Pipeline.required "url" Decode.string
        |> Pipeline.required "url_text" Decode.string



categoryDecoder : Decode.Decoder Category
categoryDecoder =
    Pipeline.decode Category
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string        
        |> Pipeline.required "icon" Decode.string        



-- productCommentListDecoder : Decode.Decoder ProductCommentList
-- productCommentListDecoder =
--     Decode.list productCommentDecoder

-- productCommentDecoder : Decode.Decoder ProductComment
-- productCommentDecoder =
--     Pipeline.decode ProductComment
--         |> Pipeline.required "id" Decode.string        
--         |> Pipeline.required "text" Decode.string


likeDecoder : Decode.Decoder Like
likeDecoder =
    Pipeline.decode Like
        |> Pipeline.required "id" Decode.string  
        |> Pipeline.required "total" Decode.int  


postAssocDecoder : Decode.Decoder PostAssoc
postAssocDecoder =
    Pipeline.decode PostAssoc
        |> Pipeline.required "id" Decode.string 
        |> Pipeline.required "name" Decode.string 
        |> Pipeline.required "display_name" Decode.string 
        |> Pipeline.required "author" Decode.string 
        |> Pipeline.required "excerpt" Decode.string 
        |> Pipeline.required "featured_image" Decode.string 
        |> Pipeline.required "post_type" Decode.string 
        |> Pipeline.required "tag" (Decode.nullable tagDecoder)
        |> Pipeline.required "product_limit" (Decode.nullable Decode.int)
        |> Pipeline.required "product_offset" (Decode.nullable Decode.int) 




postDecoder : Decode.Decoder Post
postDecoder =
    Pipeline.decode Post
        |> Pipeline.required "id" Decode.string 
        |> Pipeline.required "name" Decode.string 
        |> Pipeline.required "display_name" Decode.string 
        |> Pipeline.required "author" Decode.string 
        |> Pipeline.required "excerpt" Decode.string 
        |> Pipeline.required "featured_image" Decode.string 
        |> Pipeline.required "post_type" Decode.string 
        |> Pipeline.required "product_limit" (Decode.nullable Decode.int)
        |> Pipeline.required "product_offset" (Decode.nullable Decode.int) 


updateDecoder : Decode.Decoder Update
updateDecoder =
    Pipeline.decode Update
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "title" Decode.string        
        |> Pipeline.required "excerpt" Decode.string        
        |> Pipeline.required "author" Decode.string        
        |> Pipeline.required "draft" Decode.bool        
        |> Pipeline.required "schedule_date" scheduleDateDecoder        



socialMediaPrefilDecoder : Decode.Decoder SocialMediaPrefil
socialMediaPrefilDecoder =
    Pipeline.decode SocialMediaPrefil
        |> Pipeline.required "display_name" Decode.string
        |> Pipeline.required "featured_image" Decode.string
        |> Pipeline.required "url" Decode.string
        |> Pipeline.required "description" Decode.string





-- FORM STUFF


productFormMESSAGEDecoder : Decode.Decoder ProductFormMESSAGE
productFormMESSAGEDecoder =
    Pipeline.decode ProductFormMESSAGE
        |> Pipeline.required "productAssoc" productFormDecoder
        |> Pipeline.required "message" messageDecoder


productFormDecoder : Decode.Decoder ProductForm 
productFormDecoder =
    Pipeline.decode ProductForm
      |> Pipeline.required "display_name" Decode.string
      |> Pipeline.required "description" Decode.string
      |> Pipeline.required "blog_description" Decode.string
      |> Pipeline.required "original_featured_image" Decode.string
      |> Pipeline.required "featured_image" Decode.string
      |> Pipeline.required "draft" Decode.bool
      |> Pipeline.required "schedule_date" scheduleDateDecoder
      |> Pipeline.required "cta" Decode.string
      |> Pipeline.required "price" Decode.float
      |> Pipeline.required "url" Decode.string
      |> Pipeline.required "url_text" Decode.string
      |> Pipeline.required "category" categoryDecoder
      |> Pipeline.required "category_id" Decode.string 
      |> Pipeline.required "tag_id" (Decode.list Decode.string)
      |> Pipeline.required "product_like" Decode.int
      |> Pipeline.required "product_type" Decode.string



newProductMESSAGEDecoder : Decode.Decoder NewProductMESSAGE
newProductMESSAGEDecoder = 
    Pipeline.decode NewProductMESSAGE
        |> Pipeline.required "product" newProductDecoder
        |> Pipeline.required "message" messageDecoder
        

newProductDecoder : Decode.Decoder NewProduct 
newProductDecoder =
    Pipeline.decode NewProduct
      |> Pipeline.required "featured_image" Decode.string
      |> Pipeline.required "price" Decode.float
      |> Pipeline.required "url" Decode.string
      -- |> Pipeline.required "display_name" Decode.string
      -- |> Pipeline.required "description" Decode.string
      -- |> Pipeline.required "blog_description" Decode.string




socialFormMESSAGEDecoder : Decode.Decoder SocialFormMESSAGE
socialFormMESSAGEDecoder =
    Pipeline.decode SocialFormMESSAGE
        |> Pipeline.required "prefil" socialFormDecoder 
        |> Pipeline.required "message" messageDecoder


socialFormDecoder : Decode.Decoder SocialForm
socialFormDecoder =
    Pipeline.decode SocialForm
        |> Pipeline.required "display_name" Decode.string
        |> Pipeline.required "description" Decode.string
        |> Pipeline.required "tags" Decode.string
        |> Pipeline.required "draft" Decode.bool
        |> Pipeline.required "schedule_date" scheduleDateDecoder
        |> Pipeline.required "facebook_code" Decode.string
        |> Pipeline.required "featured_image" Decode.string
        |> Pipeline.required "url" Decode.string
        |> Pipeline.required "image_caption" Decode.string
        |> Pipeline.required "social_media_type" Decode.string



socialDecoder : Decode.Decoder Social
socialDecoder =
    Pipeline.decode Social
      |> Pipeline.required "id" Decode.string
      |> Pipeline.required "name" Decode.string
      |> Pipeline.required "description" Decode.string
      |> Pipeline.required "display_name" Decode.string
      |> Pipeline.required "url" Decode.string
      |> Pipeline.required "draft" Decode.bool
      |> Pipeline.required "schedule_date" scheduleDateDecoder
      |> Pipeline.required "facebook_code" Decode.string
      |> Pipeline.required "featured_image" Decode.string
      |> Pipeline.required "image_caption" Decode.string
      |> Pipeline.required "image_caption" Decode.string
      |> Pipeline.required "social_media_type" Decode.string
      |> Pipeline.required "tags" Decode.string

-- tagFormDecoder : Decode.Decoder TagForm
-- tagFormDecoder =
--     Pipeline.decode TagForm
--         |> Pipeline.required "display_name" Decode.string
--         |> Pipeline.required "description" Decode.string


-- updateFormDecoder : Decode.Decoder UpdateForm
-- updateFormDecoder =
--     Pipeline.decode UpdateForm
--         |> Pipeline.required "display_name" Decode.string
--         |> Pipeline.required "title" Decode.string
--         |> Pipeline.required "excerpt" Decode.string
--         |> Pipeline.required "author" Decode.string





-- websitesAcronymDecoder : Decode.Decoder Websites
-- websitesAcronymDecoder =
--     Decode.string
--         |> Decode.andThen (\str ->
--            case str of
--                 "ac" ->
--                     Decode.succeed AC
--                 "af" ->
--                     Decode.succeed AF
--                 "ap" ->
--                     Decode.succeed AP
--                 "ach" ->
--                     Decode.succeed ACH
--                 "apo" ->
--                     Decode.succeed APO
--                 "ahp" ->
--                     Decode.succeed AHP
--                 "a9" ->
--                     Decode.succeed A9
--                 "aw" ->
--                     Decode.succeed AW                    
--                 somethingElse ->
--                     Decode.fail <| "Unknown theme: " ++ somethingElse
--         )
