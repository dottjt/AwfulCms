module Helper.TableHelper exposing (..)

import Html exposing (..)
import Msg exposing (..)


tableHeadGenerator : List String -> Html Msg 
tableHeadGenerator tableHeadList =
  thead [] 
        [ tr [] 
             (List.map (\x -> th [] [ text x ]) tableHeadList)
        ]


