module Helper.DictionaryHelper exposing (..)

import Keyboard exposing (..)
import Dict exposing (..)
 
import Model.ModelMisc exposing (..) 
import Model.ModelKeyboard exposing (..)

import Helper.DataDropdownHelper exposing (..) 


websitestupleDictionary : Dict.Dict (KeyCode, KeyCode) WebsitesDropdown 
websitestupleDictionary = Dict.fromList
    [ ((65, 76), allDropdown)
    , ((65, 67), acDropdown)
    , ((65, 80), apDropdown)
    , ((65, 70), afDropdown)
    -- achDropdown
    -- apoDropdown
    -- ahpDropdown
    , ((65, 57), a9Dropdown)
    , ((65, 87), awDropdown)
    ]

websitestripleDictionary : Dict.Dict (KeyCode, KeyCode, KeyCode) WebsitesDropdown 
websitestripleDictionary = Dict.fromList
    -- allDropdown
    -- acDropdown
    -- afDropdown
    -- apDropdown
    [ ((65, 67, 72), achDropdown)
    , ((65, 80, 79), apoDropdown)
    , ((65, 72, 80), ahpDropdown)
    -- a9Dropdown
    -- awDropdown
    ]


developmentCommandsDictionary : Dict.Dict (KeyCode, KeyCode) String 
developmentCommandsDictionary = Dict.fromList
    [ ((68, 82), "dur_all" ) -- dr
    , ((68, 67), "durc_all" ) -- dc
    , ((67, 65), "compile_all" ) -- ca
    , ((67, 83), "compile_single" ) -- cs
    , ((68, 65), "delete_all" ) -- da
    , ((68, 83), "delete_single" ) -- ds

    , ((69, 65), "ecto_create_all" ) -- ea
    , ((69, 77), "ecto_migrate_all" ) -- em
    , ((69, 82), "ecto_reset_all" ) -- er

    , ((85, 65), "update_all" ) -- ua
    , ((85, 83), "update_single" ) -- us

    , ((80, 76), "pull_all" ) -- pl
    , ((80, 83), "pull_single" ) -- ps
    , ((80, 65), "push_all" ) -- pa
    , ((80, 73), "push_single" ) -- pi
    , ((80, 77), "push_awful_manager" ) -- pm

    , ((84, 73), "transfer_images" ) -- ti
    
    , ((83, 65), "seed_all" ) -- sa
    , ((83, 73), "seed_single" ) -- si

    , ((79, 65), "source_all" ) -- oa
    , ((79, 73), "source_single" ) -- oi

    , ((66, 83), "build_single" ) -- bs
    , ((83, 83), "start_single" ) -- ss
    , ((83, 76), "start_all" ) -- sl

    , ((83, 71), "stop_single" ) -- sg
    , ((83, 80), "stop_all" ) -- sp
    
    , ((82, 83), "restart_single" ) -- rs
    ]
     

type alias UxDictionary = 
  { routeString : String 
  , routeType : String 
  , routeAction : String 
  , name : String 
  }

uxSingleDictionary : Dict.Dict KeyCode UxDictionary
uxSingleDictionary = Dict.fromList
    [ (79, {routeString = "overview", name = "overview", routeType = "", routeAction = ""} ) -- o
    , (68, {routeString = "development", name = "development", routeType = "", routeAction = ""} ) -- d
    , (87, {routeString = "websites", name = "websites", routeType = "", routeAction = ""} ) -- w
    , (66, {routeString = "build", name = "build", routeType = "", routeAction = ""} ) -- b
    , (67, {routeString = "config", name = "config", routeType = "", routeAction = ""} ) -- c
    ]

uxTupleDictionary : Dict.Dict (KeyCode, KeyCode) UxDictionary 
uxTupleDictionary = Dict.fromList
    [ ((80, 73), {routeString = "products/index", name = "Products Index", routeType = "products", routeAction = "index"}) -- pi
    , ((80, 78), {routeString = "products/new", name = "Products New", routeType = "products", routeAction = "new"}) -- pn 
    , ((66, 73), {routeString = "posts/index", name = "Posts Index", routeType = "posts", routeAction = "index"}) -- bi
    , ((66, 78), {routeString = "posts/new", name = "Posts New", routeType = "posts", routeAction = "new"}) -- bn
    , ((83, 73), {routeString = "social/index", name = "Social Index", routeType = "social", routeAction = "index"}) -- si
    , ((83, 78), {routeString = "social/new", name = "Social New", routeType = "social", routeAction = "new"}) -- sn
    , ((84, 73), {routeString = "tags/index", name = "Tags Index", routeType = "tags", routeAction = "index"}) -- ti
    , ((84, 78), {routeString = "tags/new", name = "Tags New", routeType = "tags", routeAction = "new"}) -- tn
    , ((85, 73), {routeString = "updates/index", name = "Updates Index", routeType = "updates", routeAction = "index"}) -- ui
    , ((85, 78), {routeString = "updates/new", name = "Updates New", routeType = "updates", routeAction = "new"}) -- un
    ]


submitDataDictionary : Dict.Dict KeyCode SubmitData 
submitDataDictionary = Dict.fromList
    [ (80, { submit_type = WebsitesSubmit, websitesType = Just ProductFormType }) -- p
    , (66, { submit_type = WebsitesSubmit, websitesType = Just PostFormType }) -- b
    , (83, { submit_type = WebsitesSubmit, websitesType = Just SocialFormType }) -- s
    , (84, { submit_type = WebsitesSubmit, websitesType = Just TagFormType }) -- t
    , (85, { submit_type = WebsitesSubmit, websitesType = Just UpdateFormType }) -- u

    , (75, { submit_type = ProductSearch, websitesType = Nothing}) -- k

    , (67, { submit_type = CommonSubmit, websitesType = Nothing }) -- c
    , (73, { submit_type = IndividualSubmit, websitesType = Nothing }) -- i
    , (69, { submit_type = EnvSubmit, websitesType = Nothing }) -- e
    ]



submitDataDoubleDictionary : Dict.Dict (KeyCode, KeyCode) SubmitData 
submitDataDoubleDictionary = Dict.fromList
    [ ((80,69), { submit_type = WebsitesSubmit, websitesType = Just ProductFormType }) -- pe
    , ((66,69), { submit_type = WebsitesSubmit, websitesType = Just PostFormType }) -- be
    , ((83,69), { submit_type = WebsitesSubmit, websitesType = Just SocialFormType }) -- se
    , ((84,69), { submit_type = WebsitesSubmit, websitesType = Just TagFormType }) -- te
    , ((85,69), { submit_type = WebsitesSubmit, websitesType = Just UpdateFormType }) -- ue
    ]

