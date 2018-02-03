module Msg exposing (..)

import Model.ModelProduct exposing (..)

import Model.ModelFormType exposing (..)
import Model.ModelMessage exposing (..)
import Model.ModelMisc exposing (..)
import Model.ModelDataType exposing (..)

import Model.ModelDevelopment exposing (..)
import Model.ModelBuild exposing (..)
import Model.ModelConfig exposing (..)

import Http exposing (..)
import Navigation exposing (Location)
import Keyboard exposing (..)

import Date exposing (..)
import Time exposing (..)

import DatePicker exposing (defaultSettings)


type Msg 
    -- ApplicationComponent
    
    = FailResponse Error 
    
    | NewSessionSuccess ConsoleItem
    | FetchConsoleItemSuccess ConsoleItemMESSAGEList
    | FetchServerStatusSuccess ServerStatusMESSAGEList

    | OnChangeServer ServerAction String String
    | ChangeServerSuccess ServerStatusMESSAGEList

    | DevelopmentDropdownChange String

    | OnCommand CommandItem (Maybe CommandType)
    | CommandSuccess ConsoleItem  


    -- OverviewComponent

    | FetchGoogleAnalyticsData
    | FetchGoogleAnalyticsDataSuccess GoogleAnalyticsItemMESSAGEList

    | FetchDomainExpirationData
    | FetchDomainExpirationDataSuccess DomainExpirationItemMESSAGEList

    | OnRenewDomain String
    | RenewDomainSuccess ConsoleItem

    -- BuildComponent

    | OnCheckDomain String
    | CheckDomainSuccess ConsoleItem 
    
    | OnRegisterDomain String
    | RegisterDomainSuccess ConsoleItem 

    | OnAccountSetup String
    | AccountSetupSuccess ConsoleItem

    | OnServerSetup String
    | ServerSetupSuccess ConsoleItem

    | OnNewWebsite BuildForm
    | NewWebsiteSuccess ConsoleItem 


    -- WebsitesComponent

    | FetchWebsitesIndexSuccess WebsitesItemMESSAGEList
    

    -- WEBSITES   

    | OnBlurCheckPostFormValidation
    | OnBlurCheckProductFormValidation
    | OnBlurCheckUpdateFormValidation
    | OnBlurCheckTagFormValidation
    | OnBlurCheckSocialFormValidation

    | OnBlurCheckBuildFormValidation
  

    | MultiSelectChanged (List String)

    | OnProductFinderInput String

    | FetchWebsitesIndividualSuccess WebsiteIndividualData

    | PrefilNewProduct 
    | PrefilSocialMediaForm ProductAssoc

    | PrefilSocialMediaFormSuccess SocialFormMESSAGE
    | PrefilNewProductSuccess NewProductMESSAGE

    | PopulateIndividual WebsitesDataViewType
    | PopulateForm WebsitesDataFormType -- WebsitesDataFormType 

    | ItemCreate WebsitesDataFormType
    | ItemUpdate WebsitesDataFormType String
    | ItemDelete String String 
    
    | ItemCreateSuccess ConsoleItem
    | ItemUpdateSuccess ConsoleItem
    | ItemDeleteSuccess ConsoleItem

    | SetProductsField ProductFormField String
    | SetProductsCheckbox
    | SetPostsField PostFormField String
    | SetSocialCheckbox
    | SetSocialField SocialFormField String
    | SetTagsField TagFormField String
    | SetUpdatesField UpdateFormField String
    | SetConfigFormField ConfigFormField String
    | SetCommonEnvField CommonEnvFormField String
    | SetIndividualEnvField IndividualEnvFormField String
    | SetBuildForm BuildFormField String


    | ToDatePicker DatePicker.Msg
    | InitialDatePickerDate Date 


    -- configComponent

    | FetchConfig String
    | FetchCommonEnv
    | FetchIndividualEnv String 
    | UpdateEnv EnvDataFormType

    | FetchConfigSuccess ConfigEnvDataMESSAGE
    | FetchIndividualEnvSuccess IndividualEnvMESSAGEData
    | FetchCommonEnvSuccess CommonEnvMESSAGEData
    | UpdateEnvSuccess ConsoleItem


    -- keypress 

    | KeyDown KeyCode
    | KeyUp KeyCode

    | RandomCtaNumber Int
    | RandomProductLikeNumber Int

    | Tick Time
    | NewDate Date
    | NewTime Time 

    -- | MultiSelectedChanged (List String)

    -- | NewCurrentTask CurrentTask
    | UpdateCurrentTaskDuration Time
    -- | FinishCurrentTask String

    | SendInitialMessage String String ConsoleItemType  
    | SendInitialMessageSuccess ConsoleItem

    -- router

    | OnLocationChange Location
