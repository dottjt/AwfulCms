module Component.GridComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.Aria exposing (..)

import Msg exposing (..)
import Model exposing (..)

import Component.FilterComponent exposing (..)
import Component.SearchComponent exposing (..)


gridComponent : Model -> Html Msg
gridComponent model =
    div [ class "grid__container full_width__container" ]
        [ searchComponent model
        , div [ class "grid__bottom__container"]
              [ filterComponent model
              , enumOuter model.productList
              ]
        ]


enumOuter : ProductAssocList -> Html Msg
enumOuter productList =
    div [ class "enum__outer" ]
        (List.map enumInner productList) 


enumInner : ProductAssoc -> Html Msg 
enumInner product =
    div [ class "grid__inner product__inner" ]
        [ div [ class "left-right-container" ]
            [ enumLeft product
            , enumRight product
            ]
        , div [ class "bottom-bar" ]
            []
        ]


enumLeft : ProductAssoc -> Html Msg 
enumLeft product =
    div [ class "product__left grid__left" ]
        [ div [ class "image__container", target "_blank" ]
            [ img [ class "image", src product.featured_image ] []
            ]
        , a [ class "price__container", href product.url ]
            [ div [ class "price" ]
                [ h3 []
                    [ text ("$" ++ (toString product.price)) ]
                , h6 []
                    [ text product.url_text ]
                ]
            ]
        ]


enumRight : ProductAssoc -> Html Msg 
enumRight product =
    div [ class "product__right grid__right" ]
        [ enumTopRight product
        , enumBottomRight product product.category
      ]


enumTopRight : ProductAssoc -> Html Msg 
enumTopRight product =
    div [ class "product__top-right grid__top-right" ]
        [ a [ class "title__container", href ("/gifts/" ++ product.name) ]
            [ h2 [ class "title" ]
                [ text product.display_name ]
            ]
        , div [ class "cta__container" ]
            [ a [ href "", target "_blank" ] -- for when click on save button!
                [ h3 [ class "cta" ]
                  [ text product.cta ]
                ]
            ]
        ]


enumBottomRight : ProductAssoc -> ProductCategory -> Html Msg 
enumBottomRight product category =
    div [ class "product__bottom-right grid__bottom-right" ]
        [ div [ class "description__container" ]
              [ p [ class "description" ]
                  [ text (product.description) ]
              ]
        , h5 [ class "social_media_share" ]
             [ text "share me!" ]
        , socialMediaComponent
        , p [ class "likes" ]               -- this needs to be product.category.icon "fa " ++ product.category.icon
            [ i [ class ("fa" ++ category.icon ++ " category__icon"), ariaHidden True ]
                []
            , span [ class "like_total" ] 
                   [ text (toString product.product_like.total)]
            , span [ class "like_saves" ] 
                   [ text "saves." ]
            , span [ class "like_product_id", style [ ( "visibility", "hidden" ) ] ] 
                   [ text product.id ]
            ]
        ]


socialMediaComponent : Html Msg  
socialMediaComponent =
    div [ class "social__media" ]
        [ a [ class "social__item", href "https://facebook.com/awfulchristmas" ]
            [ i [ class "fa fa-facebook-square", ariaHidden True, style [ ( "color", "#3b5998" ) ] ]
                []
            ]
        , a [ class "social__item", href "https://twitter.com/awfulchristmas" ]
            [ i [ class "fa fa-twitter-square", ariaHidden True, style [ ( "color", "#1dcaff" ) ] ]
                []
            ]
        , a [ class "social__item", href "https://instagram.com/awfulchristmas" ]
            [ i [ class "fa fa-instagram", ariaHidden True, style [ ( "color", "#8a3ab9" ) ] ]
                []
            ]
        , a [ class "social__item", href "https://pintrest.com/awfulchristmas" ]
            [ i [ class "fa fa-pinterest-square", ariaHidden True, style [ ( "color", "#cb2027" ) ] ]
                []
            ]
        , a [ class "social__item", href "" ]
            [ i [ class "fa fa-reddit-square", ariaHidden True, style [ ( "color", "#000000" ) ] ]
                []
            ]
        ]