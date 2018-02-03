module Component.Updates.ShowComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelProduct exposing (..)

import Helper.FormHelper exposing(..)


showUpdatesComponent : (Model, String) -> Html Msg
showUpdatesComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Show Post" ]
              ]
        , showComponent model.individualUpdate 
        ]


showComponent : Update ->  Html msg
showComponent update =
    ul [] 
       [ showListItem "display_name" update.display_name
       , showListItem "title" update.title
       , showListItem "excerpt" update.excerpt
       , showListItem "author" update.author
       ]
