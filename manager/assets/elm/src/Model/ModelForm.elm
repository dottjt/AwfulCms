module Model.ModelForm exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelConfig exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelBuild exposing (..)


setBuildField : Model -> BuildFormField -> String -> Model 
setBuildField model field value =
  case field of 

    WebsiteAcronym -> 
      value 
      |> asWebsiteAcronymIn model.buildForm
      |> asBuildFormIn model

    WebsiteLower -> 
      value 
      |> asWebsiteLowerIn model.buildForm
      |> asBuildFormIn model

    WebsiteCapital -> 
      value 
      |> asWebsiteCapitalIn model.buildForm
      |> asBuildFormIn model

    NumOfCategories -> 
      value 
      |> asNumOfCategoriesIn model.buildForm
      |> asBuildFormIn model

    C2Name -> 
      value 
      |> asC2NameIn model.buildForm
      |> asBuildFormIn model

    C2DisplayName -> 
      value 
      |> asC2DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C2Model -> 
      value 
      |> asC2ModelIn model.buildForm
      |> asBuildFormIn model

    C2Icon -> 
      value 
      |> asC2IconIn model.buildForm
      |> asBuildFormIn model

    C4Name -> 
      value 
      |> asC4NameIn model.buildForm
      |> asBuildFormIn model

    C4DisplayName -> 
      value 
      |> asC4DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C4Model -> 
      value 
      |> asC4ModelIn model.buildForm
      |> asBuildFormIn model

    C4Icon -> 
      value 
      |> asC4IconIn model.buildForm
      |> asBuildFormIn model

    C6Name -> 
      value 
      |> asC6NameIn model.buildForm
      |> asBuildFormIn model

    C6DisplayName -> 
      value 
      |> asC6DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C6Model -> 
      value 
      |> asC6ModelIn model.buildForm
      |> asBuildFormIn model

    C6Icon -> 
      value 
      |> asC6IconIn model.buildForm
      |> asBuildFormIn model

    C1Name -> 
      value 
      |> asC1NameIn model.buildForm
      |> asBuildFormIn model

    C1DisplayName -> 
      value 
      |> asC1DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C1Model -> 
      value 
      |> asC1ModelIn model.buildForm
      |> asBuildFormIn model

    C1Icon -> 
      value 
      |> asC1IconIn model.buildForm
      |> asBuildFormIn model

    C3Name -> 
      value 
      |> asC3NameIn model.buildForm
      |> asBuildFormIn model

    C3DisplayName -> 
      value 
      |> asC3DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C3Model -> 
      value 
      |> asC3ModelIn model.buildForm
      |> asBuildFormIn model

    C3Icon -> 
      value 
      |> asC3IconIn model.buildForm
      |> asBuildFormIn model

    C5Name -> 
      value 
      |> asC5NameIn model.buildForm
      |> asBuildFormIn model

    C5DisplayName -> 
      value 
      |> asC5DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C5Model -> 
      value 
      |> asC5ModelIn model.buildForm
      |> asBuildFormIn model

    C5Icon -> 
      value 
      |> asC5IconIn model.buildForm
      |> asBuildFormIn model

    C7Name -> 
      value 
      |> asC7NameIn model.buildForm
      |> asBuildFormIn model

    C7DisplayName -> 
      value 
      |> asC7DisplayNameIn model.buildForm
      |> asBuildFormIn model

    C7Model -> 
      value 
      |> asC7ModelIn model.buildForm
      |> asBuildFormIn model

    C7Icon -> 
      value 
      |> asC7IconIn model.buildForm
      |> asBuildFormIn model


setCommonEnvField : Model -> CommonEnvFormField -> String -> Model
setCommonEnvField model field value =
    case field of 
        CommonEnvFormMailgunKey ->
            value
            |> asCommonEnvFormMailgunKeyIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormAmazonAssociateTag ->
            value
            |> asCommonEnvFormAmazonAssociateTagIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormAwsAccessKeyId ->
            value
            |> asCommonEnvFormAwsAccessKeyIdIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormAwsSecretAccessKey ->
            value
            |> asCommonEnvFormAwsSecretAccessKeyIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormMarketplaceHost ->
            value
            |> asCommonEnvFormMarketplaceHostIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormAmazonS3AccessKey ->
            value
            |> asCommonEnvFormAmazonS3AccessKeyIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormAmazonS3SecretAccessKey ->
            value
            |> asCommonEnvFormAmazonS3SecretAccessKeyIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormEtsyApiKey ->
            value
            |> asCommonEnvFormEtsyApiKeyIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormEtsySecretKey ->
            value
            |> asCommonEnvFormEtsySecretKeyIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormTumblrAccessToken ->
            value
            |> asCommonEnvFormTumblrAccessTokenIn model.commonEnvData
            |> asCommonEnvDataIn model

        CommonEnvFormTumblrAccessTokenSecret ->
            value
            |> asCommonEnvFormTumblrAccessTokenSecretIn model.commonEnvData
            |> asCommonEnvDataIn model


setIndividualEnvField : Model -> IndividualEnvFormField -> String -> Model
setIndividualEnvField model field value =
    case field of 
        IndividualEnvFormMailgunDomain ->
            value
            |> asIndividualEnvFormMailgunDomainIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormAmazonS3BucketName ->
            value
            |> asIndividualEnvFormAmazonS3BucketNameIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormRecaptchaPublicKey ->
            value
            |> asIndividualEnvFormRecaptchaPublicKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormRecaptchaPrivateKey ->
            value
            |> asIndividualEnvFormRecaptchaPrivateKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTwitterApiKey ->
            value
            |> asIndividualEnvFormTwitterApiKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTwitterSecretKey ->
            value
            |> asIndividualEnvFormTwitterSecretKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTwitterAccessToken ->
            value
            |> asIndividualEnvFormTwitterAccessTokenIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTwitterAccessTokenSecret ->
            value
            |> asIndividualEnvFormTwitterAccessTokenSecretIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormFacebookApiKey ->
            value
            |> asIndividualEnvFormFacebookApiKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormFacebookSecretKey ->
            value
            |> asIndividualEnvFormFacebookSecretKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormFacebookPageId ->
            value
            |> asIndividualEnvFormFacebookPageIdIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormFacebookRedirectUrl ->
            value
            |> asIndividualEnvFormFacebookRedirectUrlIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTumblrApiKey ->
            value
            |> asIndividualEnvFormTumblrApiKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTumblrSecretKey ->
            value
            |> asIndividualEnvFormTumblrSecretKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormTumblrBlogIdentifier ->
            value
            |> asIndividualEnvFormTumblrBlogIdentifierIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormPintrestApiKey ->
            value
            |> asIndividualEnvFormPintrestApiKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model

        IndividualEnvFormPintrestSecretKey ->
            value 
            |> asIndividualEnvFormPintrestSecretKeyIn model.individualEnvData
            |> asIndividualEnvDataIn model



