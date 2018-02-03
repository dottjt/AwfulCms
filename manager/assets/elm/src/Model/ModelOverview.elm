module Model.ModelOverview exposing (..)


-- OPERATIONAL TYPE ALIAS 

type alias GoogleAnalyticsItem =
    { domain : String 
    , today : String
    , yesterday : String
    , week : String
    , month : String
    , link : String
    }


type alias DomainExpirationItem =
    { domain : String 
    , daysTillExpiration : String
    , expirationDate : String
    , autoRenewStatus : String
    , renew : String
    }


type alias WebsitesItem =
    { name : String
    , acronym : String
    , total_products : Int
    , total_products_week : Int
    , total_products_month : Int
    , total_products_draft : Int 
    , total_posts : Int 
    }

