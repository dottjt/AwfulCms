module Component.Main.ConfigComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Html.Events exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelConfig exposing (..)

import Helper.DropdownHelper exposing (..) 
import Helper.FormHelper exposing (..)


configComponent : Model -> Html Msg
configComponent model =
    div [ class "config__container" ]
        [ h2 [] [ text "Config Dropdown" ]
        , dropdownComponent model FetchConfig model.configDropdownSelection
        , configForm model.configEnvData
        , envComponent model
        ]


configForm : ConfigEnvData -> Html Msg
configForm config =
          div [ class "update__website__form__container" ]
              [ h2 [] [ text "Meta" ]
              , configFormField Input "website_title" config.website_title ConfigFormWebsiteTitle
              , configFormField TextArea "website_description" config.website_description ConfigFormWebsiteDescription
              , configFormField Input "website_twitter" config.website_twitter ConfigFormWebsiteTwitter
              , configFormField Input "website_alt_image" config.website_alt_image ConfigFormWebsiteAltImage
              , h2 [] [ text "Meta Descriptions" ]
              , div [ class "columns" ] 
                    [ div [ class "column" ] 
                          [ configFormField TextArea "blog_meta_description" config.blog_meta_description ConfigFormBlogMetaDescription
                          , configFormField TextArea "categories_meta_description" config.categories_meta_description ConfigFormCategoriesMetaDescription
                          , configFormField TextArea "updates_meta_description" config.updates_meta_description ConfigFormUpdatesMetaDescription
                          , configFormField TextArea "about_meta_description" config.about_meta_description ConfigFormAboutMetaDescription
                          , configFormField TextArea "contact_meta_description" config.contact_meta_description ConfigFormContactMetaDescription
                          ]
                    , div [ class "column" ] 
                          [ configFormField TextArea "register_meta_description" config.register_meta_description ConfigFormRegisterMetaDescription
                          , configFormField TextArea "search_meta_description" config.search_meta_description ConfigFormSearchMetaDescription
                          , configFormField TextArea "login_meta_description" config.login_meta_description ConfigFormLoginMetaDescription
                          , configFormField TextArea "submit_meta_description" config.submit_meta_description ConfigFormSubmitMetaDescription
                          , configFormField TextArea "website_keywords" config.website_keywords ConfigFormWebsiteKeywords
                          ]
                    ]
                    , configFormField TextArea "about_copy" config.about_copy ConfigFormAboutCopy
                    , configFormField TextArea "submit_copy" config.submit_copy ConfigFormSubmitCopy
                    , configFormField TextArea "letter_copy" config.letter_copy ConfigFormLetterCopy
                    , div [ class "columns" ] 
                          [ div [ class "column" ] 
                                [ h2 [] [ text "Website Config" ]
                                , configFormField Input "website_acronym" config.website_acronym ConfigFormWebsiteAcronym
                                , configFormField Input "website_name" config.website_name ConfigFormWebsiteName
                                , configFormField Input "website_name_lower" config.website_name_lower ConfigFormWebsiteNameLower
                                , configFormField Input "website_domain" config.website_domain ConfigFormWebsiteDomain
                                , configFormField Input "google_site_verification" config.google_site_verification ConfigFormGoogleSiteVerification                                
                                                                              
                                , fieldset [ class "field" ]
                                            [ label [ class "label" ] []
                                            , div [ class "control" ] 
                                                  [ label [ class "label" ] [ ]
                                                  , button [ onClick <| UpdateEnv <| ConfigEnvDataFormType config, class "button is-primary is-expanded", type_ "submit" ]
                                                           [ text "Submit" ]
                                                  ]
                                            ]
                                ]
                                , div [ class "column" ] 
                                      [ h2 [] [ text "Other" ]
                                      , configFormField Input "website_logo_png" config.website_logo_png ConfigFormWebsiteLogoPng
                                      , configFormField Input "website_logo_svg" config.website_logo_svg ConfigFormWebsiteLogoSvg
                                      , configFormField Input "website_favicon" config.website_favicon ConfigFormWebsiteFavicon
                                      , configFormField Input "google_analytics_tracking_id" config.google_analytics_tracking_id ConfigFormGoogleAnalyticsTrackingId
                                      , configFormField Input "primary_email" config.primary_email ConfigFormPrimaryEmail
                                      , configFormField Input "password" config.password ConfigFormPassword
                                      ]
                          ] -- end of columns                                
                ]
                                

envComponent : Model -> Html Msg 
envComponent model = 
    div [ class "manage__env__container" ] 
        [ h2 [] [ text "Common ENV" ]
        , commonEnvComponent model.commonEnvData
        , h2 [] [ text "Individual ENV" ]
        , dropdownComponent model FetchIndividualEnv model.individualEnvDropdownSelection     
        , individualEnvComponent model.individualEnvData ]


