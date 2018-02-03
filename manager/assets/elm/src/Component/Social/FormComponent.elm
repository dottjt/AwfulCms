module Component.Social.FormComponent exposing (..)

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
import Helper.DropdownHelper exposing (..)


productTable : Model -> Html Msg
productTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["Product", "Created", "Filled?", "Fill"]
          , tbody []
                  (List.map productTableRow model.productAssocList)
          ]
 

productTableRow : ProductAssoc -> Html Msg
productTableRow product =
    tr []
       [ td []
            [ text product.display_name ]
       , td []
            [ text product.inserted_at ]
       , td []
            [ div [ class "prefillSocialMedia", onClick (PrefilSocialMediaForm product) ]
                  [ text "Fill Me" ]
            ]
       ]

socialForm : Model -> SocialForm -> SocialFormValidation -> Html Msg
socialForm model socialForm socialFormValidation =
    div [ class "columns" ]
        [ div [ class "column" ]
              [ socialFormField Input "Display Name" socialForm.display_name (Just socialFormValidation.display_name) SocialFormDisplayName
              , socialFormField TextArea "Description" socialForm.description (Just socialFormValidation.description) SocialFormDescription
              , socialFormField TextArea "Tags" socialForm.tags (Just socialFormValidation.tags) SocialFormTags
              ]
        , div [ class "column" ]
              [ socialFormDropdown model.socialMediaTypeDropdownList
              , socialFormField Input "Featured Image" socialForm.featured_image (Just socialFormValidation.featured_image) SocialFormFeaturedImage
              , socialFormField Input "URL" socialForm.url (Just socialFormValidation.url) SocialFormUrl
              , socialFormField Input "Image Caption" socialForm.image_caption (Just socialFormValidation.image_caption) SocialFormImageCaption
              , socialFormField Input "Facebook Code" socialForm.facebook_code Nothing SocialFormFacebookCode              
              ]
        ]




socialFormField : FormType -> String -> String -> Maybe ValidationAlias -> SocialFormField -> Html Msg 
socialFormField form_type label_text field_value validation_value social_form =
  let
    form_class 
      = convertFormType form_type
  in
    div [ class form_class.field ]
        [ label [ class "label" ]
                [ text label_text ]
        , div [ class "control" ] 
              [ form_class.component [ class form_class.input, onInput <| SetSocialField social_form, onBlur OnBlurCheckSocialFormValidation, value field_value ]
                      []
              ]
        , showValidation <| Maybe.withDefault noValidation <| validation_value             
        ]

                  