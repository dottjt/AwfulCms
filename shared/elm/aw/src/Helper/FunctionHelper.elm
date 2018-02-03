module Helper.FunctionHelper exposing (..)


import Model exposing (..)
import String exposing (..)


-- used in filter component.
categoryToString : CategorySelection -> String 
categoryToString categorySelection =
    case categorySelection of
        Index ->
            ""
        HomeOffice ->
            "home-office"
        Beauty ->
            "beauty"
        SportsOutdoors ->
            "sports-outdoors"           
        Fashion ->
            "fashion"
        Food ->
            "food"
        WTF ->
            "wtf"



-- used in update OnLocationChange
stringToCategory : String -> CategorySelection 
stringToCategory stringRoute =
    case stringRoute of 
        "home-office" ->
            HomeOffice
        "beauty" ->
            Beauty
        "sports-outdoors" ->
            SportsOutdoors
        "fashion" ->
            Fashion
        "food" ->
            Food
        "wtf" ->
            WTF
        _ ->
            HomeOffice


-- parseRouteToCategorySelection : Route -> CategorySelection
-- parseRouteToCategorySelection route =
--     case route of 
--         CategoryRoute string ->
--             stringToCategory string
--         _ -> 
--             HomeOffice

-- used for navigation
parseRouteToString : Route -> String 
parseRouteToString route =
    case route of
        -- this results to newest
        IndexRoute ->
            ""
        HomeOfficeRoute ->
            "/home-office"
        BeautyRoute ->
            "/beauty"
        SportsOutdoorsRoute ->
            "/sports-outdoors"
        FashionRoute ->
            "/fashion"
        FoodRoute ->
            "/food"
        WTFRoute ->
            "/wtf"
        NotFoundRoute ->
            "/whaaaaaa"


-- basically, give index a proper index. 
parseRouteToStringCommand : Route -> String 
parseRouteToStringCommand route =
    case route of
        -- this results to newest
        IndexRoute ->
            "/index"
        HomeOfficeRoute ->
            "/home-office"
        BeautyRoute ->
            "/beauty"
        SportsOutdoorsRoute ->
            "/sports-outdoors"
        FashionRoute ->
            "/fashion"
        FoodRoute ->
            "/food"
        WTFRoute ->
            "/wtf"
        NotFoundRoute ->
            "/whaaaaaa"



-- used for navigation
parseRouteToCategorySelection : Route -> CategorySelection 
parseRouteToCategorySelection route =
    case route of
        -- this results to newest
        IndexRoute ->
            Index
        HomeOfficeRoute ->
            HomeOffice
        BeautyRoute ->
            Beauty
        SportsOutdoorsRoute ->
            SportsOutdoors
        FashionRoute ->
            Fashion
        FoodRoute ->
            Food
        WTFRoute ->
            WTF    
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
        