setConfigField : Model -> ConfigFormField -> String -> Model
setConfigField model field value =
    case field of 
        ConfigFormWebsiteTitle ->
            value
            |> asConfigFormWebsiteTitleIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteDescription ->
            value
            |> asConfigFormWebsiteDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteKeywords ->
            value
            |> asConfigFormWebsiteKeywordsIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteTwitter ->
            value
            |> asConfigFormWebsiteTwitterIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteAltImage ->
            value
            |> asConfigFormWebsiteAltImageIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormBlogMetaDescription ->
            value
            |> asConfigFormBlogMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormCategoriesMetaDescription ->
            value
            |> asConfigFormCategoriesMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormUpdatesMetaDescription ->
            value
            |> asConfigFormUpdatesMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormAboutMetaDescription ->
            value
            |> asConfigFormAboutMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormContactMetaDescription ->
            value
            |> asConfigFormContactMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormSubmitMetaDescription ->
            value
            |> asConfigFormSubmitMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormLoginMetaDescription ->
            value
            |> asConfigFormLoginMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormRegisterMetaDescription ->
            value
            |> asConfigFormRegisterMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormSearchMetaDescription ->
            value
            |> asConfigFormSearchMetaDescriptionIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormAboutCopy ->
            value
            |> asConfigFormAboutCopyIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormSubmitCopy ->
            value
            |> asConfigFormSubmitCopyIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormLetterCopy ->
            value
            |> asConfigFormLetterCopyIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteAcronym ->
            value
            |> asConfigFormWebsiteAcronymIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteName ->
            value
            |> asConfigFormWebsiteNameIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteNameLower ->
            value
            |> asConfigFormWebsiteNameLowerIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteDomain ->
            value
            |> asConfigFormWebsiteDomainIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteLogoPng ->
            value
            |> asConfigFormWebsiteLogoPngIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteLogoSvg ->
            value
            |> asConfigFormWebsiteLogoSvgIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormWebsiteFavicon ->
            value
            |> asConfigFormWebsiteFaviconIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormGoogleAnalyticsTrackingId ->
            value
            |> asConfigFormGoogleAnalyticsTrackingIdIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormGoogleSiteVerification ->
            value
            |> asConfigFormGoogleSiteVerificationIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormPrimaryEmail ->
            value
            |> asConfigFormPrimaryEmailIn model.configEnvData
            |> asConfigFormIn model

        ConfigFormPassword ->
            value
            |> asConfigFormPasswordIn model.configEnvData
            |> asConfigFormIn model


setProductsStringField : Model -> ProductFormField -> String -> Model
setProductsStringField model field value =
    case field of
        ProductFormDisplayName ->
            let 
              productForm = model.productForm 
              newProductForm = 
                { productForm | display_name = value }
              
              input_count = 
                String.length value
                  |> (-) 35
            in
              { model | productForm = newProductForm, productFormDisplayNameCount = (Just input_count) }

            -- value
            -- |> asProductFormDisplayNameIn model.productForm
            -- |> asProductFormIn model

        ProductFormDescription ->
            let 
              productForm = model.productForm 
              newProductForm = 
                { productForm | description = value }
              
              input_count = 
                String.length value
                  |> (-) 90
            in
              { model | productForm = newProductForm, productFormDescriptionCount = (Just input_count) }

            -- value
            -- |> asProductFormDescriptionIn model.productForm
            -- |> asProductFormIn model

        ProductFormBlogDescription ->
            let 
              productForm = model.productForm 
              newProductForm = 
                { productForm | blog_description = value }
              
              input_count = 
                String.length value
                  |> (-) 90
            in
              { model | productForm = newProductForm, productFormBlogDescriptionCount = (Just input_count) }


            -- value
            -- |> asProductFormBlogDescriptionIn model.productForm
            -- |> asProductFormIn model

        -- ProductFormScheduleDate -> -- it does not use this to update datePicker
        --     value
        --     |> asProductFormScheduleDateIn model.productForm
        --     |> asProductFormIn model

        -- ProductFormCategoryId ->
        --     value
        --     |> asProductFormCategoryIdIn model.productForm
        --     |> asProductFormIn model

        -- ProductFormTagId ->
        --     value
        --     |> asProductFormTagIdIn model.productForm
        --     |> asProductFormIn model

        ProductFormOriginalFeaturedImage ->
            value
            |> asProductFormOriginalFeaturedImageIn model.productForm
            |> asProductFormIn model

        ProductFormUrl ->
            value
            |> asProductFormUrlIn model.productForm
            |> asProductFormIn model

        ProductFormUrlText ->
            value
            |> asProductFormUrlTextIn model.productForm
            |> asProductFormIn model

        ProductFormFeaturedImage ->
            value
            |> asProductFormFeaturedImageIn model.productForm
            |> asProductFormIn model

        ProductFormCta ->
            value
            |> asProductFormCtaIn model.productForm
            |> asProductFormIn model

        ProductFormProductType ->
            value
            |> asProductFormProductTypeIn model.productForm
            |> asProductFormIn model
        _ -> 
            model

setProductsBoolField : Model -> ProductFormField -> Bool -> Model
setProductsBoolField model field value =
    case field of
        ProductFormDraft ->
            value
            |> asProductFormDraftIn model.productForm
            |> asProductFormIn model
        _ -> 
            model

setProductsIntField : Model -> ProductFormField -> Result error Int -> Model
setProductsIntField model field value =
    case value of
        Ok newValue ->        
            case field of        
                ProductFormLikeTotal ->
                    newValue
                    |> asProductFormLikeTotalIn model.productForm
                    |> asProductFormIn model
                _ -> 
                    model 
        Err error ->
            model 

setProductsFloatField : Model -> ProductFormField -> Result error Float -> Model
setProductsFloatField model field value =
    case value of
        Ok newValue ->        
            case field of
                ProductFormPrice ->
                    newValue
                    |> asProductFormPriceIn model.productForm
                    |> asProductFormIn model
                _ -> 
                    model 
        Err error -> 
            model

-- setProductsTagField : Model -> ProductFormField -> List Tag -> Model
-- setProductsTagField model field value =
--     case field of
--         ProductFormTag ->
--             value
--             |> asProductFormTagIn model.productForm
--             |> asProductFormIn model

--         _ -> 
--             model 


setProductsCategoryIdField : Model -> ProductFormField -> String -> Model
setProductsCategoryIdField model field value =
    case field of
      ProductFormCategory ->
          value
          |> asProductFormCategoryIn model.productForm
          |> asProductFormIn model
      _ -> 
          model 



