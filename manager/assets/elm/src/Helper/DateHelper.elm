module Helper.DateHelper exposing (..)

import Date exposing (..)
import Time exposing (..)



dateMonthToActualInt : Month -> Int 
dateMonthToActualInt month =
  case month of 
     Jan ->
      1
     Feb ->
      2
     Mar ->
      3
     Apr  ->
      4  
     May ->
      5
     Jun ->
      6
     Jul ->
      7
     Aug ->
      8
     Sep ->
      9
     Oct ->
      10
     Nov ->
      11
     Dec->
      12


dateMonthToInt : Month -> String 
dateMonthToInt month =
  case month of 
     Jan ->
      "01"
     Feb ->
      "02"
     Mar ->
      "03"
     Apr  ->
      "04"
     May ->
      "05"
     Jun ->
      "06"
     Jul ->
      "07"
     Aug ->
      "08"
     Sep ->
      "09"
     Oct ->
      "10"
     Nov ->
      "11"
     Dec->
      "12"


maybeDate : Maybe Date -> String 
maybeDate date =
  case date of 
    Just date -> 
      let 
        date_second = Date.second date |> toString
        date_minute = Date.minute date |> toString
        date_hour = Date.hour date |> toString 
        
        date_day = Date.day date |> toString
        date_month = Date.month date |> dateMonthToInt 
        date_year = Date.year date |> toString
      in
        -- (date_day ++ padDash date_month ++ date_year ++ "-" ++ date_hour ++ padTime date_minute ++ date_second)
          date_year ++ "-" ++ date_month ++ "-" ++ date_day ++ "  " ++ date_hour ++ ":" ++ date_minute -- ++ ":" ++ date_second
    Nothing -> 
      "Date Not Working!"



maybeTime : Maybe Time -> Float 
maybeTime time =
  case time of 
    Just time -> 
      let 
          minutes = inMinutes time 
      in 
        minutes
        
    Nothing ->
      0
