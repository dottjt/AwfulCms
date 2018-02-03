module Helper.ValidationHelper exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelValidation exposing (..)
import Model.ModelBuild exposing (..)




intIsEmpty : Int -> Bool 
intIsEmpty item =
  case item of 
    0 -> 
      False 

    _ -> 
      True 

floatIsEmpty : Float -> Bool 
floatIsEmpty item =
  case item of 
    0.0 -> 
      False 

    _ -> 
      True 

  
productTypeIsEmpty : String -> Bool 
productTypeIsEmpty item =
  case item of 
    "general" -> 
      True 
    "featured" ->
      True
    "submission" ->
      True
    _ -> 
      False 
    
    





createStringValidation : Bool -> ValidationAlias
createStringValidation bool =
    { isEmpty = bool
    , validationMessage = "Please input a text value"
    , validationType = StringValidation 
    }

createIntValidation : Bool -> ValidationAlias
createIntValidation bool =
    { isEmpty = bool
    , validationMessage = "Please input a number value"
    , validationType = IntValidation 
    }

createFloatValidation : Bool -> ValidationAlias
createFloatValidation bool =
    { isEmpty = bool
    , validationMessage = "Please input a value"
    , validationType = FloatValidation 
    }

createBoolValidation : Bool -> ValidationAlias
createBoolValidation bool =
    { isEmpty = bool
    , validationMessage = "Please provide checkbox value"
    , validationType = BoolValidation 
    }

createTagIdValidation : Bool -> ValidationAlias
createTagIdValidation bool =
    { isEmpty = bool
    , validationMessage = "Please select tag values"
    , validationType = StringValidation 
    }
    

productFormValidationCheck : ProductFormValidation -> Bool 
productFormValidationCheck productFormValidation = 
  let 
    display_name_validated = 
      productFormValidation.display_name.isEmpty

    description_validated =
      productFormValidation.description.isEmpty

    blog_description_validated =
      productFormValidation.blog_description.isEmpty

    featured_image_validated =
      productFormValidation.featured_image.isEmpty

    cta_validated =
      productFormValidation.cta.isEmpty

    price_validated =
      productFormValidation.price.isEmpty

    url_validated =
      productFormValidation.url.isEmpty

    url_text_validated =
      productFormValidation.url_text.isEmpty

    tag_id_validated =
      productFormValidation.tag_id.isEmpty

    product_like_validated =
      productFormValidation.product_like.isEmpty

    productFormBoolList = 
      [ description_validated, blog_description_validated, featured_image_validated, cta_validated, price_validated, url_validated, url_text_validated, tag_id_validated, product_like_validated ]
        |> List.filter (\x -> x == True )
  in
    List.isEmpty productFormBoolList
    -- True - If list is empty, then it must be full of True values and hence everything is validated
        



productFormValidationUpdate : Model -> ProductForm -> ProductFormValidation
productFormValidationUpdate model productForm = 
  let 
    display_name_validated = 
      String.isEmpty productForm.display_name
        |> createStringValidation

    description_validated =
      String.isEmpty productForm.description
        |> createStringValidation

    blog_description_validated =
      String.isEmpty productForm.blog_description
        |> createStringValidation

    featured_image_validated =
      String.isEmpty productForm.featured_image
        |> createStringValidation

    cta_validated =
      String.isEmpty productForm.cta
        |> createStringValidation

    price_validated =
      String.isEmpty (toString productForm.price) 
        |> createFloatValidation

    url_validated =
      String.isEmpty productForm.url
        |> createStringValidation

    url_text_validated =
      String.isEmpty productForm.url_text
        |> createStringValidation

    tag_id_validated =
      List.isEmpty productForm.tag_id
        |> createTagIdValidation

    product_like_validated =
      String.isEmpty (toString productForm.product_like)
        |> createIntValidation

    productFormValidation =
      model.productFormValidation

  in
    { productFormValidation | display_name = display_name_validated, description = description_validated, blog_description = blog_description_validated, featured_image = featured_image_validated, cta = cta_validated, price = price_validated, url = url_validated, url_text = url_text_validated, tag_id = tag_id_validated, product_like = product_like_validated }






