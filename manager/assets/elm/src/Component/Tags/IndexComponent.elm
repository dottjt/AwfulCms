module Component.Tags.IndexComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelDataType exposing (..)

import Helper.ConvertHelper exposing (..)
import Helper.TableHelper exposing (..)


indexTagsComponent : Model -> Html Msg
indexTagsComponent model =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Tags Index" ]
              ] 
        , indexTagsTable model
        ]


indexTagsTable : Model -> Html Msg
indexTagsTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["display_name", "description", "show", "edit", "delete"]
          , tbody []
                  (List.map (indexTagsRow model.routeAcronym model.routeType model.routeAction) model.tagAssocList)
          ]


indexTagsRow : String -> String -> String -> TagAssoc -> Html Msg
indexTagsRow acronym websiteType websiteAction tag =
    tr []
       [ td [ align "middle" ]
           [ text tag.display_name ]
       , td [ align "middle" ]
           [ text tag.description ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/show/" ++ tag.id), onClick (PopulateIndividual (TagDataViewType tag)) ] 
               [ text "show"]
           ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/edit/" ++ tag.id), onClick (PopulateForm <| TagDataFormType <| tagAssocToTagForm tag)
                ]
               [ text "edit"]
           ]
       , td [ align "middle" ]
           [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/index"), onClick (ItemDelete "tags" tag.id)]
               [ text "delete"]
           ]
       ]


