module Model exposing (..)

import Json.Encode as Encode
import Json.Decode as Decode
import Json.Decode.Pipeline as Pipeline

-- import DoubleSlider exposing (..)

-- PRODUCT
type alias Product =
    { id : String
    , name : String
    , display_name : String
    , description : String  
    , blog_description : String  
    , featured_image : String
    , draft : Bool
    , cta : String
    , price : Float
    , product_type : String
    , url : String
    , url_text : String 
    }

type alias ProductList = 
    List Product


-- PRODUCT ASSOC
type alias ProductAssoc =
    { id : String
    , name : String
    , display_name : String
    , description : String   
    , blog_description : String  
    , featured_image : String
    , draft : Bool
    , cta : String
    , price : Float
    , product_type : String
    , url : String
    , url_text : String

    , category: ProductCategory
    , sub_category: ProductSubCategory
    , product_tags: ProductTagList
    , product_comments: ProductCommentList
    , product_like: ProductLike
    }

type alias ProductAssocList =
    List ProductAssoc


-- PRODUCT PRIMARY CATEGORY
type alias ProductCategory =
    { id : String
    , name : String
    , display_name : String
    , description : String 
    , icon : String   
    }

type alias ProductCategoryList =
    List ProductCategory

-- PRODUCT SUB CATEGORY
type alias ProductSubCategory =
    { id : String
    , name : String
    , display_name : String
    , description : String   
    , icon : String 
    }

type alias ProductSubCategoryList =
    List ProductSubCategory    

-- PRODUCT TAG
type alias ProductTag =
    { id : String
    , name : String
    , display_name : String
    , description : String    
    }

type alias ProductTagList =
    List ProductTag

-- PRODUCT LIKE
type alias ProductLike =
        { id : String
        , total : Int
        }

-- PRODUCT COMMENT
type alias ProductComment =
    { id : String
    , text : String
    }

type alias ProductCommentList =
    List ProductComment


-- TYPE

type CategorySelection
    = Index
    | HomeOffice
    | Toys
    | Fashion
    | TV
    | Music
    | VideoGames


-- ROUTES

type Route
    = IndexRoute
    | HomeOfficeRoute
    | ToysRoute
    | FashionRoute
    | TVRoute
    | MusicRoute
    | VideoGamesRoute
    | NotFoundRoute



-- MODEL 

type alias Model = 
    -- Returned Products
    { productList : ProductAssocList

    -- All Categories/Sub/Tags
    , categories : ProductCategoryList
    , subCategories : ProductSubCategoryList
    , tags : ProductTagList
    
    -- , gridSelection : GridSelection
    , categorySelection : CategorySelection    
    
    , searchInput : String
    , popularQueries : (List String)

    -- , slider 

    -- Grid Queries
    -- , queryCategory : String
    -- , querySubCategory : String
    -- , queryType : String 

    -- Query 
    , queryTags : String 
    , combinedTagString : String
    
    , combinedQueryString : String

    -- Search Query 
    -- , querySearchInput : String 

    -- Errors 
    , error : String
    
    , route : Route
    }


-- Product Assoc Decoder

productAssocListDecoder : Decode.Decoder ProductAssocList
productAssocListDecoder =
    Decode.field "data" (Decode.list productAssocDecoder)

productAssocDecoder : Decode.Decoder ProductAssoc
productAssocDecoder =
    Pipeline.decode ProductAssoc
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string
        |> Pipeline.required "description" Decode.string
        |> Pipeline.required "blog_description" Decode.string
        |> Pipeline.required "featured_image" Decode.string
        |> Pipeline.required "draft" Decode.bool
        |> Pipeline.required "cta" Decode.string
        |> Pipeline.required "price" Decode.float
        |> Pipeline.required "product_type" Decode.string
        |> Pipeline.required "url" Decode.string
        |> Pipeline.required "url_text" Decode.string        

        |> Pipeline.required "category" productCategoryDecoder
        |> Pipeline.required "sub_category" productSubCategoryDecoder
        |> Pipeline.required "product_tags" productTagListDecoder
        |> Pipeline.required "product_comments" productCommentListDecoder
        |> Pipeline.required "product_like" productLikeDecoder
        

