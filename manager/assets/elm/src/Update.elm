module Update exposing (..)

import Model exposing (..)
import Model.ModelMisc exposing (..)
import Model.ModelForm exposing (..)
import Model.ModelFormType exposing (..)
import Model.ModelDataType exposing (..)
import Model.ModelConfig exposing (..)
import Model.ModelRouting exposing (..)
import Model.ModelDevelopment exposing (..)

import Msg exposing (..)
import Command exposing (..)
import Routing exposing (..)

import Helper.KeyboardHelper exposing (..)
import Helper.DataEmptyHelper exposing (..)
import Helper.DataDropdownHelper exposing (..)
import Helper.UpdateHelper exposing (..)
import Helper.GeneratorHelper exposing (..)
import Helper.ValidationHelper exposing (..)

import Task exposing (..)
import Date exposing (..)
import Time exposing (..)
import Dict exposing (..)
import Random exposing (..)

import DatePicker exposing (defaultSettings)


-- import DoubleSlider exposing (..)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of

        -- APPLICATION COMPONENT
        FailResponse error ->
            { model | error = toString error } ! []


        NewSessionSuccess message ->
            { model | consoleItemList = message :: model.consoleItemList } ! []  -- navbarStatus = response.message } ! []
        -- 2

        FetchConsoleItemSuccess response ->
            { model | consoleItemList = response.messages } ! []  -- navbarStatus = response.message } ! []
        -- 2



        FetchServerStatusSuccess response -> 
          case response.status_type of 
            "development" ->
              { model | developmentServerStatusList = response.serverStatusList, consoleItemList = response.message :: model.consoleItemList } ! []
            "production" ->
              { model | productionServerStatusList = response.serverStatusList, consoleItemList = response.message :: model.consoleItemList } ! []
            _ -> 
              model ! []
        -- 4

        OnChangeServer serverAction devOrProd acronym ->
            case serverAction of 
                StartServer ->
                    model ! [ sendInitialMessage (convertServerAction serverAction) "Initial" Begin, command "start_single" devOrProd acronym ]

                RestartServer ->
                    model ! [ sendInitialMessage (convertServerAction serverAction) "Initial" Begin, command "restart_single" devOrProd acronym ]

                StopServer ->
                    model ! [ sendInitialMessage (convertServerAction serverAction) "Initial" Begin, command "stop_single" devOrProd acronym ]


        ChangeServerSuccess response -> 
          case response.status_type of 
            "development" ->
              { model | developmentServerStatusList = response.serverStatusList, consoleItemList = response.message :: model.consoleItemList } ! [ fetchServerStatus "development" ]
            "production" ->
              { model | productionServerStatusList = response.serverStatusList, consoleItemList = response.message :: model.consoleItemList } ! [ fetchServerStatus "production" ]
            _ ->
              model ! []
        -- 7


        FetchWebsitesIndexSuccess response ->
            { model | websitesItemList = response.websites, consoleItemList = response.message :: model.consoleItemList } ! []


        OnCommand commandItem maybeCommandType -> 
          case maybeCommandType of
            Just commandType ->
              { model | currentTasks = maybePrepend (currentTaskGenerator commandItem.name) model.currentTasks } ! [ sendInitialMessage commandItem.script "Initial" Begin, command commandItem.script (convertCommandType commandType) (model.developmentDropdownSelection |> .acronym) ] -- generateConsoleItem

            Nothing -> 
              model ! [] 


        CommandSuccess message -> 
          case model.currentTasks of 
            Just cTasks ->
              case message.command of 
                "start_single_development" ->
                  { model | consoleItemList = message :: model.consoleItemList, currentTasks = Just (List.filter (\x -> x.name /= message.command ) cTasks) } ! [ fetchServerStatus "development" ]
                "start_single_production" ->
                  { model | consoleItemList = message :: model.consoleItemList, currentTasks = Just (List.filter (\x -> x.name /= message.command ) cTasks) } ! [ fetchServerStatus "production" ]
                _ ->
                  { model | consoleItemList = message :: model.consoleItemList, currentTasks = Just (List.filter (\x -> x.name /= message.command ) cTasks) } ! []
            
            Nothing ->
              case message.command of 
                "start_single_development" ->
                  { model | consoleItemList = message :: model.consoleItemList } ! [ fetchServerStatus "development" ]
                "start_single_production" ->
                  { model | consoleItemList = message :: model.consoleItemList } ! [ fetchServerStatus "production" ]
                _ ->
                  { model | consoleItemList = message :: model.consoleItemList } ! []

            
        -- 13


        -- OVERVIEW COMPONENT

        FetchGoogleAnalyticsData -> 
              model ! [ fetchGoogleAnalyticsData ]

        FetchGoogleAnalyticsDataSuccess response ->  
            { model | googleAnalyticsData = response.googleAnalytics, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 16

        FetchDomainExpirationData -> 
              model ! [ fetchDomainExpirationData ]

        FetchDomainExpirationDataSuccess response -> 
            { model | domainExpirationData = response.domainExpirations, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 19

        OnRenewDomain domain -> 
              model ! [ renewDomain domain ]
        
        RenewDomainSuccess message -> 
            { model | consoleItemList = message :: model.consoleItemList } ! []
        -- 22




        -- DEVELOPMENT COMPONENT


        DevelopmentDropdownChange configDropdown -> 
            { model | configDropdownSelection = (Dict.get configDropdown acronymToDropdownDictionary) |> Maybe.withDefault acDropdown } ! []


        -- BUILD COMPONENT 

        OnCheckDomain domain ->
            model ! [ checkDomain domain ]

        CheckDomainSuccess message -> 
            { model | consoleItemList = message :: model.consoleItemList } ! []
        -- 40


        OnRegisterDomain domain -> 
            model ! [ registerDomain domain ]

        RegisterDomainSuccess message -> 
            { model | consoleItemList = message :: model.consoleItemList } ! []
        -- 43


        OnAccountSetup domain -> 
            model ! [ accountSetup domain ]

        AccountSetupSuccess message ->
            { model | consoleItemList = message :: model.consoleItemList } ! []
        -- 46


        OnServerSetup domain -> 
            model ! [ serverSetup domain ]

        ServerSetupSuccess message ->
            { model | consoleItemList = message :: model.consoleItemList } ! []
        -- 49

        OnNewWebsite submitData -> 
            model ! [ newWebsite submitData ]

        NewWebsiteSuccess message ->
            { model | consoleItemList = message :: model.consoleItemList } ! []
        -- 52



        -- WEBSITE COMPONENT 
        
        OnBlurCheckProductFormValidation -> 
            { model | productFormValidation = productFormValidationUpdate model model.productForm } ! []

        OnBlurCheckPostFormValidation -> 
            { model | postFormValidation = postFormValidationUpdate model model.postForm } ! []

        OnBlurCheckUpdateFormValidation -> 
            { model | updateFormValidation = updateFormValidationUpdate model model.updateForm } ! []

        OnBlurCheckTagFormValidation -> 
            { model | tagFormValidation = tagFormValidationUpdate model model.tagForm } ! []

        OnBlurCheckSocialFormValidation -> 
            { model | socialFormValidation = socialFormValidationUpdate model model.socialForm } ! []

        OnBlurCheckBuildFormValidation -> 
            { model | buildFormValidation = buildFormValidationUpdate model model.buildForm } ! []




        MultiSelectChanged selectedValue ->
            { model | multiSelectTagIdSelected = selectedValue, productForm = updateProductFormProductTags selectedValue model.productForm } ! []


        FetchWebsitesIndividualSuccess response ->
            { model | productForm = updateCategoryIdFromCategoriesList model.productForm response.categories, productAssocList = response.productsAssoc, categoryList = response.categories, tagAssocList = response.tagsAssoc, multiSelectTagIdList = createMultiSelectList response.tagsAssoc, postList = response.posts, productsPendingList = response.productsDraft, socialList = response.social, updateList = response.updates, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 54




        PopulateIndividual websitesDataViewType ->
          case websitesDataViewType of 
            ProductDataViewType data ->
              { model | individualProduct = data } ! []
            PostDataViewType data ->
              { model | individualPost = data } ! []
            TagDataViewType data ->
              { model | individualTag = data } ! []
            UpdateDataViewType data ->
              { model | individualUpdate = data } ! []
            SocialDataViewType data ->
              { model | individualSocial = data } ! []

        PopulateForm websitesDataFormType ->
          case websitesDataFormType of 
            ProductDataFormType data ->
              { model | productForm = data } ! []
            PostDataFormType data ->
              { model | postForm = data } ! []
            TagDataFormType data ->
              { model | tagForm = data } ! []
            UpdateDataFormType data ->
              { model | updateForm = data } ! []
            SocialDataFormType data ->
              { model | socialForm = data } ! []


        SetProductsField field value ->
            case field of 
                ProductFormLikeTotal ->
                    setProductsIntField model field (value |> String.toInt) ! []

                ProductFormPrice ->
                    setProductsFloatField model field (value |> String.toFloat) ! []

                ProductFormCategory -> -- the value is already the category id. 
                    setProductsCategoryIdField model field value ! []

                ProductFormTag -> 
                    { model | productTagId = value } ! []
            
                _ ->
                    setProductsStringField model field value ! []
            
        SetProductsCheckbox -> 
            setProductsBoolField model ProductFormDraft True ! []
        -- 


        ItemCreate websitesDataType ->
            case websitesDataType of 
              ProductDataFormType data -> 
                case productFormValidationCheck model.productFormValidation of 
                  True -> -- True, if list is empty (List was full of False), hence, 
                  { model | productFormValidation = productFormValidationUpdate model data } ! [ ]
                  
                  False -> 
                  { model | productFormValidation = productFormValidationUpdate model data, productForm = emptyProductForm } ! [ itemCreate websitesDataType model.routeAcronym ]

              PostDataFormType data ->
                case postFormValidationCheck model.postFormValidation of 
                  True ->
                  { model | postFormValidation = postFormValidationUpdate model data } ! []
                  
                  False -> 
                  { model | postFormValidation = postFormValidationUpdate model data, postForm = emptyPostForm } ! [ itemCreate websitesDataType model.routeAcronym ]

              TagDataFormType data ->
                case tagFormValidationCheck model.tagFormValidation of 
                  True ->
                  { model | tagFormValidation = tagFormValidationUpdate model data } ! []
                  
                  False ->
                  { model | tagFormValidation = tagFormValidationUpdate model data, tagForm = emptyTagForm } ! [ itemCreate websitesDataType model.routeAcronym ]

              UpdateDataFormType data ->
                case updateFormValidationCheck model.updateFormValidation of 
                  True ->
                  { model | updateFormValidation = updateFormValidationUpdate model data } ! []
                  
                  False ->
                  { model | updateFormValidation = updateFormValidationUpdate model data, updateForm = emptyUpdateForm } ! [ itemCreate websitesDataType model.routeAcronym ]

              SocialDataFormType data ->
                case socialFormValidationCheck model.socialFormValidation of 
                  True ->
                  { model | socialFormValidation = socialFormValidationUpdate model data } ! []
                
                  False -> 
                  { model | socialFormValidation = socialFormValidationUpdate model data, socialForm = emptySocialForm } ! [ itemCreate websitesDataType model.routeAcronym ]


        ItemCreateSuccess message->
            { model | consoleItemList = message :: model.consoleItemList } ! [ fetchWebsiteIndividual model.routeAcronym ]




        ItemUpdate websitesDataType item_id ->
              model ! [ itemUpdate websitesDataType model.routeAcronym item_id ]

        ItemUpdateSuccess message->
            { model | consoleItemList = message :: model.consoleItemList } ! [ fetchWebsiteIndividual model.routeAcronym ]




        ItemDelete websiteType item_id ->
              model ! [ itemDelete websiteType model.routeAcronym item_id ]

        ItemDeleteSuccess message->
            { model | consoleItemList = message :: model.consoleItemList } ! [ fetchWebsiteIndividual model.routeAcronym ]



        SetPostsField field value ->
            case field of 
                PostFormProductLimit ->
                    setPostsIntField model field (stringToInt value) ! []

                PostFormProductOffset ->
                    setPostsIntField model field (stringToInt value) ! []

                PostFormTag ->
                    { model | postTagId = value } ! []
                _ ->
                    setPostsStringField model field value ! []
        -- 



        OnProductFinderInput input ->
            { model | productFinderInput = input } ! []


        PrefilNewProduct ->
              model ! [ prefilNewProduct model.productFinderInput ]

        PrefilNewProductSuccess response ->
            { model | productForm = updateProductForm response.product, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 



        PrefilSocialMediaForm product ->
              model ! [ prefilSocialMediaForm product model.routeAcronym ] 

        PrefilSocialMediaFormSuccess response ->
            { model | socialForm = response.prefil, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 


        SetBuildForm field value ->
            setBuildField model field value ! []




        SetSocialField field value ->
            setSocialStringField model field value ! []
        
        SetSocialCheckbox -> 
            setSocialBoolField model SocialFormDraft True ! []
        

        SetTagsField field value ->
            setTagsField model field value ! []
        --

        SetUpdatesField field value ->
            setUpdatesField model field value ! []
        --

        ToDatePicker msg ->
            let
                ( newDatePicker, datePickerFx, mDate ) =
                    DatePicker.update defaultSettings msg model.datePicker

                date =
                    case mDate of
                        DatePicker.Changed date ->
                            date
                            
                        _ ->
                            model.date           

            in
                { model
                    | date = date
                    , datePicker = newDatePicker
                    , productForm = setInitialProductFormScheduleDateMaybe date model.productForm
                    , updateForm = setInitialUpdateFormScheduleDateMaybe date model.updateForm
                    , socialForm = setInitialSocialFormScheduleDateMaybe date model.socialForm
                }
                    ! [ Cmd.map ToDatePicker datePickerFx ]
        --


        InitialDatePickerDate date -> 
          { model | datePicker = DatePicker.initFromDate date, date = Just date, productForm = setInitialProductFormScheduleDate date model.productForm, updateForm = setInitialUpdateFormScheduleDate date model.updateForm, socialForm = setInitialSocialFormScheduleDate date model.socialForm } ! []

        -- DETAILS COMPONENT 




        -- ENV COMPONENT 

        FetchCommonEnv ->
              model ! [ fetchCommonEnv ]

        FetchCommonEnvSuccess response -> 
            { model | commonEnvData = response.commonEnvData, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 


        FetchConfig configDropdown -> 
            { model | configDropdownSelection = (Dict.get configDropdown acronymToDropdownDictionary) |> Maybe.withDefault acDropdown } ! [ fetchConfig configDropdown ]

        FetchConfigSuccess response -> 
            { model | configEnvData = response.config, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 


        FetchIndividualEnv individualEnvDropdown ->
            { model | individualEnvDropdownSelection = (Dict.get individualEnvDropdown acronymToDropdownDictionary) |> Maybe.withDefault acDropdown } ! [ fetchIndividualEnv individualEnvDropdown ]


        FetchIndividualEnvSuccess response -> 
            { model | individualEnvData = response.individualEnvData, consoleItemList = response.message :: model.consoleItemList } ! []
        -- 


        SetCommonEnvField field value ->
            setCommonEnvField model field value ! []

        SetIndividualEnvField field value ->
            setIndividualEnvField model field value ! []

        -- 36


        UpdateEnv envDataFormType -> 
          case envDataFormType of 
            CommonEnvDataFormType envData -> 
              model ! [ updateCommonEnv model.commonEnvData ]

            IndividualEnvDataFormType envData -> 
              model ! [ updateIndividualEnv model.individualEnvData model.individualEnvDropdownSelection ]
              
            ConfigEnvDataFormType envData -> 
              model ! [ updateConfig model.configEnvData model.configDropdownSelection ]

        UpdateEnvSuccess message -> 
            { model | consoleItemList = message :: model.consoleItemList } ! []
        
  

        SetConfigFormField field value ->
            setConfigField model field value ! []
        


        KeyDown key ->
          let 
            first = List.head model.keysDown |> Maybe.withDefault 0 
            second = List.drop 1 model.keysDown |> List.head |> Maybe.withDefault 0
            third = List.drop 2 model.keysDown |> List.head |> Maybe.withDefault 0
          in
            case model.keyboardAvailable of 
              True -> 
                case key of 
                  192 -> -- ` -- disable Keyboard
                    { model | keyboardAvailable = False } ! [ sendInitialMessage "Disable Keyboard" "Disable Keyboard" Toggle ]

                  49 -> -- 1 -- change dropdown
                    keyDownChangeDropdown model first second third 
                      
                  50 -> -- 2 -- development command
                    keyDownDevelopmentCommand model first second (Just Development) model.developmentDropdownSelection  -- (generateConsoleItem model.currentTime)
                  
                  51 -> -- 3 -- production command
                    keyDownDevelopmentCommand model first second (Just Production) model.developmentDropdownSelection  -- (generateConsoleItem model.currentTime )
                    
                  52 -> -- 4 -- development server start command
                    keyDownChangeUX model first second model.developmentDropdownSelection -- (generateConsoleItem model.currentTime )

                  57 -> -- 9 -- helper
                    { model | showKeyboardHelper = True } ! []

                  27 -> -- escape -- clear keyboard
                    { model | keysDown = [] } ! [ sendInitialMessage "Clear Keyboard" "Console Update" Toggle ] -- ((model.totalTime |> maybeTime |> toString) ++ " ")
                  
                  8 -> -- delete -- remove last item
                  -- not complete 
                    { model | keysDown = deleteLastItemFromList model.keysDown } ! []

                  186 -> -- semicolon -- terminate running command
                    { model | keysDown = [] } ! [ sendInitialMessage "Clear Keyboard" "Console Update" Toggle ] -- ((model.totalTime |> maybeTime |> toString) ++ " ")

                  48 -> -- 0 clear websites form + reactivate generators, fetch server status?
                    { model | keysDown = [], productForm = emptyProductForm, postForm = emptyPostForm, socialForm = emptySocialForm, tagForm = emptyTagForm, updateForm = emptyUpdateForm } ! [ fetchServerStatus "production", fetchServerStatus "development", Random.generate RandomCtaNumber (Random.int 1 11), Random.generate RandomProductLikeNumber (Random.int 214 789), sendInitialMessage ("Reset Form Data") "Toggle" Toggle ]
                  
                  220 -> -- \ submit data
                    keyDownSubmitData model first second model.developmentDropdownSelection

                  _ -> 
                    if List.length model.keysDown < 4 then
                      { model | keysDown = model.keysDown ++ [key] } ! []
                    else 
                        model ! []

              False -> 
                case key of 
                  192 -> -- ` re-enable keyboard
                    { model | keyboardAvailable = True } ! [ sendInitialMessage "Enable Keyboard" "Enable Keyboard" Toggle ] 

                  _ ->
                    model ! []




        RandomCtaNumber randomInt ->
          { model | randomCtaNumber = randomInt, productForm = ctaProductFormGenerator model model.productForm randomInt } ! []

        RandomProductLikeNumber randomInt ->
          { model | randomProductLikeNumber = randomInt, productForm = productLikeProductFormGenerator model model.productForm randomInt } ! []


        KeyUp key ->
          { model | showKeyboardHelper = False } ! []




        -- this first one will most likely never be used
        SendInitialMessage command text consoleItemType  ->
          case model.currentTasks of 
            Just cTasks ->
              model ! [ sendInitialMessage command text consoleItemType ]

            Nothing -> 
              model ! []

        SendInitialMessageSuccess message -> 
              { model | consoleItemList = message :: model.consoleItemList } ! []



        Tick newTime -> 
          model ! [ Date.now |> Task.perform NewDate, Task.perform NewTime Time.now ] -- , Task.perform UpdateCurrentTaskDuration Time.now

        NewDate newDate -> -- need to update schedule_date 
          { model | currentDate = Just newDate } ! [] -- datePicker = setInitialDatePickerMaybe (Just newDate) model.datePicker 

        NewTime newTime ->
          { model | currentTime = Just newTime } ! []
          

        UpdateCurrentTaskDuration second ->
          case model.currentTasks of 
            Just cTasks ->
              { model | currentTasks = Just (List.map incrementDuration cTasks) } ! []

            Nothing -> 
              model ! []
        
        -- FinishCurrentTask name ->
        --   case model.currentTasks of 
        --     Just cTasks ->arwz
        --       { model | currentTasks = Just (List.filter (\x -> x.name /= name ) cTasks) } ! []

        --     Nothing -> 
        --       model ! [] 



        -- NAVIGATION ROUTER
        OnLocationChange location ->
            let
                newRoute =
                    parseLocation location
                websiteAcronym =
                  String.split "/" location.hash |> List.drop 1 |> List.head |> Maybe.withDefault "ac" 

            in
                case newRoute of
                    WebsiteRoute websiteAcronym ->
                        { model | route = newRoute, routeAcronym = websiteAcronym } ! [ sendInitialMessage ("URL To " ++ websiteAcronym) "URL Change" Toggle, fetchWebsiteIndividual websiteAcronym ] 
                    
                    WebsiteNestedRoute websiteAcronym websiteType websiteAction ->
                      case (websiteAcronym == model.routeAcronym) of 
                        True -> -- if acronym of the new websiteAcronym is equal to the existing routeAcronym, don't do anything
                          case websiteType of 
                            "tags" -> 
                              { model | tagFormValidation = tagFormValidationUpdate model model.tagForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "products" -> 
                              { model | productFormValidation = productFormValidationUpdate model model.productForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "social" ->
                              { model | socialFormValidation = socialFormValidationUpdate model model.socialForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "updates" ->
                              { model | updateFormValidation = updateFormValidationUpdate model model.updateForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "posts" -> 
                              { model | postFormValidation = postFormValidationUpdate model model.postForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            _ ->
                              { model | route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ] 

                        False -> 
                          case websiteType of 
                            "tags" -> 
                              { model | tagFormValidation = tagFormValidationUpdate model model.tagForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "products" -> 
                              { model | productFormValidation = productFormValidationUpdate model model.productForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "social" ->
                              { model | socialFormValidation = socialFormValidationUpdate model model.socialForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "updates" ->
                              { model | updateFormValidation = updateFormValidationUpdate model model.updateForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "posts" -> 
                              { model | postFormValidation = postFormValidationUpdate model model.postForm, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            _ ->
                              { model | route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ] 


                    WebsiteNestedRouteShowEdit websiteAcronym websiteType websiteAction itemId ->
                      case (websiteAcronym == model.routeAcronym) of 
                        True -> -- if acronym of the new websiteAcronym is equal to the existing routeAcronym, don't do anything
                          case websiteType of 
                            "tags" -> 
                              { model | tagFormValidation = tagFormValidationUpdate model model.tagForm, tagForm = retrieveTagFromId model.tagAssocList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "products" -> 
                              { model | productFormValidation = productFormValidationUpdate model model.productForm, productForm = retrieveProductAssocFromId model.productAssocList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "social" ->
                              { model | socialFormValidation = socialFormValidationUpdate model model.socialForm, socialForm = retrieveSocialFromId model.socialList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "updates" ->
                              { model | updateFormValidation = updateFormValidationUpdate model model.updateForm, updateForm = retrieveUpdateFromId model.updateList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            "posts" -> 
                              { model | postFormValidation = postFormValidationUpdate model model.postForm, postForm = retrievePostFromId model.postList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ]

                            _ ->
                              { model | route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle ] 

                        False -> 
                          case websiteType of 
                            "tags" -> 
                              { model | tagFormValidation = tagFormValidationUpdate model model.tagForm, tagForm = retrieveTagFromId model.tagAssocList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle, sendInitialMessage ("Fetch Website Individual - " ++ String.toUpper websiteAcronym) "URL Change" Load ] 

                            "products" -> 
                              { model | productFormValidation = productFormValidationUpdate model model.productForm, productForm = retrieveProductAssocFromId model.productAssocList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle, sendInitialMessage ("Fetch Website Individual - " ++ String.toUpper websiteAcronym) "URL Change" Load ] 

                            "social" ->
                              { model | socialFormValidation = socialFormValidationUpdate model model.socialForm, socialForm = retrieveSocialFromId model.socialList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle, sendInitialMessage ("Fetch Website Individual - " ++ String.toUpper websiteAcronym) "URL Change" Load ] 

                            "updates" ->
                              { model | updateFormValidation = updateFormValidationUpdate model model.updateForm, updateForm = retrieveUpdateFromId model.updateList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle, sendInitialMessage ("Fetch Website Individual - " ++ String.toUpper websiteAcronym) "URL Change" Load ] 

                            "posts" -> 
                              { model | postFormValidation = postFormValidationUpdate model model.postForm, postForm = retrievePostFromId model.postList itemId, route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction, routeId = itemId } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle, sendInitialMessage ("Fetch Website Individual - " ++ String.toUpper websiteAcronym) "URL Change" Load ] 

                            _ ->
                              { model | route = newRoute, routeAcronym = websiteAcronym, routeType = websiteType, routeAction = websiteAction } ! [ fetchWebsiteIndividual websiteAcronym, sendInitialMessage ("URL To " ++ String.toUpper websiteAcronym) "URL Change" Toggle, sendInitialMessage ("Fetch Website Individual - " ++ String.toUpper websiteAcronym) "URL Change" Load ] 

                    IndexRoute ->
                      { model | route = newRoute } ! [ sendInitialMessage ("URL To Index") "URL Change" Toggle ]

                    OverviewRoute ->
                      { model | route = newRoute } ! [ sendInitialMessage ("URL To Overview") "URL Change" Toggle ]

                    BuildRoute ->
                      { model | buildFormValidation = buildFormValidationUpdate model model.buildForm, route = newRoute } ! [ sendInitialMessage ("URL To Build") "URL Change" Toggle ]

                    DevelopmentRoute ->
                      { model | route = newRoute } ! [ sendInitialMessage ("URL To Development") "URL Change" Toggle ]

                    ConfigRoute ->
                      { model | route = newRoute } ! [ sendInitialMessage ("URL To Config") "URL Change" Toggle ]

                    NotFoundRoute ->
                        { model | route = newRoute } ! [ sendInitialMessage ("Route Not Found") "URL Change" Toggle ]


