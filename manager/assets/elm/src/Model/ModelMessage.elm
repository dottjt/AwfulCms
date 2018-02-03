module Model.ModelMessage exposing (..)

import Model.ModelMisc exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelOverview exposing (..)
import Model.ModelDevelopment exposing (..)
import Model.ModelConfig exposing (..)

type alias ProductAssocMESSAGE = 
    { product : ProductAssoc
    , message : ConsoleItem 
    }  

type alias NewProductMESSAGE = 
    { product : NewProduct 
    , message : ConsoleItem 
    }

type alias ProductFormMESSAGE =
    { product : ProductForm
    , message : ConsoleItem
    }

type alias SocialFormMESSAGE = 
    { prefil : SocialForm
    , message : ConsoleItem 
    }  

type alias SocialMediaPrefilMESSAGE =
    { prefil : SocialMediaPrefil
    , message : ConsoleItem
    }

type alias ConfigEnvDataMESSAGE = 
    { config : ConfigEnvData
    , message : ConsoleItem
    }

type alias WebsitesItemMESSAGEList =
    { websites : List WebsitesItem
    , message : ConsoleItem
    }

type alias ServerStatusMESSAGEList =
    { serverStatusList : List ServerStatusItem
    , status_type : String 
    , message : ConsoleItem 
    }

type alias IndividualEnvMESSAGEData =
    { individualEnvData : IndividualEnvData
    , message : ConsoleItem 
    }

type alias GoogleAnalyticsItemMESSAGEList =
    { googleAnalytics : List GoogleAnalyticsItem
    , message : ConsoleItem
    }

type alias DomainExpirationItemMESSAGEList = 
    { domainExpirations : List DomainExpirationItem
    , message : ConsoleItem
    }

type alias CommonEnvMESSAGEData =
    { commonEnvData : CommonEnvData
    , message : ConsoleItem 
    }

type alias ConsoleItemMESSAGEList = 
    { messages : List ConsoleItem
    , message : ConsoleItem
    }
