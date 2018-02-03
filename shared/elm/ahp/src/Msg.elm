module Msg exposing (..)

import Model exposing (..)
import Http exposing (..)
import Navigation exposing (Location)

type Msg
    = FetchProductListFail Error 
    | FetchProductListSuccess ProductAssocList
    
    | ChangeSearchInput String
    | ToggleQueryTag String 

    | OnLocationChange Location
    