setPostsStringField : Model -> PostFormField -> String -> Model
setPostsStringField model field value =
    case field of
        PostFormDisplayName ->
            value
            |> asPostFormDisplayNameIn model.postForm
            |> asPostFormIn model

        PostFormAuthor ->
            value
            |> asPostFormAuthorIn model.postForm
            |> asPostFormIn model

        PostFormExcerpt ->
            value
            |> asPostFormExcerptIn model.postForm
            |> asPostFormIn model

        PostFormPostType ->
            value
            |> asPostFormPostTypeIn model.postForm
            |> asPostFormIn model

        -- PostFormTagId ->
        --     value
        --     |> asPostFormTagIdIn model.postForm
        --     |> asPostFormIn model

        PostFormFeaturedImage ->
            value
            |> asPostFormFeaturedImageIn model.postForm
            |> asPostFormIn model

        _ ->
            model 

setPostsIntField : Model -> PostFormField -> Result String Int -> Model
setPostsIntField model field value =
    case value of
        Ok newValue ->        
            case field of
                PostFormProductLimit ->
                    Just newValue
                    |> asPostFormProductLimitIn model.postForm
                    |> asPostFormIn model

                PostFormProductOffset ->
                    Just newValue
                    |> asPostFormProductOffsetIn model.postForm
                    |> asPostFormIn model

                _ ->
                    model
        Err error ->
            model 

setPostsTagField : Model -> PostFormField -> Maybe Tag -> Model
setPostsTagField model field value =
    case field of
        PostFormTag ->
            value
            |> asPostFormTagIn model.postForm
            |> asPostFormIn model
        _ -> 
          model



setSocialStringField : Model -> SocialFormField -> String -> Model
setSocialStringField model field value =
    case field of
        SocialFormDisplayName ->
            value
            |> asSocialFormDisplayNameIn model.socialForm
            |> asSocialFormIn model

        SocialFormDescription ->
            value
            |> asSocialFormDescriptionIn model.socialForm
            |> asSocialFormIn model

        SocialFormTags ->
            value
            |> asSocialFormTagsIn model.socialForm
            |> asSocialFormIn model

        SocialFormFacebookCode ->
            value
            |> asSocialFormFacebookCodeIn model.socialForm
            |> asSocialFormIn model

        SocialFormFeaturedImage ->
            value
            |> asSocialFormFeaturedImageIn model.socialForm
            |> asSocialFormIn model

        SocialFormUrl ->
            value
            |> asSocialFormUrlIn model.socialForm
            |> asSocialFormIn model

        SocialFormImageCaption ->
            value
            |> asSocialFormImageCaptionIn model.socialForm
            |> asSocialFormIn model

        SocialFormSocialMediaType ->
            value
            |> asSocialFormSocialMediaTypeIn model.socialForm
            |> asSocialFormIn model
        _ -> 
            model 

setSocialBoolField : Model -> SocialFormField -> Bool -> Model
setSocialBoolField model field value =
    case field of
        SocialFormDraft ->
            value
            |> asSocialFormDraftIn model.socialForm
            |> asSocialFormIn model
        _ ->
            model

setTagsField : Model -> TagFormField -> String -> Model
setTagsField model field value =
    case field of
        TagFormDisplayName ->
            value
            |> asTagFormDisplayNameIn model.tagForm
            |> asTagFormIn model

        TagFormDescription ->
            value
            |> asTagFormDescriptionIn model.tagForm
            |> asTagFormIn model
        
        NoTagFormField ->
            model 


setUpdatesField : Model -> UpdateFormField -> String -> Model
setUpdatesField model field value =
    case field of
        UpdateFormDisplayName ->
            value
            |> asUpdateFormDisplayNameIn model.updateForm
            |> asUpdateFormIn model

        UpdateFormTitle ->
            value
            |> asUpdateFormTitleIn model.updateForm
            |> asUpdateFormIn model

        UpdateFormExcerpt ->
            value
            |> asUpdateFormExcerptIn model.updateForm
            |> asUpdateFormIn model

        UpdateFormAuthor ->
            value
            |> asUpdateFormAuthorIn model.updateForm
            |> asUpdateFormIn model
        NoUpdateFormField ->
            model 


-- OLD HEAD 


setCommonEnvData : CommonEnvData -> Model -> Model
setCommonEnvData commonEnvData model =
  { model | commonEnvData = commonEnvData }

asCommonEnvDataIn : Model -> CommonEnvData -> Model
asCommonEnvDataIn =
  flip setCommonEnvData 


setIndividualEnvData : IndividualEnvData -> Model -> Model
setIndividualEnvData individualEnvData model =
  { model | individualEnvData = individualEnvData }

asIndividualEnvDataIn : Model -> IndividualEnvData -> Model
asIndividualEnvDataIn =
  flip setIndividualEnvData 


setConfigForm : ConfigEnvData -> Model -> Model
setConfigForm newProducts model =
  { model | configEnvData = newProducts }

asConfigFormIn : Model -> ConfigEnvData -> Model
asConfigFormIn =
  flip setConfigForm


setBuildForm : BuildForm -> Model -> Model
setBuildForm newProducts model =
  { model | buildForm = newProducts }

asBuildFormIn : Model -> BuildForm -> Model
asBuildFormIn =
  flip setBuildForm


-- NEW HEAD 


setProductForm : ProductForm -> Model -> Model
setProductForm newProducts model =
  { model | productForm = newProducts }

asProductFormIn : Model -> ProductForm -> Model
asProductFormIn =
  flip setProductForm 

setPostForm : PostForm -> Model -> Model
setPostForm newPosts model =
  { model | postForm = newPosts }

asPostFormIn : Model -> PostForm -> Model
asPostFormIn =
  flip setPostForm 

setSocialForm : SocialForm -> Model -> Model
setSocialForm newSocial model =
  { model | socialForm = newSocial }

asSocialFormIn : Model -> SocialForm -> Model
asSocialFormIn =
  flip setSocialForm 

setTagForm : TagForm -> Model -> Model
setTagForm newTags model =
  { model | tagForm = newTags }

asTagFormIn : Model -> TagForm -> Model
asTagFormIn =
  flip setTagForm 

setUpdateForm : UpdateForm -> Model -> Model
setUpdateForm newUpdates model =
  { model | updateForm = newUpdates }

asUpdateFormIn : Model -> UpdateForm -> Model
asUpdateFormIn =
  flip setUpdateForm 



-- NEW PRODUCTS

setProductFormDisplayName : String -> ProductForm -> ProductForm
setProductFormDisplayName new newProducts =
  -- let 
  --   input_count = 
  --     String.length new
  --       |> (-) 35
  -- in, productFormDisplayNameCount = input_count 
    { newProducts | display_name = new}

asProductFormDisplayNameIn : ProductForm -> String -> ProductForm
asProductFormDisplayNameIn =
    flip setProductFormDisplayName

setProductFormDescription : String -> ProductForm -> ProductForm
setProductFormDescription new newProducts =
  -- 90
    { newProducts | description = new }

asProductFormDescriptionIn : ProductForm -> String -> ProductForm
asProductFormDescriptionIn =
    flip setProductFormDescription

setProductFormBlogDescription : String -> ProductForm -> ProductForm
setProductFormBlogDescription new newProducts =
    { newProducts | blog_description = new }

