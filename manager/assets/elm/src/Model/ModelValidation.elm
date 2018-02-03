module Model.ModelValidation exposing (..)

type Validation
  = StringValidation
  | IntValidation
  | BoolValidation 
  | FloatValidation 
  | TagIdValidation
  | NoValidation


type alias ValidationAlias = 
  { isEmpty : Bool
  , validationMessage : String 
  , validationType : Validation 
  }


type alias ProductFormValidation =
    { display_name : ValidationAlias 
    , description : ValidationAlias  
    , blog_description : ValidationAlias  
    -- , original_featured_image : ValidationAlias 
    , featured_image : ValidationAlias
    -- , draft : ValidationAlias
    -- , schedule_date : ValidationAlias 
    , cta : ValidationAlias
    , price : ValidationAlias
    , url : ValidationAlias
    , url_text : ValidationAlias 
    -- , category : ValidationAlias
    -- , category_id : ValidationAlias 
    , tag_id : ValidationAlias 
    , product_like : ValidationAlias
    -- , product_type : ValidationAlias 
    }


type alias PostFormValidation =
    { display_name : ValidationAlias 
    , author : ValidationAlias 
    , excerpt : ValidationAlias 
    , featured_image : ValidationAlias 
    -- , post_type : ValidationAlias 
    -- , tag : ValidationAlias
    -- , product_limit : ValidationAlias
    -- , product_offset: ValidationAlias
    }



type alias TagFormValidation =
    { display_name : ValidationAlias
    , description :  ValidationAlias
    }




type alias SocialFormValidation =
    { display_name : ValidationAlias
    , description : ValidationAlias   
    , tags : ValidationAlias 
    -- , draft : ValidationAlias 
    -- , schedule_date : ValidationAlias 
    -- , facebook_code : ValidationAlias 
    , featured_image : ValidationAlias 
    , url : ValidationAlias 
    , image_caption : ValidationAlias 
    -- , social_media_type : ValidationAlias 
    }





type alias UpdateFormValidation =
    { display_name : ValidationAlias
    , title : ValidationAlias
    , excerpt : ValidationAlias 
    , author : ValidationAlias 
    -- , schedule_date : ValidationAlias 
    -- , draft : ValidationAlias
    }


type alias BuildFormValidation =
    { website_acronym : ValidationAlias
    , website_lower : ValidationAlias
    , website_capital : ValidationAlias
    , num_of_categories : ValidationAlias
    , c1_name : ValidationAlias
    , c1_display_name : ValidationAlias
    , c1_model : ValidationAlias
    , c1_icon : ValidationAlias
    , c2_name : ValidationAlias
    , c2_display_name : ValidationAlias
    , c2_model : ValidationAlias
    , c2_icon : ValidationAlias
    , c3_name : ValidationAlias
    , c3_display_name : ValidationAlias
    , c3_model : ValidationAlias
    , c3_icon : ValidationAlias
    , c4_name : ValidationAlias
    , c4_display_name : ValidationAlias
    , c4_model : ValidationAlias
    , c4_icon : ValidationAlias
    , c5_name : ValidationAlias
    , c5_display_name : ValidationAlias
    , c5_model : ValidationAlias
    , c5_icon : ValidationAlias
    , c6_name : ValidationAlias
    , c6_display_name : ValidationAlias
    , c6_model : ValidationAlias
    , c6_icon : ValidationAlias
    , c7_name : ValidationAlias
    , c7_display_name : ValidationAlias
    , c7_model : ValidationAlias
    , c7_icon : ValidationAlias
    }
