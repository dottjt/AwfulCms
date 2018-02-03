module Routing exposing (..)

import Model.ModelRouting exposing (..)

import Navigation exposing (Location)
import UrlParser exposing(..)



matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map IndexRoute top
        , map OverviewRoute (s "overview")
        , map BuildRoute (s "build")
        , map DevelopmentRoute (s "development")
        , map ConfigRoute (s "config")
        
        -- Websites Routes
        , map WebsiteRoute (s "websites" </> string)
        , map WebsiteNestedRoute (s "websites" </> string </> string </> string)
        , map WebsiteNestedRouteShowEdit (s "websites" </> string </> string </> string </> string)
        ]                                       --  "ac"      "product"   "new"


-- eventually we want to get parsePath to work (as opposed to parseHash)
-- I feel like it might have something to do with fixing matchers, like adding 
-- "products" to the beginning of it. But I don't know!
-- just because in elixir it's recieving "whaaaaa" which is the direct result of 
-- parsing the url. 
-- it might also be an issue with the elixir router. 


parseLocation : Location -> Route
parseLocation location =
    case (parseHash matchers location) of
        Just route ->
            route

        Nothing ->
            NotFoundRoute

