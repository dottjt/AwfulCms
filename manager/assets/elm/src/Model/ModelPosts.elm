module Model.ModelPosts exposing (..)

type alias PostTypeDropdown =
  { postType : PostType
  , name : String
  }

type PostType 
  = Generic
  | ProductList
