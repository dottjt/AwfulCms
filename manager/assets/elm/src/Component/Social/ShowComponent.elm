module Component.Social.ShowComponent exposing (..)


import Html exposing (..)
import Html.Attributes exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelProduct exposing (..)

 
import Helper.ViewHelper exposing (..)
import Helper.FormHelper exposing (..)


showSocialComponent : (Model, String) -> Html Msg
showSocialComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Show Post" ]
              ] 
        , showComponent model.individualSocial
        ]


showComponent : Social -> Html msg 
showComponent social =
    ul []
       [ showListItem "display_name" social.display_name
       , showListItem "description" social.description
       , showListItem "tags" social.tags
         -- showListItem "draft" social.draft
       , showListItem "schedule_date" (scheduleDateToString social.schedule_date)
       , showListItem "facebook_code" social.facebook_code
       , showListItem "featured_image" social.featured_image
       , showListItem "url" social.url
       , showListItem "image_caption" social.image_caption
       , showListItem "social_media_type" social.social_media_type
       ]


