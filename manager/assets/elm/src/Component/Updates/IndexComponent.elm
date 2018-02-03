module Component.Updates.IndexComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelDataType exposing (..)

import Helper.ConvertHelper exposing (..)
import Helper.TableHelper exposing (..)


indexUpdatesComponent : Model -> Html Msg
indexUpdatesComponent model =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Update Index" ]
              ] 
        , indexUpdateTable model
        ]


indexUpdateTable : Model -> Html Msg
indexUpdateTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["display_name", "title", "show", "edit", "delete"]
          , tbody []
                  (List.map (indexUpdateRow model.routeAcronym model.routeType model.routeAction) model.updateList)
          ]


indexUpdateRow : String -> String -> String -> Update -> Html Msg
indexUpdateRow acronym websiteType websiteAction update =
    tr []
       [ td [ align "middle" ]
           [ text update.display_name ]
       , td [ align "middle" ]
           [ text update.title ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/show/" ++ update.id), onClick (PopulateIndividual (UpdateDataViewType update)) ]        
                [ text "show"]
            ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/edit/" ++ update.id), onClick (PopulateForm <| (UpdateDataFormType <| updateToUpdateForm update)) ]
                [ text "edit"]
            ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/index"), onClick (ItemDelete "updates" update.id) ]
                [ text "delete"]
            ]
       ]

