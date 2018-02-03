module Model.ModelMisc exposing (..)

import Model.ModelProduct exposing (..)


type Websites
    = ALL
    | AC
    | AF
    | AP
    | ACH
    | APO
    | AHP
    | A9
    | AW 



type ConsoleItemType 
        = NewSession
        | Begin
        | Toggle
        | NonExistent
        | Load
        | Success
        | Failure


-- DEVELOPMENT TYPE

type ServerAction 
    = StartServer
    | RestartServer
    | StopServer



type alias WebsitesDropdown =
    { acronym : String
    , name : String 
    , selection : Websites
    }


type alias ConsoleItem =
    { inserted_at : String
    , command : String
    , console_type : ConsoleItemType
    , text : String 
    }

type alias CurrentTask =
    { name : String 
    , duration : Int
    }

type alias CurrentTaskList =
  List CurrentTask
  




-- WEBSITES 



-- MsgModel 

type alias WebsiteIndividualData =
    { productsAssoc : List ProductAssoc
    , categories : List Category
    , tagsAssoc : List TagAssoc
    , posts : List PostAssoc
    , productsDraft : List Product
    , social : List Social
    , updates : List Update
    , message : ConsoleItem
    }

type alias SocialMediaPrefil =
    { display_name : String 
    , featured_image : String 
    , url : String 
    , description : String 
    } 





