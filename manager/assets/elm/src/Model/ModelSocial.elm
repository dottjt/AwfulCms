module Model.ModelSocial exposing (..)


type SocialMediaType
    = Twitter 
    | Facebook
    | Pinterest 
    | Tumblr


type alias SocialMediaTypeDropdown =
  { socialMediaType : SocialMediaType
  , name : String
  }