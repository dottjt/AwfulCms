module Component.Tags.ShowComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelProduct exposing (..)

import Helper.FormHelper exposing(..)


showTagsComponent : (Model, String) -> Html Msg
showTagsComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Show Tag" ]
              ] 
        , showComponent model.individualTag
        ]


showComponent : TagAssoc -> Html Msg 
showComponent tag =
  ul [] 
     [ showListItem "id" tag.id
     , showListItem "name" tag.name
     , showListItem "display_name" tag.display_name
     , showListItem "description" tag.description
     ]