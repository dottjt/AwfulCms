module Helper.HttpHelper exposing (..)

import Http exposing (Body, Expect, Request, Error)

import Json.Decode exposing (Decoder)

-- HTTP HELPERS

baseRequest : String -> String -> Expect a -> Body -> Request a
baseRequest verb url expect body =
  Http.request
    { method = verb
    , headers = []
    , url = url
    , expect = expect
    , body = body
    , timeout = Nothing
    , withCredentials = True
    }


httpGet : String -> Decoder a -> (Error -> b) -> (a -> b) -> Cmd b
httpGet url decoder onFail onSucceed =
  let
    request =
      baseRequest "GET" url (Http.expectJson decoder) Http.emptyBody
  in
    Http.send
      (resultToMsg onFail onSucceed)
      request


httpPost : String -> Body -> Decoder a -> (Error -> b) -> (a -> b) -> Cmd b
httpPost url body decoder onFail onSucceed =
  let
    request =
      baseRequest "POST" url (Http.expectJson decoder) body
  in
    Http.send
      (resultToMsg onFail onSucceed)
      request


httpPut : String -> Body -> Decoder a -> (Error -> b) -> (a -> b) -> Cmd b
httpPut url body decoder onFail onSucceed =
  let
    request =
      baseRequest "PUT" url (Http.expectJson decoder) body
  in
    Http.send
      (resultToMsg onFail onSucceed)
      request


httpDelete : String -> Expect a -> (Error -> b) -> (a -> b) -> Cmd b
httpDelete url expect onFail onSucceed =
    let
        request =
            baseRequest "DELETE" url expect Http.emptyBody
    in
        Http.send
            (resultToMsg onFail onSucceed)
            request


resultToMsg : (x -> b) -> (a -> b) -> Result x a -> b
resultToMsg errMsg okMsg result =
    case result of
        Ok a ->
            okMsg a

        Err err ->
            errMsg err


