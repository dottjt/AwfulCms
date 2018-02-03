module Helper.ViewHelper exposing (..)

import Model.ModelProduct exposing (..)
import Model.ModelMisc exposing (..)


scheduleDateToString : ScheduleDate -> String 
scheduleDateToString schedule_date =
  let 
    date_day = schedule_date.day |> toString
    date_month = schedule_date.month |> toString
    date_year = schedule_date.year |> toString
  in
    date_year ++ "-" ++ date_month ++ "-" ++ date_day


convertServerStatus : Bool -> String
convertServerStatus serverStatus = 
    case serverStatus of 
        False ->
            "red"
        True ->
            "green"


convertConsoleItemType : ConsoleItemType -> String
convertConsoleItemType consoleItemType =
  case consoleItemType of
    NewSession -> 
      "purple"
    Begin ->
      "orange"
    Toggle -> 
      "blue"
    Load -> 
      "darkgrey"
    NonExistent ->
      "grey"
    Success ->
      "green"
    Failure ->
      "red"


