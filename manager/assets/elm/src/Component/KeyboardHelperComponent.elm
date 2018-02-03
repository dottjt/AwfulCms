module Component.KeyboardHelperComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)


import Msg exposing (..)
import Model exposing (..)


-- dropdown change 1 
-- development command 2
-- production command 3
-- ux

keyboardHelperComponent : Model -> Html Msg
keyboardHelperComponent model =
    div [ class "keyboard__helper"] 
        [ div [ class "columns content" ] 
              [ div [ class "column" ] 
                    [ h4 [] [ text "Change Dropdown - 1" ]
                    , h4 [] [ text "Clear Form/Fetch Server - 0" ]
                    , h4 [] [ text "Command Helper - 9" ]

                    , h4 [] [ text "Clear Keyboard - ESC" ]
                    , h4 [] [ text "Terminate Command - ;" ]
                    -- , ul []
                    --      [ li [] [ text "al - all" ]
                    --      , li [] [ text "ac - ac" ]
                    --      , li [] [ text "af - af" ]
                    --      , li [] [ text "ap - ap" ]
                    --      , li [] [ text "ach - ach" ]
                    --      , li [] [ text "apo - apo" ]
                    --      , li [] [ text "ahp - ahp" ]
                    --      , li [] [ text "a9 - a9" ]
                    --      , li [] [ text "aw - aw" ]
                    --      ]
                    , h4 [] [ text "Submit Form - \\" ] 
                    , ul []
                         [ li [] [ text "p - product form" ]
                         , li [] [ text "b - post form" ]
                         , li [] [ text "s - social form" ]
                         , li [] [ text "t - tag form" ]
                         , li [] [ text "u - update form" ]
                         , li [] [ text "k - product search" ]
                         , li [] [ text "c - common env" ]
                         , li [] [ text "i - individual env" ]
                         , li [] [ text "e - config env" ]
                         ]

                    ]
              , div [ class "column" ] 
                    [ h4 [] [ text "Dev Prod - 2 3" ]
                    , ul [] 
                         [ li [] [ text "dr - dur_all" ]
                         , li [] [ text "dc - durc_all" ]
                         , li [] [ text "ca - compile_all" ]
                         , li [] [ text "cs - compile_single" ]
                         , li [] [ text "da - delete_all" ]
                         , li [] [ text "ds - delete_single" ] 
                         , li [] [ text "ea - ecto_create_all" ]
                         , li [] [ text "em - ecto_migrate_all" ]
                         , li [] [ text "er - ecto_reset_all" ] 
                         , li [] [ text "ua - update_all" ]
                         , li [] [ text "us - update_single" ] 
                         , li [] [ text "pl - pull_all" ]
                         , li [] [ text "ps - pull_single" ]
                         , li [] [ text "pa - push_all" ]
                         , li [] [ text "pi - push_single" ]
                         , li [] [ text "pm - push_awful_manager" ] 
                         ]
                    ]
              , div [ class "column" ]
                    [ h4 [] [ text "" ]
                    , ul [] 
                         [ li [] [ text "ti - transfer_images" ]                           
                         , li [] [ text "bs - build_single" ]
                         , li [] [ text "sa - seed_all" ]
                         , li [] [ text "si - seed_single" ]                         
                         , li [] [ text "ss - start_single" ]
                         , li [] [ text "sl - start_all" ]
                         , li [] [ text "sg - stop_single" ]
                         , li [] [ text "sp - stop_all" ]
                         , li [] [ text "oa - source_all" ]
                         , li [] [ text "oi - source_single" ]
                         , li [] [ text "rs - restart_single" ]
                         ]
                    ]
              , div [ class "column" ] 
                    [ h4 [] [ text "UX - 4" ]
                    , ul [] 
                         [ li [] [ text "o - overview" ]
                         , li [] [ text "d - development" ]
                         , li [] [ text "w - websites"  ]
                         , li [] [ text "b - build" ]
                         , li [] [ text "c - config" ]
                         , li [] [ text "pi - products/index" ]
                         , li [] [ text "pn -  products/new" ]
                         , li [] [ text "bi - posts/index" ]
                         , li [] [ text "bn - posts/new" ]
                         , li [] [ text "si - social/index" ]
                         , li [] [ text "sn - social/new" ]
                         , li [] [ text "ti - tags/index" ]
                         , li [] [ text "tn - tags/new" ]
                         , li [] [ text "ui - updates/index" ]
                         , li [] [ text "un - updates/new" ]
                         ]

                    ]
              ]


        ]
