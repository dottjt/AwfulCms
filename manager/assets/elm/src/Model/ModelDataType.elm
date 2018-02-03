module Model.ModelDataType exposing (..)

import Model.ModelProduct exposing (..)

type WebsitesDataFormType 
    = ProductDataFormType ProductForm
    | PostDataFormType PostForm
    | TagDataFormType TagForm
    | UpdateDataFormType UpdateForm
    | SocialDataFormType SocialForm


-- SHOW
type WebsitesDataViewType 
    = ProductDataViewType ProductAssoc
    | PostDataViewType PostAssoc
    | TagDataViewType TagAssoc
    | UpdateDataViewType Update
    | SocialDataViewType Social

