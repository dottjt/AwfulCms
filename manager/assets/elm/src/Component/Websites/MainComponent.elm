module Component.Websites.MainComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)

import Msg exposing (..)

import Model exposing (..)
import Model.ModelNavbar exposing (..)

import Dict exposing (..)

import Component.Products.IndexComponent exposing (..)
import Component.Products.NewComponent exposing (..)
import Component.Products.EditComponent exposing (..)
import Component.Products.ShowComponent exposing (..)

import Component.Posts.IndexComponent exposing (..)
import Component.Posts.NewComponent exposing (..)
import Component.Posts.EditComponent exposing (..)
import Component.Posts.ShowComponent exposing (..)

import Component.Social.IndexComponent exposing (..)
import Component.Social.NewComponent exposing (..)
import Component.Social.EditComponent exposing (..)
import Component.Social.ShowComponent exposing (..)

import Component.Tags.IndexComponent exposing (..)
import Component.Tags.NewComponent exposing (..)
import Component.Tags.EditComponent exposing (..)
import Component.Tags.ShowComponent exposing (..)

import Component.Updates.IndexComponent exposing (..)
import Component.Updates.NewComponent exposing (..)
import Component.Updates.EditComponent exposing (..)
import Component.Updates.ShowComponent exposing (..)


websitesComponent : Model -> String -> String -> String -> String -> Html Msg
websitesComponent model acronym websiteType websiteAction itemId =
    div []
        [ websitesNavbar model.websitesMainNavbarItems acronym websiteType
        , websitesMainPage model acronym websiteType websiteAction itemId
        ]


websitesNavbar : List WebsitesNavbarItem -> String -> String -> Html Msg 
websitesNavbar websitesMainNavbarItems websiteAcronym websiteRoute = 
    let
        newWebsitesNavbarItem = (List.map (\x -> { x | acronym = websiteAcronym } ) websitesMainNavbarItems)
    in
    div [ class "navbar" ] 
        [ div [ class "navbar-menu" ] 
              [ div [ class "navbar-start" ] 
                    (List.map websitesNavbarItem newWebsitesNavbarItem)
              ] 
        ]


websitesNavbarItem : WebsitesNavbarItem -> Html Msg
websitesNavbarItem websitesNavbarItem =
  case websitesNavbarItem.main of 
    "pending" ->
      div [ class "navbar-item is-hoverable" ] -- is-active
          [ a [ class "navbar-link", href  ("#websites/" ++ websitesNavbarItem.acronym ++ "/" ++ websitesNavbarItem.url ++ "/new") ]
              [ text websitesNavbarItem.main ]       
          ]
    _ -> 
      div [ class "navbar-item has-dropdown is-hoverable" ] -- is-active
          [ a [ class "navbar-link", href  ("#websites/" ++ websitesNavbarItem.acronym ++ "/" ++ websitesNavbarItem.url ++ "/new") ]
              [ text websitesNavbarItem.main ]       
          , div [ class "navbar-dropdown" ]
                (List.map (websitesNavbarItemDropdown websitesNavbarItem.acronym websitesNavbarItem.url) websitesNavbarItem.sub)
          ]


websitesNavbarItemDropdown : String -> String -> WebsitesNavbarSubItem -> Html Msg
websitesNavbarItemDropdown acronym url navbarWebsitesItem =
    a [ class "navbar-item", href ("#websites/" ++ acronym ++ "/" ++ url ++ "/" ++ navbarWebsitesItem.action) ]
      [ text navbarWebsitesItem.name ] 


websitesMainPage : Model -> String -> String -> String -> String -> Html Msg
websitesMainPage model acronym websiteType websiteAction itemId =
  case itemId of 
    "null" ->
      model |> (websitesMainPageDictionary |> Dict.get (websiteType, websiteAction) |> maybeHtmlMsg)
    _ -> 
      (model, itemId) |> (websitesMainPageShowEditDictionary |> Dict.get (websiteType, websiteAction) |> maybeHtmlMsgShowEdit)
      -- basically, the issue is that I need to pass in an itemId into this configuration. 


websitesMainPageDictionary : Dict.Dict (String, String) (Model -> Html Msg)
websitesMainPageDictionary = Dict.fromList
    [ (("products", "index"), indexProductsComponent)
    , (("products", "new"), newProductsComponent)
    , (("posts", "index"), indexPostsComponent)
    , (("posts", "new"), newPostsComponent)
    , (("social", "index"), indexSocialComponent)
    , (("social", "new"), newSocialComponent)
    , (("tags", "index"), indexTagsComponent)
    , (("tags", "new"), newTagsComponent)
    , (("updates", "index"), indexUpdatesComponent)
    , (("updates", "new"), newUpdatesComponent)
    ]

websitesMainPageShowEditDictionary : Dict.Dict (String, String) ((Model,String) -> Html Msg)
websitesMainPageShowEditDictionary = Dict.fromList
    [ (("products", "edit"), editProductsComponent)
    , (("products", "show"), showProductsComponent)
    , (("posts", "edit"), editPostsComponent)
    , (("posts", "show"), showPostsComponent)
    , (("social", "edit"), editSocialComponent)
    , (("social", "show"), showSocialComponent)
    , (("tags", "edit"), editTagsComponent)
    , (("tags", "show"), showTagsComponent)
    , (("updates", "edit"), editUpdatesComponent)
    , (("updates", "show"), showUpdatesComponent)
    ]




maybeHtmlMsg : Maybe (Model -> Html Msg) -> (Model -> Html Msg)
maybeHtmlMsg html =
  case html of 
    Just html -> 
      html 
    Nothing -> 
      noneModel  


maybeHtmlMsgShowEdit : Maybe ((Model, String) -> Html Msg) -> ((Model, String) -> Html Msg)
maybeHtmlMsgShowEdit html =
  case html of 
    Just html -> 
      html 
    Nothing -> 
      noneModelShowEdit  



notFoundView : Html msg 
notFoundView =
    div []
        [ text "Not found"
        ]


noneModel : Model -> Html Msg 
noneModel model =
    div []
        [ text "nada" ]

noneModelShowEdit : (Model, String) -> Html Msg 
noneModelShowEdit (model, string) =
    div []
        [ text "nada" ]