asProductFormBlogDescriptionIn : ProductForm -> String -> ProductForm
asProductFormBlogDescriptionIn =
    flip setProductFormBlogDescription

setProductFormDraft : Bool -> ProductForm -> ProductForm
setProductFormDraft new newProducts =
    { newProducts | draft = not newProducts.draft }

asProductFormDraftIn : ProductForm -> Bool -> ProductForm
asProductFormDraftIn =
    flip setProductFormDraft

setProductFormScheduleDate : ScheduleDate -> ProductForm -> ProductForm
setProductFormScheduleDate new newProducts =
    { newProducts | schedule_date = new }

asProductFormScheduleDateIn : ProductForm -> ScheduleDate -> ProductForm
asProductFormScheduleDateIn =
    flip setProductFormScheduleDate

setProductFormCategory : String -> ProductForm -> ProductForm
setProductFormCategory new newProducts =
    { newProducts | category_id = new }

asProductFormCategoryIn : ProductForm -> String -> ProductForm
asProductFormCategoryIn =
    flip setProductFormCategory

-- setProductFormTag : List Tag -> ProductForm -> ProductForm
-- setProductFormTag new newProducts =
--     { newProducts | tag_id = new }

-- asProductFormTagIn : ProductForm -> List Tag -> ProductForm
-- asProductFormTagIn =
--     flip setProductFormTag

setProductFormOriginalFeaturedImage : String -> ProductForm -> ProductForm
setProductFormOriginalFeaturedImage new newProducts =
    { newProducts | original_featured_image = new }

asProductFormOriginalFeaturedImageIn : ProductForm -> String -> ProductForm
asProductFormOriginalFeaturedImageIn =
    flip setProductFormOriginalFeaturedImage

setProductFormUrl : String -> ProductForm -> ProductForm
setProductFormUrl new newProducts =
    { newProducts | url = new }

asProductFormUrlIn : ProductForm -> String -> ProductForm
asProductFormUrlIn =
    flip setProductFormUrl

setProductFormUrlText : String -> ProductForm -> ProductForm
setProductFormUrlText new newProducts =
    { newProducts | url_text = new }

asProductFormUrlTextIn : ProductForm -> String -> ProductForm
asProductFormUrlTextIn =
    flip setProductFormUrlText

setProductFormFeaturedImage : String -> ProductForm -> ProductForm
setProductFormFeaturedImage new newProducts =
    { newProducts | featured_image = new }

asProductFormFeaturedImageIn : ProductForm -> String -> ProductForm
asProductFormFeaturedImageIn =
    flip setProductFormFeaturedImage

setProductFormPrice : Float -> ProductForm -> ProductForm
setProductFormPrice new newProducts =
    { newProducts | price = new }

asProductFormPriceIn : ProductForm -> Float -> ProductForm
asProductFormPriceIn =
    flip setProductFormPrice

setProductFormCta : String -> ProductForm -> ProductForm
setProductFormCta new newProducts =
    { newProducts | cta = new }

asProductFormCtaIn : ProductForm -> String -> ProductForm
asProductFormCtaIn =
    flip setProductFormCta

setProductFormLikeTotal : Int -> ProductForm -> ProductForm
setProductFormLikeTotal new newProducts =
    { newProducts | product_like = new }

asProductFormLikeTotalIn : ProductForm -> Int -> ProductForm
asProductFormLikeTotalIn =
    flip setProductFormLikeTotal

setProductFormProductType : String -> ProductForm -> ProductForm
setProductFormProductType new newProducts =
    { newProducts | product_type = new }

asProductFormProductTypeIn : ProductForm -> String -> ProductForm
asProductFormProductTypeIn =
    flip setProductFormProductType



-- NEW POSTS 

setPostFormDisplayName : String -> PostForm -> PostForm
setPostFormDisplayName new newPosts =
    { newPosts | display_name = new }

asPostFormDisplayNameIn : PostForm -> String -> PostForm
asPostFormDisplayNameIn =
    flip setPostFormDisplayName

setPostFormAuthor : String -> PostForm -> PostForm
setPostFormAuthor new newPosts =
    { newPosts | author = new }

asPostFormAuthorIn : PostForm -> String -> PostForm
asPostFormAuthorIn =
    flip setPostFormAuthor

setPostFormExcerpt : String -> PostForm -> PostForm
setPostFormExcerpt new newPosts =
    { newPosts | excerpt = new }

asPostFormExcerptIn : PostForm -> String -> PostForm
asPostFormExcerptIn =
    flip setPostFormExcerpt

setPostFormFeaturedImage : String -> PostForm -> PostForm
setPostFormFeaturedImage new newPosts =
    { newPosts | featured_image = new }

asPostFormFeaturedImageIn : PostForm -> String -> PostForm
asPostFormFeaturedImageIn =
    flip setPostFormFeaturedImage

setPostFormPostType : String -> PostForm -> PostForm
setPostFormPostType new newPosts =
    { newPosts | post_type = new }

asPostFormPostTypeIn : PostForm -> String -> PostForm
asPostFormPostTypeIn =
    flip setPostFormPostType

setPostFormTag : Maybe Tag -> PostForm -> PostForm
setPostFormTag new newPosts =
    { newPosts | tag = new }

asPostFormTagIn : PostForm -> Maybe Tag -> PostForm
asPostFormTagIn =
    flip setPostFormTag

setPostFormProductLimit : Maybe Int -> PostForm -> PostForm
setPostFormProductLimit new newPosts =
    { newPosts | product_limit = new }

asPostFormProductLimitIn : PostForm -> Maybe Int -> PostForm
asPostFormProductLimitIn =
    flip setPostFormProductLimit

setPostFormProductOffset : Maybe Int -> PostForm -> PostForm
setPostFormProductOffset new newPosts =
    { newPosts | product_offset = new }

asPostFormProductOffsetIn : PostForm -> Maybe Int -> PostForm
asPostFormProductOffsetIn =
    flip setPostFormProductOffset


-- NEW SOCIAL

setSocialFormDisplayName : String -> SocialForm -> SocialForm
setSocialFormDisplayName new newSocial =
    { newSocial | display_name = new }

asSocialFormDisplayNameIn : SocialForm -> String -> SocialForm 
asSocialFormDisplayNameIn = 
    flip setSocialFormDisplayName

setSocialFormDescription : String -> SocialForm -> SocialForm
setSocialFormDescription new newSocial =
    { newSocial | description = new }

asSocialFormDescriptionIn : SocialForm -> String -> SocialForm 
asSocialFormDescriptionIn = 
    flip setSocialFormDescription

setSocialFormTags : String -> SocialForm -> SocialForm
setSocialFormTags new newSocial =
    { newSocial | tags = new }

asSocialFormTagsIn : SocialForm -> String -> SocialForm 
asSocialFormTagsIn = 
    flip setSocialFormTags

setSocialFormDraft : Bool -> SocialForm -> SocialForm
setSocialFormDraft new newSocial =
    { newSocial | draft = not newSocial.draft }

