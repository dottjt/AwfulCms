module Component.Products.EditComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelDataType exposing (..)

import DatePicker exposing (defaultSettings)

import Component.Products.FormComponent exposing (..)


editProductsComponent : (Model, String) -> Html Msg
editProductsComponent (model, itemId) =
    div []
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Edit Product" ]
              , div [ class "field" ]
                    [ label [ class "label" ]
                            [ text "Schedule date" ]
                    , (DatePicker.view model.date defaultSettings model.datePicker) |> Html.map ToDatePicker
                    ]              
              , div [ class "field" ]
                    [ label [ class "label" ]
                            [ text "Draft" ]
                    , input [ class "checkbox pDraft", onClick SetProductsCheckbox, type_ "checkbox", value "true" ]
                            []
                    ]
              , button [ onClick (ItemUpdate (ProductDataFormType model.productForm) itemId),  class "button is-primary", type_ "submit" ] 
                      [ text "Submit" ] 
              ]
        , newProductsFinderComponent model
        , productForm model model.productForm model.productFormValidation ]
