module Component.SearchComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)
import Model exposing (..)


-- SEARCH VIEW


searchComponent : Model -> Html Msg
searchComponent model =
    div [ class "grid__search__container"]
        [ div [ class "search__logo"]
              [ img [ src "/images/ach/ACH.svg" ]
                    [ ]
              ]
        , div [ class "search__title__container" ] 
              [ h4 [ class "search__title" ] 
                   [ text "search. for. product. or. tag." ]
              ]
          , searchInput model.searchInput
          , popularQueries model.popularQueries
        ]


searchInput : String -> Html Msg 
searchInput searchInput =
    div [ class "field search__input__container" ] 
        [ label [ class "label" ] []
        , div [ class "control" ]
              [ input [ class "input search__input", type_ "text", placeholder "", value searchInput, onInput ChangeSearchInput ] []
              ]
        ]


-- POPULAR QUERIES

popularQueries : (List String) -> Html Msg
popularQueries popularQueries =  
    div [ class "popular__queries__container" ]
        [ -- h5  [ class "popular__queries__title" ]
          --    [ text "popular tags" ]
          div [ class "popular__queries__container__text" ]
              (List.map popularQueryText popularQueries)
        ]

popularQueryText : String -> Html Msg 
popularQueryText popularQuery =
    a [ class "popular__queries__text is-link", onClick (ChangeSearchInput popularQuery) ] [ text popularQuery ]

