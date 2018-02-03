module Component.Updates.NewComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelDataType exposing (..)

import DatePicker exposing (defaultSettings)

import Component.Updates.FormComponent exposing (..)

newUpdatesComponent : Model -> Html Msg
newUpdatesComponent model =
    div []
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "New Update" ]
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
              , button [ onClick (ItemCreate (UpdateDataFormType model.updateForm)), class "button is-primary" ]
                      [ text "Submit" ]
              ]
        , updateForm model model.updateForm model.updateFormValidation
        ]