updateFormValidationCheck : UpdateFormValidation -> Bool
updateFormValidationCheck updateFormValidation = 
  let 
    display_name_validated =
      updateFormValidation.display_name.isEmpty
    title_validated =
      updateFormValidation.title.isEmpty
    excerpt_validated =
      updateFormValidation.excerpt.isEmpty
    author_validated =
      updateFormValidation.author.isEmpty

    updateFormBoolList = 
      [ display_name_validated, title_validated, excerpt_validated, author_validated ]
        |> List.filter (\x -> x == True )

  in
    List.isEmpty updateFormBoolList






updateFormValidationUpdate : Model -> UpdateForm -> UpdateFormValidation
updateFormValidationUpdate model updateForm = 
  let 
    display_name_validation =
      String.isEmpty updateForm.display_name
        |> createStringValidation

    title_validation =
      String.isEmpty updateForm.title
        |> createStringValidation

    excerpt_validation =
      String.isEmpty updateForm.excerpt
        |> createStringValidation

    author_validation =
      String.isEmpty updateForm.author
        |> createStringValidation

    updateFormValidation = 
      model.updateFormValidation

  in
    { updateFormValidation | display_name = display_name_validation, title = title_validation, excerpt = excerpt_validation, author = author_validation }







socialFormValidationCheck : SocialFormValidation -> Bool
socialFormValidationCheck socialFormValidation = 
  let 
    display_name_validation =
      socialFormValidation.display_name.isEmpty

    description_validation =
      socialFormValidation.description.isEmpty

    tags_validation =
      socialFormValidation.tags.isEmpty

    featured_image_validation =
      socialFormValidation.featured_image.isEmpty

    url_validation =
      socialFormValidation.url.isEmpty

    image_caption_validation =
      socialFormValidation.image_caption.isEmpty

    socialFormBoolList = 
      [ display_name_validation, description_validation, tags_validation, featured_image_validation, url_validation, image_caption_validation ]
        |> List.filter (\x -> x == True )

  in
    List.isEmpty socialFormBoolList
    -- True - If list is empty, then it must be full of True values and hence everything is validated






socialFormValidationUpdate : Model -> SocialForm -> SocialFormValidation
socialFormValidationUpdate model socialForm = 
  let 
    display_name_validation =
      String.isEmpty socialForm.display_name
        |> createStringValidation

    description_validation =
      String.isEmpty socialForm.description
        |> createStringValidation

    tags_validation =
      String.isEmpty socialForm.tags
        |> createStringValidation

    -- facebook_code_validation =
    --   String.isEmpty socialForm.facebook_code
    --     |> createStringValidation

    featured_image_validation =
      String.isEmpty socialForm.featured_image
        |> createStringValidation

    url_validation =
      String.isEmpty socialForm.url
        |> createStringValidation

    image_caption_validation =
      String.isEmpty socialForm.image_caption
        |> createStringValidation

    socialFormValidation =
      model.socialFormValidation

  in
    { socialFormValidation | display_name = display_name_validation, description = description_validation, tags = tags_validation, featured_image = featured_image_validation, url = url_validation, image_caption = image_caption_validation }





tagFormValidationCheck : TagFormValidation -> Bool
tagFormValidationCheck tagForm = 
  let 
    display_name_validation =
      tagForm.display_name.isEmpty

    description_validation =
      tagForm.description.isEmpty

    tagFormBoolList = 
      [ display_name_validation, description_validation ]
        |> List.filter (\x -> x == True )
      -- if list contains True, it is empty. We don't want True values.
      -- filter to keep all True values.
      -- if there are true values, then validation is correct

  in
    List.isEmpty tagFormBoolList




tagFormValidationUpdate : Model -> TagForm -> TagFormValidation
tagFormValidationUpdate model tagForm =
  let 
    display_name_validation =
      String.isEmpty tagForm.display_name
        |> createStringValidation

    description_validation =
      String.isEmpty tagForm.description
        |> createStringValidation
        
    tagFormValidation = 
      model.tagForm 

  in
    { tagFormValidation | display_name = display_name_validation, description = description_validation }



postFormValidationCheck : PostFormValidation -> Bool
postFormValidationCheck postFormValidation = 
  let 
    display_name_validation =
      postFormValidation.display_name.isEmpty

    author_validation =
      postFormValidation.author.isEmpty

    excerpt_validation =
      postFormValidation.excerpt.isEmpty

    featured_image_validation =
      postFormValidation.featured_image.isEmpty

    postFormBoolList = 
      [ display_name_validation, author_validation, excerpt_validation, featured_image_validation ]
        |> List.filter (\x -> x == True )

  in
    List.isEmpty postFormBoolList