commonEnvComponent : CommonEnvData -> Html Msg 
commonEnvComponent common =
         div [ class "columns" ]
             [ div [ class "column" ] 
                   [ commonFormField Input "mailgun_key" common.mailgun_key CommonEnvFormMailgunKey
                   , commonFormField Input "amazon_associate_tag" common.amazon_associate_tag CommonEnvFormAmazonAssociateTag
                   , commonFormField Input "aws_access_key_id" common.aws_access_key_id CommonEnvFormAwsAccessKeyId
                   , commonFormField Input "aws_secret_access_key" common.aws_secret_access_key CommonEnvFormAwsSecretAccessKey
                   , commonFormField Input "marketplace_host" common.marketplace_host CommonEnvFormMarketplaceHost
                   , fieldset [ class "field" ] 
                               [ label [ class "label" ] [ ]
                               , button [ onClick <| UpdateEnv <| CommonEnvDataFormType common, class "button is-primary is-expanded", type_ "submit" ] 
                                         [ text "Submit" ]
                               ]
                   ]
             , div [ class "column" ] 
                   [ commonFormField Input "amazon_s3_access_key" common.amazon_s3_access_key CommonEnvFormAmazonS3AccessKey
                   , commonFormField Input "amazon_s3_secret_access_key" common.amazon_s3_secret_access_key CommonEnvFormAmazonS3SecretAccessKey
                   , commonFormField Input "etsy_api_key" common.etsy_api_key CommonEnvFormEtsyApiKey
                   , commonFormField Input "etsy_secret_key" common.etsy_secret_key CommonEnvFormEtsySecretKey
                   , commonFormField Input "tumblr_access_token" common.tumblr_access_token CommonEnvFormTumblrAccessToken
                   , commonFormField Input "tumblr_access_token_secret" common.tumblr_access_token_secret CommonEnvFormTumblrAccessTokenSecret
                   ]
             ] 


individualEnvComponent : IndividualEnvData -> Html Msg 
individualEnvComponent individual =
          div [ class "columns" ]
              [ div [ class "column" ] 
                    [ individualFormField Input "mailgun_domain" individual.mailgun_domain IndividualEnvFormMailgunDomain
                    , individualFormField Input "amazon_s3_bucket_name" individual.amazon_s3_bucket_name IndividualEnvFormAmazonS3BucketName
                    , individualFormField Input "recaptcha_public_key" individual.recaptcha_public_key IndividualEnvFormRecaptchaPublicKey
                    , individualFormField Input "recaptcha_private_key" individual.recaptcha_private_key IndividualEnvFormRecaptchaPrivateKey
                    , individualFormField Input "twitter_api_key" individual.twitter_api_key IndividualEnvFormTwitterApiKey
                    , individualFormField Input "twitter_secret_key" individual.twitter_secret_key IndividualEnvFormTwitterSecretKey
                    , individualFormField Input "twitter_access_token" individual.twitter_access_token IndividualEnvFormTwitterAccessToken
                    , individualFormField Input "twitter_access_token_secret" individual.twitter_access_token_secret IndividualEnvFormTwitterAccessTokenSecret
                    , fieldset [ class "field" ] 
                              [ label [ class "label" ] [ ]
                              , button [ onClick <| UpdateEnv <| IndividualEnvDataFormType individual, class "button is-primary is-expanded", type_ "submit" ] [ text "submit" ]
                              ]
                    ]
              , div [ class "column" ]
                    [ individualFormField Input "facebook_secret_key" individual.facebook_secret_key IndividualEnvFormFacebookSecretKey
                    , individualFormField Input "facebook_page_id" individual.facebook_page_id IndividualEnvFormFacebookPageId
                    , individualFormField Input "facebook_redirect_url" individual.facebook_redirect_url IndividualEnvFormFacebookRedirectUrl
                    , individualFormField Input "tumblr_api_key" individual.tumblr_api_key IndividualEnvFormTumblrApiKey
                    , individualFormField Input "tumblr_secret_key" individual.tumblr_secret_key IndividualEnvFormTumblrSecretKey
                    , individualFormField Input "tumblr_blog_identifier" individual.tumblr_blog_identifier IndividualEnvFormTumblrBlogIdentifier
                    , individualFormField Input "pintrest_api_key" individual.pintrest_api_key IndividualEnvFormPintrestApiKey
                    , individualFormField Input "pintrest_secret_key" individual.pintrest_secret_key IndividualEnvFormPintrestSecretKey
                    , individualFormField Input "facebook_api_key" individual.facebook_api_key IndividualEnvFormFacebookApiKey                          
                    ]
            ]




configFormField : FormType -> String -> String -> ConfigFormField -> Html Msg 
configFormField form_type label_text field_value config_form = 
  let
    form_class 
      = convertFormType form_type
  in
    fieldset [ class form_class.field ] 
             [ label [ class "label" ] 
                     [ text label_text ]
             , div [ class "control" ] 
                   [ form_class.component [ class form_class.input, onInput <| SetConfigFormField config_form, value field_value ] 
                           []
                   ]
             ]


commonFormField : FormType -> String -> String -> CommonEnvFormField -> Html Msg 
commonFormField form_type label_text field_value common_form = 
  let
    form_class 
      = convertFormType form_type
  in
    fieldset [ class form_class.field ] 
             [ label [ class "label" ] 
                     [ text label_text ]
             , div [ class "control" ] 
                   [ form_class.component [ class form_class.input, onInput <| SetCommonEnvField common_form, value field_value ] 
                           []
                   ]
             ]             

individualFormField : FormType -> String -> String -> IndividualEnvFormField -> Html Msg 
individualFormField form_type label_text field_value individual_form = 
  let
    form_class 
      = convertFormType form_type
  in
    fieldset [ class form_class.field ] 
             [ label [ class "label" ] 
                     [ text label_text ]
             , div [ class "control" ] 
                   [ form_class.component [ class form_class.input, onInput <| SetIndividualEnvField individual_form, value field_value ] 
                           []
                   ]
             ]       


                         