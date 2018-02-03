module Helper.DataNavbarHelper exposing (..)

import Model.ModelDevelopment exposing (..)
import Model.ModelNavbar exposing (..)
import Model.ModelRouting exposing (..)


navbarItems : List NavbarItem
navbarItems = [
    { main = "overview"
    , route = OverviewRoute
    , sub = navbarWebsiteItems
    },
    { main = "development"
    , route = DevelopmentRoute
    , sub = []
    },
    { main = "build"
    , route = BuildRoute
    , sub = []
    },
    { main = "config"
    , route = ConfigRoute
    , sub = []
    }
    ]
    

navbarWebsiteItems : List NavbarSubItem
navbarWebsiteItems = [ 
    { name = "awful christmas"
    , acronym = "ac/products/new"
    },
    { name = "awful fashion"
    , acronym = "af/products/new"
    },
    { name = "awful pet"
    , acronym = "ap/products/new"
    },
    { name = "awful child"
    , acronym = "ach/products/new"
    },
    { name = "awful pokemon"
    , acronym = "apo/products/new"
    },
    { name = "awful harry potter"
    , acronym = "ahp/products/new"
    },
    { name = "awful 90s"
    , acronym = "a9/products/new"
    },
    { name = "awful wedding"
    , acronym = "aw/products/new"
    }
    ] 

websitesMainNavbarItems : List WebsitesNavbarItem
websitesMainNavbarItems = [
    { main = "Product"
    , url = "products"
    , acronym = ""
    , sub = [
      { name = "Index Product"
      , action = "index"
      },
      { name = "New Product"
      , action = "new"
      }
      -- { name = "Edit Product"
      -- , action = "edit"
      -- }
    ]
    },
    { main = "Post"
    , url = "posts"
    , acronym = ""
    , sub = [
      { name = "Index Post"
      , action = "index"
      },
      { name = "New Post"
      , action = "new"
      }
      -- { name = "Edit Post"
      -- , action = "edit"
      -- }
    ]
    },
    { main = "Social"
    , url = "social"
    , acronym = ""    
    , sub = [
      { name = "Index Social"
      , action = "index"
      },
      { name = "New Social"
      , action = "new"
      }
      -- { name = "Edit Social"
      -- , action = "edit"
      -- }
    ]
    },
    { main = "Tag"
    , url = "tags"
    , acronym = ""    
    , sub = [
      { name = "Index Tag"
      , action = "index"
      },
      { name = "New Tag"
      , action = "new"
      }
      -- { name = "Edit Tag"
      -- , action = "edit"
      -- }
    ]
    },
    { main = "Update"
    , url = "updates"
    , acronym = ""    
    , sub = [
      { name = "Index Update"
      , action = "index"
      },
      { name = "New Update"
      , action = "new"
      }
      -- { name = "Edit Update"
      -- , action = "edit"
      -- }
    ]
    },
    { main = "Pending"
    , url = "pending"
    , acronym = ""    
    , sub = [
      -- { name = "Index Pending"
      -- , action = "index"
      -- },
      -- { name = "New Pending"
      -- , action = "new"
      -- },
      -- { name = "Edit Pending"
      -- , action = "edit"
      -- }
    ]
    }
    ]




