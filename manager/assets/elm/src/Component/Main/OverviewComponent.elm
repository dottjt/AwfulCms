module Component.Main.OverviewComponent exposing (..)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)

import Msg exposing (..)
import Model exposing (..)
import Model.ModelOverview exposing (..)
import Model.ModelDevelopment exposing (..)
import Model.ModelMisc exposing (..)

import Helper.ViewHelper exposing (..)
import Helper.TableHelper exposing (..)


overviewComponent : Model -> Html Msg
overviewComponent model =
    div [ class "overview__container" ]
        [ h2 [] [ text "Websites Overview" ]
        , websitesOverviewComponent model
        , h2 [] [ text "Production Server Status" ]
        , productionServerStatusComponent model.productionServerStatusList
        , h2 [] [ text "Google Analytics" ]
        , googleAnalyticsComponent model.googleAnalyticsData
        , h2 [] [ text "Domain Expiration" ]
        , domainExpirationComponent model.domainExpirationData
        ]



-- websites 


websitesOverviewComponent : Model -> Html Msg
websitesOverviewComponent model =
    div [ class "websites__container" ]
        [ websitesOverviewTable model.websitesItemList 
        ]

websitesOverviewTable : List WebsitesItem -> Html Msg 
websitesOverviewTable websitesItemList =
    table [ class "table websites__table" ] <|
          [
            tableHeadGenerator ["website" ,"products" ,"last week" ,"last month" ,"products drafted" ,"posts"]
          ] ++ (List.map websitesOverviewRow websitesItemList)



websitesOverviewRow : WebsitesItem -> Html Msg 
websitesOverviewRow websitesItem =
    tr []
        [ td []
              [ text websitesItem.name ]
        , td [] 
              [ text <| toString <| websitesItem.total_products ] 
        , td [] 
              [ text <| toString <| websitesItem.total_products_week ]
        , td [] 
              [ text <| toString <| websitesItem.total_products_month ]
        , td [] 
              [ text <| toString <| websitesItem.total_products_draft ]
        , td [] 
              [ text <| toString <| websitesItem.total_posts ]              
        ]



-- production overview

productionServerStatusComponent : List ServerStatusItem -> Html Msg 
productionServerStatusComponent serverStatusItemList = 
    table [ class "table production__server__status__container" ] <|
          [ tableHeadGenerator ["status", "website", "start", "restart", "stop"] 
          ] ++ (List.map productionRow serverStatusItemList)
  



productionRow : ServerStatusItem -> Html Msg 
productionRow serverStatusItem =
    tr []
        [ td [] 
              [ div [ class "server_status_indicator", style [ ( "background", (convertServerStatus serverStatusItem.status) )] ] [] ]
        , td [] 
              [ text serverStatusItem.acronym ]
        , td [ align "middle" ] 
              [ button [ onClick <| OnChangeServer StartServer "development" serverStatusItem.acronym ] 
                       [ text "start" ]
              ]
        , td [ align "middle" ] 
              [ button [ onClick <| OnChangeServer RestartServer "development" serverStatusItem.acronym ] 
                       [ text "restart" ]
              ]
        , td [ align "middle" ] 
              [ button [ onClick <| OnChangeServer StopServer "development" serverStatusItem.acronym ] 
                       [ text "stop" ]
              ]
        ]

-- google analytics

googleAnalyticsComponent : List GoogleAnalyticsItem -> Html Msg
googleAnalyticsComponent googleAnalyticsItemList =
    table [ class "table google__analytics__container" ] <|
          [ tableHeadGenerator ["domain", "today", "yesterday", "week", "month", "link"]

          ] ++ (List.map googleAnalyticsHead googleAnalyticsItemList)

          
          
      
googleAnalyticsHead : GoogleAnalyticsItem -> Html Msg
googleAnalyticsHead googleAnalyticsItem =
    tr []
       [ td []
            [ text googleAnalyticsItem.domain ]  
       , td []
            [ text googleAnalyticsItem.today ]  
       , td []
            [ text googleAnalyticsItem.yesterday ]  
       , td []
            [ text googleAnalyticsItem.week ]
       , td []
            [ text googleAnalyticsItem.month ]
       , td []
            [ text googleAnalyticsItem.link ]  
        ]        



-- domain expiration

domainExpirationComponent : List DomainExpirationItem -> Html Msg
domainExpirationComponent domainExpirationItemList =
    div [ class "table domain__expiration__container" ] <|
        [ tableHeadGenerator ["domain", "days till expiration", "expiration date", "autorenew status", "renew"]
        ] ++ (List.map domainExpirationHead domainExpirationItemList)


        
domainExpirationHead : DomainExpirationItem -> Html Msg
domainExpirationHead domainExpirationItem =
    tr []
       [ td []
            [ text domainExpirationItem.domain ]
       , td []
            [ text domainExpirationItem.daysTillExpiration ]
       , td []
            [ text domainExpirationItem.expirationDate ]  
       , td []
            [ text domainExpirationItem.autoRenewStatus ]
       , td []
            [ text domainExpirationItem.renew ]
        ]        



