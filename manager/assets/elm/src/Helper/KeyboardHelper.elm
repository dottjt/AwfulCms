module Helper.KeyboardHelper exposing (..)

import Msg exposing (..)
import Command exposing (..)

import Model exposing (..)
import Model.ModelMisc exposing (..)
import Model.ModelDataType exposing (..)
import Model.ModelKeyboard exposing (..)
import Model.ModelDevelopment exposing (..)

import Keyboard exposing (..)

import Dict exposing (..)
import Navigation exposing (..)

import Helper.DictionaryHelper exposing (..)
import Helper.DataDropdownHelper exposing (..)
import Helper.DateHelper exposing (..)
import Helper.ValidationHelper exposing (..)
import Helper.UpdateHelper exposing (..)


keyDownSubmitData : Model -> KeyCode -> KeyCode -> WebsitesDropdown -> (Model, Cmd Msg)
keyDownSubmitData model first second developmentDropdown = 
  let
    selection_one_without_maybe = submitDataDictionary |> Dict.get first 
    selection_one = submitDataDictionary |> Dict.get first |> Maybe.withDefault { submit_type = WebsitesSubmit, websitesType = Just ProductFormType }

    selection_one_websites_type = submitDataDictionary |> Dict.get first |> Maybe.withDefault { submit_type = WebsitesSubmit, websitesType = Just ProductFormType } |> .websitesType |> Maybe.withDefault ProductFormType

    selection_two_without_maybe = submitDataDoubleDictionary |> Dict.get (first, second)
    selection_two = submitDataDoubleDictionary |> Dict.get (first, second) |> Maybe.withDefault { submit_type = WebsitesSubmit, websitesType = Just ProductFormType }

    selection_two_websites_type = submitDataDoubleDictionary |> Dict.get (first, second) |> Maybe.withDefault { submit_type = WebsitesSubmit, websitesType = Just ProductFormType } |> .websitesType |> Maybe.withDefault ProductFormType
  in
  case List.length model.keysDown of -- if x number of keys
    1 ->   
      case selection_one.submit_type of 
        CommonSubmit ->
          { model | keysDown = [] } ! [ sendInitialMessage "Update Common ENV" "Submit Common ENV" Begin, updateCommonEnv model.commonEnvData ]

        IndividualSubmit ->
          { model | keysDown = [] } ! [ sendInitialMessage ("Update " ++ String.toUpper(model.individualEnvDropdownSelection.acronym) ++ " - Individual ENV") "Submit Individual ENV" Begin, updateIndividualEnv model.individualEnvData model.individualEnvDropdownSelection ]
        
        EnvSubmit ->
          { model | keysDown = [] } ! [ sendInitialMessage ("Update " ++ String.toUpper(model.configDropdownSelection.acronym) ++ " - Config ENV") "Submit Config ENV" Begin, updateConfig model.configEnvData model.configDropdownSelection ]

        BuildSubmit ->
          { model | keysDown = [] } ! [ ]
          
        ProductSearch -> 
          { model | keysDown = [] } ! [ ] -- prefilSocialMediaForm

        WebsitesSubmit ->
          case selection_one_websites_type of 
            ProductFormType ->
              case productFormValidationCheck model.productFormValidation of
                True ->
                { model | keysDown = [], productFormValidation = productFormValidationUpdate model model.productForm } ! [ sendInitialMessage ("Submit New " ++ String.toUpper(model.routeAcronym) ++ " Product") "Submit Product" Begin, itemCreate (ProductDataFormType model.productForm) model.routeAcronym ]

                False ->
                { model | keysDown = [], productFormValidation = productFormValidationUpdate model model.productForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Product") "Invalid" Failure ]

            PostFormType -> 
              case postFormValidationCheck model.postFormValidation of 
                True ->
                { model | keysDown = [], postFormValidation = postFormValidationUpdate model model.postForm } ! [ sendInitialMessage ("Submit New " ++ String.toUpper(model.routeAcronym) ++ " Post") "Submit Post" Begin, itemCreate (PostDataFormType model.postForm) model.routeAcronym ]

                False -> 
                { model | keysDown = [], postFormValidation = postFormValidationUpdate model model.postForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Post") "Invalid" Failure ]

            TagFormType -> 
              case tagFormValidationCheck model.tagFormValidation of 
                True ->
                { model | keysDown = [], tagFormValidation = tagFormValidationUpdate model model.tagForm } ! [ sendInitialMessage ("Submit New " ++ String.toUpper(model.routeAcronym) ++ " Tag") "Submit Tag" Begin, itemCreate (TagDataFormType model.tagForm) model.routeAcronym ]

                False -> 
                { model | keysDown = [], tagFormValidation = tagFormValidationUpdate model model.tagForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Tag") "Invalid" Failure  ]

            UpdateFormType -> 
              case updateFormValidationCheck model.updateFormValidation of 
                True ->
                { model | keysDown = [], updateFormValidation = updateFormValidationUpdate model model.updateForm } ! [ sendInitialMessage ("Submit New " ++ String.toUpper(model.routeAcronym) ++ " Update") "Submit Update" Begin, itemCreate (UpdateDataFormType model.updateForm) model.routeAcronym ]

                False -> 
                { model | keysDown = [], updateFormValidation = updateFormValidationUpdate model model.updateForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Update") "Invalid" Failure ]

            SocialFormType -> 
              case socialFormValidationCheck model.socialFormValidation of 
                True ->
                { model | keysDown = [], socialFormValidation = socialFormValidationUpdate model model.socialForm } ! [ sendInitialMessage ("Submit New " ++ String.toUpper(model.routeAcronym) ++ " Social") "Submit Social" Begin, itemCreate (SocialDataFormType model.socialForm) model.routeAcronym ]

                False ->
                { model | keysDown = [], socialFormValidation = socialFormValidationUpdate model model.socialForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Social") "Invalid" Failure ]

    2 -> 
      case selection_two.submit_type of 
        WebsitesSubmit -> 
          case selection_two_websites_type of 
            ProductFormType -> 
              case productFormValidationCheck model.productFormValidation of
                True ->
                { model | keysDown = [], productFormValidation = productFormValidationUpdate model model.productForm } ! [ sendInitialMessage ("Edit " ++ String.toUpper(model.routeAcronym) ++ " Product") "Edit Product" Begin, itemUpdate (ProductDataFormType model.productForm) model.routeAcronym model.routeId ]

                False ->
                { model | keysDown = [], productFormValidation = productFormValidationUpdate model model.productForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Product") "Invalid" Failure ]

            PostFormType -> 
              case postFormValidationCheck model.postFormValidation of 
                True ->
                { model | keysDown = [], postFormValidation = postFormValidationUpdate model model.postForm } ! [ sendInitialMessage ("Edit " ++ String.toUpper(model.routeAcronym) ++ " Post") "Edit Post" Begin, itemUpdate (PostDataFormType model.postForm) model.routeAcronym model.routeId ]

                False -> 
                { model | keysDown = [], postFormValidation = postFormValidationUpdate model model.postForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Post") "Invalid" Failure ]

            TagFormType -> 
              case tagFormValidationCheck model.tagFormValidation of 
                True ->
                { model | keysDown = [], tagFormValidation = tagFormValidationUpdate model model.tagForm } ! [ sendInitialMessage ("Edit " ++ String.toUpper(model.routeAcronym) ++ " Tag") "Edit Tag" Begin, itemUpdate (TagDataFormType model.tagForm) model.routeAcronym model.routeId ]

                False -> 
                { model | keysDown = [], tagFormValidation = tagFormValidationUpdate model model.tagForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Tag") "Invalid" Failure ]

            UpdateFormType -> 
              case updateFormValidationCheck model.updateFormValidation of 
                True ->
                { model | keysDown = [], updateFormValidation = updateFormValidationUpdate model model.updateForm } ! [ sendInitialMessage ("Edit " ++ String.toUpper(model.routeAcronym) ++ " Update") "Edit Update" Begin, itemUpdate (UpdateDataFormType model.updateForm) model.routeAcronym model.routeId ]

                False -> 
                { model | keysDown = [], updateFormValidation = updateFormValidationUpdate model model.updateForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Update") "Invalid" Failure ]

            SocialFormType -> 
              case socialFormValidationCheck model.socialFormValidation of 
                True ->
                { model | keysDown = [], socialFormValidation = socialFormValidationUpdate model model.socialForm } ! [ sendInitialMessage ("Edit " ++ String.toUpper(model.routeAcronym) ++ " Social") "Edit Social" Begin, itemUpdate (SocialDataFormType model.socialForm) model.routeAcronym model.routeId ]

                False ->
                { model | keysDown = [], socialFormValidation = socialFormValidationUpdate model model.socialForm } ! [ sendInitialMessage ("Invalid " ++ String.toUpper(model.routeAcronym) ++ " Social") "Invalid" Failure ]

        _ ->
          { model | keysDown = [] } ! [ sendInitialMessage "THIS SHOULD NEVER HAPPEN" "THIS SHOULD NEVER HAPPEN" Begin ]


  
    _ -> 
      { model | keysDown = [] } ! [ sendInitialMessage "Non Existent Command" "Does Not Exist" NonExistent ]




keyDownChangeUX : Model -> KeyCode -> KeyCode -> WebsitesDropdown -> (Model, Cmd Msg)
keyDownChangeUX model first second developmentDropdown =
  let 
    selection_one_without_maybe = uxSingleDictionary |> Dict.get first  
    selection_one = uxSingleDictionary |> Dict.get first |> Maybe.withDefault {routeString = "", name = "", routeAction = "", routeType = "" }

    selection_two_without_maybe = uxTupleDictionary |> Dict.get (first, second)
    selection_two = uxTupleDictionary |> Dict.get (first, second) |> Maybe.withDefault {routeString = "", name = "", routeAction = "", routeType = "" }

    -- current_two_route = model.route

    currentDate = model.currentDate |> maybeDate
  in
  case List.length model.keysDown of -- if x number of keys
    1 ->
      case selection_one_without_maybe of -- if exists in dictionary
        Just value ->
          { model | keysDown = [] } ! [ newUrl ("#" ++ selection_one.routeString) ]

        Nothing -> 
          { model | keysDown = [] } ! [ sendInitialMessage "Non Existent URL" "URL Change" NonExistent ]  

    2 ->
      case selection_two_without_maybe of -- if exists in dictionary.
        Just value -> 
          { model | keysDown = [] } ! [ newUrl ("#websites/" ++ developmentDropdown.acronym ++ "/" ++ selection_two.routeString) ]
             
        Nothing -> 
          { model | keysDown = [] } ! [ sendInitialMessage "Non Existent URL" "URL Change" NonExistent ] 

    _ -> 
      { model | keysDown = [] } ! [ sendInitialMessage "Non Existent Command" "Does Not Exist" NonExistent ]
    

-- problem is that this is using the existing model.route, so it's meaningless information. What it needs is the new route
keyDownChangeDropdown : Model -> KeyCode -> KeyCode -> KeyCode -> (Model, Cmd Msg)
keyDownChangeDropdown model first second third =
  let 
    selection_two_without_maybe = Dict.get (first, second) websitestupleDictionary
    selection_two = Dict.get (first, second) websitestupleDictionary |> Maybe.withDefault acDropdown

    selection_three_without_maybe = Dict.get (first, second, third) websitestripleDictionary
    selection_three = Dict.get (first, second, third) websitestripleDictionary |> Maybe.withDefault acDropdown

    currentDate = model.currentDate |> maybeDate
  in
  case List.length model.keysDown of -- if x number of keys 
    2 ->
      case selection_two_without_maybe of -- if exists in dictionary
        Just value ->
              { model | keysDown = [], developmentDropdownSelection = selection_two, configDropdownSelection = selection_two, individualEnvDropdownSelection = selection_two } ! [ newUrl ("#websites/" ++ selection_two.acronym ++ "/" ++ model.routeType ++ "/" ++ model.routeAction) ] -- sendInitialMessage ("Select " ++ String.toUpper selection_two.acronym) "Changed" Toggle, 

        Nothing -> 
          { model | keysDown = [] } ! [ sendInitialMessage "Non Existent DROPDOWN Combination" "Does Not Exist" NonExistent]        

    3 ->
      case selection_three_without_maybe of 
          Just value -> 
                { model | keysDown = [], developmentDropdownSelection = selection_three, configDropdownSelection = selection_three, individualEnvDropdownSelection = selection_three } ! [ newUrl ("#websites/" ++ selection_three.acronym ++ "/" ++ model.routeType ++ "/" ++ model.routeAction) ] -- sendInitialMessage ("Select " ++ String.toUpper selection_three.acronym) "Changed" Toggle, 

          Nothing ->
            { model | keysDown = [] } ! [ sendInitialMessage "Non Existent DROPDOWN Select" "Does Not Exist" NonExistent ]

    _ -> 
      { model | keysDown = [] } ! [ sendInitialMessage "Non Existent DROPDOWN Select" "Does Not Exist" NonExistent ]


keyDownDevelopmentCommand : Model -> KeyCode -> KeyCode -> Maybe CommandType -> WebsitesDropdown -> (Model, Cmd Msg)
keyDownDevelopmentCommand model first second devOrProd developmentDropdown =
  let 
    selection_two_without_maybe = Dict.get (first, second) developmentCommandsDictionary
    selection_two = Dict.get (first, second) developmentCommandsDictionary |> Maybe.withDefault ""
    selection_two_upper = Dict.get (first, second) developmentCommandsDictionary |> Maybe.withDefault "" |> String.toUpper

    unwrapDevOrProd = convertCommandType <| Maybe.withDefault Development devOrProd
  in
  case List.length model.keysDown of -- if x number of keys 
    2 -> 
      case selection_two_without_maybe of -- if exists in dictionary
        Just value ->
          { model | keysDown = [], currentTasks = maybePrepend (currentTaskGenerator selection_two) model.currentTasks } ! [ sendInitialMessage ((normaliseSendInitialMessageCommand selection_two) ++ " " ++ unwrapDevOrProd) "Initial" Begin, command selection_two unwrapDevOrProd developmentDropdown.acronym ]
        Nothing ->
          { model | keysDown = [] } ! [ sendInitialMessage ("Non Existent " ++ String.toUpper unwrapDevOrProd ++ " Command") "Does Not Exist" NonExistent ] 
      
    _ -> 
      { model | keysDown = [] } ! [ sendInitialMessage ("Non Existent " ++ String.toUpper unwrapDevOrProd ++ " Command") "Does Not Exist" NonExistent ] 



normaliseSendInitialMessageCommand : String -> String 
normaliseSendInitialMessageCommand command = 
    command 
      |> String.split("-")
      |> List.map(\x ->
          let 
            rightSide = String.left 1 x
            leftSide = x |> (String.right <| (String.length x) - 1)
          in
            String.append rightSide leftSide 
      )
      |> String.join(" ")



