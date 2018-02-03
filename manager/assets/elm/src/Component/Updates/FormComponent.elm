module Component.Updates.FormComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelValidation exposing (..)

import Helper.FormHelper exposing (..)


updateForm : Model -> UpdateForm -> UpdateFormValidation -> Html Msg
updateForm model update validation =
    div [ class "columns" ]
        [ div [ class "column" ]
              [ updateFormField Input "Display Name" update.display_name (Just validation.display_name) UpdateFormDisplayName
              , updateFormField Input "Title" update.title (Just validation.title) UpdateFormTitle
              ]
        , div [ class "column" ]
              [ updateFormField TextArea "Excerpt" update.excerpt (Just validation.excerpt) UpdateFormExcerpt                  
              -- , updateFormField Input "Author" update.author (Just validation.author) UpdateFormAuthor              
              ]
        ]



updateFormField : FormType -> String -> String -> Maybe ValidationAlias -> UpdateFormField -> Html Msg 
updateFormField form_type label_text field_value validation_value update_form = 
    let 
      form_class 
        = convertFormType form_type
    in
    div [ class form_class.field ]
        [ label [ class "label" ]
                [ text label_text ]
        , div [ class "control" ] 
              [ form_class.component [ class form_class.input, onInput <| SetUpdatesField update_form, onBlur OnBlurCheckUpdateFormValidation, value field_value ]
                      []
              ]
        , showValidation <| Maybe.withDefault noValidation <| validation_value            
        ]        