module Routing exposing (..)

import Navigation exposing (Location)
import Model exposing (..)
import UrlParser exposing(..)



matchers : Parser (Route -> a) a
matchers =
    oneOf
        [ map IndexRoute top
        , map HomeRoute (s "home")
        , map ToysRoute (s "toys") 
        , map SportsOutdoorsRoute (s "sports-outdoors") 
        , map FashionRoute (s "fashion") 
        , map FoodRoute (s "food") 
        , map TVRoute (s "tv") 
        , map VideoGamesRoute (s "video-games") 
        ]

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

