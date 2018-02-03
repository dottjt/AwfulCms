defmodule Awful.CoreActions do
  @moduledoc """
  The Website context.
  """

  import Ecto.Query, warn: false
  alias Awful.Repo

  alias Ac.Item
  alias Ac.Blog

  alias Awful.Console

  alias Ac.Upload.ProductPhoto

  use Timex 



  # CREATE 

  # the correct data going through.

  # %{"blog_description" => "ioen",
  # "category_id" => "55e66469-72ad-4641-b36a-9fb2a21d2d4e", "cta" => "Ugh!",
  # "description" => "oine", "display_name" => "arst", "draft" => "false",
  # "featured_image" => :invalid_file_path, "original_featured_image" => "ou",
  # "price" => "123123.0", "product_like" => %{"total" => "437"},
  # "product_type" => "general",
  # "schedule_date" => %{"day" => "15", "month" => "1", "year" => "2018"},
  # "tag_id" => ["ceb0310b-d339-48ed-ab14-2e5df01de735"],
  # "url" => "https://www.cake.com"}


  def product_create(repo, bucket, data) do 
    

    # set bucket, I believe? 
    ProductPhoto.bucket(bucket)

    date_struct = data["schedule_date"]
    date = Timex.to_date(date_struct)

    new_prod_params = 
      %{ data | "featured_image" => ProductPhoto.upload_product_photo_store(data["featured_image"]) }
        # |> Map.put("category_id", data["category"]["id"])
        # |> Map.put("tag_id", Enum.map(data["product_tags"], &(&1["id"])))
        |> Map.put("product_like", %{total: data["product_like"]})
        |> Map.delete("category")

    IO.inspect new_prod_params

    case Item.create_product_repo(new_prod_params, repo) do
      {:ok, product} ->
        Console.generate_message("Create New Product", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Create New Product", "Complete", "failure")
    end
  end


  def post_create(repo, data) do  
    case Blog.create_post_repo(data, repo) do
      {:ok, post} ->

        Console.generate_message("Create New Post", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Create New Post", "Complete", "failure")

    end
  end


  def post_product_list_create(repo, data) do  
          
    case Blog.create_post_repo(data, repo) do
      {:ok, post} ->
        
        Console.generate_message("Create New Post Product List", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Create New Post Product List", "Complete", "error")

    end
  end


  def tag_create(repo, data) do 
    case Item.create_tag_repo(data, repo) do
      {:ok, tag} ->

        Console.generate_message("Create New Tag", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Create New Tag", "Complete", "failure")

    end
  end


  def update_create(repo, data) do 

    date_struct = data["schedule_date"]
    date = Timex.to_date(date_struct)

    IO.inspect data 

    case Blog.create_update_repo(data, repo) do
      {:ok, update} ->

        Console.generate_message("Create New Update", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Create New Update", "Complete", "failure")

    end
  end


  def social_create(repo, data) do 
    
    case data["social_media_type"] do
      "twitter_post" ->
        SocialMediaApi.twitter_upload(data)

      "facebook_post" ->
        facebook_code = data["facebook_code"]

        if facebook_code == "" do
          facebook_api_key = Application.get_env(:ac, :facebook_api_key)
          facebook_redirect_uri = Application.get_env(:ac, :facebook_redirect_url)  
          facebook_login_url = "https://www.facebook.com/v2.11/dialog/oauth?client_id=#{facebook_api_key}&redirect_uri=#{facebook_redirect_uri}"
    

          # okay, I will need to figure this out. 
          # render()
          # redirect(conn, external: facebook_login_url)
          
        else
          SocialMediaApi.facebook_upload(data, facebook_code)   
        end

      # "pinterest_post" ->
        # SocialMediaApi.pinterest_upload(data)


      # "tumblr_post" ->
        # SocialMediaApi.tumblr_upload(data) 
    end

    case Blog.create_social_media(data) do
      {:ok, social_media} ->

       Console.generate_message("Create New Social", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

       Console.generate_message("Create New Social", "Complete", "failure")

    end
  end





  # UPDATE

  def product_update(repo, id, data) do 

    product = Item.get_product_assoc_repo!(id, repo)

    new_data =
      data 
        |> Map.put("product_like", %{total: data["product_like"]})


    case Item.update_product_repo(product, new_data, repo) do
      {:ok, product} ->

        Console.generate_message("Update Product", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Update Product", "Complete", "failure")

    end
  end


  def post_update(repo, id, data) do  

    post = Blog.get_post_repo!(id, repo)

    case Blog.update_post_repo(post, data, repo) do
      {:ok, post} ->

        Console.generate_message("Update Post", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Update Post", "Complete", "failure")

    end
  end


  def tag_update(repo, id, data) do 
    tag = Item.get_tag_repo!(id, repo)

    case Item.update_tag_repo(tag, data, repo) do
      {:ok, tag} ->

        Console.generate_message("Update Tag", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Update Tag", "Complete", "failure")

    end
  end


  def update_update(repo, id, data) do 
    update = Blog.get_update_repo!(id, repo)

    case Blog.update_update_repo(update, data, repo) do
      {:ok, update} ->
        
       Console.generate_message("Update Update", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

       Console.generate_message("Update Update", "Complete", "failure")

    end
  end


  def social_update(repo, social_media_type, id, data) do 
    social_media = Blog.get_social_media_repo!(id, repo)

    case Blog.update_social_media_repo(social_media, data, repo) do
      {:ok, social_media} ->

        Console.generate_message("Update Social", "Complete", "success")

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect changeset

        Console.generate_message("Update Social", "Complete", "failure")

    end
  end





  # DELETE

  def product_delete(repo, id) do
    
    product = Item.get_product_assoc_repo!(id, repo)
    {:ok, _product} = Item.delete_product_repo(product, repo)

    Console.generate_message("Delete Product", "Complete", "success")
  end


  def post_delete(repo, id) do  
    post = Blog.get_post_repo!(id, repo)
    {:ok, _post} = Blog.delete_post_repo(post, repo)

    Console.generate_message("Update Product", "Complete", "success")

  end


  def tag_delete(repo, id) do 
    tag = Item.get_tag_repo!(id, repo)
    {:ok, _tag} = Item.delete_tag_repo(tag, repo)

    Console.generate_message("Delete Tag", "Complete", "success")

  end


  def update_delete(repo, id) do 
    update = Blog.get_update_repo!(id, repo)
    {:ok, _update} = Blog.delete_update_repo(update, repo)

    Console.generate_message("Delete Update", "Complete", "success")

  end


  def social_delete(repo, social_media_type, id) do 
    social_media = Blog.get_social_media_repo!(id, repo)
    {:ok, _social_media} = Blog.delete_social_media_repo(social_media, repo)

    Console.generate_message("Delete Social", "Complete", "success")
    
  end


end
