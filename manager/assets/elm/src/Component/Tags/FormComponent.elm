module Component.Tags.FormComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelValidation exposing (..)

import Helper.FormHelper exposing (..)
import Helper.TableHelper exposing (..)


newTagsTable : Model -> Html Msg
newTagsTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["Tag", "Products"]
          , tbody []
              (List.map newTagsTableRow model.tagAssocList)
          ]


newTagsTableRow : TagAssoc -> Html Msg
newTagsTableRow tag =
    tr []
       [ td []
            [ text tag.display_name ]
       , td []
            [ text (toString (List.length tag.products)) ]
       ]



tagForm : Model -> TagForm -> TagFormValidation -> Html Msg
tagForm model tagForm tagFormValidation =
    div [ class "columns" ]
        [ div [ class "column" ]
              [ tagFormField Input "Display Name" tagForm.display_name (Just tagFormValidation.display_name) TagFormDisplayName
              , tagFormField TextArea "Description" tagForm.description (Just tagFormValidation.description) TagFormDescription
              ]
        ]



tagFormField : FormType -> String -> String -> Maybe ValidationAlias -> TagFormField -> Html Msg 
tagFormField form_type label_text field_value validation_value tag_form = 
    let 
      form_class 
        = convertFormType form_type
    in
    div [ class form_class.field ]
        [ label [ class "label" ]
                [ text label_text ]
        , div [ class "control" ] 
              [ form_class.component [ class form_class.input, onInput <| SetTagsField tag_form, onBlur OnBlurCheckTagFormValidation, value field_value ]
                      []
              ]
        , showValidation <| Maybe.withDefault noValidation <| validation_value            
        ]
