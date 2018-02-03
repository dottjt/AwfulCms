module Component.Products.FormComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelValidation exposing (..)

import Component.MultiSelect exposing (..)

import Helper.FormHelper exposing (..)
import Helper.DropdownHelper exposing (..)

-- import MultiSelect


newProductsFinderComponent : Model -> Html Msg
newProductsFinderComponent model =
    div [ class "product__finder__container margin-bottom-2rem" ]
        [ div [ class "field has-addons" ]
              [ div [ class "control" ]
                    [ input [ class "input", type_ "text", onInput OnProductFinderInput, onBlur OnBlurCheckProductFormValidation, value model.productFinderInput, placeholder "B0143RT8OY" ]
                            []
                    ]
              , div [ class "control" ]
                    [ button [ class "button is-primary", onClick PrefilNewProduct ]
                              [ text "search!" ]
                    ]
              ]        
        , div [ class "field" ]
              [ categoryDropdown model.productForm model.categoryList
              ]
        , div [ class "field" ]
              [ multiSelect (multiSelectOptions model) [ class "no-classsssssss" ] model.multiSelectTagIdSelected
              ]              
        , div [ class "field" ]
              [ productTypeDropdown model.productForm model.productTypeDropdownList
              ]
                   
        ]


productForm : Model -> ProductForm -> ProductFormValidation -> Html Msg
productForm model product validation =
    div []
        [ div [ class "columns" ]
              [ div [ class "column" ]
                    [ div [ class "success" ] [] 
                    , productFormField TextArea "Display Name" product.display_name (Just validation.display_name) ProductFormDisplayName model.productFormDisplayNameCount
                    , productFormField TextArea "Description" product.description (Just validation.description) ProductFormDescription model.productFormDescriptionCount
                    , productFormField TextArea "Blog Description" product.blog_description (Just validation.blog_description) ProductFormBlogDescription model.productFormBlogDescriptionCount
                    ] 
              , div [ class "column" ]
                    [ productFormField Input "Original Featured Image" product.original_featured_image Nothing ProductFormOriginalFeaturedImage Nothing
                    , productFormField Input "Featured Image" product.featured_image (Just validation.featured_image) ProductFormFeaturedImage Nothing                    
                    , productFormField Input "URL" product.url (Just validation.url) ProductFormUrl Nothing
                    , productFormField Number "Price" (toString product.price) (Just validation.price) ProductFormPrice Nothing
                    , productFormField Input "Cta" product.cta (Just validation.cta) ProductFormCta Nothing
                    , productFormField Number "Product Like Total" (toString product.product_like) (Just validation.product_like) ProductFormLikeTotal Nothing
                    ]
              ]
        ]


                  
productFormField : FormType -> String -> String -> Maybe ValidationAlias -> ProductFormField -> Maybe Int -> Html Msg 
productFormField form_type label_text field_value validation_value product_form count =
  let
    form_class 
      = convertFormType form_type
  in
    div [ class form_class.field ]
        [ label [ class "label" ]
                [ text label_text ]
        , productCount count
        , div [ class "control" ] 
              [ form_class.component [ class form_class.input, onInput <| SetProductsField product_form, onBlur OnBlurCheckProductFormValidation, value field_value  ]
                                     []
              ]
        , showValidation <| Maybe.withDefault noValidation <| validation_value            
        ]


productCount : Maybe Int -> Html Msg 
productCount count = 
  case count of  
    Just int ->
      let 
        color = isNumberNegative int
      in 
        p [ style [ ("color", color) ] ] [ text <| "count: " ++ (toString int) ]

    Nothing ->
      span [] []

isNumberNegative : Int -> String
isNumberNegative int = 
  if int > 0 then
    "#23d160"
  else 
    "#ff3860"



multiSelectOptions : Model -> Component.MultiSelect.Options Msg
multiSelectOptions model =
    let
        defaultOptions =
            Component.MultiSelect.defaultOptions MultiSelectChanged
    in
        { defaultOptions | items = model.multiSelectTagIdList
        }
                