asSocialFormDraftIn : SocialForm -> Bool -> SocialForm 
asSocialFormDraftIn = 
    flip setSocialFormDraft

setSocialFormFacebookCode : String -> SocialForm -> SocialForm
setSocialFormFacebookCode new newSocial =
    { newSocial | facebook_code = new }

asSocialFormFacebookCodeIn : SocialForm -> String -> SocialForm 
asSocialFormFacebookCodeIn = 
    flip setSocialFormFacebookCode

setSocialFormFeaturedImage : String -> SocialForm -> SocialForm
setSocialFormFeaturedImage new newSocial =
    { newSocial | featured_image = new }

asSocialFormFeaturedImageIn : SocialForm -> String -> SocialForm 
asSocialFormFeaturedImageIn = 
    flip setSocialFormFeaturedImage

setSocialFormUrl : String -> SocialForm -> SocialForm
setSocialFormUrl new newSocial =
    { newSocial | url = new }

asSocialFormUrlIn : SocialForm -> String -> SocialForm 
asSocialFormUrlIn = 
    flip setSocialFormUrl

setSocialFormImageCaption : String -> SocialForm -> SocialForm
setSocialFormImageCaption new newSocial =
    { newSocial | image_caption = new }

asSocialFormImageCaptionIn : SocialForm -> String -> SocialForm 
asSocialFormImageCaptionIn = 
    flip setSocialFormImageCaption

setSocialFormSocialMediaType : String -> SocialForm -> SocialForm
setSocialFormSocialMediaType new newSocial =
    { newSocial | social_media_type = new }

asSocialFormSocialMediaTypeIn : SocialForm -> String -> SocialForm 
asSocialFormSocialMediaTypeIn = 
    flip setSocialFormSocialMediaType



-- NEW TAGS 

setTagFormDisplayName : String -> TagForm -> TagForm
setTagFormDisplayName new newTags =
    { newTags | display_name = new }

asTagFormDisplayNameIn : TagForm -> String -> TagForm
asTagFormDisplayNameIn =
    flip setTagFormDisplayName

setTagFormDescription : String -> TagForm -> TagForm
setTagFormDescription new newTags =
    { newTags | description = new }

asTagFormDescriptionIn : TagForm -> String -> TagForm
asTagFormDescriptionIn =
    flip setTagFormDescription



-- NEW UPDATES 

setUpdateFormDisplayName : String -> UpdateForm -> UpdateForm
setUpdateFormDisplayName new newUpdates =
    { newUpdates | display_name = new }

asUpdateFormDisplayNameIn : UpdateForm -> String -> UpdateForm
asUpdateFormDisplayNameIn =
    flip setUpdateFormDisplayName    

setUpdateFormTitle : String -> UpdateForm -> UpdateForm
setUpdateFormTitle new newUpdates =
    { newUpdates | title = new }

asUpdateFormTitleIn : UpdateForm -> String -> UpdateForm
asUpdateFormTitleIn =
    flip setUpdateFormTitle    

setUpdateFormExcerpt : String -> UpdateForm -> UpdateForm
setUpdateFormExcerpt new newUpdates =
    { newUpdates | excerpt = new }

asUpdateFormExcerptIn : UpdateForm -> String -> UpdateForm
asUpdateFormExcerptIn =
    flip setUpdateFormExcerpt    

setUpdateFormAuthor : String -> UpdateForm -> UpdateForm
setUpdateFormAuthor new newUpdates =
    { newUpdates | author = new }

asUpdateFormAuthorIn : UpdateForm -> String -> UpdateForm
asUpdateFormAuthorIn =
    flip setUpdateFormAuthor    



-- OLD HEAD 

setCommonEnvFormMailgunKey : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormMailgunKey new commonEnv =
    { commonEnv | mailgun_key = new }

asCommonEnvFormMailgunKeyIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormMailgunKeyIn = 
    flip setCommonEnvFormMailgunKey

setCommonEnvFormAmazonAssociateTag : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormAmazonAssociateTag new commonEnv =
    { commonEnv | amazon_associate_tag = new }

asCommonEnvFormAmazonAssociateTagIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormAmazonAssociateTagIn = 
    flip setCommonEnvFormAmazonAssociateTag

setCommonEnvFormAwsAccessKeyId : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormAwsAccessKeyId new commonEnv =
    { commonEnv | aws_access_key_id = new }

asCommonEnvFormAwsAccessKeyIdIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormAwsAccessKeyIdIn = 
    flip setCommonEnvFormAwsAccessKeyId

setCommonEnvFormAwsSecretAccessKey : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormAwsSecretAccessKey new commonEnv =
    { commonEnv | aws_secret_access_key = new }

asCommonEnvFormAwsSecretAccessKeyIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormAwsSecretAccessKeyIn = 
    flip setCommonEnvFormAwsSecretAccessKey

setCommonEnvFormMarketplaceHost : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormMarketplaceHost new commonEnv =
    { commonEnv | marketplace_host = new }

asCommonEnvFormMarketplaceHostIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormMarketplaceHostIn = 
    flip setCommonEnvFormMarketplaceHost

setCommonEnvFormAmazonS3AccessKey : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormAmazonS3AccessKey new commonEnv =
    { commonEnv | amazon_s3_access_key = new }

asCommonEnvFormAmazonS3AccessKeyIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormAmazonS3AccessKeyIn = 
    flip setCommonEnvFormAmazonS3AccessKey

setCommonEnvFormAmazonS3SecretAccessKey : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormAmazonS3SecretAccessKey new commonEnv =
    { commonEnv | amazon_s3_secret_access_key = new }

asCommonEnvFormAmazonS3SecretAccessKeyIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormAmazonS3SecretAccessKeyIn = 
    flip setCommonEnvFormAmazonS3SecretAccessKey

setCommonEnvFormEtsyApiKey : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormEtsyApiKey new commonEnv =
    { commonEnv | etsy_api_key = new }

asCommonEnvFormEtsyApiKeyIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormEtsyApiKeyIn = 
    flip setCommonEnvFormEtsyApiKey

setCommonEnvFormEtsySecretKey : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormEtsySecretKey new commonEnv =
    { commonEnv | etsy_secret_key = new }

asCommonEnvFormEtsySecretKeyIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormEtsySecretKeyIn = 
    flip setCommonEnvFormEtsySecretKey

setCommonEnvFormTumblrAccessToken : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormTumblrAccessToken new commonEnv =
    { commonEnv | tumblr_access_token = new }

asCommonEnvFormTumblrAccessTokenIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormTumblrAccessTokenIn = 
    flip setCommonEnvFormTumblrAccessToken

setCommonEnvFormTumblrAccessTokenSecret : String -> CommonEnvData -> CommonEnvData
setCommonEnvFormTumblrAccessTokenSecret new commonEnv =
    { commonEnv | tumblr_access_token_secret = new }

