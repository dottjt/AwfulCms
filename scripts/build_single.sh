#!/bin/bash

# $1 - application acronym i.e. ac 
# $2 - application single i.e. christmas
# $3 - application port i.e. 4001
# $4 - number of ELM categories i.e. 5              # we recommend either 5, 6, 7

# $5 - category one name i.e home-office
# $6 - category one display_name i.e Home & Office
# $7 - category one Model i.e HomeOffice 
# $8 - category one category i.e fa-home-office 

# $9 - category two name i.e home-office
# $10 - category two display_name i.e Home & Office
# $11 - category two Model i.e HomeOffice 
# $12 - category two category i.e fa-home-office 

# $13 - category three name i.e home-office
# $14 - category three display_name i.e Home & Office
# $15 - category three Model i.e HomeOffice 
# $16 - category one category i.e fa-home-office 

# $17 - category four name i.e home-office
# $18 - category four display_name i.e Home & Office
# $19 - category four Model i.e HomeOffice 
# $20 - category one category i.e fa-home-office 

# $21 - category five name i.e home-office
# $22 - category five display_name i.e Home & Office
# $23 - category five Model i.e HomeOffice 
# $24 - category one category i.e fa-home-office 

# $25 - category six name i.e home-office
# $26 - category six display_name i.e Home & Office
# $27 - category six Model i.e HomeOffice 
# $28 - category one category i.e fa-home-office 

# $29 - category seven name i.e home-office
# $30 - category seven display_name i.e Home & Office
# $31 - category seven Model i.e HomeOffice 
# $32 - category one category i.e fa-home-office 


uppercaseacroymn="$(echo "$1" | awk '{print toupper($0)}')"
echo $uppercaseacroymn

uppercasefullword="$(tr '[:lower:]' '[:upper:]' <<< ${2:0:1})${2:1}"
echo $uppercasefullword

### CREATE TEMPLATE

# scripts
mkdir -p $AWFUL_DIR/shared/banner_script/$1/