postFormValidationUpdate : Model -> PostForm -> PostFormValidation
postFormValidationUpdate model postForm =
  let 
    display_name_validation =
      String.isEmpty postForm.display_name
        |> createStringValidation

    author_validation =
      String.isEmpty postForm.author
        |> createStringValidation

    excerpt_validation =
      String.isEmpty postForm.excerpt
        |> createStringValidation

    featured_image_validation =
      String.isEmpty postForm.featured_image
        |> createStringValidation

    postFormValidation = 
      model.postFormValidation

  in
    { postFormValidation | display_name = display_name_validation, author = author_validation, excerpt = excerpt_validation, featured_image = featured_image_validation }


buildFormValidationCheck : BuildFormValidation -> Bool
buildFormValidationCheck buildFormValidation = 
  let
    website_acronym_validation =
      buildFormValidation.website_acronym.isEmpty

    website_lower_validation =
      buildFormValidation.website_lower.isEmpty

    website_capital_validation =
      buildFormValidation.website_capital.isEmpty

    num_of_categories_validation =
      buildFormValidation.num_of_categories.isEmpty

    c1_name_validation =
      buildFormValidation.c1_name.isEmpty

    c1_display_name_validation =
      buildFormValidation.c1_display_name.isEmpty

    c1_model_validation =
      buildFormValidation.c1_model.isEmpty

    c1_icon_validation =
      buildFormValidation.c1_icon.isEmpty

    c2_name_validation =
      buildFormValidation.c2_name.isEmpty

    c2_display_name_validation =
      buildFormValidation.c2_display_name.isEmpty

    c2_model_validation =
      buildFormValidation.c2_model.isEmpty

    c2_icon_validation =
      buildFormValidation.c2_icon.isEmpty

    c3_name_validation =
      buildFormValidation.c3_name.isEmpty

    c3_display_name_validation =
      buildFormValidation.c3_display_name.isEmpty

    c3_model_validation =
      buildFormValidation.c3_model.isEmpty

    c3_icon_validation =
      buildFormValidation.c3_icon.isEmpty

    c4_name_validation =
      buildFormValidation.c4_name.isEmpty

    c4_display_name_validation =
      buildFormValidation.c4_display_name.isEmpty

    c4_model_validation =
      buildFormValidation.c4_model.isEmpty

    c4_icon_validation =
      buildFormValidation.c4_icon.isEmpty

    c5_name_validation =
      buildFormValidation.c5_name.isEmpty

    c5_display_name_validation =
      buildFormValidation.c5_display_name.isEmpty

    c5_model_validation =
      buildFormValidation.c5_model.isEmpty

    c5_icon_validation =
      buildFormValidation.c5_icon.isEmpty

    c6_name_validation =
      buildFormValidation.c6_name.isEmpty

    c6_display_name_validation =
      buildFormValidation.c6_display_name.isEmpty

    c6_model_validation =
      buildFormValidation.c6_model.isEmpty

    c6_icon_validation =
      buildFormValidation.c6_icon.isEmpty

    c7_name_validation =
      buildFormValidation.c7_name.isEmpty

    c7_display_name_validation =
      buildFormValidation.c7_display_name.isEmpty

    c7_model_validation =
      buildFormValidation.c7_model.isEmpty

    c7_icon_validation =
      buildFormValidation.c7_icon.isEmpty

    buildFormBoolList = 
      [ website_acronym_validation, website_lower_validation, website_capital_validation, num_of_categories_validation, c1_name_validation, c1_display_name_validation, c1_model_validation, c1_icon_validation, c2_name_validation, c2_display_name_validation, c2_model_validation, c2_icon_validation, c3_name_validation, c3_display_name_validation, c3_model_validation, c3_icon_validation, c4_name_validation, c4_display_name_validation, c4_model_validation, c4_icon_validation, c5_name_validation, c5_display_name_validation, c5_model_validation, c5_icon_validation, c6_name_validation, c6_display_name_validation, c6_model_validation, c6_icon_validation, c7_name_validation, c7_display_name_validation, c7_model_validation, c7_icon_validation ]
        |> List.filter (\x -> x == True)

  in 
    List.isEmpty buildFormBoolList



