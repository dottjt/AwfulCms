module Model.ModelFormType exposing (..)

type BuildFormField 
  = WebsiteAcronym
  | WebsiteLower
  | WebsiteCapital
  | NumOfCategories
  | C2Name
  | C2DisplayName
  | C2Model
  | C2Icon
  | C4Name
  | C4DisplayName
  | C4Model
  | C4Icon
  | C6Name
  | C6DisplayName
  | C6Model
  | C6Icon
  | C1Name
  | C1DisplayName
  | C1Model
  | C1Icon
  | C3Name
  | C3DisplayName
  | C3Model
  | C3Icon
  | C5Name
  | C5DisplayName
  | C5Model
  | C5Icon
  | C7Name
  | C7DisplayName
  | C7Model
  | C7Icon  


-- PRODUCTION COMPONENT

type CommonEnvFormField 
    = CommonEnvFormMailgunKey
    | CommonEnvFormAmazonAssociateTag
    | CommonEnvFormAwsAccessKeyId
    | CommonEnvFormAwsSecretAccessKey
    | CommonEnvFormMarketplaceHost
    | CommonEnvFormAmazonS3AccessKey
    | CommonEnvFormAmazonS3SecretAccessKey
    | CommonEnvFormEtsyApiKey
    | CommonEnvFormEtsySecretKey
    | CommonEnvFormTumblrAccessToken
    | CommonEnvFormTumblrAccessTokenSecret

type IndividualEnvFormField 
    = IndividualEnvFormMailgunDomain
    | IndividualEnvFormAmazonS3BucketName
    | IndividualEnvFormRecaptchaPublicKey
    | IndividualEnvFormRecaptchaPrivateKey
    | IndividualEnvFormTwitterApiKey
    | IndividualEnvFormTwitterSecretKey
    | IndividualEnvFormTwitterAccessToken
    | IndividualEnvFormTwitterAccessTokenSecret
    | IndividualEnvFormFacebookApiKey
    | IndividualEnvFormFacebookSecretKey
    | IndividualEnvFormFacebookPageId
    | IndividualEnvFormFacebookRedirectUrl
    | IndividualEnvFormTumblrApiKey
    | IndividualEnvFormTumblrSecretKey
    | IndividualEnvFormTumblrBlogIdentifier
    | IndividualEnvFormPintrestApiKey
    | IndividualEnvFormPintrestSecretKey


-- CONFIG COMPONENT

type ConfigFormField
    = ConfigFormWebsiteTitle
    | ConfigFormWebsiteDescription
    | ConfigFormWebsiteKeywords
    | ConfigFormWebsiteTwitter
    | ConfigFormWebsiteAltImage
    | ConfigFormBlogMetaDescription
    | ConfigFormCategoriesMetaDescription
    | ConfigFormUpdatesMetaDescription
    | ConfigFormAboutMetaDescription
    | ConfigFormContactMetaDescription
    | ConfigFormSubmitMetaDescription
    | ConfigFormLoginMetaDescription
    | ConfigFormRegisterMetaDescription
    | ConfigFormSearchMetaDescription
    | ConfigFormAboutCopy
    | ConfigFormSubmitCopy
    | ConfigFormLetterCopy
    | ConfigFormWebsiteAcronym
    | ConfigFormWebsiteName
    | ConfigFormWebsiteNameLower
    | ConfigFormWebsiteDomain
    | ConfigFormWebsiteLogoPng
    | ConfigFormWebsiteLogoSvg
    | ConfigFormWebsiteFavicon
    | ConfigFormGoogleAnalyticsTrackingId
    | ConfigFormGoogleSiteVerification
    | ConfigFormPrimaryEmail
    | ConfigFormPassword


-- WEBSITE COMPONENT

type ProductFormField 
    = ProductFormDisplayName
    | ProductFormDescription
    | ProductFormBlogDescription
    | ProductFormDraft
    | ProductFormScheduleDate
    | ProductFormCategory
    | ProductFormTag
    | ProductFormOriginalFeaturedImage
    | ProductFormUrl
    | ProductFormUrlText
    | ProductFormFeaturedImage
    | ProductFormPrice
    | ProductFormCta
    | ProductFormLikeTotal
    | ProductFormProductType
    | NoProductFormField

type PostFormField
    = PostFormDisplayName
    | PostFormAuthor
    | PostFormExcerpt
    | PostFormPostType
    | PostFormTag
    | PostFormProductLimit   
    | PostFormProductOffset  
    | PostFormFeaturedImage
    | NoPostFormField

type SocialFormField
    = SocialFormDisplayName
    | SocialFormDescription
    | SocialFormTags
    | SocialFormDraft
    | SocialFormFacebookCode
    | SocialFormFeaturedImage
    | SocialFormUrl
    | SocialFormImageCaption
    | SocialFormSocialMediaType
    | NoSocialFormField

type TagFormField
    = TagFormDisplayName
    | TagFormDescription
    | NoTagFormField

type UpdateFormField
    = UpdateFormDisplayName
    | UpdateFormTitle
    | UpdateFormExcerpt
    | UpdateFormAuthor
    | NoUpdateFormField

