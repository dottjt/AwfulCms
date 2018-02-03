module Helper.GeneratorHelper exposing (..)

import Model exposing (..)
import Model.ModelProduct exposing (..)

import Dict exposing (..)


ctaProductFormGenerator : Model -> ProductForm -> Int -> ProductForm 
ctaProductFormGenerator model productForm ctaInt =
    { productForm | cta = randomCtaGenerator ctaInt }

productLikeProductFormGenerator : Model -> ProductForm -> Int -> ProductForm 
productLikeProductFormGenerator model productForm productLikeInt =
    { productForm | product_like = productLikeInt }


randomCtaGenerator : Int -> String 
randomCtaGenerator int = 
   (Dict.get int ctaDictionary) |> Maybe.withDefault ""

ctaDictionary : Dict.Dict Int String 
ctaDictionary = Dict.fromList
  [ (1, "Nasty!")
  , (2, "Cheap!")
  , (3, "Terrible!")
  , (4, "Gross!")
  , (5, "Ugh!")
  , (6, "Whyyyy!")
  , (7, "Yuck!")
  , (8, "Awful!")
  , (9, "Crap!")
  , (10, "Ugly!")
  , (11, "Ewww!")
  ]

