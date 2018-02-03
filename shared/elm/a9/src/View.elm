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

        HomeOfficeRoute ->
            gridComponent model

        TVRoute ->
            gridComponent model

        MusicRoute ->
            gridComponent model

        FashionRoute ->
            gridComponent model
            
        VideoGamesRoute ->
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
