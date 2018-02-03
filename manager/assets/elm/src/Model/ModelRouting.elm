module Model.ModelRouting exposing (..)

type Route
    = IndexRoute
    | OverviewRoute
    | BuildRoute
    | DevelopmentRoute
    | ConfigRoute

    | WebsiteRoute String
    | WebsiteNestedRoute String String String
    | WebsiteNestedRouteShowEdit String String String String
                      
    | NotFoundRoute
