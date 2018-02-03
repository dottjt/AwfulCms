module Component.Main.DevelopmentComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelDevelopment exposing (..)
import Model.ModelMisc exposing (..)

import Helper.DropdownHelper exposing (..) 
import Helper.ViewHelper exposing (..)
import Helper.TableHelper exposing (..)



developmentComponent : Model -> Html Msg
developmentComponent model =
    div [ class "development__container" ]
        [ div []
              [ h2 [] [ text "Development Server Status" ]
              , developmentTable model.developmentServerStatusList
              ]
        , div []
              [ h2 [] [ text "Commands" ]
              , dropdownComponent model DevelopmentDropdownChange model.developmentDropdownSelection 
              , div [] (List.map commandComponent model.commandsList) 
              ]
        ]


developmentTable : List ServerStatusItem -> Html Msg
developmentTable serverStatusItemList =
    table [ class "table development__table" ] <|
          [ tableHeadGenerator ["status", "website", "start", "restart", "stop"]
          ] ++ (List.map developmentRow serverStatusItemList)


developmentRow : ServerStatusItem -> Html Msg
developmentRow serverStatusItem =
    tr []
        [ td [] 
              [ div [ class "server_status_indicator", style [ ( "background", (convertServerStatus serverStatusItem.status) )] ] [] ]
        , td [] 
              [ text serverStatusItem.acronym ]
        , td [ align "middle" ] 
              [ button [ onClick (OnChangeServer StartServer "development" serverStatusItem.acronym) ] 
                       [ text "start" ]
              ]
        , td [ align "middle" ] 
              [ button [ onClick (OnChangeServer RestartServer "development" serverStatusItem.acronym) ] 
                       [ text "restart" ]
              ]
        , td [ align "middle" ] 
              [ button [ onClick (OnChangeServer StopServer "development" serverStatusItem.acronym) ] 
                       [ text "stop" ]
              ]
        ]

        


commandComponent : CommandItem -> Html Msg
commandComponent commandItem =
  let 
    commandType = 
      case commandItem.commandType of 
        Development -> 
          { pt = Nothing, pc = "is-static", dt = Just Development, dc = "is-link" }

        Production -> 
          { pt = Nothing, pc = "is-link", dt = Just Production, dc = "is-static" }

        DevelopmentAndProduction -> 
          { pt = Just Production, pc = "is-link", dt = Just Development, dc = "is-link" }
  in 
      div [ class "field has-addons" ]
          [ div [ class "control" ]
                [ button [ class "button is-static button-width-50px" ] 
                         [ text (commandItem.key) ]
                ]
          , div [ class "control" ]
                [ button [ class "button is-static button-width-135px" ] 
                         [ text (commandItem.name) ]
                ]
          , div [ class "control" ]
                [ button [ class ("button " ++ commandType.dc), onClick <| OnCommand commandItem commandType.dt ]
                         [ text "development" ]
                ]       
          , div [ class "control" ]
                [ button [ class ("button " ++ commandType.pc), onClick <| OnCommand commandItem commandType.pt ] 
                         [ text "production" ]
                ]       
              
          ]
    

