module Helper.FunctionHelper exposing (..)


import Model exposing (..)
import String exposing (..)


-- used in filter component.
categoryToString : CategorySelection -> String 
categoryToString categorySelection =
    case categorySelection of
        Index ->
            ""
        Home ->
            "home"
        Toys ->
            "toys"
        SportsOutdoors ->
            "sports-outdoors"           
        Fashion ->
            "fashion"
        Food ->
            "food"
        TV ->
            "tv"
        VideoGames ->
            "video-games"



-- used in update OnLocationChange
stringToCategory : String -> CategorySelection 
stringToCategory stringRoute =
    case stringRoute of 
        "home" ->
            Home
        "toys" ->
            Toys
        "sports-outdoors" ->
            SportsOutdoors
        "fashion" ->
            Fashion
        "food" ->
            Food
        "tv" ->
            TV
        "video-games" ->
            VideoGames

        _ ->
            Home


-- parseRouteToCategorySelection : Route -> CategorySelection
-- parseRouteToCategorySelection route =
--     case route of 
--         CategoryRoute string ->
--             stringToCategory string
--         _ -> 
--             Home

-- used for navigation
parseRouteToString : Route -> String 
parseRouteToString route =
    case route of
        -- this results to newest
        IndexRoute ->
            ""
        HomeRoute ->
            "/home"
        ToysRoute ->
            "/toys"
        SportsOutdoorsRoute ->
            "/sports-outdoors"
        FashionRoute ->
            "/fashion"
        FoodRoute ->
            "/food"
        TVRoute ->
            "/tv"
        VideoGamesRoute ->
            "/video-games"
            
        NotFoundRoute ->
            "/whaaaaaa"


-- basically, give index a proper index. 
parseRouteToStringCommand : Route -> String 
parseRouteToStringCommand route =
    case route of
        -- this results to newest
        IndexRoute ->
            "/index"
        HomeRoute ->
            "/home"
        ToysRoute ->
            "/toys"
        SportsOutdoorsRoute ->
            "/sports-outdoors"
        FashionRoute ->
            "/fashion"
        FoodRoute ->
            "/food"
        TVRoute ->
            "/tv"
        VideoGamesRoute ->
            "/video-games"            
        NotFoundRoute ->
            "/whaaaaaa"



-- used for navigation
parseRouteToCategorySelection : Route -> CategorySelection 
parseRouteToCategorySelection route =
    case route of
        -- this results to newest
        IndexRoute ->
            Index
        HomeRoute ->
            Home
        ToysRoute ->
            Toys
        SportsOutdoorsRoute ->
            SportsOutdoors
        FashionRoute ->
            Fashion
        FoodRoute ->
            Food
        TVRoute ->
            TV    
        VideoGamesRoute ->
            VideoGames                
        NotFoundRoute ->
            Index




processQueryTag : String -> String -> String 
processQueryTag queryTags queryTag =
    let 
        containsQueryTag = contains queryTag queryTags
        containsQueryTagPlus = contains ("+" ++ queryTag) queryTags
    in
        if containsQueryTagPlus then
             replace ("+" ++ queryTag) "" queryTags
        else if containsQueryTag then
             replace queryTag "" queryTags
        else
            addQueryString queryTags queryTag


addQueryString : String -> String -> String  
addQueryString queryTags queryTag =
    let 
        queryTagsLengthMoreThan = length queryTags > 0
    in
    if queryTagsLengthMoreThan then
        queryTags ++ "+" ++ queryTag
    else 
        queryTags ++ queryTag 


replace : String -> String -> String -> String
replace from to str =
    String.split from str
        |> String.join to
        