productCategoryDecoder : Decode.Decoder ProductCategory
productCategoryDecoder =
    Pipeline.decode ProductCategory
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string        
        |> Pipeline.required "icon" Decode.string        

productSubCategoryDecoder : Decode.Decoder ProductSubCategory
productSubCategoryDecoder =
    Pipeline.decode ProductSubCategory
        |> Pipeline.required "id" Decode.string
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string        
        |> Pipeline.required "icon" Decode.string        


productTagListDecoder : Decode.Decoder ProductTagList
productTagListDecoder =
    Decode.list productTagDecoder

productTagDecoder : Decode.Decoder ProductTag
productTagDecoder =
    Pipeline.decode ProductTag
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "name" Decode.string
        |> Pipeline.required "display_name" Decode.string        
        |> Pipeline.required "description" Decode.string        


productCommentListDecoder : Decode.Decoder ProductCommentList
productCommentListDecoder =
    Decode.list productCommentDecoder

productCommentDecoder : Decode.Decoder ProductComment
productCommentDecoder =
    Pipeline.decode ProductComment
        |> Pipeline.required "id" Decode.string        
        |> Pipeline.required "text" Decode.string


productLikeDecoder : Decode.Decoder ProductLike
productLikeDecoder =
    Pipeline.decode ProductLike
        |> Pipeline.required "id" Decode.string  
        |> Pipeline.required "total" Decode.int  





-- -- Product Decoder

-- productListDecoder : Decode.Decoder ProductList
-- productListDecoder =
--     Decode.field "data" (Decode.list productDecoder)

-- productDecoder : Decode.Decoder Product
-- productDecoder =
--     Pipeline.decode Product
--         |> Pipeline.required "id" Decode.string        
--         |> Pipeline.required "name" Decode.string
--         |> Pipeline.required "display_name" Decode.string        
--         |> Pipeline.required "description" Decode.string
--         |> Pipeline.required "blog_description" Decode.string        
--         |> Pipeline.required "featured_image" Decode.string
--         |> Pipeline.required "draft" Decode.bool
--         |> Pipeline.required "cta" Decode.string
--         |> Pipeline.required "price" Decode.float
--         |> Pipeline.required "product_type" Decode.string
--         |> Pipeline.required "url" Decode.string
--         |> Pipeline.required "url_text" Decode.string
        




-- product Encoder 

-- productListEncoder : productList -> Encode.Value
-- productListEncoder productList =
--         Encode.list (List.map productEncoder productList)

-- productEncoder : product -> Encode.Value
-- productEncoder product =
--         Encode.object [ ("user_id", Encode.string collection.user_id)
--                       , ("name", Encode.string collection.name)
--                       , ("id", Encode.string collection.id) 
--                       , ("featured_image", Encode.string collection.featured_image)
--                       , ("display_name", Encode.string collection.display_name)]


-- -- Image Encoder 

-- imageListEncoder : ImageList -> Encode.Value
-- imageListEncoder imageList =
--         Encode.list (List.map imageEncoder imageList)


-- imageEncoder : Image -> Encode.Value
-- imageEncoder image =
--         Encode.object [ ("name", Encode.string image.name)
--                       , ("image_url", Encode.string image.image_url)
--                       , ("id", Encode.string image.id) 
--                       , ("display_name", Encode.string image.display_name)]



-- -- Selected Collections Encoder 

-- selectedCollectionsListEncoder : CollectionList -> Encode.Value
-- selectedCollectionsListEncoder collectionList =
--         Encode.list (List.map selectedCollectionsEncoder collectionList)

-- selectedCollectionsEncoder : Collection -> Encode.Value
-- selectedCollectionsEncoder collection =
--         Encode.object [ ("id", Encode.string collection.id)]


-- Search Input Encoder 

searchInputEncoder : String -> Encode.Value
searchInputEncoder searchInput =    
        Encode.object [ ("search_input", Encode.string searchInput)]


tagListEncoder : ProductTagList -> Encode.Value
tagListEncoder tagList =
        Encode.list (List.map tagEncoder tagList)


tagEncoder : ProductTag -> Encode.Value
tagEncoder tag =
        Encode.object [ ("name", Encode.string tag.name)
                      , ("display_name", Encode.string tag.display_name)
                      , ("id", Encode.string tag.id) 
                      , ("display_name", Encode.string tag.display_name)]

