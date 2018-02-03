module Component.SidebarComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)
import Model exposing (..)

import Component.FilterComponent exposing (..)

sidebarComponent : Model -> Html Msg 
sidebarComponent model =
    div [] 
        [ (filterComponent model)
        , div [] 
              []
        ]