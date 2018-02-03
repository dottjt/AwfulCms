module Model.ModelProducts exposing (..)

type alias ProductTypeDropdown =
  { productType : ProductType
  , name : String
  }

type ProductType 
  = General 
  | Featured
  | Submission 
