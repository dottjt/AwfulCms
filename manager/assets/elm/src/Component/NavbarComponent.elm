module Component.NavbarComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Attributes.Aria exposing (..)

import Model.ModelRouting exposing (Route)
import Model.ModelNavbar exposing (..)

import Msg exposing (..)
import Model exposing (..)


navbarComponent : Model -> Html Msg
navbarComponent model =
    nav [ class "navbar navbar__container", role "navigation", ariaLabel "main navigation" ]
        [ div [ class "navbar-brand" ]
            [ a [ class "navbar-item", href "/admin" ]
                [ img [ src "https://bulma.io/images/bulma-logo.png", alt "Bulma: a modern CSS framework based on Flexbox" ]
                    []
                ]
            , button [ class "button navbar-burger" ]
                [ span []
                    []
                , span []
                    []
                , span []
                    []
                ]
            ]

        , div [ class "navbar-menu" ]
            [ div [ class "navbar-start" ] 
                  (List.map (navbarItem model.route) model.navbarWebsiteItems)
            ]

        ]


navbarItem : Route -> NavbarItem -> Html Msg
navbarItem route navbarItem =
    let 
      isActive = (route == navbarItem.route)
    in 
    case navbarItem.main of 
        "overview" ->
          case isActive of 
            True ->
              div [ class "navbar-item has-dropdown is-hoverable" ] -- is-active
                  [ a [ class "navbar-link", href ("#" ++ navbarItem.main) ]
                      [ text navbarItem.main ]       
                  , div [ class "navbar-dropdown" ]
                        (List.map navbarSubItem navbarItem.sub)
                  ]

            False -> 
              div [ class "navbar-item has-dropdown is-hoverable" ]
                  [ a [ class "navbar-link", href ("#" ++ navbarItem.main) ]
                      [ text navbarItem.main ]       
                  , div [ class "navbar-dropdown" ]
                        (List.map navbarSubItem navbarItem.sub)
                  ]

        _ -> 
          case isActive of 
            True ->
              a [ class "navbar-item is-active", href ("#" ++ navbarItem.main) ]
                [ text navbarItem.main ] 

            False ->
              a [ class "navbar-item", href ("#" ++ navbarItem.main) ]
                [ text navbarItem.main ] 


navbarSubItem : NavbarSubItem -> Html Msg
navbarSubItem navbarSubItem =
    a [ class "navbar-item", href ("#websites/" ++ navbarSubItem.acronym) ]
      [ text navbarSubItem.name ] 


-- navbarStatus : Maybe ConsoleItem -> Html Msg
-- navbarStatus navbarStatus =
--     case navbarStatus of 
--         Just status ->
--             div [ class "navbar__status" ]
--                 [ div [] 
--                       [ text (status.inserted_at ++ " ") ]
--                 , div [] 
--                       [ text (status.command ++ " - ") ]
--                 , div [] 
--                       [ text status.text ] 
--                 ] 
--         Nothing -> 
--             div [ class "navbar__status" ]
--                 [ div [] 
--                       [ text ("0:00" ++ " ") ]
--                 , div [] 
--                       [ text ("Nothing Loaded" ++ " - ") ]
--                 , div [] 
--                       [ text "You sad creature, oh you." ] 
--                 ] 
