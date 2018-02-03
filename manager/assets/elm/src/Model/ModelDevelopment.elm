module Model.ModelDevelopment exposing (..)


type alias ServerStatusItem =
    { status : Bool
    , acronym : String 
    }

type alias CommandItem =
    { name : String
    , key : String
    , script : String  
    , command : Command
    , commandType : CommandType
    }

type Command
    = DUR
    | DURC
    | CompileAll
    | CompileSingle    
    | DeleteAll
    | DeleteSingle 
    | EctoCreateAll 
    | EctoMigrateAll 
    | EctoResetAll 
    | CheckServerStatus
    | UpdateAll
    | UpdateSingle 
    | UpdateEnvConfig
    | UpdateCommonConfig
    | UpdateIndividualConfig
    | PullAll
    | PullSingle 
    | PushAll
    | PushSingle 
    | PushAwfulManager
    | RestartSingle
    | StartSingle
    | StopAll
    | StopSingle
    | SeedAll 
    | SeedSingle 
    | SourceAll
    | SourceSingle
    | TransferImages
    | BuildSingle

type CommandType 
    = DevelopmentAndProduction
    | Development 
    | Production

