module Helper.FunctionHelper exposing (..)


import Model exposing (..)
import String exposing (..)


-- used in filter component.
categoryToString : CategorySelection -> String 
categoryToString categorySelection =
    case categorySelection of
        Index ->
            ""
        Accessories ->
            "accessories"
        DressesSkirts ->
            "dresses-skirts"
        ShirtsTops ->
            "shirts-tops"           
        PantsShorts ->
            "pants-shorts"
        SportsFun ->
            "sports-fun"
        Footwear ->
            "footwear"
        Headwear ->
            "headwear"
        Sexy ->
            "sexy"
        CoatsJackets ->
            "coats-jackets"


-- used in update OnLocationChange
stringToCategory : String -> CategorySelection 
stringToCategory stringRoute =
    case stringRoute of 
        "accessories" ->
            Accessories
        "dresses-skirts" ->
            DressesSkirts
        "shirts-tops" ->
            ShirtsTops
        "pants-shorts" ->
            PantsShorts
        "sports-fun" ->
            SportsFun
        "footwear" ->
            Footwear
        "headwear" ->
            Headwear
        "sexy" ->
            Sexy
        "coats-jackets" ->
            CoatsJackets
        _ ->
            Accessories


-- parseRouteToCategorySelection : Route -> CategorySelection
-- parseRouteToCategorySelection route =
--     case route of 
--         CategoryRoute string ->
--             stringToCategory string
--         _ -> 
--             Accessories

-- used for navigation
parseRouteToString : Route -> String 
parseRouteToString route =
    case route of
        -- this results to newest
        IndexRoute ->
            ""
        AccessoriesRoute ->
            "/accessories"
        DressesSkirtsRoute ->
            "/dresses-skirts"
        ShirtsTopsRoute ->
            "/shirts-tops"
        PantsShortsRoute ->
            "/pants-shorts"
        SportsFunRoute ->
            "/sports-fun"
        FootwearRoute ->
            "/footwear"
        HeadwearRoute ->
            "/headwear"
        SexyRoute ->
            "/sexy"
        CoatsJacketsRoute ->
            "/coats-jackets"
            
        NotFoundRoute ->
            "/whaaaaaa"


-- basically, give index a proper index. 
parseRouteToStringCommand : Route -> String 
parseRouteToStringCommand route =
    case route of
        -- this results to newest
        IndexRoute ->
            "/index"
        AccessoriesRoute ->
            "/accessories"
        DressesSkirtsRoute ->
            "/dresses-skirts"
        ShirtsTopsRoute ->
            "/shirts-tops"
        PantsShortsRoute ->
            "/pants-shorts"
        SportsFunRoute ->
            "/sports-fun"
        FootwearRoute ->
            "/footwear"
        HeadwearRoute ->
            "/headwear"
        SexyRoute ->
            "/sexy"
        CoatsJacketsRoute ->
            "/coats-jackets"
            
        NotFoundRoute ->
            "/whaaaaaa"



-- used for navigation
parseRouteToCategorySelection : Route -> CategorySelection 
parseRouteToCategorySelection route =
    case route of
        -- this results to newest
        IndexRoute ->
            Index
        AccessoriesRoute ->
            Accessories
        DressesSkirtsRoute ->
            DressesSkirts
        ShirtsTopsRoute ->
            ShirtsTops
        PantsShortsRoute ->
            PantsShorts
        SportsFunRoute ->
            SportsFun
        FootwearRoute ->
            Footwear    
        HeadwearRoute ->
            Headwear
        SexyRoute ->
            Sexy
        CoatsJacketsRoute ->
            CoatsJackets
            
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
        