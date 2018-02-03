module View exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Model exposing (..)
import Model.ModelRouting exposing (..)
import Msg exposing (..)

import Component.NavbarComponent exposing (..)
import Component.KeyboardHelperComponent exposing (..)
import Component.ConsoleComponent exposing (..)

import Component.Main.DevelopmentComponent exposing (..)
import Component.Main.BuildComponent exposing (..)
import Component.Main.OverviewComponent exposing (..)
import Component.Main.ConfigComponent exposing (..)

import Component.Websites.MainComponent exposing (..)


view : Model -> Html Msg
view model =
    div [ class "view__container" ]
        [ showKeyboardHelper model 
        , div [ class "top__container" ]
              [ navbarComponent model ]
        , div [ class "bottom__container" ] 
              [ div [ class "bottom__left__container" ]
                    [ 
                      mainModule model
                    ]
              , consoleComponent model 
              ]
        ]

showKeyboardHelper : Model -> Html Msg 
showKeyboardHelper model = 
  case model.showKeyboardHelper of 
    True ->
      keyboardHelperComponent model
    False -> 
      div [] []


mainModule : Model -> Html Msg
mainModule model =
    case model.route of            
        IndexRoute ->
            overviewComponent model 

        OverviewRoute ->
            overviewComponent model

        BuildRoute ->
            buildComponent model

        DevelopmentRoute ->
            developmentComponent model

        ConfigRoute ->
            configComponent model
        -- 5

        -- WEBSITES ROUTE
        WebsiteRoute acronym ->
            websitesComponent model acronym "products" "index" "null"

        -- WEBSITES ROUTE
        WebsiteNestedRoute acronym websiteType websiteAction ->
            websitesComponent model acronym websiteType websiteAction "null"
                                   -- "ac"     "product"        "new"

        WebsiteNestedRouteShowEdit acronym websiteType websiteAction itemId ->
            websitesComponent model acronym websiteType websiteAction itemId 
                                   -- "ac"     "product"        "new"     "id etc."

        NotFoundRoute ->
            notFoundView


notFoundView : Html msg
notFoundView =
    div []
        [ text "Not found"
        ]
