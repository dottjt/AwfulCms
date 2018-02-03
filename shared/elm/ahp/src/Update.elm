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
                    HomeOfficeRoute ->
                        { model | categorySelection = HomeOffice, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]                        
                    ToysRoute -> 
                        { model | categorySelection = Toys, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    TVRoute ->
                        { model | categorySelection = TV, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    VideoGamesRoute ->
                        { model | categorySelection = VideoGames, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]
                    FashionRoute ->
                        { model | categorySelection = Fashion, categorySelection = HomeOffice, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]                                        
                    CollectionRoute ->        
                        { model | categorySelection = Collection, route = newRoute } ! [ fetchNewGrid (parseRouteToStringCommand newRoute) ]

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
        --         HomeOffice ->
        --             { model | categorySelection = HomeOffice } ! []
        --         Toys -> 
        --             { model | categorySelection = Toys } ! []
        --         TV ->
        --             { model | categorySelection = TV } ! []
        --         Fashion ->
        --             { model | categorySelection = Fashion } ! []
        --         Toys ->
        --             { model | categorySelection = Toys } ! []
        --         Collection ->
        --             { model | categorySelection = Collection } ! []