buildFormValidationUpdate : Model -> BuildForm -> BuildFormValidation
buildFormValidationUpdate model buildForm =
  let 
    website_acronym_validation =
      String.isEmpty buildForm.website_acronym
        |> createStringValidation

    website_lower_validation =
      String.isEmpty buildForm.website_lower
        |> createStringValidation

    website_capital_validation =
      String.isEmpty buildForm.website_capital
        |> createStringValidation

    num_of_categories_validation =
      String.isEmpty buildForm.num_of_categories
        |> createStringValidation

    c1_name_validation =
      String.isEmpty buildForm.c1_name
        |> createStringValidation

    c1_display_name_validation =
      String.isEmpty buildForm.c1_display_name
        |> createStringValidation

    c1_model_validation =
      String.isEmpty buildForm.c1_model
        |> createStringValidation

    c1_icon_validation =
      String.isEmpty buildForm.c1_icon
        |> createStringValidation

    c2_name_validation =
      String.isEmpty buildForm.c2_name
        |> createStringValidation

    c2_display_name_validation =
      String.isEmpty buildForm.c2_display_name
        |> createStringValidation

    c2_model_validation =
      String.isEmpty buildForm.c2_model
        |> createStringValidation

    c2_icon_validation =
      String.isEmpty buildForm.c2_icon
        |> createStringValidation

    c3_name_validation =
      String.isEmpty buildForm.c3_name
        |> createStringValidation

    c3_display_name_validation =
      String.isEmpty buildForm.c3_display_name
        |> createStringValidation

    c3_model_validation =
      String.isEmpty buildForm.c3_model
        |> createStringValidation

    c3_icon_validation =
      String.isEmpty buildForm.c3_icon
        |> createStringValidation

    c4_name_validation =
      String.isEmpty buildForm.c4_name
        |> createStringValidation

    c4_display_name_validation =
      String.isEmpty buildForm.c4_display_name
        |> createStringValidation

    c4_model_validation =
      String.isEmpty buildForm.c4_model
        |> createStringValidation

    c4_icon_validation =
      String.isEmpty buildForm.c4_icon
        |> createStringValidation

    c5_name_validation =
      String.isEmpty buildForm.c5_name
        |> createStringValidation

    c5_display_name_validation =
      String.isEmpty buildForm.c5_display_name
        |> createStringValidation

    c5_model_validation =
      String.isEmpty buildForm.c5_model
        |> createStringValidation

    c5_icon_validation =
      String.isEmpty buildForm.c5_icon
        |> createStringValidation

    c6_name_validation =
      String.isEmpty buildForm.c6_name
        |> createStringValidation

    c6_display_name_validation =
      String.isEmpty buildForm.c6_display_name
        |> createStringValidation

    c6_model_validation =
      String.isEmpty buildForm.c6_model
        |> createStringValidation

    c6_icon_validation =
      String.isEmpty buildForm.c6_icon
        |> createStringValidation

    c7_name_validation =
      String.isEmpty buildForm.c7_name
        |> createStringValidation

    c7_display_name_validation =
      String.isEmpty buildForm.c7_display_name
        |> createStringValidation

    c7_model_validation =
      String.isEmpty buildForm.c7_model
        |> createStringValidation

    c7_icon_validation =
      String.isEmpty buildForm.c7_icon
        |> createStringValidation
        
  in
    { buildForm | website_acronym = website_acronym_validation, website_lower = website_lower_validation, website_capital = website_capital_validation, num_of_categories = num_of_categories_validation, c1_name = c1_name_validation, c1_display_name = c1_display_name_validation, c1_model = c1_model_validation, c1_icon = c1_icon_validation, c2_name = c2_name_validation, c2_display_name = c2_display_name_validation, c2_model = c2_model_validation, c2_icon = c2_icon_validation, c3_name = c3_name_validation, c3_display_name = c3_display_name_validation, c3_model = c3_model_validation, c3_icon = c3_icon_validation, c4_name = c4_name_validation, c4_display_name = c4_display_name_validation, c4_model = c4_model_validation, c4_icon = c4_icon_validation, c5_name = c5_name_validation, c5_display_name = c5_display_name_validation, c5_model = c5_model_validation, c5_icon = c5_icon_validation, c6_name = c6_name_validation, c6_display_name = c6_display_name_validation, c6_model = c6_model_validation, c6_icon = c6_icon_validation, c7_name = c7_name_validation, c7_display_name = c7_display_name_validation, c7_model = c7_model_validation, c7_icon = c7_icon_validation } 