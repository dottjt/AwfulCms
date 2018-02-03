module View exposing (..)

import Html exposing (..)

import Model exposing (..)
import Msg exposing (..)

import Component.GridComponent exposing (..)
-- import Component.SidebarComponent exposing (..)    

page : Model -> Html Msg
page model =
    case model.route of            
        IndexRoute ->
            gridComponent model 

        HomeRoute ->
            gridComponent model

        SportsOutdoorsRoute ->
            gridComponent model

        FashionRoute ->
            gridComponent model
            
        FoodRoute ->
            gridComponent model

        ToysRoute ->
            gridComponent model

        NotFoundRoute ->
            notFoundView


-- viewGrid : Model -> Html Msg
-- viewGrid model =
--     div [] 
--         [ (gridComponent model)
--         -- , (sidebarComponent model)
--         ]


notFoundView : Html msg
notFoundView =
    div []
        [ text "Not found"
        ]
