module Component.ConsoleComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Keyboard exposing (..)
import Char 

import Msg exposing (..)

import Model exposing (..)
import Model.ModelMisc exposing (..)

import Helper.ViewHelper exposing (..)


consoleComponent : Model -> Html Msg
consoleComponent model =
    div [ class "console__container" ]
        [ div [ class "console__top" ]
              [ h2 [ class "console__h2" ] [ text "Console" ]
              , maybeCurrentTasks model.currentTasks              
              , div [] 
                    (List.map consoleKeys model.keysDown)
              ]
        , div [ class "console__bottom" ]
              (List.map consoleItem model.consoleItemList) -- List.reverse
        ]


maybeCurrentTasks : Maybe CurrentTaskList -> Html Msg 
maybeCurrentTasks currentTaskList =  
  case currentTaskList of 
    Just list ->
      div [] (List.map currentTasks list)

    Nothing ->
      div [] [ text "No current tasks." ]


currentTasks : CurrentTask -> Html Msg 
currentTasks currentTask = 
    div [ class "current__task" ] 
        [ p [] 
            [ text currentTask.name ]
        , p [] 
            [ text (toString currentTask.duration) ] 
        ]


consoleKeys : KeyCode -> Html Msg 
consoleKeys keyCode = 
  span [] 
       [ text (keyCode |> Char.fromCode |> toString)

       ]

consoleItem : ConsoleItem -> Html Msg 
consoleItem console =
  div [ class "console__item" ]
      [ span [ style [ ( "min-width", "120px" ) ] ] 
             [ text (console.inserted_at ++ " ")
             ]
      , span [ style [ ( "color", (convertConsoleItemType console.console_type) )] ]
             [ text console.command 
             ] 
      ]
       -- console.text ++ " " ++ 


