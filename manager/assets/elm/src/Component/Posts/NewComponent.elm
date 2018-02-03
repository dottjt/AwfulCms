module Component.Posts.NewComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelDataType exposing (..)

 
import Component.Posts.FormComponent exposing (..)


newPostsComponent : Model -> Html Msg
newPostsComponent model =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "New Post" ]
              , button [ onClick (ItemCreate (PostDataFormType model.postForm)), class "button is-primary" ]
                       [ text "Submit" ]
              ] 
        , tagTable model 
        , postForm model model.postForm model.postFormValidation
        ]

