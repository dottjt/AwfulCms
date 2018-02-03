defmodule Ac.Search do
    @moduledoc """
        The Item.Search context.
    """
    
    import Ecto.Query, warn: false
    alias Ac.Repo

    alias Ac.Item
    alias Ac.Item.Product
    alias Ac.Item.Category
    alias Ac.Item.Tag
    
  # SEARCH FUNCTION
  def search_function(query) do
    query = from p in Product,
            where: ilike(p.display_name, ^"%#{query}%"),
            preload: [:product_like, :category, :sub_category, :product_tags, :product_comments]

    Repo.all(query)
  end


  def list_all_category_and_search(search) do
    query = from p in Product,
            # join: t in Tag,
            where: ilike(p.display_name, ^"%#{search}%"), # or ilike(t.display_name, ^"%#{search}%"),
            preload: [:product_like, :category, :sub_category, :product_tags, :product_comments]

    Repo.all(query)
  end

  # query = from pt in ProductTag,
  # join: t in Tag, on: pt.tag_id == t.id and t.id == ^tag_id,
  # join: p in Product, on: pt.product_id == p.id,
  # select: p 

  # Repo.all(query) |> Repo.preload([:product_like, :category, :product_tags, :product_comments])



  def list_category_and_search(category_name, search) do
    category_id = Item.get_category_name!(category_name).id
  
    query = from p in Product,
            join: t in Tag, 
            where: ilike(p.display_name, ^"%#{search}%") and ilike(p.name, ^"%#{search}%") and ilike(t.display_name, ^"%#{search}%") and p.category_id == ^category_id

    Repo.all(query)
  end



end