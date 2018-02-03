module Component.Social.IndexComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelDataType exposing (..)

import Helper.ConvertHelper exposing (..)
import Helper.TableHelper exposing (..)




indexSocialComponent : Model -> Html Msg
indexSocialComponent model =
    div []
        [ div [ class "main__component__top" ]
              [ h2 [] [ text "Social Index" ]
              ]
        , indexSocialTable model
        ]


indexSocialTable : Model -> Html Msg
indexSocialTable model =
    table [ class "table" ]
          [ tableHeadGenerator ["display_name", "description", "schedule_date", "show", "edit", "delete"]
          , tbody []
                  (List.map (indexSocialRow model.routeAcronym model.routeType model.routeAction) model.socialList)
          ]


indexSocialRow : String -> String -> String -> Social -> Html Msg
indexSocialRow acronym websiteType websiteAction social =
    tr []
       [ td [ align "middle" ]
            [ text social.display_name ]
       , td [ align "middle" ]
            [ text social.description ]
       , td [ align "middle" ]
            [ text (toString social.schedule_date) ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/show/" ++ social.id), onClick (PopulateIndividual (SocialDataViewType social)) ] 
                [ text "show"]
            ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/edit/" ++ social.id), onClick (PopulateForm <| SocialDataFormType <| socialToSocialForm social)
                ]
                [ text "edit"]
            ]
       , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/index"), onClick (ItemDelete "social" social.id) ]
                [ text "delete"]
            ]
       ]



