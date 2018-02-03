module Command exposing (..)

import Model.ModelMisc exposing (..)
import Model.ModelProduct exposing (..)
import Model.ModelEncode exposing (..)
import Model.ModelDecode exposing (..)
import Model.ModelDataType exposing (..)

import Model.ModelBuild exposing (..)
import Model.ModelConfig exposing (..)

import Json.Encode as Encode

import Msg exposing (..)
import Helper.HttpHelper exposing (..)

import Http

-- APPLICATION COMMANDSp

-- dev_url : String 
-- dev_url = "http://localhost:4000"

-- dev_url : String 
-- dev_url = "https://awfulcorporation.com"


-- prod_url : String 
-- prod_url = "https://awfulcorporation"


newConsoleSession : Cmd Msg 
newConsoleSession =
    httpGet 
        ("http://localhost:4000/api/application/new_console_session") -- (dev_url ++ 
        messageDecoder
        FailResponse
        NewSessionSuccess

fetchConsoleItemList : Cmd Msg 
fetchConsoleItemList =
    httpGet 
        ("http://localhost:4000/api/application/fetch_console_item_list") -- (dev_url ++ 
        messageListDecoder
        FailResponse
        FetchConsoleItemSuccess

fetchServerStatus : String -> Cmd Msg
fetchServerStatus devOrProd =
    httpGet
        ("http://localhost:4000/api/application/fetch_server_status/" ++ devOrProd) -- (dev_url ++ 
        serverStatusMESSAGEDecoder
        FailResponse
        FetchServerStatusSuccess


command : String -> String -> String -> Cmd Msg
command script devOrProd acronym =
      httpGet
          ("http://localhost:4000/api/application/command/" ++ script ++ "/" ++ devOrProd ++ "/" ++ acronym) -- (dev_url ++ 
          messageDecoder
          FailResponse
          CommandSuccess


sendInitialMessage : String -> String -> ConsoleItemType -> Cmd Msg
sendInitialMessage command text consoleItemType =
        httpGet
            ("http://localhost:4000/api/application/send_initial_console_item/" ++ command ++ "/" ++ text ++ "/" ++ (consoleItemType |> consoleItemTypeToString)) -- (dev_url ++ 
            messageDecoder
            FailResponse
            SendInitialMessageSuccess


-- OVERVIEW COMMANDS

fetchWebsitesIndex : Cmd Msg
fetchWebsitesIndex =
    httpGet
        ("http://localhost:4000/api/overview/fetch_websites_index") -- (dev_url ++ 
        websitesItemMESSAGEDecoder
        FailResponse
        FetchWebsitesIndexSuccess

fetchGoogleAnalyticsData : Cmd Msg
fetchGoogleAnalyticsData =
    httpGet
        ("http://localhost:4000/api/overview/fetch_google_analytics_data") -- (dev_url ++ 
        googleAnalyticsMESSAGEDecoder
        FailResponse
        FetchGoogleAnalyticsDataSuccess

fetchDomainExpirationData : Cmd Msg
fetchDomainExpirationData =
    httpGet
        ("http://localhost:4000/api/overview/fetch_domain_expiration_data") -- (dev_url ++ 
        domainExpirationMESSAGEDecoder
        FailResponse
        FetchDomainExpirationDataSuccess


renewDomain : String -> Cmd Msg
renewDomain domain =
    httpGet
        ("http://localhost:4000/api/overview/renew_domain/" ++ domain) -- (dev_url ++ 
        messageDecoder
        FailResponse
        RenewDomainSuccess


-- BUILD COMMANDS

checkDomain : String -> Cmd Msg
checkDomain domain =
    httpGet
        ("http://localhost:4000/api/build/check_domain/" ++ domain) -- (dev_url ++ 
        messageDecoder
        FailResponse
        CheckDomainSuccess


registerDomain : String -> Cmd Msg
registerDomain domain =
    httpGet
        ("http://localhost:4000/api/build/register_domain/" ++ domain) -- (dev_url ++ 
        messageDecoder
        FailResponse
        RegisterDomainSuccess


accountSetup : String -> Cmd Msg
accountSetup domain =
    httpGet
        ("http://localhost:4000/api/build/setup_google/" ++ domain) -- (dev_url ++ 
        messageDecoder
        FailResponse
        AccountSetupSuccess


serverSetup : String -> Cmd Msg
serverSetup domain =
    httpGet
        ("http://localhost:4000/api/build/setup_server/" ++ domain) -- (dev_url ++ 
        messageDecoder
        FailResponse
        ServerSetupSuccess


newWebsite : BuildForm -> Cmd Msg 
newWebsite newWebsite =
    httpPost
        ("http://localhost:4000/api/build/new_website" ) -- (dev_url ++ 
        (Http.jsonBody (newWebsiteEncoder newWebsite))          
        messageDecoder
        FailResponse
        NewWebsiteSuccess


-- WEBSITE COMMAND


fetchWebsiteIndividual : String -> Cmd Msg 
fetchWebsiteIndividual acronym =
    httpGet
        ("http://localhost:4000/api/websites/fetch_website_individual/" ++ acronym) -- (dev_url ++ 
        websiteIndividualDecoder
        FailResponse
        FetchWebsitesIndividualSuccess


prefilNewProduct : String -> Cmd Msg 
prefilNewProduct input =
    httpPost
        ("http://localhost:4000/api/websites/search_for_amazon_item") -- (dev_url ++ 
        (Http.jsonBody (prefilNewProductEncoder input))          
        newProductMESSAGEDecoder
        FailResponse
        PrefilNewProductSuccess



itemCreate : WebsitesDataFormType -> String -> Cmd Msg 
itemCreate websitesDataType acronym =
    httpPost
        ("http://localhost:4000/api/websites/item_create/" ++  (websitesDataType |> websitesTypeToString) ++ "/" ++ acronym) -- (dev_url ++ 
        (websitesTypeToEncoder websitesDataType |> Http.jsonBody)                  
        messageDecoder
        FailResponse
        ItemCreateSuccess


itemUpdate : WebsitesDataFormType -> String -> String -> Cmd Msg 
itemUpdate websitesDataType acronym item_id =
    httpPut
        ("http://localhost:4000/api/websites/item_update/" ++ (websitesDataType |> websitesTypeToString) ++ "/" ++ acronym ++ "/" ++ item_id) -- (dev_url ++ 
        (websitesTypeToEncoder websitesDataType |> Http.jsonBody)                  
        messageDecoder
        FailResponse
        ItemUpdateSuccess


itemDelete : String -> String -> String -> Cmd Msg 
itemDelete websiteType acronym item_id =
    httpDelete
        ("http://localhost:4000/api/websites/item_delete/" ++ websiteType ++ "/" ++ acronym ++ "/" ++ item_id) -- (dev_url ++ 
        (Http.expectJson messageDecoder)
        FailResponse
        ItemCreateSuccess



prefilSocialMediaForm : ProductAssoc -> String -> Cmd Msg 
prefilSocialMediaForm product acronym = 
    httpGet
        ("http://localhost:4000/api/websites/prefil_social_media_form/" ++ product.id ++ "/" ++ acronym) -- (dev_url ++ 
        socialFormMESSAGEDecoder
        FailResponse
        PrefilSocialMediaFormSuccess




-- CONFIG COMMANDS

fetchConfig : String -> Cmd Msg
fetchConfig acronym =
    httpGet
        ("http://localhost:4000/api/env/fetch_config_details/" ++ acronym) -- (dev_url ++ 
        configMESSAGEDecoder
        FailResponse
        FetchConfigSuccess

updateConfig : ConfigEnvData -> WebsitesDropdown -> Cmd Msg
updateConfig config websitesDropdown =
    httpPost
        ("http://localhost:4000/api/env/update_config_details/" ++ websitesDropdown.acronym) -- (dev_url ++ 
        (Http.jsonBody (configEncoder config))          
        messageDecoder
        FailResponse
        UpdateEnvSuccess


fetchCommonEnv : Cmd Msg
fetchCommonEnv =
    httpGet
        ("http://localhost:4000/api/env/fetch_common_env_data/") -- (dev_url ++ 
        commonEnvMESSAGEDecoder
        FailResponse
        FetchCommonEnvSuccess

updateCommonEnv : CommonEnvData -> Cmd Msg
updateCommonEnv commonEnvData =
    httpPost
        ("http://localhost:4000/api/env/update_common_env_data/") -- (dev_url ++ 
        (Http.jsonBody (commonEnvDataEncoder commonEnvData))          
        messageDecoder
        FailResponse
        UpdateEnvSuccess


fetchIndividualEnv : String -> Cmd Msg
fetchIndividualEnv acronym =
    httpGet
        ("http://localhost:4000/api/env/fetch_individual_env_data/" ++ acronym) -- (dev_url ++ 
        individualEnvMESSAGEDecoder
        FailResponse
        FetchIndividualEnvSuccess

updateIndividualEnv : IndividualEnvData -> WebsitesDropdown -> Cmd Msg
updateIndividualEnv individualEnvData websitesDropdownSelection =
    httpPost
        ("http://localhost:4000/api/env/update_individual_env_data/" ++ websitesDropdownSelection.acronym) -- (dev_url ++ 
        (Http.jsonBody (individualEnvDataEncoder individualEnvData))          
        messageDecoder
        FailResponse
        UpdateEnvSuccess




      
websitesTypeToString : WebsitesDataFormType -> String 
websitesTypeToString websitesDataType = 
  case websitesDataType of
    ProductDataFormType data ->
      "products"
    PostDataFormType data->
      "posts"
    TagDataFormType data ->
      "tags"
    UpdateDataFormType data ->
      "updates"
    SocialDataFormType data ->
      "social_media"


websitesTypeToEncoder : WebsitesDataFormType -> Encode.Value
websitesTypeToEncoder websitesDataType = 
  case websitesDataType of
    ProductDataFormType data ->
      productFormDataEncoder data
    PostDataFormType data ->
      postFormDataEncoder data
    TagDataFormType data ->
      tagFormDataEncoder data
    UpdateDataFormType data ->
      updateFormDataEncoder data
    SocialDataFormType data ->
      socialFormDataEncoder data



consoleItemTypeToString : ConsoleItemType -> String 
consoleItemTypeToString consoleItemType =
    case consoleItemType of 
      NewSession -> 
        "new_session"
      Begin ->
        "begin"
      Toggle -> 
        "toggle"
      Load ->
        "load"
      NonExistent -> 
        "non_existent"
      Success ->
        "success"
      Failure ->
        "failure"
      

generateConsoleItem : String -> String -> String -> ConsoleItemType -> ConsoleItem
generateConsoleItem currentDate command text consoleItemType = 
    { inserted_at = currentDate
    , command = command
    , console_type = consoleItemType
    , text = text 
    }
