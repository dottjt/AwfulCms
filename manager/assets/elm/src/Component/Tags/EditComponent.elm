module Component.Tags.EditComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Msg exposing (..)

import Model exposing (..)
import Model.ModelDataType exposing (..)

import Component.Tags.FormComponent exposing (..)

editTagsComponent : (Model, String) -> Html Msg
editTagsComponent (model, itemId) =
    div []
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Edit Tag" ]
              , button [ onClick (ItemUpdate (TagDataFormType model.tagForm) itemId), class "button is-primary" ]
                       [ text "Submit" ]
              ]
        , newTagsTable model
        , tagForm model model.tagForm model.tagFormValidation
        ]