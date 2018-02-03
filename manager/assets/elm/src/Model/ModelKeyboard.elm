module Model.ModelKeyboard exposing (..)


type WebsitesFormType 
    = ProductFormType
    | PostFormType
    | TagFormType
    | UpdateFormType 
    | SocialFormType 


type alias SubmitData =
  { submit_type : SubmitType 
  , websitesType : Maybe WebsitesFormType
  }


type SubmitType 
    = WebsitesSubmit
    | ProductSearch
    
    | CommonSubmit
    | IndividualSubmit
    | EnvSubmit
    
    | BuildSubmit

