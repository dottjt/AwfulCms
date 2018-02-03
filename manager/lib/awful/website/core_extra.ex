defmodule Awful.CoreExtra do
  @moduledoc """
  The Website context.
  """

  import Ecto.Query, warn: false
  alias Awful.Repo

  alias Awful.Core.Env
  alias Awful.Core.Config

  alias Ac.Item.Product
  alias Ac.Account.Website

  alias Ac.Blog.Post
  alias Ac.Blog.SocialMedia
  alias Ac.Blog.Update

  # CUSTOM 

  def list_websites_data(repo) do

    # products_query = from p in Product, order_by: [desc: p.inserted_at], where: [draft: false], preload: [:product_like, :category, :product_tags, :product_comments] 
    website_name_lower = from w in Website, select: w.acronym
    website_acronym = from w in Website, select: w.acronym
    products_count_query = from p in Product, select: count(p.id)
    posts_count_query = from p in Post, select: count(p.id)        
    products_count_week_query = from p in Product, where: p.inserted_at < datetime_add(^NaiveDateTime.utc_now, -1, "week"), select: count(p.id)
    products_count_month_query = from p in Product, where: p.inserted_at < datetime_add(^NaiveDateTime.utc_now, -1, "month"), select: count(p.id)
    products_count_draft_query = from p in Product, where: [draft: true], select: count(p.id)    

    # I need to load everything that isn't a product
    # I need to get product name, as well as 

    %{name: repo.one(website_name_lower),
      acronym: repo.one(website_acronym),
      total_products: repo.one(products_count_query),
      total_posts: repo.one(posts_count_query),          
      total_products_week: repo.one(products_count_week_query),
      total_products_month: repo.one(products_count_month_query),
      total_products_draft: repo.one(posts_count_query)}
  end

  


  def acronym_to_bucket(acronym) do
    case acronym do
      "ac" ->
        "awfulchristmas.com"
      "af" ->
        "awfulfashion.com"
      "ap" ->
        "awfulpet.com"
      "ach" ->
        "awfulchild.com"
      "ahp" ->
        "awfulharrypotter.com"
      "apo" ->
        "awfulpokemon.com"
      "a9" ->
        "awful90s.com"
      "aw" ->
        "awfulwedding.com"
    end
  end


  def acronym_to_port(acronym) do
    case acronym do
      "ac" ->
        4001
      "af" ->
        4002
      "ap" ->
        4003
      "ach" ->
        4004
      "ahp" ->
        4005
      "apo" ->
        4006
      "a9" ->
        4007
      "aw" ->
        4008
    end
  end


  def acronym_to_repo(acronym) do
    case acronym do
      "ac" ->
        Awful.ACRepo
      "af" ->
        Awful.AFRepo
      "ap" ->
        Awful.APRepo
      "ach" ->
        Awful.ACHRepo
      "ahp" ->
        Awful.AHPRepo
      "apo" ->
        Awful.APORepo
      "a9" ->
        Awful.A9Repo
      "aw" ->
        Awful.AWRepo
    end
  end

  alias Ac.Item.Product 
  alias Ac.Item.Category 
  alias Ac.Item.Tag 
  alias Ac.Blog.Post 

  def list_products_assoc(repo) do
    repo.all(Product) 
      |> repo.preload([:product_like, :category, :product_tags, :product_comments, :social_media]) # belongs_to blog_product

      
  end

  def list_categories(repo) do
    repo.all(Category)
  end

  def list_tags_assoc(repo) do  
    products = 
      repo.all(Tag) 
        |> repo.preload([:posts, :products]) # :products,  I have no idea if this is possible/can work with many_to_many, we'll find out I suppose :) 
  end

  def list_posts_assoc(repo) do
    repo.all(Post) |> repo.preload([:tag])
  end

  def list_products_draft(repo) do
    repo.all(from p in Product, where: [draft: true], order_by: [desc: p.inserted_at]) 
  end

  def list_social(repo) do
    repo.all(SocialMedia) 
  end

  def list_updates(repo) do
    repo.all(Update) 
      |> Enum.map(fn(x) -> 
            
        product_schedule_date = Timex.to_date(x.schedule_date)
        
        struct = %{"year" => product_schedule_date.year, "month" => product_schedule_date.month, "day" => product_schedule_date.day}

        Map.put(x, :schedule_date, struct)
      end)
  end

  def admin_items(repo) do
    {Enum.sort(list_products_assoc(repo)),
     Enum.sort(list_categories(repo)),
     Enum.sort(list_tags_assoc(repo)),
     Enum.sort(list_posts_assoc(repo)),
     Enum.sort(list_products_draft(repo)),
     Enum.sort(list_social(repo)),
     Enum.sort(list_updates(repo))
    }
  end

  #
  #
  # ENV
  #
  #

  def get_products_assoc(repo, id) do
    repo.all(from p in Products, where: [id: ^id]) |> repo.preload([:product_like, :category, :sub_category, :product_tags, :product_comments, :social_media]) # belongs_to blog_product
  end


  def get_common_env(name) do
    Repo.one(from e in Env, where: [name: ^name, type: "common"])
  end

  def get_common_env_value(name) do
    Repo.one(from e in Env, where: [name: ^name, type: "common"], select: e.value)
  end


  def get_individual_env(acronym, name) do
    Repo.one(from e in Env, where: [website_acronym: ^acronym, name: ^name, type: "individual"])
  end

  def get_individual_env_value(acronym, name) do
    Repo.one(from e in Env, where: [website_acronym: ^acronym, name: ^name, type: "individual"], select: e.value)
  end


  def get_config_elm(acronym, name) do
    Repo.one(from e in Env, where: [website_acronym: ^acronym, name: ^name, type: "config"])
  end

  def get_config_elm_value(acronym, name) do
    Repo.one(from e in Env, where: [website_acronym: ^acronym, name: ^name, type: "config"], select: e.value)
  end


  def update_common_env(name, value) do 
    if value == "" do
      IO.inspect "No value supplied, bby."
    else 
      IO.inspect value

      get_common_env(name)
        |> Env.changeset(%{name: name, value: value, type: "common"})
        |> Repo.update()
    end
  end 


  def update_individual_env(name, value, acronym) do 
    if value == "" do
      IO.inspect "No value supplied, bby."
    else 
      IO.inspect value 

      get_individual_env(acronym, name)
        |> Env.changeset(%{name: name, value: value, website_acronym: acronym, type: "individual"})
        |> Repo.update()
    end
  end 

  def update_config_elm(name, value, acronym) do 
    if value == "" do
      IO.inspect "No value supplied, bby."
    else 
      IO.inspect value
      
      get_config_elm(acronym, name)
        |> Env.changeset(%{name: name, value: value, website_acronym: acronym, type: "config"})
        |> Repo.update()
    end
  end 


  def get_websites_acronym!(acronym), do: Repo.get_by!(Websites, acronym: acronym)

end
