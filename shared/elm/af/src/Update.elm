module Update exposing (..)

import Helper.FunctionHelper exposing (..)

import Model exposing (..)
import Msg exposing (..)
import Command exposing (..)

import Routing exposing (..)

-- import DoubleSlider exposing (..)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of

        ChangeSearchInput inputValue ->
            let
                route = model.route
            in
            { model | searchInput = inputValue } ! [fetchSearchQuery (parseRouteToStringCommand route) inputValue]

        -- NAVIGATION ROUTER
        OnLocationChange location ->
            let
                newRoute =
                    parseLocation location
            in
                case newRoute of 
                    IndexRoute ->
                        { model | categorySelection = Index, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    AccessoriesRoute ->
                        { model | categorySelection = Accessories, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]                        
                    DressesSkirtsRoute -> 
                        { model | categorySelection = DressesSkirts, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    ShirtsTopsRoute ->
                        { model | categorySelection = ShirtsTops, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    PantsShortsRoute ->
                        { model | categorySelection = PantsShorts, categorySelection = Accessories, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]                                        
                    SportsFunRoute ->        
                        { model | categorySelection = SportsFun, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    FootwearRoute ->        
                        { model | categorySelection = Footwear, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    HeadwearRoute ->        
                        { model | categorySelection = Headwear, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    SexyRoute ->        
                        { model | categorySelection = Sexy, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    CoatsJacketsRoute ->        
                        { model | categorySelection = CoatsJackets, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]

                    NotFoundRoute ->
                        { model | categorySelection = Index, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]


        ToggleQueryTag queryTag ->
            { model | queryTags = (processQueryTag model.queryTags queryTag) } ! [ fetchNewGrid ((parseRouteToStringCommand model.route) ++ model.combinedTagString ++ (processQueryTag model.queryTags queryTag) ) ]
                                                                                            -- get route                            -- get ?tag=                    -- hello+hello+goodbye
        -- INITIAL FETCH
        FetchProductListSuccess response ->
            { model | productList = response } ! []

        FetchProductListFail error -> 
            { model | error = toString error } ! []
        
        
        -- ADD/REMOVE TAG FETCH






        -- SliderMsg innerMsg ->
        --     let
        --         ( newSlider, cmd, updateResults ) =
        --             DoubleSlider.update innerMsg model slider

        --         newModel =
        --             { model | slider = newSlider }

        --         newCmd =
        --             if updateResults then
        --                 Cmd.batch [ Cmd.map SliderMsg cmd, otherCmd ]
        --             else
        --                 otherCmd
        --     in
        --         ( newModel, newCmd )

        -- ChangeCategory selection ->
        --     case selection of
        --         Accessories ->
        --             { model | categorySelection = Accessories } ! []
        --         DressesSkirts -> 
        --             { model | categorySelection = DressesSkirts } ! []
        --         ShirtsTops ->
        --             { model | categorySelection = ShirtsTops } ! []
        --         PantsShorts ->
        --             { model | categorySelection = PantsShorts } ! []
        --         SportsFun ->
        --             { model | categorySelection = SportsFun } ! []
        --         Footwear ->
        --             { model | categorySelection = Footwear } ! []