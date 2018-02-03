module Component.Social.EditComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelDataType exposing (..)

import DatePicker exposing (defaultSettings)
import Component.Social.FormComponent exposing (..)


editSocialComponent : (Model, String) -> Html Msg
editSocialComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Edit Social" ]
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
              , button [ onClick (ItemUpdate (SocialDataFormType model.socialForm) itemId), class "button is-primary" ] 
                       [ text "Submit" ]
              ]
        , productTable model
        , socialForm model model.socialForm model.socialFormValidation
        ]
