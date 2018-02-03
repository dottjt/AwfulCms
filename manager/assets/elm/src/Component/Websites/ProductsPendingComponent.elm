module Component.Websites.ProductsPendingComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


import Msg exposing (..)
import Model exposing (..)
import Model.ModelProduct exposing (..)

productsPendingComponent : Model -> Html Msg
productsPendingComponent model =
    div [] 
        [ h2 [] [ text "Products Pending" ]
        , productsPendingTable model 
        ]


productsPendingTable : Model -> Html Msg
productsPendingTable model =
    table [ class "table" ]
          [ thead []
                  [ tr []
                      [ th []
                            [ text "Product" ]
                      , th []
                            [ text "Schedule Date" ]
                      , th []
                            [ text "Edit" ]
                      ]
                  ]
          , tbody []
                  (List.map productsPendingRow model.productsPendingList)
          ]


productsPendingRow : Product -> Html Msg
productsPendingRow productPending =
    tr []
       [ td []
            [ text productPending.name ]
       , td []
            [ text productPending.schedule_date ]
       , td []
            [ span []
                   [ ]
            ]
        ]


-- when clicking edit it prepopulates a product field with stuff. 