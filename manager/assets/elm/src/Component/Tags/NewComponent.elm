module Component.Tags.NewComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Msg exposing (..)

import Model exposing (..)
import Model.ModelDataType exposing (..)

import Component.Tags.FormComponent exposing (..)

newTagsComponent : Model -> Html Msg
newTagsComponent model =
    div []
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "New Tag" ]
              , button [ onClick (ItemCreate (TagDataFormType model.tagForm)), class "button is-primary" ]
                       [ text "Submit" ]
              ]
        , newTagsTable model
        , tagForm model model.tagForm model.tagFormValidation
        ]