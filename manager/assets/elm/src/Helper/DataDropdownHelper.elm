module Helper.DataDropdownHelper exposing (..)

import Model.ModelMisc exposing (..)
import Model.ModelSocial exposing (..)
import Model.ModelProducts exposing (..)
import Model.ModelPosts exposing (..)

import Dict exposing (Dict)


socialMediaTypeDropdownList : List SocialMediaTypeDropdown 
socialMediaTypeDropdownList = [
  { socialMediaType = Twitter
  , name = "twitter_post"
  },
  { socialMediaType = Facebook
  , name = "facebook_post"
  },
  { socialMediaType = Pinterest
  , name = "pinterest_post"
  },
  { socialMediaType = Tumblr
  , name = "tumblr_post"
  }
  ]


productTypeDropdownList : List ProductTypeDropdown 
productTypeDropdownList = [
  { productType = General
  , name = "general"
  },
  { productType = Featured
  , name = "featured"
  },
  { productType = Submission
  , name = "submission"
  }
  ]

postTypeDropdownList : List PostTypeDropdown 
postTypeDropdownList = [
  { postType = Generic
  , name = "generic"
  },
  { postType = ProductList
  , name = "product_list"
  }
  ]


websiteDropdown : WebsitesDropdown
websiteDropdown = 
    {
        acronym = "all" ,
        name = "all" ,
        selection = ALL
    }

websiteDropdownAC : WebsitesDropdown
websiteDropdownAC =
    {
        acronym = "ac" ,
        name = "all" ,
        selection = AC
    }


acronymToDropdownDictionary : Dict.Dict String WebsitesDropdown 
acronymToDropdownDictionary = Dict.fromList
    [ ("all", allDropdown)
    , ("ac", acDropdown)
    , ("af", afDropdown)
    , ("ap", apDropdown)
    , ("ach", achDropdown)
    , ("apo", apoDropdown)
    , ("ahp", ahpDropdown)
    , ("a9", a9Dropdown)
    , ("aw", awDropdown)
    ]    


websiteDropdownList : List WebsitesDropdown
websiteDropdownList = [
      allDropdown
    , acDropdown
    , afDropdown
    , apDropdown
    , achDropdown
    , ahpDropdown
    , apoDropdown
    , a9Dropdown
    , awDropdown    
    ]


allDropdown : WebsitesDropdown
allDropdown =
      {   
          acronym = "all" ,
          name = "all" ,
          selection = ALL
      }

acDropdown : WebsitesDropdown      
acDropdown =
      {   
          acronym = "ac" ,
          name = "awful christmas" ,
          selection = AC
      }

afDropdown : WebsitesDropdown      
afDropdown =
      {   
          acronym = "af" ,
          name = "awful fashion" ,
          selection = AF
      }

apDropdown : WebsitesDropdown      
apDropdown =
      {   
          acronym = "ap" ,
          name = "awful pet" ,
          selection = AP
      }

achDropdown : WebsitesDropdown      
achDropdown =
      {   
          acronym = "ach" ,
          name = "awful child" ,
          selection = ACH
      }

apoDropdown : WebsitesDropdown      
apoDropdown =
      {   
          acronym = "apo" ,
          name = "awful pokemon" ,
          selection = APO
      }

ahpDropdown : WebsitesDropdown      
ahpDropdown =
      {   
          acronym = "ahp" ,
          name = "awful harry potter" ,
          selection = AHP
      }

a9Dropdown : WebsitesDropdown      
a9Dropdown =
      {   
          acronym = "a9" ,
          name = "awful 90s" ,
          selection = A9
      }

awDropdown : WebsitesDropdown      
awDropdown =
      {   
          acronym = "aw" ,
          name = "awful wedding" ,
          selection = AW

      }

