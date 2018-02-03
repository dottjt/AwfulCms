module Model exposing (..)

import Model.ModelProduct exposing (..)
import Model.ModelMisc exposing (..)

import Model.ModelRouting exposing (Route)
import Model.ModelNavbar exposing (..)
import Model.ModelConfig exposing (..)
import Model.ModelValidation exposing (..)

import Model.ModelOverview exposing (..)
import Model.ModelDevelopment exposing (..)
import Model.ModelBuild exposing (..)

import Model.ModelSocial exposing (..)
import Model.ModelPosts exposing (..)
import Model.ModelProducts exposing (..)

import Date exposing (Date, Day(..), day, dayOfWeek, month, year)
import Time exposing (..)
import DatePicker exposing (defaultSettings)
import Component.MultiSelect exposing (..)


import Keyboard exposing (KeyCode)


-- MODEL 

type alias Model = 
    { 
    -- APPLICATION
    
      websitesItemList : List WebsitesItem
      
    , navbarWebsiteItems : List NavbarItem 
    , websitesMainNavbarItems : List WebsitesNavbarItem

    , navbarStatus : Maybe ConsoleItem 
    , consoleItemList : List ConsoleItem

    , keysDown : List KeyCode


    -- OVERVIEW COMPONENT 

    , googleAnalyticsData : List GoogleAnalyticsItem
    , domainExpirationData : List DomainExpirationItem


    -- DEVELOPMENT COMPONENT

    , productionServerStatusList : List ServerStatusItem
    , developmentServerStatusList : List ServerStatusItem

    , commandsList : List CommandItem
    
    , developmentDropdown : List WebsitesDropdown
    , developmentDropdownSelection : WebsitesDropdown


    -- BUILD COMPONENT

    , domainInput : String 
    , buildForm : BuildForm


    -- WEBSITES COMPONENT 

    , productFinderInput : String
    , productFinderData : ProductAssoc 

    , randomCtaNumber : Int
    , randomProductLikeNumber : Int

    , productTagId : String 
    , postTagId : String 
    
    , multiSelectTagIdList : List Item 
    , multiSelectTagIdSelected : List String

    , productFormDisplayNameCount : Maybe Int 
    , productFormDescriptionCount : Maybe Int 
    , productFormBlogDescriptionCount : Maybe Int 
    , updateNameCount : Maybe Int 

    , productForm : ProductForm
    , postForm : PostForm
    , socialForm : SocialForm
    , tagForm : TagForm
    , updateForm : UpdateForm

    , productFormValidation : ProductFormValidation
    , postFormValidation : PostFormValidation
    , socialFormValidation : SocialFormValidation
    , tagFormValidation : TagFormValidation
    , updateFormValidation : UpdateFormValidation

    , buildFormValidation : BuildFormValidation

    , individualProduct : ProductAssoc  
    , individualPost : PostAssoc
    , individualSocial : Social
    , individualTag : TagAssoc
    , individualUpdate : Update

    , productAssocList : List ProductAssoc
    , postList : List PostAssoc
    , socialList : List Social 
    , updateList : List Update     
    , tagAssocList : List TagAssoc    
    , categoryList : List Category
    , productsPendingList : List Product

    , productTypeDropdownList : List ProductTypeDropdown
    , postTypeDropdownList : List PostTypeDropdown
    , socialMediaTypeDropdownList : List SocialMediaTypeDropdown

    -- CONFIG COMPONENT

    , configDropdown : List WebsitesDropdown
    , configDropdownSelection : WebsitesDropdown

    , individualEnvDropdown : List WebsitesDropdown
    , individualEnvDropdownSelection : WebsitesDropdown

    , configEnvData : ConfigEnvData
    , commonEnvData : CommonEnvData
    , individualEnvData : IndividualEnvData


    -- ROUTES / ERRORS

    , route : Route
    , routeAcronym : String
    , routeType : String
    , routeAction : String
    , routeId : String 
    
    , showKeyboardHelper : Bool
    , keyboardAvailable : Bool

    , currentDate : Maybe Date
    , currentTime : Maybe Time
    
    , currentTasks : Maybe CurrentTaskList

    , date : Maybe Date
    , datePicker : DatePicker.DatePicker

    -- , tagValues :  

    , error : String

    }

  
