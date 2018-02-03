defmodule AcWeb.SocialMediaController do
  use AcWeb, :controller

  alias Ac.Blog
  alias Ac.Blog.Post
  alias Ac.Blog.Update
  alias Ac.Blog.SocialMedia
  alias Ac.Blog.SocialMediaApi

  alias Ac.Item
  alias Ac.Item.Product

  # def upload_to_all(conn, _params) do
      
  # end
      
  # def upload_to_twitter(conn, _params) do
  #     # SocialMediaApi.twitter_upload(sm_title, sm_desc, sm_tags)
  # end

  # def upload_to_facebook(conn, _params) do
  #     # SocialMediaApi.facebook_upload(sm_title, sm_desc, sm_tags)
  # end

  # def upload_to_pinterest(conn, _params) do
  #     # SocialMediaApi.pintrest_upload(sm_title, sm_desc, sm_tags)
  # end

  # def upload_to_tumblr(conn, _params) do
  #     # SocialMediaApi.tumblr_upload(sm_title, sm_desc, sm_tags) 
  # end


  # {products, categories, sub_categories, tags, posts, products_pending} = Item.admin_items()
  
  # changeset = Item.change_product(%Product{})   
  # changeset_post = Blog.change_post_product(%Post{})
  # changeset_update = Blog.change_update(%Update{})
  # changeset_social_media = changeset_social_media

  # render conn, AcWeb.PageView, "panel.html", products: products, categories: categories, sub_categories: sub_categories, tags: tags, posts: posts, products_pending: products_pending, 
  #                                             changeset: changeset, 
  #                                             changeset_post: changeset_post, 
  #                                             changeset_update: changeset_update,
  #                                             changeset_social_media: changeset_social_media



  def index(conn, _params) do
    social_media = Blog.list_social_media()
    
    render(conn, "index.html", social_media: social_media)
  end

  def new(conn, _params) do
    changeset_social_media = Blog.change_social_media(%SocialMedia{})
    products = Item.list_products_assoc()
    
    render(conn, "new.html", changeset_social_media: changeset_social_media, products: products)
  end

  def create(conn, %{"social_media" => social_media_params}) do

    case social_media_params["social_media_type"] do
      "twitter_post" ->
        SocialMediaApi.twitter_upload(social_media_params)

      "facebook_post" ->
        facebook_code = social_media_params["facebook_code"]

        if facebook_code == "" do
          facebook_api_key = Application.get_env(:ac, :facebook_api_key)
          facebook_redirect_uri = Application.get_env(:ac, :facebook_redirect_url)  
          facebook_login_url = "https://www.facebook.com/v2.11/dialog/oauth?client_id=#{facebook_api_key}&redirect_uri=#{facebook_redirect_uri}"
    
          redirect(conn, external: facebook_login_url)
        else
          SocialMediaApi.facebook_upload(social_media_params, facebook_code)   
        end

      "pinterest_post" ->
        SocialMediaApi.pinterest_upload(social_media_params)

      "tumblr_post" ->
        SocialMediaApi.tumblr_upload(social_media_params) 
    end

    case Blog.create_social_media(social_media_params) do
      {:ok, social_media} ->
        # IO.inspect "social media created"
        conn
        |> put_flash(:info, "Social media created successfully.")
        |> redirect(to: social_media_path(conn, :show, social_media))
       
       
        # message = Item.generate_message("Create New Social", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

      {:error, %Ecto.Changeset{} = changeset_social_media} ->

        # message = Item.generate_message("Create New Social", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message


        products = Item.list_products_assoc()
        
        render(conn, "new.html", changeset_social_media: changeset_social_media, products: products)
    end
  end

  
  def show(conn, %{"id" => id}) do
    social_media = Blog.get_social_media!(id)
    render(conn, "show.html", social_media: social_media)
  end

  def edit(conn, %{"id" => id}) do
    social_media = Blog.get_social_media!(id)
    changeset_social_media = Blog.change_social_media(social_media)
    products = Item.list_products_assoc()
    
    render(conn, "edit.html", social_media: social_media, changeset_social_media: changeset_social_media, products: products)
  end

  def update(conn, %{"id" => id, "social_media" => social_media_params}) do
    social_media = Blog.get_social_media!(id)

    case Blog.update_social_media(social_media, social_media_params) do
      {:ok, social_media} ->

        # message = Item.generate_message("Update Social", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

        conn
        |> put_flash(:info, "Social media updated successfully.")
        |> redirect(to: social_media_path(conn, :show, social_media))
      {:error, %Ecto.Changeset{} = changeset_social_media} ->

        # message = Item.generate_message("Update Social Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

        products = Item.list_products_assoc()
        
        render(conn, "edit.html", social_media: social_media, changeset_social_media: changeset_social_media, products: products)
    end
  end

  def delete(conn, %{"id" => id}) do
    social_media = Blog.get_social_media!(id)
    {:ok, _social_media} = Blog.delete_social_media(social_media)

        # message = Item.generate_message("Delete Social", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message


    conn
    |> put_flash(:info, "Social media deleted successfully.")
    |> redirect(to: social_media_path(conn, :index))
  end
end
