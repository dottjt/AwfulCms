module Model.ModelProduct exposing (..)


type alias ScheduleDate =
  { day : Int
  , month : Int
  , year : Int
  }


-- PRODUCT

type alias NewProduct = 
    { 
    -- , display_name : String
    -- , description : String   
    -- , blog_description : String  
      featured_image : String
    , price : Float
    , url : String
    }


type alias ProductAssoc =
    { id : String
    , name : String
    , display_name : String
    , description : String   
    , blog_description : String  
    , featured_image : String
    , schedule_date : ScheduleDate    
    , draft : Bool
    , cta : String
    , price : Float
    , product_type : String
    , url : String
    , url_text : String
    , inserted_at : String 
    , category: Category
    , product_tags: List Tag
    , product_like: Like
    }

type alias Product =
    { id : String
    , name : String
    , display_name : String
    , description : String  
    , blog_description : String  
    , featured_image : String
    , schedule_date : ScheduleDate
    , draft : Bool
    , cta : String
    , price : Float
    , product_type : String
    , url : String
    , url_text : String 
    }

type alias ProductForm =
    { display_name : String
    , description : String  
    , blog_description : String  
    , original_featured_image : String 
    , featured_image : String
    , draft : Bool
    , schedule_date : ScheduleDate 
    , cta : String
    , price : Float
    , url : String
    , url_text : String 
    , category : Category 
    , category_id : String 
    , tag_id : List String 
    , product_like : Int 
    , product_type : String
    }





-- POST

type alias PostAssoc =
    { id : String 
    , name : String 
    , display_name : String 
    , author : String 
    , excerpt : String 
    , featured_image : String 
    , post_type : String 
    , tag : Maybe Tag
    , product_limit : Maybe Int 
    , product_offset: Maybe Int
    }

type alias Post =
    { id : String 
    , name : String 
    , display_name : String 
    , author : String 
    , excerpt : String 
    , featured_image : String 
    , post_type : String 
    , product_limit : Maybe Int 
    , product_offset: Maybe Int
    }
    

type alias PostForm =
    { display_name : String 
    , author : String 
    , excerpt : String 
    , featured_image : String 
    , post_type : String 
    , tag : Maybe Tag 
    , product_limit : Maybe Int 
    , product_offset: Maybe Int
    }





-- TAG

type alias TagAssoc =
    { id : String
    , name : String
    , display_name : String
    , description : String    
    , products : List Product
    , posts : List Post
    }

type alias Tag =
    { id : String
    , name : String
    , display_name : String
    , description : String    
    }

type alias TagForm =
    { display_name : String
    , description : String 
    }





-- SOCIAL 

type alias Social =
    { id : String 
    , name : String 
    , description : String   
    , display_name : String
    , url : String 
    , draft : Bool 
    , schedule_date : ScheduleDate 
    , facebook_code : String 
    , featured_image : String 
    , image_caption : String 
    , image_caption : String 
    , social_media_type : String 
    , tags : String     
    }

type alias SocialForm =
    { display_name : String
    , description : String   
    , tags : String 
    , draft : Bool 
    , schedule_date : ScheduleDate 
    , facebook_code : String 
    , featured_image : String 
    , url : String 
    , image_caption : String 
    , social_media_type : String 
    }




-- UPDATE 

type alias Update =
    { id : String
    , name : String
    , display_name : String
    , title : String
    , excerpt : String
    , author : String
    , draft : Bool
    , schedule_date : ScheduleDate
    }

type alias UpdateForm =
    { display_name : String
    , title : String
    , excerpt : String
    , author : String
    , schedule_date : ScheduleDate
    , draft : Bool
    }





-- CATEGORY

type alias Category =
    { id : String
    , name : String
    , display_name : String
    , description : String 
    , icon : String   
    }



-- LIKE

type alias Like =
    { id : String
    , total : Int
    }

