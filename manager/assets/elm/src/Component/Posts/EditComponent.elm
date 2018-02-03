module Component.Posts.EditComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelDataType exposing (..)

import Component.Posts.FormComponent exposing (..)


-- still need part where it prepopulates the form, most likely in update/location

editPostsComponent : (Model, String) -> Html Msg
editPostsComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Edit Post" ]
              , button [ onClick (ItemUpdate (PostDataFormType model.postForm) itemId), class "button is-primary", type_ "" ]
                       [ text "Submit" ] 
              ] 
        , tagTable model 
        , postForm model model.postForm model.postFormValidation
        ]