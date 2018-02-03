defmodule AmazonProduct.Config do
    @moduledoc """
    The configuration used for authorizing and versioning API requests.
    """
  
    defstruct "AssociateTag": System.get_env("AMAZON_ASSOCIATE_TAG"), #"readeassociat-20", # Application.get_env(:amazon_product_advertising_client, :associate_tag), # System.get_env("AMAZON_ASSOCIATE_TAG"),
      "AWSAccessKeyId": System.get_env("AWS_ACCESS_KEY_ID"), #"AKIAJ2ALVRWC6O5INEOQ", # Application.get_env(:amazon_product_advertising_client, :aws_access_key_id), #System.get_env("AWS_ACCESS_KEY_ID"), # 
      "Service": "AWSECommerceService",
      "Version": "2013-08-01"
end
  