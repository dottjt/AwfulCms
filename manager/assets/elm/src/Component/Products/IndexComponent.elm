module Component.Products.IndexComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelDataType exposing (..)

import Helper.ConvertHelper exposing (..)
import Helper.TableHelper exposing (..)
 


indexProductsComponent : Model -> Html Msg
indexProductsComponent model =
    div []
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Products Index" ]
              ]
        , indexProductsTable model
        ]


indexProductsTable : Model -> Html Msg
indexProductsTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["display_name", "category", "show", "edit", "delete"]
          , tbody []
                  (List.map (indexProductsRow model.routeAcronym model.routeType model.routeAction) model.productAssocList)
          ]


indexProductsRow : String -> String -> String -> ProductAssoc -> Html Msg
indexProductsRow acronym websiteType websiteAction productAssoc =
    tr []
       [ td [ align "middle" ]
            [ text productAssoc.display_name ]
       , td [ align "middle" ]
            [ text productAssoc.category.name ]
      --  , td [ align "middle" ]
      --      [ text productAssoc.product_tags.name ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/show/" ++ productAssoc.id), onClick (PopulateIndividual (ProductDataViewType productAssoc)) ] 
                [ text "show"]
            ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/edit/" ++ productAssoc.id), onClick <| PopulateForm (ProductDataFormType <| productAssocToProductForm productAssoc) ]
                [ text "edit"]
            ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/index"), onClick (ItemDelete "products" productAssoc.id) ]
                [ text "delete" ]
            ]
       ]
