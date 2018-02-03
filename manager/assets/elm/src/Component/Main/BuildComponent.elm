module Component.Main.BuildComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelBuild exposing (..)
import Model.ModelValidation exposing (..)

import Helper.FormHelper exposing (..)

buildComponent : Model -> Html Msg
buildComponent model =
    div [ class "build__container" ]
        [ h2 [] [ text "Input Domain" ] 
        , setupComponent model.domainInput       
        , newWebsiteComponent model.buildForm model.buildFormValidation
        ]

setupComponent : String -> Html Msg 
setupComponent domainInput =
    div [ class "field has-addons" ] 
        [ div [ class "control" ] 
              [ input [ class "input", type_ "text", name "domain", value "awful.com" ] []
              ] 
        , div [ class "control" ] 
              [ button [ class "button is-link is-outlined", onClick <| OnCheckDomain domainInput ] 
                        [ text "check" ] 
              ]
        , div [ class "control" ] 
              [ button [ class "button is-link is-outlined", onClick <| OnRegisterDomain domainInput ] 
                        [ text "register" ]  
              ]
        , div [ class "control" ] 
              [ button [ class "button is-link is-outlined", onClick <| OnAccountSetup domainInput ] 
                        [ text "setup account" ]  
              ]
        , div [ class "control" ] 
              [ button [ class "button is-link is-outlined", onClick <| OnServerSetup domainInput ] 
                        [ text "setup server" ] 
              ]
        ]
        

newWebsiteComponent : BuildForm -> BuildFormValidation -> Html Msg
newWebsiteComponent build validation =
    Html.form [ class "build__container" ]
              [ div [ class "columns" ] 
                    [ div [ class "column" ]
                          [ h2 [] [ text "New Website" ]
                          , buildFormField Input "website_acronym" build.website_acronym (Just validation.website_acronym) WebsiteAcronym
                          , buildFormField Input "website_lower" build.website_lower (Just validation.website_lower) WebsiteLower
                          , buildFormField Input "website_capital" build.website_capital (Just validation.website_capital) WebsiteCapital
                          , buildFormField Input "num_of_categories" build.num_of_categories (Just validation.num_of_categories) NumOfCategories
                          , h2 [] [ text "Category Two" ]
                          , buildFormField Input "c2_name" build.c2_name (Just validation.c2_name) C4Name
                          , buildFormField Input "c2_display_name" build.c2_display_name (Just validation.c2_display_name) C4DisplayName
                          , buildFormField Input "c2_model" build.c2_model (Just validation.c2_model) C4Model
                          , buildFormField Input "c2_icon" build.c2_icon (Just validation.c2_icon) C4Icon                          
                          , h2 [] [ text "Category Four" ]
                          , buildFormField Input "c4_name" build.c4_name (Just validation.c4_name) C1Name
                          , buildFormField Input "c4_display_name" build.c4_display_name (Just validation.c4_display_name) C1DisplayName
                          , buildFormField Input "c4_model" build.c4_model (Just validation.c4_model) C1Model
                          , buildFormField Input "c4_icon" build.c4_icon (Just validation.c4_icon) C1Icon
                          , h2 [] [ text "Category Six" ]
                          , buildFormField Input "c6_name" build.c6_name (Just validation.c6_name) C5Name
                          , buildFormField Input "c6_display_name" build.c6_display_name (Just validation.c6_display_name) C5DisplayName
                          , buildFormField Input "c6_model" build.c6_model (Just validation.c6_model) C5Model
                          , buildFormField Input "c6_icon" build.c6_icon (Just validation.c6_icon) C5Icon
                          , fieldset [ class "field" ] 
                                     [ label [ class "label" ] [ ]
                                     , button [ class "button is-primary", type_ "submit" ]
                                               [ text "Build!" ]
                                     ]          
                          ]
                    , div [ class "column" ]
                          [ h2 [] [ text "Category One" ]
                          , buildFormField Input "c1_name" build.c1_name (Just validation.c1_name) C2Name
                          , buildFormField Input "c1_display_name" build.c1_display_name (Just validation.c1_display_name) C2DisplayName
                          , buildFormField Input "c1_model" build.c1_model (Just validation.c1_model) C2Model
                          , buildFormField Input "c1_icon" build.c1_icon (Just validation.c1_icon) C2Icon                          
                          , h2 [] [ text "Category Three" ]
                          , buildFormField Input "c3_name" build.c3_name (Just validation.c3_name) C6Name
                          , buildFormField Input "c3_display_name" build.c3_display_name (Just validation.c3_display_name) C6DisplayName
                          , buildFormField Input "c3_model" build.c3_model (Just validation.c3_model) C6Model
                          , buildFormField Input "c3_icon" build.c3_icon (Just validation.c3_icon) C6Icon                          
                          , h2 [] [ text "Category Five" ]
                          , buildFormField Input "c5_name" build.c5_name (Just validation.c5_name) C3Name
                          , buildFormField Input "c5_display_name" build.c5_display_name (Just validation.c5_display_name) C3DisplayName
                          , buildFormField Input "c5_model" build.c5_model (Just validation.c5_model) C3Model
                          , buildFormField Input "c5_icon" build.c5_icon (Just validation.c5_icon) C3Icon                
                          , h2 [] [ text "Category Seven" ]
                          , buildFormField Input "c7_name" build.c7_name (Just validation.c7_name) C7Name
                          , buildFormField Input "c7_display_name" build.c7_display_name (Just validation.c7_display_name) C7DisplayName
                          , buildFormField Input "c7_model" build.c7_model (Just validation.c7_model) C7Model
                          , buildFormField Input "c7_icon" build.c7_icon (Just validation.c7_icon) C7Icon
                          ]
                    ]
            ]
                    
              




buildFormField : FormType -> String -> String -> Maybe ValidationAlias -> BuildFormField -> Html Msg 
buildFormField form_type label_text field_value validation_value build_form =
  let
    form_class 
      = convertFormType form_type
  in
    div [ class form_class.field ]
        [ label [ class "label" ]
                [ text label_text ]
        , div [ class "control" ] 
              [ form_class.component [ class form_class.input, onInput <| SetBuildForm build_form, onBlur OnBlurCheckBuildFormValidation, value field_value ]
                      []
              ]
        , showValidation <| Maybe.withDefault noValidation <| validation_value             
        ]

              
              