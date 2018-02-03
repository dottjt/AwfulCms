defmodule Ac.Item do
  @moduledoc """
  The Item context.
  """

  import Ecto.Query, warn: false
  alias Ac.Repo
  alias Ac.Item.Product
  alias Ac.Item.Category
  alias Ac.Product.Like
  alias Ac.Blog 
  alias Ac.Blog.Post 
  alias Ac.Blog.Update 

  use Timex
  @doc """
  Returns the list of products.

  ## Examples

      iex> list_products()
      [%Product{}, ...]

  """

  

  
  # AJAX FUNCTION 
  def increment_product_like_total(product_id) do
    # can make more efficient by not preloading EVERYTHING
    post = get_product_assoc!(product_id)
    # we then need to get product.product_like.total and increment it.

    post = Ecto.Changeset.change post, title: "New title"
  end



  # LIST PRODUCTS

  def list_products do
    Repo.all(Product)
  end

  def list_products_assoc do
    Repo.all(Product) |> Repo.preload([:product_like, :category, :sub_category, :product_tags, :product_comments, :social_media]) # belongs_to blog_product
  end

  def list_products_assoc_random do
    Enum.take_random(list_products_assoc(), 3)
  end

  def list_products_assoc_latest do 
    Repo.all(from p in Product, order_by: [desc: p.inserted_at], where: [draft: false], limit: 30, preload: [:product_like, :category, :product_tags, :product_comments]) 
  end

  def list_products_assoc_latest_paginate(page_number) do 
      Product 
      |> where(draft: false)
      |> order_by(desc: :inserted_at)
      |> preload([:product_like, :category, :product_tags, :product_comments]) 
      |> Repo.paginate(page: page_number)
  end

  def list_products_draft do
    Repo.all(from p in Product, where: [draft: true], order_by: [desc: p.inserted_at]) 
  end


  # LIST SIDEBAR 

  def list_products_assoc_featured do 
    Repo.all(from p in Product, where: [product_type: "featured", draft: false], limit: 1, preload: [:product_like, :category])
  end

  def list_products_assoc_popular do 
    Repo.all(from p in Product, where: [draft: false], join: l in Like, order_by: [l.total], limit: 3)
  end

  def list_products_assoc_bargain do 
    Repo.all(from p in Product, where: [draft: false], order_by: [desc: p.inserted_at], where: p.price < ^20, limit: 2)    # where: [product_type: "bargain"]
  end


  # INDEX GRID

  def list_grid_assoc_latest do 
    Repo.all(from p in Product, where: [draft: false], order_by: [desc: p.inserted_at], preload: [:product_like, :category, :product_tags, :product_comments], limit: 30) 
  end

  def list_grid_assoc_popular do 
    Repo.all(from p in Product, where: [draft: false], join: l in Like, order_by: [l.total], preload: [:product_like, :category, :product_tags, :product_comments], limit: 30)    
  end

  def list_grid_assoc_category(category_name \\ "home-office") do 
    category_id_of_name = get_category_name!(category_name).id

    Repo.all(from p in Product, where: [category_id: ^category_id_of_name, draft: false], preload: [:product_like, :category, :product_tags, :product_comments], limit: 30)    
  end

  def list_grid_assoc_tag(tags) do 
    Repo.all(from p in Product, where: [draft: false], preload: [:product_like, :category, :product_tags, :product_comments], limit: 30)    
  end


  def homepage_items(page_number) do
    {list_products_assoc_featured(), 
     list_products_assoc_latest_paginate(page_number),
     Blog.list_updates()}
  end

  def sidebar_items do 
    {list_products_assoc_random(),
     list_products_assoc_popular(),
     list_products_assoc_bargain(),
     list_categories_select()}
  end

  def show_items(name) do
    {get_product_name_assoc!(name), 
    list_products_assoc_random(),
    list_products_assoc_popular(),
    list_products_assoc_bargain(),
    list_products_assoc_latest(),
    list_categories_select(),
    Blog.list_updates()}
  end

  def grid_items do
    {list_products_assoc_latest(), 
    list_categories(),
    list_tags()}
  end
  
  def admin_items do
    {Enum.sort(list_products_assoc()),
     Enum.sort(list_categories()),
     Enum.sort(list_sub_categories()),
     Enum.sort(list_tags_assoc()),
     Enum.sort(Blog.list_posts()),
     Enum.sort(list_products_draft())}
  end



  
  @doc """
  Gets a single product.

  Raises `Ecto.NoResultsError` if the Product does not exist.

  ## Examples

      iex> get_product!(123)
      %Product{}

      iex> get_product!(456)
      ** (Ecto.NoResultsError)

  """
  def get_product!(id), do: Repo.get!(Product, id)
  def get_product_assoc!(id), do: Repo.get!(Product, id) |> Repo.preload([:product_like, :product_comments, :category, :sub_category, :product_tags]) # belongs_to blog_product
  def get_product_assoc_repo!(id, repo), do: repo.get!(Product, id) |> repo.preload([:product_like, :product_comments, :category, :sub_category, :product_tags]) # belongs_to blog_product
  def get_product_name_assoc!(name), do: Repo.get_by!(Product, name: name) |> Repo.preload([:product_like, :product_comments, :category, :sub_category, :product_tags]) # belongs_to blog_product
  
  @doc """
  Creates a product.

  ## Examples

      iex> create_product(%{field: value})
      {:ok, %Product{}}

      iex> create_product(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_product(attrs \\ %{}) do
    %Product{}
    |> Product.changeset(attrs)
    |> Repo.insert()
  end

  def create_product_repo(attrs \\ %{}, repo) do

    %Product{}
    |> Product.changeset(attrs)
    |> repo.insert()
  end



  @doc """
  Updates a product.

  ## Examples

      iex> update_product(product, %{field: new_value})
      {:ok, %Product{}}

      iex> update_product(product, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_product(%Product{} = product, attrs) do
    product
    |> Product.changeset(attrs)
    |> Repo.update()
  end

  def update_product_repo(%Product{} = product, attrs, repo) do
    product
    |> Product.changeset(attrs)
    |> repo.update()
  end

  @doc """
  Deletes a Product.

  ## Examples

      iex> delete_product(product)
      {:ok, %Product{}}

      iex> delete_product(product)
      {:error, %Ecto.Changeset{}}

  """
  def delete_product(%Product{} = product) do
    Repo.delete(product)
  end

  def delete_product_repo(%Product{} = product, repo) do
    repo.delete(product)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking product changes.

  ## Examples

      iex> change_product(product)
      %Ecto.Changeset{source: %Product{}}

  """
  def change_product(%Product{} = product) do
    # need to add total as well.
    random_number = Enum.random(200..700)

    cta_response_list = ["Nasty!", "Cheap!", "Terrible!", "Gross!", "Ugh!", "Whyyyy!", "Yuck!", "Awful!", "Crap!", "Ugly!", "Ewww!"]
    cta_response = hd(Enum.take_random(cta_response_list, 1));

    today = Timex.today 
    today_struct = %{"year" => today.year, "month" => today.month, "day" => today.day}

    product_changeset = Product.changeset(product, %{cta: cta_response, product_type: "general", schedule_date: today_struct})
    like_changeset = Like.changeset(%Like{}, %{total: random_number})

    Ecto.Changeset.put_assoc(product_changeset, :product_like, like_changeset)
    
  end

  def change_submit_product(%Product{} = product) do
    random_number = Enum.random(0..1000)
    
    product_changeset = Product.changeset(product, %{cta: "Save", product_type: "submission", draft: true})
    like_changeset = Like.changeset(%Like{}, %{total: random_number})
    
    Ecto.Changeset.put_assoc(product_changeset, :product_like, like_changeset)
  end


  @doc """
  Returns the list of categories.

  ## Examples

      iex> list_categories()
      [%Category{}, ...]

  """
  def list_categories do
    Repo.all(Category)
  end

  def list_categories_select do
    Repo.all(Category)
    
    # query = from(c in Category, select: {c.id, c.name})
    # categories = Repo.all(query)
  end


  # I need nested preload for products?
  def list_categories_assoc do
    
    Repo.all(Category) |> Repo.preload(:products) # belongs_to product
  end

  def list_categories_by_name!(name) do
    Repo.all(from c in Category, where: [name: ^name], limit: 30)
  end

  def list_categories_by_name_assoc!(name) do
    Repo.all(from c in Category, where: [name: ^name], limit: 30, preload: [:sub_categories])
  end


  @doc """
  Gets a single category.

  Raises `Ecto.NoResultsError` if the Category does not exist.

  ## Examples

      iex> get_category!(123)
      %Category{}

      iex> get_category!(456)
      ** (Ecto.NoResultsError)

  """
  def get_category!(id), do: Repo.get!(Category, id)
  def get_category_assoc!(id), do: Repo.get!(Category, id) |> Repo.preload([:sub_categories, :products])
  def get_category_name!(name), do: Repo.get_by!(Category, name: name)
  def get_category_name_assoc!(name), do: Repo.get_by!(Category, name: name) |> Repo.preload([:sub_categories, :products])
  
  def get_product_equal_category_assoc!(category_id) do
  end

  def get_single_category_name_assoc!(name) do
    category = get_category_name!(name)
        
    products_query = from p in Product, where: p.category_id == ^category.id, preload: [:category, :sub_category, :product_like]
    
    Repo.preload(category, products: products_query)
  end 

  def get_single_category_name_assoc_paginate!(category_id, page_number) do
    
    Product 
      |> order_by(desc: :inserted_at)
      |> where(category_id: ^category_id)
      |> preload([:product_like, :category, :product_tags, :product_comments]) 
      |> Repo.paginate(page: page_number)

  end 






  def list_categories_latest_products!(name) do
    Repo.all(from p in Product, join: c in Category, where: c.name == p.category, limit: 5)    
  end

  def get_category_assoc_and_latest_products!(name) do
    category = get_category_name!(name)
     
    product_query = from p in Product, order_by: [desc: p.inserted_at], limit: 3
    category_assoc = Repo.preload(category, products: product_query)

    product_count = Repo.one(from p in Product, join: c in Category, where: c.id == p.category_id, select: count(p.id))

    {category_assoc, product_count}
  end

  @doc """
  Creates a category.

  ## Examples

      iex> create_category(%{field: value})
      {:ok, %Category{}}

      iex> create_category(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_category(attrs \\ %{}) do
    %Category{}
    |> Category.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a category.

  ## Examples

      iex> update_category(category, %{field: new_value})
      {:ok, %Category{}}

      iex> update_category(category, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_category(%Category{} = category, attrs) do
    category
    |> Category.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Category.

  ## Examples

      iex> delete_category(category)
      {:ok, %Category{}}

      iex> delete_category(category)
      {:error, %Ecto.Changeset{}}

  """
  def delete_category(%Category{} = category) do
    Repo.delete(category)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking category changes.

  ## Examples

      iex> change_category(category)
      %Ecto.Changeset{source: %Category{}}

  """
  def change_category(%Category{} = category) do
    Category.changeset(category, %{})
  end

  
  alias Ac.Item.SubCategory

  @doc """
  Returns the list of sub_categories.

  ## Examples

      iex> list_sub_categories()
      [%SubCategory{}, ...]

  """
  def list_sub_categories do
    Repo.all(SubCategory)
  end

  @doc """
  Gets a single sub_category.

  Raises `Ecto.NoResultsError` if the Sub category does not exist.

  ## Examples

      iex> get_sub_category!(123)
      %SubCategory{}

      iex> get_sub_category!(456)
      ** (Ecto.NoResultsError)

  """
  def get_sub_category!(id), do: Repo.get!(SubCategory, id)
  def get_sub_category_no_error(id), do: Repo.get(SubCategory, id)
  
  @doc """
  Creates a sub_category.

  ## Examples

      iex> create_sub_category(%{field: value})
      {:ok, %SubCategory{}}

      iex> create_sub_category(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_sub_category(attrs \\ %{}) do
    %SubCategory{}
    |> SubCategory.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a sub_category.

  ## Examples

      iex> update_sub_category(sub_category, %{field: new_value})
      {:ok, %SubCategory{}}

      iex> update_sub_category(sub_category, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_sub_category(%SubCategory{} = sub_category, attrs) do
    sub_category
    |> SubCategory.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a SubCategory.

  ## Examples

      iex> delete_sub_category(sub_category)
      {:ok, %SubCategory{}}

      iex> delete_sub_category(sub_category)
      {:error, %Ecto.Changeset{}}

  """
  def delete_sub_category(%SubCategory{} = sub_category) do
    Repo.delete(sub_category)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking sub_category changes.

  ## Examples

      iex> change_sub_category(sub_category)
      %Ecto.Changeset{source: %SubCategory{}}

  """
  def change_sub_category(%SubCategory{} = sub_category) do
    SubCategory.changeset(sub_category, %{})
  end

  alias Ac.Item.Tag

  @doc """
  Returns the list of tags.

  ## Examples

      iex> list_tags()
      [%Tag{}, ...]

  """
  def list_tags do
    Repo.all(Tag)
  end

  def list_tags_assoc do  
    Repo.all(Tag) |> Repo.preload([:products, :posts]) # I have no idea if this is possible/can work with many_to_many, we'll find out I suppose :) 
  end


  @doc """
  Gets a single tag.

  Raises `Ecto.NoResultsError` if the Tag does not exist.

  ## Examples

      iex> get_tag!(123)
      %Tag{}

      iex> get_tag!(456)
      ** (Ecto.NoResultsError)

  """
  def get_tag!(id), do: Repo.get!(Tag, id)
  def get_tag_repo!(id, repo), do: repo.get!(Tag, id)

  @doc """
  Creates a tag.

  ## Examples

      iex> create_tag(%{field: value})
      {:ok, %Tag{}}

      iex> create_tag(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_tag(attrs \\ %{}) do
    %Tag{}
    |> Tag.changeset(attrs)
    |> Repo.insert()
  end

  def create_tag_repo(attrs \\ %{}, repo) do
    %Tag{}
    |> Tag.changeset(attrs)
    |> repo.insert()
  end

  @doc """
  Updates a tag.

  ## Examples

      iex> update_tag(tag, %{field: new_value})
      {:ok, %Tag{}}

      iex> update_tag(tag, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_tag(%Tag{} = tag, attrs) do
    tag
    |> Tag.changeset(attrs)
    |> Repo.update()
  end

  def update_tag_repo(%Tag{} = tag, attrs, repo) do
    tag
    |> Tag.changeset(attrs)
    |> repo.update()
  end

  @doc """
  Deletes a Tag.

  ## Examples

      iex> delete_tag(tag)
      {:ok, %Tag{}}

      iex> delete_tag(tag)
      {:error, %Ecto.Changeset{}}

  """
  def delete_tag(%Tag{} = tag) do
    Repo.delete(tag)
  end

  def delete_tag_repo(%Tag{} = tag, repo) do
    repo.delete(tag)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking tag changes.

  ## Examples

      iex> change_tag(tag)
      %Ecto.Changeset{source: %Tag{}}

  """
  def change_tag(%Tag{} = tag) do
    Tag.changeset(tag, %{})
  end


end


