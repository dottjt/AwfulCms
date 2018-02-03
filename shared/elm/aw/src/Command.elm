module Command exposing (..)

import Model exposing (..)
import Msg exposing (..)
import Helper.HttpHelper exposing (..)


-- Initial Request

fetchNewGrid : String -> Cmd Msg
fetchNewGrid route =
    httpGet
        ("http://localhost:4008/api/fetch_grid" ++ route)
        productAssocListDecoder
        FetchProductListFail
        FetchProductListSuccess


fetchSearchQuery : String -> String -> Cmd Msg
fetchSearchQuery route searchInput =
    httpGet
        ("http://localhost:4008/api/fetch_grid" ++ route ++ "/" ++ searchInput)
        -- Http.emptyBody
        -- (Http.jsonBody (searchInputEncoder searchInput))          
        productAssocListDecoder
        FetchProductListFail
        FetchProductListSuccess




-- New Fetch

-- fetchNewTagList : ProductTagList -> Cmd Msg
-- fetchNewTagList tag_list =
--     httpPost
--         ("http://localhost:4000/api/new_tag_list")
--         (Http.jsonBody (tagListEncoder tag_list))          
--         productAssocListDecoder
--         FetchNewTagFail
--         FetchNewTagSuccess