# config
rsync -rtv $AWFUL_DIR/shared/config/ac/* $AWFUL_DIR/shared/config/$1/

# css variables
rsync -rtv $AWFUL_DIR/shared/css_variables/ac_seeds.exs $AWFUL_DIR/shared/css_variables/$1_seeds.exs


# elm
if [ "$4" -eq 5 ] then
    # awful pet
    rsync -rtv $AWFUL_DIR/shared/elm/ap/* $AWFUL_DIR/shared/elm/$1/
    
    # filter component 
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Home) \"Home\" Home \"fa-home-kennel\"/$7) \"$6\" $7 \"$8\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Toys) \"Toys\" Toys \"fa-toy-tennisball\"/${11}) \"${10}\" ${11} \"${12}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors) \"Sports & Outdoors\" SportsOutdoors \"fae-sun-cloud\"/${15}) \"${14}\" ${15} \"${16}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion) \"Fashion\" Fashion \"fa-fashion-collar\"/${19}) \"${18}\" ${19} \"${20}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Food) \"Food) \"Food\" Food \"fae-meat\"/${23}) \"${22}\" ${23} \"${24}\"/g"
    
    # function helper
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"

        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/home/$5/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/toys/$9/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/sports-outdoors/${13}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/fashion/${17}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/food/${21}/g"

    # model
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"

    # routing
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"

        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/home/$5/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/toys/${9}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/sports-outdoors/${13}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/fashion/${17}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/food/${21}/g"

    # update 
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"

    # view 
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
fi


if [ "$4" -eq 6 ] then
    # awful christmas
    rsync -rtv $AWFUL_DIR/shared/elm/ac/* $AWFUL_DIR/shared/elm/$1/

    # filter component 
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/HomeOffice) \"Home & Office\" HomeOffice \"fa-fort-awesome\"/$7) \"$6\" $7 \"$8\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork) \"Awesome Dork\" AwesomeDork \"fae-planet\"/${11}) \"${10}\" ${11} \"${12}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors) \"Sports & Outdoors\" SportsOutdoors \"fae-sun-cloud\"/${15}) \"${14}\" ${15} \"${16}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion) \"Fashion\" Fashion \"fae-shirt\"/${19}) \"${18}\" ${19} \"${20}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork) \"Food) \"Food\" Food \"fae-pizza\"/${23}) \"${22}\" ${23} \"${24}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/WTF) \"WTF\" WTF \"fa-bomb\"/${27}) \"${26}\" ${27} \"${28}\"/g"
    
    # function helper
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/HomeOffice/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/WTF/${27}/g"

        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/home-office/$5/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/awesome-dork/${9}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/sports-outdoors/${13}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/fashion/${17}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/food/${21}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/wtf/${25}/g"

    # model
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/HomeOffice/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/WTF/${27}/g"

    # routing
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/HomeOffice/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/WTF/${27}/g"

        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/home-office/$5/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/awesome-dork/$9/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/sports-outdoors/${13}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/fashion/${17}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/food/${21}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/wtf/${25}/g"

    # update 
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/HomeOffice/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/WTF/${27}/g"

    # view 
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/HomeOffice/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/AwesomeDork/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/WTF/${27}/g"

fi


if [ "$4" -eq 7 ] then
    # awful child
    rsync -rtv $AWFUL_DIR/shared/elm/ach/* $AWFUL_DIR/shared/elm/$1/


    # filter component 
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Home) \"Home\" Home \"fa-fort-awesome\"/$7) \"$6\" $7 \"$8\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Toys) \"Toys\" Toys \"fae-planet\"/${11}) \"${10}\" ${11} \"${12}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors) \"Sports & Outdoors\" SportsOutdoors \"fae-sun-cloud\"/${15}) \"${14}\" ${15} \"${16}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion) \"Fashion\" Fashion \"fae-shirt\"/${19}) \"${18}\" ${19} \"${20}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/Toys) \"Food) \"Food\" Food \"fae-pizza\"/${23}) \"${22}\" ${23} \"${24}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/TV) \"TV\" TV \"fa-bomb\"/${27}) \"${26}\" ${27} \"${28}\"/g"
        find $AWFUL_DIR/shared/elm/$1/src/Component/FilterComponent.elm -type f -print0 | xargs -0 sed -i '' "s/VideoGames) \"VideoGames\" VideoGames \"fa-bomb\"/${31}) \"${30}\" ${31} \"${32}\"/g"
    
    # function helper
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/TV/${27}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/VideoGames/${31}/g"

        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/home/$5/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/toys/${9}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/sports-outdoors/${13}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/fashion/${17}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/food/${21}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/tv/${25}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Helper/FunctionHelper.elm -type f -print0 | xargs -0 sed -i '' "s/video-games/${29}/g"

    # model
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/TV/${27}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Model.elm -type f -print0 | xargs -0 sed -i '' "s/VideoGames/${31}/g"

    # routing
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/TV/${27}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/VideoGames/${31}/g"

        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/home/$5/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/toys/${9}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/sports-outdoors/${13}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/fashion/${17}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/food/${21}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/tv/${25}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Routing.elm -type f -print0 | xargs -0 sed -i '' "s/video-games/${29}/g"

    # update 
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/TV/${27}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/VideoGames/${31}/g"

    # view 
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Home/$7/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Toys/${11}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/SportsOutdoors/${15}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Fashion/${19}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/Food/${23}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/TV/${27}/g"
        find $AWFUL_DIR/shared/elm/$1/src/Update.elm -type f -print0 | xargs -0 sed -i '' "s/VideoGames/${31}/g"

fi


# env 
rsync -rtv $AWFUL_DIR/shared/env/ac/.ac_env $AWFUL_DIR/shared/env/$1/.$1_env

# images
mkdir -p $AWFUL_DIR/shared/images/$1/


### CHANGE CONFIG

# config/$1/config.exs 
find $AWFUL_DIR/shared/config/$1/config.exs -type f -print0 | xargs -0 sed -i '' "s/\"ac\"/\"$1\"/g"
find $AWFUL_DIR/shared/config/$1/config.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$1/g"
find $AWFUL_DIR/shared/config/$1/config.exs -type f -print0 | xargs -0 sed -i '' "s/\/ac/\/$1/g"
find $AWFUL_DIR/shared/config/$1/config.exs -type f -print0 | xargs -0 sed -i '' "s/\/AC/\/$uppercaseacroymn/g"
find $AWFUL_DIR/shared/config/$1/config.exs -type f -print0 | xargs -0 sed -i '' "s/christmas/$2/g"
find $AWFUL_DIR/shared/config/$1/config.exs -type f -print0 | xargs -0 sed -i '' "s/Christmas/$uppercasefullword/g"

# config/$1/dev.exs
find $AWFUL_DIR/shared/config/$1/dev.exs -type f -print0 | xargs -0 sed -i '' "s/database: \"ac_dev\"/version: \"$1_dev\"/g"
find $AWFUL_DIR/shared/config/$1/dev.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$1/g"
find $AWFUL_DIR/shared/config/$1/dev.exs -type f -print0 | xargs -0 sed -i '' "s/port: 4001/port: $3/g"

# config/$1/prod.exs
find $AWFUL_DIR/shared/config/$1/prod.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$1/g"
find $AWFUL_DIR/shared/config/$1/prod.exs -type f -print0 | xargs -0 sed -i '' "s/port: 4001/port: $3/g"

# config/$1/prod.exs
find $AWFUL_DIR/shared/config/$1/prod.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$1/g"
find $AWFUL_DIR/shared/config/$1/prod.exs -type f -print0 | xargs -0 sed -i '' "s/port: 4001/port: $3/g"

# config/$1/prod.secret.exs
find $AWFUL_DIR/shared/config/$1/prod.secret.exs -type f -print0 | xargs -0 sed -i '' "s/:ac/:$1/g"
find $AWFUL_DIR/shared/config/$1/prod.secret.exs -type f -print0 | xargs -0 sed -i '' "s/database: \"ac_dev\"/version: \"$1_dev\"/g"
