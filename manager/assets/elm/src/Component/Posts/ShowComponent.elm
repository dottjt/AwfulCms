module Component.Posts.ShowComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelProduct exposing (..)

import Helper.FormHelper exposing (..)


-- still need part where it prepopulates the form, most likely in update/location


showPostsComponent : (Model, String) -> Html Msg
showPostsComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Show Post" ]
              ] 
        , showComponent model.individualPost 
        ]



showComponent : PostAssoc -> Html Msg
showComponent post =
  ul []
     [ showListItem "id" post.id
     , showListItem "name" post.name
     , showListItem "display_name" post.display_name
     , showListItem "author" post.author
     , showListItem "excerpt" post.excerpt
     , showListItem "featured_image" post.featured_image
     , showListItem "post_type" post.post_type
     , showListItem "product_limit" (toString post.product_limit)
     , showListItem "product_offset" (toString post.product_offset)
     ]
