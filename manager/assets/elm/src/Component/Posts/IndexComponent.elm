module Component.Posts.IndexComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelDataType exposing (..)

import Helper.ConvertHelper exposing (..)


indexPostsComponent : Model -> Html Msg
indexPostsComponent model =
    div [] 
        [ div [ class "main__component__top" ] 
              [ h2 [] [ text "Posts Index" ]
              ] 
        , indexPostsTable model
        ]


indexPostsTable : Model -> Html Msg
indexPostsTable model =
    table [ class "table" ]
          [ indexPostsHeadRow
          , tbody []
                  (List.map (indexPostsRow model.routeAcronym model.routeType model.routeAction) model.postList)
          ]



indexPostsHeadRow : Html Msg 
indexPostsHeadRow =
  thead []
    [ tr []
          [ th []
              [ text "display_name" ]
          , th []
              [ text "excerpt" ]
          , th []
              [ text "post_type" ]
          , th []
              [ text "product_limit" ]
          , th []
              [ text "product_offset" ]
          , th []
              [ text "show" ]
          , th []
              [ text "edit" ]
          , th []
              [ text "delete" ]
          ]
    ]


indexPostsRow : String -> String -> String -> PostAssoc -> Html Msg
indexPostsRow acronym websiteType websiteAction post =
    tr []
      [ td [ align "middle" ]
           [ text post.display_name ]
      , td [ align "middle" ]
           [ text post.excerpt ]
      , td [ align "middle" ]
           [ text post.post_type ]
      , td [ align "middle" ]
           [ text (toString post.product_limit) ]
      , td [ align "middle" ]
           [ text (toString post.product_offset) ]
      , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/show/" ++ post.id), onClick (PopulateIndividual (PostDataViewType post)) ]       
                [ text "show"]  
            ]
      , td [ align "middle" ]
            [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/edit/" ++ post.id), onClick (PopulateForm <| PostDataFormType <| postAssocToProductForm post) 
                ]      
                [ text "edit"]  
            ]
      , td [ align "middle" ]
           [ a [ href ("#websites/" ++ acronym ++ "/" ++ websiteType ++ "/index"), onClick (ItemDelete "posts" post.id) ] 
               [ text "delete"]  
           ]
      ]

