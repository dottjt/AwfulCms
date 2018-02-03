module Component.Posts.FormComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelValidation exposing (..)

import Helper.FormHelper exposing (..)
import Helper.DropdownHelper exposing (..)
import Helper.TableHelper exposing (..)


tagTable : Model -> Html Msg
tagTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["Tag", "Products", "Posts"]
          , tbody []
                  (List.map tagRow model.tagAssocList)
          ]


tagRow : TagAssoc -> Html Msg
tagRow tag =
    tr []
      [ td [ align "middle" ]
           [ text tag.display_name ]
      , td [ align "middle" ]
           [ text (toString (List.length tag.products)) ]
      , td [ align "middle" ]
           [ text (toString (List.length tag.posts)) ]
      ]


postForm : Model -> PostForm -> PostFormValidation -> Html Msg
postForm model post validation =
    div [ class "columns" ]
        [ div [ class "column" ]
              [ postFormField Input "Display Name" post.display_name (Just validation.display_name) PostFormDisplayName
              , postFormField TextArea "Excerpt" post.excerpt (Just validation.excerpt) PostFormExcerpt 
              , postFormField Number "Featured Image" post.featured_image (Just validation.featured_image) PostFormFeaturedImage
              ]
        , div [ class "column" ]
              [ div [ class "field" ]
                    [ label [ class "label" ]
                            [ text "Post Type" ]
                    , div [ class "control" ]
                          [ postTypeDropdown model.postTypeDropdownList ]
                    ]
              , div [ class "field field-category" ]
                    [ label [ class "label" ]
                            [ text "Tag" ] 
                    , tagDropdown model.tagAssocList
                    ]
              -- , postFormField Input "Author" post.author (Just validation.author) PostFormAuthor                                  
              , postFormField Number "Product Limit" (post.product_limit |> Maybe.withDefault 0 |> toString) Nothing PostFormProductLimit
              , postFormField Number "Product Offset" (post.product_offset |> Maybe.withDefault 0 |> toString) Nothing PostFormProductOffset
              ]
        ]





postFormField : FormType -> String -> String -> Maybe ValidationAlias -> PostFormField -> Html Msg 
postFormField form_type label_text field_value validation_value post_form = 
    let 
      form_class 
        = convertFormType form_type
    in
    div [ class form_class.field ]
        [ label [ class "label" ]
                [ text label_text ]
        , div [ class "control" ] 
              [ form_class.component [ class form_class.input, onInput <| SetPostsField post_form, onBlur OnBlurCheckPostFormValidation, value field_value ]
                      []
              ]
        , showValidation <| Maybe.withDefault noValidation <| validation_value            
        ]