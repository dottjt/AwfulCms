defmodule Ac.Blog.SocialMediaApi do
      
  alias ExTwitter
  alias Facebook

  def twitter_upload(params) do
      
      ExTwitter.configure(
          consumer_key: System.get_env("AC_TWITTER_API_KEY"),
          consumer_secret: System.get_env("AC_TWITTER_SECRET_KEY"),
          access_token: System.get_env("AC_TWITTER_ACCESS_TOKEN"),
          access_token_secret: System.get_env("AC_TWITTER_ACCESS_TOKEN_SECRET")
      )

      message = params["description"]
      image_url = params["featured_image"]

      response = HTTPoison.get!(image_url, [], [ ssl: [{:versions, [:'tlsv1.2']}]])

      ExTwitter.update_with_media(message, response.body, trim_user: true)
  end

  def facebook_upload(params, facebook_code) do
    facebook_api_key = System.get_env("AC_FACEBOOK_API_KEY") # app_id
    facebook_secret_key = System.get_env("AC_FACEBOOK_SECRET_KEY") # app_id secret
    facebook_page_id = System.get_env("AC_FACEBOOK_PAGE_ID")
    facebook_redirect_uri = System.get_env("AC_FACEBOOK_REDIRECT_URI")
        
    case Facebook.access_token(facebook_api_key, facebook_secret_key, facebook_redirect_uri, facebook_code) do
      {:ok, facebook_response} ->

        access_token = facebook_response["access_token"]
        message = params["description"]        
        url = params["url"]

        image_url = params["featured_image"]
        response = HTTPoison.get!(image_url, [], [ ssl: [{:versions, [:'tlsv1.2']}]])

        File.write!("/tmp/image.png", response.body)

      case Facebook.publish(:photo, facebook_page_id, "/tmp/image.png", [message: message, link: url], access_token) do 
        {:ok, publish_response} ->
          IO.inspect "really did work"
          IO.inspect publish_response
        {:error, error} ->
          IO.inspect "really didn't work."
          IO.inspect error
      end
        
      {:error, error} ->
        IO.inspect "it ain't working bud"
        IO.inspect error 
    end

    File.rm!("tmp/image.png")          
    
  end

  # def pintrest_upload(params) do
  #   pinterest_api_key = System.get_env("AC_PINTREST_API_KEY")  # app_id
  #   pinterest_secret_key = System.get_env("AC_PINTREST_SECRET_KEY") # app_secret
    
  #   pinterest_username = "awfulchristmas"
  #   pinterest_board = "fashion" # fetch from the request. 
  #   pinterest_description = params["description"]
  #   pinterest_product_link = "https://awfulchristmas.com" # links to the product page
  #   pinterest_image_url = "https://awfulchristmas.com" # get from product. 

  #   # get access code (GET, I think?)
  #   # pinterest_access_query = "https://api.pinterest.com/v1/oauth/?response_type=code&redirect_uri=https://awfulchristmas.com/&client_id=#{pinterest_api_key}&scope=read_public,write_public&state=juliusreadeisawesomedawg"
  #   # pinterest_access_query_response = HTTPoison.get! pinterest_access_query
  #   # access_code = pinterest_access_query_response.body # incomplete

  #   # request access token (with access code) (POST)
  #   # pinterest_auth_query = "https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=#{pinterest_api_key}&client_secret=#{pinterest_secret_key}&code=#{access_code}"
  #   # pinterest_access_query_response = HTTPoison.post pinterest_auth_query #, "{\"body\": \"test\"}", [{"Content-Type", "application/json"}]
  #   # access_token = pinterest_access_query_response.body # incomplete

  #   # post pin
  #   # pinterest_pin_query = "https://api.pinterest.com/v1/me/pins/?access_token=#{access_token}&board=#{pinterest_username}/#{pinterest_board}&note=#{pinterest_description}&link=#{pinterest_product_link}&image_url=#{pinterest_image_url}"
  #   # HTTPoison.post pinterest_pin_query

  #   # then need a response back, to show that it's all worked.

  #   # efficiency considerations
  #   # change image type to uplod image to their server, rather than use our own?
  # end

  # def tumblr_upload(params) do
  #   tumblr_api_key = System.get_env("AC_TUMBLR_API_KEY") # consumer key
  #   tumblr_secret_key = System.get_env("AC_TUMBLR_SECRET_KEY") # consumer secret key

  #   tb_blog_identifier = System.get_env("AC_TUMBLR_BLOG_IDENTIFIER")
  #   tb_product_link = "https://awfulchristmas.com" # links to the product page
  #   tb_image_url = "https://awfulchristmas.com" # get from product. 
  #   tb_caption = params["description"]


  #   # creds = OAuther.credentials(consumer_key: tumblr_api_key, consumer_secret: tumblr_secret_key) # , token: "nnch734d00sl2jdk", token_secret: "pfkkdhi9sl3r4s00")
  #   # params = OAuther.sign("post", "https://api.twitter.com/1.1/statuses/lookup.json", [{"id", 485086311205048320}], creds)
  #   # {header, req_params} = OAuther.header(params)
    
  #   # :hackney.post("https://api.twitter.com/1.1/statuses/lookup.json", [header], {:form, req_params})
    

  #   # tb_new_post_query = "https://api.tumblr.com/v2/blog/#{tb_blog_identifier}/post?api_key=#{tb_api}" # caption link source
  #   # HTTPoison.post tb_new_post_query


    
  #   # efficiency considerations 
  #   # use data (as opposed to source to put image in ) to upload to their 
  # end
end