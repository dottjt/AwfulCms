module Component.Updates.EditComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelDataType exposing (..)

import DatePicker exposing (defaultSettings)

import Component.Updates.FormComponent exposing (..)


editUpdatesComponent : (Model, String) -> Html Msg
editUpdatesComponent (model, itemId) =
    div []
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Edit Update" ]
              , div [ class "field" ]
                    [ label [ class "label" ]
                            [ text "Schedule Date" ]
                    , (DatePicker.view model.date defaultSettings model.datePicker) |> Html.map ToDatePicker
                    ]  
              , div [ class "field" ]
                    [ label [ class "label" ]
                            [ text "Draft" ]
                    , div [ class "control" ] 
                          [ input [ class "checkbox", type_ "checkbox" ]
                                  []
                          ]
                    ]              
              , button [ onClick (ItemUpdate (UpdateDataFormType model.updateForm) itemId), class "button is-primary" ]
                       [ text "Submit" ]
              ]
        , updateForm model model.updateForm model.updateFormValidation
        ]