asCommonEnvFormTumblrAccessTokenSecretIn : CommonEnvData -> String -> CommonEnvData
asCommonEnvFormTumblrAccessTokenSecretIn = 
    flip setCommonEnvFormTumblrAccessTokenSecret




setIndividualEnvFormMailgunDomain : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormMailgunDomain new individualEnv = 
    { individualEnv | mailgun_domain = new }

asIndividualEnvFormMailgunDomainIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormMailgunDomainIn =
    flip setIndividualEnvFormMailgunDomain

setIndividualEnvFormAmazonS3BucketName : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormAmazonS3BucketName new individualEnv = 
    { individualEnv | amazon_s3_bucket_name = new }

asIndividualEnvFormAmazonS3BucketNameIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormAmazonS3BucketNameIn =
    flip setIndividualEnvFormAmazonS3BucketName

setIndividualEnvFormRecaptchaPublicKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormRecaptchaPublicKey new individualEnv = 
    { individualEnv | recaptcha_public_key = new }

asIndividualEnvFormRecaptchaPublicKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormRecaptchaPublicKeyIn =
    flip setIndividualEnvFormRecaptchaPublicKey

setIndividualEnvFormRecaptchaPrivateKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormRecaptchaPrivateKey new individualEnv = 
    { individualEnv | recaptcha_private_key = new }

asIndividualEnvFormRecaptchaPrivateKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormRecaptchaPrivateKeyIn =
    flip setIndividualEnvFormRecaptchaPrivateKey

setIndividualEnvFormTwitterApiKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTwitterApiKey new individualEnv = 
    { individualEnv | twitter_api_key = new }

asIndividualEnvFormTwitterApiKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTwitterApiKeyIn =
    flip setIndividualEnvFormTwitterApiKey

setIndividualEnvFormTwitterSecretKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTwitterSecretKey new individualEnv = 
    { individualEnv | twitter_secret_key = new }

asIndividualEnvFormTwitterSecretKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTwitterSecretKeyIn =
    flip setIndividualEnvFormTwitterSecretKey

setIndividualEnvFormTwitterAccessToken : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTwitterAccessToken new individualEnv = 
    { individualEnv | twitter_access_token = new }

asIndividualEnvFormTwitterAccessTokenIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTwitterAccessTokenIn =
    flip setIndividualEnvFormTwitterAccessToken

setIndividualEnvFormTwitterAccessTokenSecret : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTwitterAccessTokenSecret new individualEnv = 
    { individualEnv | twitter_access_token_secret = new }

asIndividualEnvFormTwitterAccessTokenSecretIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTwitterAccessTokenSecretIn =
    flip setIndividualEnvFormTwitterAccessTokenSecret

setIndividualEnvFormFacebookApiKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormFacebookApiKey new individualEnv = 
    { individualEnv | facebook_api_key = new }

asIndividualEnvFormFacebookApiKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormFacebookApiKeyIn =
    flip setIndividualEnvFormFacebookApiKey

setIndividualEnvFormFacebookSecretKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormFacebookSecretKey new individualEnv = 
    { individualEnv | facebook_secret_key = new }

asIndividualEnvFormFacebookSecretKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormFacebookSecretKeyIn =
    flip setIndividualEnvFormFacebookSecretKey

setIndividualEnvFormFacebookPageId : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormFacebookPageId new individualEnv = 
    { individualEnv | facebook_page_id = new }

asIndividualEnvFormFacebookPageIdIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormFacebookPageIdIn =
    flip setIndividualEnvFormFacebookPageId

setIndividualEnvFormFacebookRedirectUrl : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormFacebookRedirectUrl new individualEnv = 
    { individualEnv | facebook_redirect_url = new }

asIndividualEnvFormFacebookRedirectUrlIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormFacebookRedirectUrlIn =
    flip setIndividualEnvFormFacebookRedirectUrl

setIndividualEnvFormTumblrApiKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTumblrApiKey new individualEnv = 
    { individualEnv | tumblr_api_key = new }

asIndividualEnvFormTumblrApiKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTumblrApiKeyIn =
    flip setIndividualEnvFormTumblrApiKey

setIndividualEnvFormTumblrSecretKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTumblrSecretKey new individualEnv = 
    { individualEnv | tumblr_secret_key = new }

asIndividualEnvFormTumblrSecretKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTumblrSecretKeyIn =
    flip setIndividualEnvFormTumblrSecretKey

setIndividualEnvFormTumblrBlogIdentifier : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormTumblrBlogIdentifier new individualEnv = 
    { individualEnv | tumblr_blog_identifier = new }

asIndividualEnvFormTumblrBlogIdentifierIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormTumblrBlogIdentifierIn =
    flip setIndividualEnvFormTumblrBlogIdentifier

setIndividualEnvFormPintrestApiKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormPintrestApiKey new individualEnv = 
    { individualEnv | pintrest_api_key = new }

asIndividualEnvFormPintrestApiKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormPintrestApiKeyIn =
    flip setIndividualEnvFormPintrestApiKey

setIndividualEnvFormPintrestSecretKey : String -> IndividualEnvData -> IndividualEnvData
setIndividualEnvFormPintrestSecretKey new individualEnv = 
    { individualEnv | pintrest_secret_key = new }

asIndividualEnvFormPintrestSecretKeyIn : IndividualEnvData -> String -> IndividualEnvData
asIndividualEnvFormPintrestSecretKeyIn =
    flip setIndividualEnvFormPintrestSecretKey




setConfigFormWebsiteTitle : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteTitle new configEnvData =
    { configEnvData | website_title = new }

asConfigFormWebsiteTitleIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteTitleIn = 
    flip setConfigFormWebsiteTitle

setConfigFormWebsiteDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteDescription new configEnvData =
    { configEnvData | website_description = new }

asConfigFormWebsiteDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteDescriptionIn = 
    flip setConfigFormWebsiteDescription

setConfigFormWebsiteKeywords : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteKeywords new configEnvData =
    { configEnvData | website_keywords = new }

asConfigFormWebsiteKeywordsIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteKeywordsIn = 
    flip setConfigFormWebsiteKeywords

setConfigFormWebsiteTwitter : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteTwitter new configEnvData =
    { configEnvData | website_twitter = new }

asConfigFormWebsiteTwitterIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteTwitterIn = 
    flip setConfigFormWebsiteTwitter

setConfigFormWebsiteAltImage : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteAltImage new configEnvData =
    { configEnvData | website_alt_image = new }

asConfigFormWebsiteAltImageIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteAltImageIn = 
    flip setConfigFormWebsiteAltImage

setConfigFormBlogMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormBlogMetaDescription new configEnvData =
    { configEnvData | blog_meta_description = new }

asConfigFormBlogMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormBlogMetaDescriptionIn = 
    flip setConfigFormBlogMetaDescription

setConfigFormCategoriesMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormCategoriesMetaDescription new configEnvData =
    { configEnvData | categories_meta_description = new }

asConfigFormCategoriesMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormCategoriesMetaDescriptionIn = 
    flip setConfigFormCategoriesMetaDescription

setConfigFormUpdatesMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormUpdatesMetaDescription new configEnvData =
    { configEnvData | updates_meta_description = new }

asConfigFormUpdatesMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormUpdatesMetaDescriptionIn = 
    flip setConfigFormUpdatesMetaDescription

setConfigFormAboutMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormAboutMetaDescription new configEnvData =
    { configEnvData | about_meta_description = new }

asConfigFormAboutMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormAboutMetaDescriptionIn = 
    flip setConfigFormAboutMetaDescription

setConfigFormContactMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormContactMetaDescription new configEnvData =
    { configEnvData | contact_meta_description = new }

asConfigFormContactMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormContactMetaDescriptionIn = 
    flip setConfigFormContactMetaDescription

setConfigFormSubmitMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormSubmitMetaDescription new configEnvData =
    { configEnvData | submit_meta_description = new }

asConfigFormSubmitMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormSubmitMetaDescriptionIn = 
    flip setConfigFormSubmitMetaDescription

setConfigFormLoginMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormLoginMetaDescription new configEnvData =
    { configEnvData | login_meta_description = new }

asConfigFormLoginMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormLoginMetaDescriptionIn = 
    flip setConfigFormLoginMetaDescription

setConfigFormRegisterMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormRegisterMetaDescription new configEnvData =
    { configEnvData | register_meta_description = new }

asConfigFormRegisterMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormRegisterMetaDescriptionIn = 
    flip setConfigFormRegisterMetaDescription

setConfigFormSearchMetaDescription : String -> ConfigEnvData -> ConfigEnvData
setConfigFormSearchMetaDescription new configEnvData =
    { configEnvData | search_meta_description = new }

asConfigFormSearchMetaDescriptionIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormSearchMetaDescriptionIn = 
    flip setConfigFormSearchMetaDescription

setConfigFormAboutCopy : String -> ConfigEnvData -> ConfigEnvData
setConfigFormAboutCopy new configEnvData =
    { configEnvData | about_copy = new }

asConfigFormAboutCopyIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormAboutCopyIn = 
    flip setConfigFormAboutCopy

setConfigFormSubmitCopy : String -> ConfigEnvData -> ConfigEnvData
setConfigFormSubmitCopy new configEnvData =
    { configEnvData | submit_copy = new }

asConfigFormSubmitCopyIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormSubmitCopyIn = 
    flip setConfigFormSubmitCopy

setConfigFormLetterCopy : String -> ConfigEnvData -> ConfigEnvData
setConfigFormLetterCopy new configEnvData =
    { configEnvData | letter_copy = new }

asConfigFormLetterCopyIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormLetterCopyIn = 
    flip setConfigFormLetterCopy

setConfigFormWebsiteAcronym : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteAcronym new configEnvData =
    { configEnvData | website_acronym = new }

asConfigFormWebsiteAcronymIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteAcronymIn = 
    flip setConfigFormWebsiteAcronym

setConfigFormWebsiteName : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteName new configEnvData =
    { configEnvData | website_name = new }

asConfigFormWebsiteNameIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteNameIn = 
    flip setConfigFormWebsiteName

setConfigFormWebsiteNameLower : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteNameLower new configEnvData =
    { configEnvData | website_name_lower = new }

asConfigFormWebsiteNameLowerIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteNameLowerIn = 
    flip setConfigFormWebsiteNameLower

setConfigFormWebsiteDomain : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteDomain new configEnvData =
    { configEnvData | website_domain = new }

asConfigFormWebsiteDomainIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteDomainIn = 
    flip setConfigFormWebsiteDomain

setConfigFormWebsiteLogoPng : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteLogoPng new configEnvData =
    { configEnvData | website_logo_png = new }

asConfigFormWebsiteLogoPngIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteLogoPngIn = 
    flip setConfigFormWebsiteLogoPng

setConfigFormWebsiteLogoSvg : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteLogoSvg new configEnvData =
    { configEnvData | website_logo_svg = new }

asConfigFormWebsiteLogoSvgIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteLogoSvgIn = 
    flip setConfigFormWebsiteLogoSvg

setConfigFormWebsiteFavicon : String -> ConfigEnvData -> ConfigEnvData
setConfigFormWebsiteFavicon new configEnvData =
    { configEnvData | website_favicon = new }

asConfigFormWebsiteFaviconIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormWebsiteFaviconIn = 
    flip setConfigFormWebsiteFavicon

setConfigFormGoogleAnalyticsTrackingId : String -> ConfigEnvData -> ConfigEnvData
setConfigFormGoogleAnalyticsTrackingId new configEnvData =
    { configEnvData | google_analytics_tracking_id = new }

asConfigFormGoogleAnalyticsTrackingIdIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormGoogleAnalyticsTrackingIdIn = 
    flip setConfigFormGoogleAnalyticsTrackingId

setConfigFormGoogleSiteVerification : String -> ConfigEnvData -> ConfigEnvData
setConfigFormGoogleSiteVerification new configEnvData =
    { configEnvData | google_site_verification = new } 

asConfigFormGoogleSiteVerificationIn : ConfigEnvData -> String ->ConfigEnvData  
asConfigFormGoogleSiteVerificationIn = 
    flip setConfigFormGoogleSiteVerification

setConfigFormPrimaryEmail : String -> ConfigEnvData -> ConfigEnvData         
setConfigFormPrimaryEmail new configEnvData =
  { configEnvData | primary_email = new }

asConfigFormPrimaryEmailIn : ConfigEnvData -> String -> ConfigEnvData
asConfigFormPrimaryEmailIn =
  flip setConfigFormPrimaryEmail

setConfigFormPassword : String -> ConfigEnvData -> ConfigEnvData 
setConfigFormPassword new configEnvData =
  { configEnvData | password = new }

asConfigFormPasswordIn : ConfigEnvData -> String -> ConfigEnvData
asConfigFormPasswordIn =
  flip setConfigFormPassword




setWebsiteAcronym : String -> BuildForm -> BuildForm
setWebsiteAcronym new buildForm =
  { buildForm | website_acronym = new }

asWebsiteAcronymIn : BuildForm -> String -> BuildForm
asWebsiteAcronymIn =
  flip setWebsiteAcronym

setWebsiteLower : String -> BuildForm -> BuildForm
setWebsiteLower new buildForm =
  { buildForm | website_lower = new }

asWebsiteLowerIn : BuildForm -> String -> BuildForm
asWebsiteLowerIn =
  flip setWebsiteLower

setWebsiteCapital : String -> BuildForm -> BuildForm
setWebsiteCapital new buildForm =
  { buildForm | website_capital = new }

asWebsiteCapitalIn : BuildForm -> String -> BuildForm
asWebsiteCapitalIn =
  flip setWebsiteCapital

setNumOfCategories : String -> BuildForm -> BuildForm
setNumOfCategories new buildForm =
  { buildForm | num_of_categories = new }

