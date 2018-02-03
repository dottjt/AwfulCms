module Component.Products.ShowComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelProduct exposing (..)

import Helper.FormHelper exposing (..)


showProductsComponent : (Model, String) -> Html Msg
showProductsComponent (model, itemId) =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Show Post" ]
              ] 
        , showComponent model.individualProduct
        ]


showComponent : ProductAssoc -> Html Msg 
showComponent product =
    ul [] 
       [ showListItem "id" product.id
       , showListItem "name" product.name
       , showListItem "display_name" product.display_name
       , showListItem "description" product.description
       , showListItem "blog_description" product.blog_description
       , showListItem "featured_image" product.featured_image
       -- , showListItem "draft" product.draft
       , showListItem "cta" product.cta
       , showListItem "price" (toString product.price)
       , showListItem "product_type" product.product_type
       , showListItem "url" product.url
       , showListItem "url_text" product.url_text
       , showListItem "inserted_at" product.inserted_at
       , showListItem "category" product.category.display_name
       -- , showListItem "product_tags" product.product_tags
       -- , showListItem "product_like" product.product_like
       ]
      