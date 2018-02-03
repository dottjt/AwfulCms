module Model.ModelNavbar exposing (..)

import Model.ModelRouting exposing (..)


-- MAIN NAVBAR 

type alias NavbarItem =
    { main : String 
    , route : Route
    , sub : List NavbarSubItem
    }

type alias NavbarSubItem = 
    { name : String
    , acronym : String
    }


-- WEBSITES NAVBAR


type alias WebsitesNavbarItem =
    { main : String 
    , url : String 
    , acronym : String
    , sub : List WebsitesNavbarSubItem
    }

type alias WebsitesNavbarSubItem =
    { name : String
    , action : String 
    }
