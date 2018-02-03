module Component.Social.NewComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelDataType exposing (..)

import DatePicker exposing (defaultSettings)

import Component.Social.FormComponent exposing (..)

newSocialComponent : Model -> Html Msg
newSocialComponent model =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "New Social" ]
              , div [ class "field field-schedule" ]
                    [ label [ class "label" ]
                            [ text "Schedule Date" ] 
                    , (DatePicker.view model.date defaultSettings model.datePicker) |> Html.map ToDatePicker
                    ]
              , div [ class "field" ]
                    [ label [ class "label" ]
                            [ text "Draft" ]
                    , div [ class "control" ] 
                          [ input [  class "checkbox", type_ "checkbox", onInput <| SetSocialField SocialFormDraft ]
                                  []
                      ]
                    ]
              , button [ onClick (ItemCreate (SocialDataFormType model.socialForm)), class "button is-primary" ] 
                       [ text "Submit" ]
              ]
        , productTable model
        , socialForm model model.socialForm model.socialFormValidation
        ]
