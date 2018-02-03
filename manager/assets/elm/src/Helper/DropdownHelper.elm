module Helper.DropdownHelper exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import Msg exposing (..)

import Model exposing (..)
import Model.ModelMisc exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelProduct exposing (..)

import Model.ModelSocial exposing (..)
import Model.ModelProducts exposing (..)
import Model.ModelPosts exposing (..)

import Helper.DataDropdownHelper exposing (..) 
import Dict exposing (..)


-- form dropdowns 


socialFormDropdown : List SocialMediaTypeDropdown -> Html Msg
socialFormDropdown socialMediaTypeDropdownList =
    div [ class "field" ]
        [ label [ class "label" ]
                [ text "Social Media Type" ]
        , div [ class "control" ] 
              [ div [ class "update__website__dropdown__container select" ]
                    [ select [ class "select is-expanded", onInput <| SetSocialField SocialFormSocialMediaType ] 
                            (List.map typeOption (List.map (\x -> x.name) socialMediaTypeDropdownList ))
                    ]
              ]
        ] 

productTypeDropdown : ProductForm -> List ProductTypeDropdown -> Html Msg
productTypeDropdown productForm productTypeDropdown =
    div [ class "update__website__dropdown__container select" ]
        [ select [ class "select is-expanded", onInput <| SetProductsField ProductFormProductType ] 
                 (List.map typeOption (List.map .name productTypeDropdown ))
        ]

postTypeDropdown : List PostTypeDropdown -> Html Msg
postTypeDropdown postTypeDropdown =
    div [ class "update__website__dropdown__container select" ]
        [ select [ class "select is-expanded", onInput <| SetPostsField PostFormPostType ] 
                 (List.map typeOption (List.map .name postTypeDropdown ))
        ]

typeOption : String -> Html Msg 
typeOption name =
    option [ value name ]
           [ text name ]
                  



categoryDropdown : ProductForm -> List Category -> Html Msg
categoryDropdown productForm categoryDropdown =
    div [ class "update__website__dropdown__container select" ]
        [ select [ class "select is-expanded", onInput <| SetProductsField ProductFormCategory, name "developmentDropdown" ] 
                 (List.map categoryOption categoryDropdown)
        ]

categoryOption : Category -> Html Msg 
categoryOption productCategory =
    option [ value productCategory.id ]
           [ text productCategory.name ]


tagDropdown : List TagAssoc -> Html Msg
tagDropdown tagDropdown =
    div [ class "update__website__dropdown__container select" ]
        [ select [ class "select is-expanded", onInput <| SetPostsField PostFormTag ] 
                 (List.map tagOption tagDropdown)
        ]

tagOption : TagAssoc -> Html Msg 
tagOption tagAssoc =
    option [ value tagAssoc.id ]
           [ text tagAssoc.name ]





-- other dropdowns 

dropdownComponent : Model -> (String -> Msg) -> WebsitesDropdown -> Html Msg
dropdownComponent model msg dropdownSelection = -- model.configDropdownSelection
    div [ class "field" ] 
        [ div [ class "control" ]
              [ div [ class "update__website__dropdown__container select" ]
                    [ select [ onInput msg ] 
                            (List.map (dropdownOption dropdownSelection) (List.map .acronym model.developmentDropdown ))
                    ]
              ]
        ]

dropdownOption : WebsitesDropdown -> String -> Html Msg 
dropdownOption dropdownSelection acronym =
  let 
    name = acronymToDropdownDictionary |> Dict.get acronym |> Maybe.withDefault acDropdown |> .name
  in 
  case (acronym == dropdownSelection.acronym) of
    True ->
      option [ value acronym, selected True ]
            [ text name ]
    False ->
      option [ value acronym ]
            [ text name ]

