# defmodule Ac.Item.SocialMedia do
#     @moduledoc """
#         The Item.Search context.
#     """
  
#     import Ecto.Query, warn: false
#     alias Ac.Repo
    
#     alias Ac.Item.Product
#     alias Ac.Item.Category
#     alias Ac.Item.Tag
    
#     def facebook_upload(sm_title, sm_desc, sm_tags) do
#         facebook_api_key = Application.get_env(:ac, :facebook_api_key) # app_id
#         facebook_secret_key = Application.get_env(:ac, :facebook_secret_key) # app_id secret
#         facebook_user_acess_token = Application.get_env(:ac, :facebook_user_acess_token)
#         facebook_page_id = Application.get_env(:ac, :facebook_page_id)
#         facebook_redirect_uri = "https://awfulchristmas.com/admin"
#         facebook_state = "facebook_state"

#         # page_access_token = page_acce.ass_token_response.body
#         # login_dialog_url_full = "https://www.facebook.com/v2.11/dialog/oauth?client_id=191659168072517&redirect_uri=https://awfulchristmas.com/admin"    
#         # login_dialog_url_full = "https://www.facebook.com/v2.11/dialog/oauth?client_id=191659168072517&redirect_uri=https://localhost:4000/admin"    
#         login_dialog_url = "https://www.facebook.com/v2.11/dialog/oauth?client_id=#{facebook_api_key}&redirect_uri=#{facebook_redirect_uri}&state=#{facebook_state}"
#         # this will return the code that needs to get into the next request. 

#         access_token = Facebook.access_token(facebook_api_key, facebook_secret_key, "https://awfulchristmas.com/admin", "")

#         Facebook.publish(:photo, facebook_page_id, [message: "this is how we do it"], access_token)

#         # fb_page_acess_query = "https://graph.facebook.com/#{facebook_page_id}?fields=access_token"
#         # page_access_token_response = HTTPoison.get fb_page_acess_query
#         # page_access_token = page_acce.ass_token_response.body

#         # fb_page_post_text_query = "https://graph.facebook.com/#{facebook_page_id}/feed?message=Hello fans"
#         # fb_page_post_photo_query = "https://graph.facebook.com/#{facebook_page_id}/photos?message=Hello fans"

#         # curl -X POST -F filedata=@/some/path/video.mp4 -H "AccessToken: XXX" https://api.vid.me/video/upload

#         # file = "/some/path/video.png"
#         # HTTPoison.post(
#         #   "https://graph.facebook.com/#{facebook_page_id}/photos",
#         #   {:multipart, [{:file, file, {"form-data", [name: "filedata", filename: Path.basename(file)]}, []}]},
#         #   ["AccessToken": "XXXXX"]
#         # )

#     end

#     def twitter_upload(sm_title, sm_desc, sm_tags) do
        
#         # twitter_api_key = Application.get_env(:ac, :twitter_api_key)
#         # twitter_secret_key = Application.get_env(:ac, :twitter_secret_key)
#         # twitter_access_token = Application.get_env(:ac, :twitter_access_token)
#         # twitter_access_token_secret = Application.get_env(:ac, :twitter_access_token_secret)
#         # twitter_owner = Application.get_env(:ac, :twitter_owner)
#         # twitter_owner_id = Application.get_env(:ac, :twitter_owner_id)
        
#         ExTwitter.configure(
#             consumer_key: System.get_env("TWITTER_CONSUMER_KEY"),
#             consumer_secret: System.get_env("TWITTER_CONSUMER_SECRET"),
#             access_token: System.get_env("TWITTER_ACCESS_TOKEN"),
#             access_token_secret: System.get_env("TWITTER_ACCESS_SECRET")
#         )

#         image = File.read!("fixture/images/sample.png")
#         # basically, we need a binary of the thing. 

#         ExTwitter.update_with_media("tweet with media", image, trim_user: true)

#         # POST media/upload (INIT) // returns a media_id
        
#         # POST statuses/update    
#         # POST https://api.twitter.com/1.1/statuses/update.json?status=Maybe%20he%27ll%20finally%20find%20his%20keys.%20%23peterfalk
#             #  needs a media id. 

#         # twurl -H upload.twitter.com -X POST "/1.1/media/upload.json" --file "/path/to/media.jpg" --file-field "media"
#         # System.cmd

        


#         # make post request I dunno

#     end

#     def pintrest_upload(sm_title, sm_desc, sm_tags) do
#         pinterest_api_key = Application.get_env(:ac, :pintrest_api_key)  # app_id
#         pinterest_secret_key = Application.get_env(:ac, :pintrest_secret_key) # app_secret
        
#         pinterest_username = "awfulchristmas"
#         pinterest_board = "fashion" # fetch from the request. 
#         pinterest_description = sm_desc
#         pinterest_product_link = "https://awfulchristmas.com" # links to the product page
#         pinterest_image_url = "https://awfulchristmas.com" # get from product. 

#         # get access code (GET, I think?)
#         # pinterest_access_query = "https://api.pinterest.com/v1/oauth/?response_type=code&redirect_uri=https://awfulchristmas.com/&client_id=#{pinterest_api_key}&scope=read_public,write_public&state=juliusreadeisawesomedawg"
#         # pinterest_access_query_response = HTTPoison.get! pinterest_access_query
#         # access_code = pinterest_access_query_response.body # incomplete

#         # request access token (with access code) (POST)
#         # pinterest_auth_query = "https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=#{pinterest_api_key}&client_secret=#{pinterest_secret_key}&code=#{access_code}"
#         # pinterest_access_query_response = HTTPoison.post pinterest_auth_query #, "{\"body\": \"test\"}", [{"Content-Type", "application/json"}]
#         # access_token = pinterest_access_query_response.body # incomplete

#         # post pin
#         # pinterest_pin_query = "https://api.pinterest.com/v1/me/pins/?access_token=#{access_token}&board=#{pinterest_username}/#{pinterest_board}&note=#{pinterest_description}&link=#{pinterest_product_link}&image_url=#{pinterest_image_url}"
#         # HTTPoison.post pinterest_pin_query

#         # then need a response back, to show that it's all worked.

#         # efficiency considerations
#         # change image type to uplod image to their server, rather than use our own?
#     end

#     def tumblr_upload(sm_title, sm_desc, sm_tags) do
#         tumblr_api_key = Application.get_env(:ac, :tumblr_api_key) # consumer key
#         tumblr_secret_key = Application.get_env(:ac, :tumblr_secret_key) # consumer secret key

#         tb_blog_identifier = Application.get_env(:ac, :tumblr_blog_identifier)
#         tb_product_link = "https://awfulchristmas.com" # links to the product page
#         tb_image_url = "https://awfulchristmas.com" # get from product. 
#         tb_caption = sm_desc


#         # creds = OAuther.credentials(consumer_key: tumblr_api_key, consumer_secret: tumblr_secret_key) # , token: "nnch734d00sl2jdk", token_secret: "pfkkdhi9sl3r4s00")
#         # params = OAuther.sign("post", "https://api.twitter.com/1.1/statuses/lookup.json", [{"id", 485086311205048320}], creds)
#         # {header, req_params} = OAuther.header(params)
        
#         # :hackney.post("https://api.twitter.com/1.1/statuses/lookup.json", [header], {:form, req_params})
        

#         # tb_new_post_query = "https://api.tumblr.com/v2/blog/#{tb_blog_identifier}/post?api_key=#{tb_api}" # caption link source
#         # HTTPoison.post tb_new_post_query


        
#         # efficiency considerations 
#         # use data (as opposed to source to put image in ) to upload to their 

#     end
# end