asNumOfCategoriesIn : BuildForm -> String -> BuildForm
asNumOfCategoriesIn =
  flip setNumOfCategories

setC2Name : String -> BuildForm -> BuildForm
setC2Name new buildForm =
  { buildForm | c2_name = new }

asC2NameIn : BuildForm -> String -> BuildForm
asC2NameIn =
  flip setC2Name

setC2DisplayName : String -> BuildForm -> BuildForm
setC2DisplayName new buildForm =
  { buildForm | c2_display_name = new }

asC2DisplayNameIn : BuildForm -> String -> BuildForm
asC2DisplayNameIn =
  flip setC2DisplayName

setC2Model : String -> BuildForm -> BuildForm
setC2Model new buildForm =
  { buildForm | c2_model = new }

asC2ModelIn : BuildForm -> String -> BuildForm
asC2ModelIn =
  flip setC2Model

setC2Icon : String -> BuildForm -> BuildForm
setC2Icon new buildForm =
  { buildForm | c2_icon = new }

asC2IconIn : BuildForm -> String -> BuildForm
asC2IconIn =
  flip setC2Icon

setC4Name : String -> BuildForm -> BuildForm
setC4Name new buildForm =
  { buildForm | c4_name = new }

asC4NameIn : BuildForm -> String -> BuildForm
asC4NameIn =
  flip setC4Name

setC4DisplayName : String -> BuildForm -> BuildForm
setC4DisplayName new buildForm =
  { buildForm | c4_display_name = new }

asC4DisplayNameIn : BuildForm -> String -> BuildForm
asC4DisplayNameIn =
  flip setC4DisplayName

setC4Model : String -> BuildForm -> BuildForm
setC4Model new buildForm =
  { buildForm | c4_model = new }

asC4ModelIn : BuildForm -> String -> BuildForm
asC4ModelIn =
  flip setC4Model

setC4Icon : String -> BuildForm -> BuildForm
setC4Icon new buildForm =
  { buildForm | c4_icon = new }

asC4IconIn : BuildForm -> String -> BuildForm
asC4IconIn =
  flip setC4Icon

setC6Name : String -> BuildForm -> BuildForm
setC6Name new buildForm =
  { buildForm | c6_name = new }

asC6NameIn : BuildForm -> String -> BuildForm
asC6NameIn =
  flip setC6Name

setC6DisplayName : String -> BuildForm -> BuildForm
setC6DisplayName new buildForm =
  { buildForm | c6_display_name = new }

asC6DisplayNameIn : BuildForm -> String -> BuildForm
asC6DisplayNameIn =
  flip setC6DisplayName

setC6Model : String -> BuildForm -> BuildForm
setC6Model new buildForm =
  { buildForm | c6_model = new }

asC6ModelIn : BuildForm -> String -> BuildForm
asC6ModelIn =
  flip setC6Model

setC6Icon : String -> BuildForm -> BuildForm
setC6Icon new buildForm =
  { buildForm | c6_icon = new }

asC6IconIn : BuildForm -> String -> BuildForm
asC6IconIn =
  flip setC6Icon

setC1Name : String -> BuildForm -> BuildForm
setC1Name new buildForm =
  { buildForm | c1_name = new }

asC1NameIn : BuildForm -> String -> BuildForm
asC1NameIn =
  flip setC1Name

setC1DisplayName : String -> BuildForm -> BuildForm
setC1DisplayName new buildForm =
  { buildForm | c1_display_name = new }

asC1DisplayNameIn : BuildForm -> String -> BuildForm
asC1DisplayNameIn =
  flip setC1DisplayName

setC1Model : String -> BuildForm -> BuildForm
setC1Model new buildForm =
  { buildForm | c1_model = new }

asC1ModelIn : BuildForm -> String -> BuildForm
asC1ModelIn =
  flip setC1Model

setC1Icon : String -> BuildForm -> BuildForm
setC1Icon new buildForm =
  { buildForm | c1_icon = new }

asC1IconIn : BuildForm -> String -> BuildForm
asC1IconIn =
  flip setC1Icon

setC3Name : String -> BuildForm -> BuildForm
setC3Name new buildForm =
  { buildForm | c3_name = new }

asC3NameIn : BuildForm -> String -> BuildForm
asC3NameIn =
  flip setC3Name

setC3DisplayName : String -> BuildForm -> BuildForm
setC3DisplayName new buildForm =
  { buildForm | c3_display_name = new }

asC3DisplayNameIn : BuildForm -> String -> BuildForm
asC3DisplayNameIn =
  flip setC3DisplayName

setC3Model : String -> BuildForm -> BuildForm
setC3Model new buildForm =
  { buildForm | c3_model = new }

asC3ModelIn : BuildForm -> String -> BuildForm
asC3ModelIn =
  flip setC3Model

setC3Icon : String -> BuildForm -> BuildForm
setC3Icon new buildForm =
  { buildForm | c3_icon = new }

asC3IconIn : BuildForm -> String -> BuildForm
asC3IconIn =
  flip setC3Icon

setC5Name : String -> BuildForm -> BuildForm
setC5Name new buildForm =
  { buildForm | c5_name = new }

asC5NameIn : BuildForm -> String -> BuildForm
asC5NameIn =
  flip setC5Name

setC5DisplayName : String -> BuildForm -> BuildForm
setC5DisplayName new buildForm =
  { buildForm | c5_display_name = new }

asC5DisplayNameIn : BuildForm -> String -> BuildForm
asC5DisplayNameIn =
  flip setC5DisplayName

setC5Model : String -> BuildForm -> BuildForm
setC5Model new buildForm =
  { buildForm | c5_model = new }

asC5ModelIn : BuildForm -> String -> BuildForm
asC5ModelIn =
  flip setC5Model

setC5Icon : String -> BuildForm -> BuildForm
setC5Icon new buildForm =
  { buildForm | c5_icon = new }

asC5IconIn : BuildForm -> String -> BuildForm
asC5IconIn =
  flip setC5Icon

setC7Name : String -> BuildForm -> BuildForm
setC7Name new buildForm =
  { buildForm | c7_name = new }

asC7NameIn : BuildForm -> String -> BuildForm
asC7NameIn =
  flip setC7Name

setC7DisplayName : String -> BuildForm -> BuildForm
setC7DisplayName new buildForm =
  { buildForm | c7_display_name = new }

asC7DisplayNameIn : BuildForm -> String -> BuildForm
asC7DisplayNameIn =
  flip setC7DisplayName

setC7Model : String -> BuildForm -> BuildForm
setC7Model new buildForm =
  { buildForm | c7_model = new }

asC7ModelIn : BuildForm -> String -> BuildForm
asC7ModelIn =
  flip setC7Model

setC7Icon : String -> BuildForm -> BuildForm
setC7Icon new buildForm =
  { buildForm | c7_icon = new }

asC7IconIn : BuildForm -> String -> BuildForm
asC7IconIn =
  flip setC7Icon
