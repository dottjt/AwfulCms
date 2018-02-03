module Helper.UpdateHelper exposing (..)

import Model.ModelProduct exposing (..)
import Model.ModelMisc exposing (..)
import Model.ModelDevelopment exposing (..)

import Date exposing (..)
import Keyboard exposing (..)

import Helper.DateHelper exposing (..)
import Helper.DataEmptyHelper exposing (..)
import Helper.ConvertHelper exposing (..)

import Component.MultiSelect exposing (..)


convertServerAction : ServerAction -> String 
convertServerAction serverAction = 
  case serverAction of 
    StartServer ->
      "Start Server"
    RestartServer ->
      "Restart Server"
    StopServer ->
      "Stop Server"


convertCommandType : CommandType -> String 
convertCommandType commandType = 
  case commandType of 
    Development -> 
      "development"
    Production -> 
      "production" 
    DevelopmentAndProduction -> 
      "null"


stringToInt : String -> Result String Int
stringToInt script =
      String.toInt(script)


setInitialProductFormScheduleDateMaybe : Maybe Date -> ProductForm -> ProductForm   
setInitialProductFormScheduleDateMaybe date productForm =
    date |> Maybe.map (flip setInitialProductFormScheduleDate productForm) |> Maybe.withDefault productForm 
  

setInitialProductFormScheduleDate : Date -> ProductForm -> ProductForm   
setInitialProductFormScheduleDate date productForm =
  let 
    date_day = Date.day date
    date_month = Date.month date |> dateMonthToActualInt
    date_year = Date.year date

    schedule_datez = 
      { day = date_day
      , month = date_month 
      , year = date_year
      }
  in
    { productForm | schedule_date = schedule_datez }


setInitialUpdateFormScheduleDateMaybe : Maybe Date -> UpdateForm -> UpdateForm   
setInitialUpdateFormScheduleDateMaybe date updateForm =
    date |> Maybe.map (flip setInitialUpdateFormScheduleDate updateForm) |> Maybe.withDefault updateForm 


setInitialUpdateFormScheduleDate : Date -> UpdateForm -> UpdateForm   
setInitialUpdateFormScheduleDate date updateForm =
  let 
    date_day = Date.day date
    date_month = Date.month date |> dateMonthToActualInt
    date_year = Date.year date

    schedule_datez = 
      { day = date_day
      , month = date_month 
      , year = date_year
      }
  in
    { updateForm | schedule_date = schedule_datez }


setInitialSocialFormScheduleDateMaybe : Maybe Date -> SocialForm -> SocialForm   
setInitialSocialFormScheduleDateMaybe date socialForm =
    date |> Maybe.map (flip setInitialSocialFormScheduleDate socialForm) |> Maybe.withDefault socialForm 


setInitialSocialFormScheduleDate : Date -> SocialForm -> SocialForm   
setInitialSocialFormScheduleDate date socialForm =
  let 
    date_day = Date.day date
    date_month = Date.month date |> dateMonthToActualInt
    date_year = Date.year date

    schedule_datez = 
      { day = date_day
      , month = date_month 
      , year = date_year
      }
  in
    { socialForm | schedule_date = schedule_datez }




currentTaskGenerator : String -> CurrentTask 
currentTaskGenerator command =
       { name = command 
       , duration = 0
       }



incrementDuration : CurrentTask -> CurrentTask
incrementDuration record = 
  { record | duration = record.duration + 1 }



updateCategoryIdFromCategoriesList : ProductForm -> List Category -> ProductForm
updateCategoryIdFromCategoriesList productForm categoryList = 
    case List.head(categoryList) of
      Just category ->
        { productForm | category_id = category.id, category = category }
      
      Nothing -> 
        productForm 





-- { model | list = maybePrepend value model.list }
-- { model | list = Maybe.map (prependItemToList value) model.list }


-- maybePrepend : a -> Maybe (List a) -> Maybe (List a)
-- maybePrepend value maybeList =
--   case maybeList of 
--     Just list -> Just (prependItemToList value list)
--     Nothing -> Nothing 

-- prependItemToList : a -> List a -> List a
-- prependItemToList value list = 
--   value :: list 


maybePrepend : CurrentTask -> Maybe (List CurrentTask) -> Maybe (List CurrentTask)
maybePrepend value maybeList =
  case maybeList of 
    Just list -> Just (prependItemToList value list)
    Nothing -> Nothing 


prependItemToList : CurrentTask -> List CurrentTask -> List CurrentTask
prependItemToList value list = 
  value :: list 


createMultiSelectList : List TagAssoc -> List Item 
createMultiSelectList listTagAssoc =
  List.map (\tag -> { value = tag.id, text = tag.name, enabled = True } ) listTagAssoc


updateProductFormProductTags : List String -> ProductForm -> ProductForm 
updateProductFormProductTags tagAssocList productForm =
  { productForm | tag_id = tagAssocList }



deleteLastItemFromList : List KeyCode -> List KeyCode 
deleteLastItemFromList keysDown = 
  let 
    keysDownLength =
      (List.length keysDown) - 1
  in
    List.take keysDownLength keysDown





-- retrieve from ID functions 

retrieveTagFromId : List TagAssoc -> String -> TagForm
retrieveTagFromId tagAssocList itemId = 
    List.filter (\x -> x.id == itemId) tagAssocList
      |> List.head
      |> Maybe.withDefault emptyTagAssoc
      |> tagAssocToTagForm


retrieveProductAssocFromId : List ProductAssoc -> String -> ProductForm
retrieveProductAssocFromId productAssocList itemId = 
    List.filter (\x -> x.id == itemId) productAssocList
      |> List.head 
      |> Maybe.withDefault emptyProductAssoc
      |> productAssocToProductForm


retrieveSocialFromId : List Social -> String -> SocialForm
retrieveSocialFromId socialList itemId = 
    List.filter (\x -> x.id == itemId) socialList
      |> List.head 
      |> Maybe.withDefault emptySocial
      |> socialToSocialForm


retrieveUpdateFromId : List Update -> String -> UpdateForm
retrieveUpdateFromId updateList itemId = 
    List.filter (\x -> x.id == itemId) updateList
      |> List.head 
      |> Maybe.withDefault emptyUpdate
      |> updateToUpdateForm


retrievePostFromId : List PostAssoc -> String -> PostForm 
retrievePostFromId postList itemId = 
    List.filter (\x -> x.id == itemId) postList
      |> List.head 
      |> Maybe.withDefault emptyPostAssoc
      |> postAssocToProductForm


updateProductForm : NewProduct -> ProductForm 
updateProductForm newProduct =
    { display_name = ""
    , description = ""  
    , blog_description = ""  
    , original_featured_image = "" 
    , featured_image = newProduct.featured_image
    , draft = False
    , schedule_date = emptyScheduleDate
    , cta = "Save"
    , price = newProduct.price
    , url = newProduct.url
    , url_text = "" 
    , category = emptyCategory 
    , category_id = ""
    , tag_id = []
    , product_like = 0 
    , product_type = "general" 
    }

