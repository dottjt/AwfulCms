module Helper.FormHelper exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Msg exposing (..)

import Model.ModelValidation exposing (..)

-- VALIDATION

noValidation : ValidationAlias
noValidation =
  { isEmpty = False 
  , validationMessage = "" 
  , validationType = NoValidation 
  }


-- this should be in it's own module
type FormType
  = Input
  | TextArea
  | Number 

type alias FormRecord = 
  { field : String 
  , input : String
  , component : List (Attribute Msg) -> List (Html Msg) -> Html Msg
  }



mainComponentShow : String -> Html msg 
mainComponentShow value =
  div [ class "main__component__top" ]
      [ h2 [] [ text value ]
      ]


showListItem : String -> String -> Html msg
showListItem title value = 
   li [] 
      [ h3 [] 
           [ text title ]
      , p [] 
          [ text value ]
      ] 


convertFormType : FormType -> FormRecord
convertFormType formType = 
  case formType of 
    Input ->
      { field = "field", input = "input", component = input }

    Number -> 
      { field = "field", input = "input", component = input }

    TextArea ->
      { field = "field field-description", input = "textarea", component = textarea }


showValidation : ValidationAlias -> Html msg 
showValidation validationAlias =
  case validationAlias.isEmpty of 
    True -> 
      p [ class "help is-danger"] 
        [ text validationAlias.validationMessage ]

    False -> 
      p [ class "help is-success" ]
        [ text "thank you!" ]

