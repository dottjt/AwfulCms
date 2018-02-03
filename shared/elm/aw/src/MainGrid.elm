module MainGrid exposing (..)

import Helper.FunctionHelper exposing (..)

import Model exposing (..)
import Msg exposing (..)
import View exposing (..)
import Update exposing (..)
import Command exposing (..)
import Routing exposing (..)

import Navigation exposing (..)

-- import DoubleSlider exposing (..)

main : Program Never Model Msg
main =
    Navigation.program OnLocationChange
        { init = init
        , view = page
        , update = update
        , subscriptions = subscriptions
        } 


init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            parseLocation location
    in
        ( initialModel currentRoute, fetchNewGrid (parseRouteToStringCommand currentRoute) ) 



initialModel : Route -> Model
initialModel route =
    { productList = []

    -- All Categories/Sub/Tags
    , categories = []
    , subCategories = []
    , tags = []
    
    -- , gridSelection = parseRouteToGridSelection route
    , categorySelection = parseRouteToCategorySelection route
    , searchInput = ""
    , popularQueries = ["under $20", "women", "men", "children"]

    -- Grid Queries
    -- , queryCategory = ""
    -- , querySubCategory = ""
    -- , queryType = flag.type_query_value
    
    -- Search Query 
    -- , querySearchInput = "" 

    , queryTags = "men+women+elephant"
    , combinedTagString = "?tags="
    
    , combinedQueryString = ""

    -- Query 


    -- , slider =
    --     init
    --         { min = 50
    --         , max = 5000
    --         , step = 50
    --         , lowValue = 50
    --         , highValue = 5000
    --         }
    -- Errors 
    , error = ""

    , route = route
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.none
    
    -- Sub.map SliderMsg <|
    --         DoubleSlider.subscriptions model.slider



