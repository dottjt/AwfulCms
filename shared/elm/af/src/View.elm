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

        AccessoriesRoute ->
            gridComponent model

        DressesSkirtsRoute ->
            gridComponent model

        ShirtsTopsRoute ->
            gridComponent model

        PantsShortsRoute ->
            gridComponent model
            
        SportsFunRoute ->
            gridComponent model

        FootwearRoute ->
            gridComponent model

        HeadwearRoute ->
            gridComponent model

        SexyRoute ->
            gridComponent model

        CoatsJacketsRoute ->
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
