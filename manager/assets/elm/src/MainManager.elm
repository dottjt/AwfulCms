module MainManager exposing (..)

import Model exposing (..)
import Model.ModelRouting exposing (..)

import Msg exposing (..)
import View exposing (..)
import Update exposing (..)
import Command exposing (..)
import Routing exposing (..)

import Keyboard exposing (..)
import Navigation exposing (..)
import Random exposing (..)
import Task exposing (..)

import Helper.DataNavbarHelper exposing (..)
import Helper.DataEmptyHelper exposing (..)
import Helper.DataDropdownHelper exposing (..)

import Time exposing (..)
import Date exposing (..)

import DatePicker exposing (defaultSettings)

-- import DoubleSlider exposing (..)

main : Program Never Model Msg
main =
    Navigation.program OnLocationChange
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }

init : Location -> ( Model, Cmd Msg )
init location =
    let
        currentRoute =
            parseLocation location

        websiteAcronym =
            String.split "/" location.hash |> List.drop 1 |> List.head |> Maybe.withDefault "ac" 
          
          -- in some cases this might not exist. 
    in
        (initialModel currentRoute) !
        [ 

        --  fetchGoogleAnalyticsData 
        -- , fetchDomainExpirationData

          Random.generate RandomProductLikeNumber (Random.int 214 789)
        , Random.generate RandomCtaNumber (Random.int 1 11)

        , fetchConfig websiteAcronym
        , fetchIndividualEnv websiteAcronym
        , fetchCommonEnv

        , fetchServerStatus "development"
        , fetchServerStatus "production"   
           
        , fetchConsoleItemList 
        , fetchWebsiteIndividual websiteAcronym -- this, along with fetchConfig and fetchIndividualEnv should be calculated in the Update route, not here. Because it might not be "ac"
          
        , fetchWebsitesIndex
        , newConsoleSession 

        , Task.perform InitialDatePickerDate Date.now 
        
        ]


initialModel : Route -> Model
initialModel route =
    let 
        ( datePicker, datePickerFx ) =
            DatePicker.init
    in
    { 
    -- APPLICATION

      websitesItemList = []

    , navbarWebsiteItems = navbarItems
    , websitesMainNavbarItems = websitesMainNavbarItems

    , navbarStatus = Nothing
    , consoleItemList = []

    , keysDown = []

    -- OVERVIEW COMPONENT 

    , googleAnalyticsData = []
    , domainExpirationData = []


    -- DEVELOPMENT COMPONENT

    , productionServerStatusList = []
    , developmentServerStatusList = []

    , commandsList = commandsList

    , developmentDropdown = websiteDropdownList
    , developmentDropdownSelection = websiteDropdownAC
    

    -- BUILD COMPONENT

    , domainInput = "" 
    , buildForm = emptyBuildForm

    -- WEBSITES PAGES COMPONENT 

    , productFinderInput = ""
    , productFinderData = emptyProductAssoc
     
    , randomCtaNumber = 7
    , randomProductLikeNumber = 201

    , productTagId = ""
    , postTagId = ""

    , multiSelectTagIdList = []
    , multiSelectTagIdSelected = []

    , productFormDisplayNameCount = (Just 35)
    , productFormDescriptionCount = (Just 90)
    , productFormBlogDescriptionCount = (Just 90)
    , updateNameCount = (Just 50)

    , productForm = emptyProductForm
    , postForm = emptyPostForm
    , socialForm = emptySocialForm
    , tagForm = emptyTagForm
    , updateForm = emptyUpdateForm

    , productFormValidation = emptyProductFormValidation
    , postFormValidation = emptyPostFormValidation
    , socialFormValidation = emptySocialFormValidation
    , tagFormValidation = emptyTagFormValidation
    , updateFormValidation = emptyUpdateFormValidation

    , buildFormValidation = emptyBuildFormValidation

    , individualProduct = emptyProductAssoc
    , individualPost = emptyPostAssoc
    , individualSocial = emptySocial
    , individualTag = emptyTagAssoc
    , individualUpdate = emptyUpdate

    , productAssocList = []
    , postList = []
    , socialList = []
    , updateList = []
    , tagAssocList = []
    , categoryList = []
    , productsPendingList = []

    , productTypeDropdownList = productTypeDropdownList
    , postTypeDropdownList = postTypeDropdownList
    , socialMediaTypeDropdownList = socialMediaTypeDropdownList

    , date = Nothing 
    , datePicker = datePicker 


    -- DETAILS COMPONENT

    , configEnvData = emptyConfigEnvData

    , configDropdown = websiteDropdownList
    , configDropdownSelection = websiteDropdownAC

    , commonEnvData = emptyCommonEnvData
    , individualEnvData = emptyIndividualEnvData

    , individualEnvDropdown = websiteDropdownList
    , individualEnvDropdownSelection = websiteDropdownAC

    -- ROUTES / ERRORS

    , route = route
    , routeAcronym = "ac"
    , routeType = "products"
    , routeAction = "new"
    , routeId = ""

    , showKeyboardHelper = False
    , keyboardAvailable = True

    , currentDate = Nothing
    , currentTime = Nothing 
    , currentTasks = Nothing

    , error = ""
    }


subscriptions : Model -> Sub Msg
subscriptions model =
    Sub.batch
        [ Keyboard.downs KeyDown
        , Keyboard.ups KeyUp
        , Time.every Time.second Tick
        ]