commandsList : List CommandItem
commandsList = [
    { name = "DUR"
    , key = "DR"
    , script = "dur_all"
    , command = DUR
    , commandType = Development
    },
    { name = "Durc All"
    , key = "DC"
    , script = "durc_all"
    , command = DURC
    , commandType = Development
    },
    { name = "Compile All"
    , key = "CA"
    , script = "compile_all"
    , command = CompileAll
    , commandType = Development
    },
    { name = "Compile Single"
    , key = "CS"
    , script = "compile_single"
    , command = CompileSingle
    , commandType = Development
    },
    { name = "Delete All"
    , key = "DA"
    , script = "delete_all"
    , command = DeleteAll
    , commandType = Development
    },
    { name = "Delete Single"
    , key = "DS"
    , script = "delete_single"
    , command = DeleteSingle
    , commandType = Development
    },
    { name = "Ecto Create All"
    , key = "EA"
    , script = "ecto_create_all"
    , command = EctoCreateAll
    , commandType = Development
    },
    { name = "Ecto Migrate All"
    , key = "EM"
    , script = "ecto_migrate_all"
    , command = EctoMigrateAll
    , commandType = Development
    },
    { name = "Ecto Reset All"
    , key = "ER"
    , script = "ecto_reset_all"
    , command = EctoResetAll
    , commandType = Development
    },
    -- { name = "Fetch Server status"
    -- , key = ""
    -- , script = "fetch_server_status"
    -- , command = CheckServerStatus
    -- , commandType = CheckServerStatus
    -- },
    { name = "Update All"
    , key = "UA"
    , script = "update_all"
    , command = UpdateAll
    , commandType = Development
    },
    { name = "Update Single"
    , key = "US"
    , script = "update_single"
    , command = UpdateSingle
    , commandType = Development
    },
    -- { name = "Update Env config single"
    -- , key = ""
    -- , script = "update_env_config_single"
    -- , command = UpdateEnvConfig
    -- , commandType = UpdateEnvConfig
    -- },
    -- { name = "Update Env common single"
    -- , key = ""
    -- , script = "update_env_common_single"
    -- , command = UpdateCommonConfig
    -- , commandType = UpdateCommonConfig
    -- },
    -- { name = "Update Env individual single"
    -- , key = ""
    -- , script = "update_env_individual_single"
    -- , command = UpdateIndividualConfig
    -- , commandType = UpdateIndividualConfig
    -- },
    { name = "Pull All"
    , key = "PL"
    , script = "pull_all"
    , command = PullAll
    , commandType = Production
    },
    { name = "Pull Single"
    , key = "PS"
    , script = "pull_single"
    , command = PullSingle
    , commandType = Production
    },
    { name = "Push All"
    , key = "PA"
    , script = "push_all"
    , command = PushAll
    , commandType = Development
    },
    { name = "Push Single"
    , key = "PI"
    , script = "push_single"
    , command = PushSingle
    , commandType = Development
    },
    { name = "Push Awful Manager"
    , key = "PM"
    , script = "push_awful_manager"
    , command = PushAwfulManager
    , commandType = Development
    },
    -- { name = "Restart Single"
    -- , key = "RS"
    -- , script = "restart_single"
    -- , command = RestartSingle
    -- , commandType = RestartSingle
    -- },
    -- { name = "Start Single"
    -- , key = "SS"
    -- , script = "start_single"
    -- , command = StartSingle
    -- , commandType = StartSingle
    -- },
    -- { name = "Start All"
    -- , key = "SL"
    -- , script = "start_all"
    -- , command = StartAll
    -- , commandType = StartAll
    -- },
    -- { name = "Stop All"
    -- , key = "SP"
    -- , script = "stop_all"
    -- , command = StopAll
    -- , commandType = StopAll
    -- },
    -- { name = "Stop Single"
    -- , key = "SG"
    -- , script = "stop_single"
    -- , command = StopSingle
    -- , commandType = StopSingle
    -- },
    { name = "Seed All"
    , key = "SA"
    , script = "seed_all"
    , command = SeedAll
    , commandType = Development
    },
    { name = "Seed Single"
    , key = "SI"
    , script = "seed_single"
    , command = SeedSingle
    , commandType = Development
    },
    { name = "Source All"
    , key = "OA"
    , script = "source_all"
    , command = SourceAll
    , commandType = Production
    },
    { name = "Source Single"
    , key = "OI"
    , script = "source_single"
    , command = SourceSingle
    , commandType = Production
    },
    { name = "Transfer Images"
    , key = "TI"
    , script = "transfer_images"
    , command = TransferImages
    , commandType = Development
    }
    -- { name = "Build Single"
    -- , key = "BS"
    -- , script = "build_single"
    -- , command = BuildSingle
    -- , commandType = Development
    -- }
    ]