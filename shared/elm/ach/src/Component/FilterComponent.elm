module Component.FilterComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.Aria exposing (..)

import Helper.FunctionHelper exposing (..)

import Msg exposing (..)
import Model exposing (..)



-- import DoubleSlider exposing (view)

filterComponent : Model -> Html Msg 
filterComponent model =
    div [ class "filter__container"] 
        [ categoryComponent model
        -- , tagComponent model
        -- , view model.slider |> Html.map SliderMsg
        -- , customComponent model
        ]



categoryComponent : Model -> Html Msg 
categoryComponent model =
    div [ class "category__filter__container" ]
        [ div [ class "category__outer" ]
              [ category (model.categorySelection == Index) "All Products" Index "fae-sofa"
              , category (model.categorySelection == Home) "Home" Home "fa-fort-awesome"
              , category (model.categorySelection == Toys) "Awesome Dork" Toys "fae-planet"
              , category (model.categorySelection == SportsOutdoors) "Sports & Outdoors" SportsOutdoors "fae-sun-cloud"
              , category (model.categorySelection == Fashion) "Fashion" Fashion "fae-shirt"
              , category (model.categorySelection == Food) "Food" Food "fae-pizza"
              , category (model.categorySelection == VideoGames) "VideoGames" VideoGames "fae-playstation"
              , category (model.categorySelection == TV) "TV" TV "fa-bomb"
              ]
        ]

category : Bool -> String -> CategorySelection -> String -> Html Msg 
category isChecked displayName categoryType categoryIcon =
    case isChecked of 
        True ->
            a [ class "category checked", href ("#" ++ (categoryToString categoryType) ) ]
                [ div [ class "category__icon" ]
                        [ i [ class ("fa " ++ categoryIcon), ariaHidden True ]
                            []
                        ]
                , h6 [ class "category__name" ]
                    [ text displayName ] 
                ]
        False ->
            a [ class "category unchecked", href ("#" ++ (categoryToString categoryType) ) ]
                [ div [ class "category__icon" ]
                        [ i [ class ("fa " ++ categoryIcon), ariaHidden True ]
                            []
                        ]
                , h6 [ class "category__name" ]
                    [ text displayName ] 
                ]



-- selectionComponent : Model -> Html Msg 
-- selectionComponent model =
--     div [ class "selection__container"]
--         [ div [ class "filter__title__container" ]
--               [ h4 [ class "title" ] 
--                    [ text "filter awful." ]  
--               ]
--         , div [ class "selection__outer" ]
--               [ selection (model.gridSelection == Newest) "#newest" "Newest"
--               , selection (model.gridSelection == Popular) "#popular" "Popular"
--               , selection (model.gridSelection == UnderTwenty) "#under-twenty" "Under $20"
--               , selectionCategory (model.gridSelection == Category) "#category/home-office" "Category"
--               ]
--         ] 


-- selection : Bool -> String -> String -> Html Msg 
-- selection isChecked selectionUrl selectionText =
--     case isChecked of
--       True ->
--         a [ class "selection checked", href selectionUrl] 
--           [ h5 []
--               [ text selectionText ]
--           ]
--       False -> 
--         a [ class "selection unchecked", href selectionUrl] 
--           [ h5 []
--               [ text selectionText ]
--           ]


-- selectionCategory : Bool -> String -> String -> Html Msg 
-- selectionCategory isChecked selectionUrl selectionText =
--     case isChecked of
--       True ->
--         a [ class "selection checked", href selectionUrl] 
--           [ h5 []
--               [ text selectionText ]
--           , div [ class "selection__category__icon" ]
--                 [ i [ class "fa fa-chevron-down", ariaHidden True ]
--                     []
--                 ]
--           ]
--       False -> 
--         a [ class "selection unchecked", href selectionUrl] 
--           [ h5 []
--               [ text selectionText ]
--           , div [ class "selection__category__icon" ]
--                 [ i [ class "fa fa-chevron-down", ariaHidden True ]
--                     []
--                 ]
--           ]

-- customComponent : Model -> Html Msg 
-- customComponent model =
--   case model.gridSelection of 
--     Category ->
--       categoryComponent model
--     _ ->
--       div [] []


-- tagComponent : Model -> Html Msg
-- tagComponent model =
--     div [ class "filter__tag"]
--         [ div [ class "tag__container"]
--               [ a [ class "tag", onClick (ToggleQueryTag "men")]
--                   [ h5 []
--                       [ text "Men" ]
--                   ]
--               , a [ class "tag", onClick (ToggleQueryTag "women")]
--                   [ h5 []
--                       [ text "Women" ]
--                   ]
--               , a [ class "tag", onClick (ToggleQueryTag "under-twenty")]
--                   [ h5 []
--                       [ text "Under $20" ]
--                   ]
--               , a [ class "tag selection-last", onClick (ToggleQueryTag "men")]
--                   [ h5 []
--                       [ text "Category" ]
--                   ]
--               ]
--         ]

-- rangeComponent : Model -> Html Msg 
-- rangeComponent model =


-- CustomFilter Components
