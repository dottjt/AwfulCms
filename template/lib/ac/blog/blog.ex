defmodule Ac.Blog do
  @moduledoc """
  The Blog context.
  """

  import Ecto.Query, warn: false
  alias Ac.Repo

  use Timex

  alias Ac.Join.ProductTag
  alias Ac.Item.Product
  alias Ac.Blog.Post
  alias Ac.Item.Tag
  
  @doc """
  Returns the list of posts.

  ## Examples

      iex> list_posts() 
      [%Post{}, ...]

  """
  def list_posts do
    Repo.all(Post)
  end

  def list_posts_assoc do
    Repo.all(Post) |> Repo.preload([:blog_comments])
  end

  def list_posts_assoc_latest_paginate(page_number) do 
    Post 
    |> order_by(desc: :inserted_at)
    |> preload([:blog_comments]) 
    |> Repo.paginate(page: page_number)
  end



  @doc """
  Gets a single post.

  Raises `Ecto.NoResultsError` if the Post does not exist.

  ## Examples

      iex> get_post!(123)
      %Post{}

      iex> get_post!(456)
      ** (Ecto.NoResultsError)

  """
  def get_post!(id), do: Repo.get!(Post, id)
  def get_post_assoc!(id), do: Repo.get!(Post, id) |> Repo.preload([:blog_comments, :tag])
  def get_post_name!(name), do: Repo.get_by!(Post, name: name)
  def get_post_name_assoc!(name), do: Repo.get_by!(Post, name: name) |> Repo.preload([:blog_comments, :tag])
  

  def get_blog_products!(tag_id) do
        query = from pt in ProductTag,
                join: t in Tag, on: pt.tag_id == t.id and t.id == ^tag_id,
                join: p in Product, on: pt.product_id == p.id,
                select: p 
        
        Repo.all(query) |> Repo.preload([:product_like, :category, :product_tags, :product_comments])
  end
  

  @doc """
  Creates a post.

  ## Examples

      iex> create_post(%{field: value})
      {:ok, %Post{}}

      iex> create_post(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_post(attrs \\ %{}) do
    %Post{}
    |> Post.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a post.

  ## Examples

      iex> update_post(post, %{field: new_value})
      {:ok, %Post{}}

      iex> update_post(post, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_post(%Post{} = post, attrs) do
    post
    |> Post.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Post.

  ## Examples

      iex> delete_post(post)
      {:ok, %Post{}}

      iex> delete_post(post)
      {:error, %Ecto.Changeset{}}

  """
  def delete_post(%Post{} = post) do
    Repo.delete(post)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking post changes.

  ## Examples

      iex> change_post(post)
      %Ecto.Changeset{source: %Post{}}

  """
  def change_post(%Post{} = post) do
    Post.changeset(post, %{author: "Julius Reade", post_type: "generic"})
  end

  def change_post_product(%Post{} = post) do
    Post.changeset_product(post, %{author: "Julius Reade", post_type: "product_list", product_limit: 10, product_offset: 0})
  end

  alias Ac.Blog.Update

  @doc """
  Returns the list of updates.

  ## Examples

      iex> list_updates()
      [%Update{}, ...]

  """
  def list_updates do
    Repo.all(Update)
  end


  @doc """
  Gets a single update.

  Raises `Ecto.NoResultsError` if the Update does not exist.

  ## Examples

      iex> get_update!(123)
      %Update{}

      iex> get_update!(456)
      ** (Ecto.NoResultsError)

  """
  def get_update!(id), do: Repo.get!(Update, id)
  def get_update_name!(name), do: Repo.get_by!(Update, name: name)
  
  @doc """
  Creates a update.

  ## Examples

      iex> create_update(%{field: value})
      {:ok, %Update{}}

      iex> create_update(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_update(attrs \\ %{}) do
    %Update{}
    |> Update.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a update.

  ## Examples

      iex> update_update(update, %{field: new_value})
      {:ok, %Update{}}

      iex> update_update(update, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_update(%Update{} = update, attrs) do
    update
    |> Update.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Update.

  ## Examples

      iex> delete_update(update)
      {:ok, %Update{}}

      iex> delete_update(update)
      {:error, %Ecto.Changeset{}}

  """
  def delete_update(%Update{} = update) do
    Repo.delete(update)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking update changes.

  ## Examples

      iex> change_update(update)
      %Ecto.Changeset{source: %Update{}}

  """
  def change_update(%Update{} = update) do

    today = Timex.today 
    today_struct = %{"year" => today.year, "month" => today.month, "day" => today.day}

    Update.changeset(update, %{author: "santa", draft: false, schedule_date: today_struct})
  end

  alias Ac.Blog.Letter

  @doc """
  Returns the list of letters.

  ## Examples

      iex> list_letters()
      [%Letter{}, ...]

  """
  def list_letters do
    Repo.all(Letter)
  end

  @doc """
  Gets a single letter.

  Raises `Ecto.NoResultsError` if the Letter does not exist.

  ## Examples

      iex> get_letter!(123)
      %Letter{}

      iex> get_letter!(456)
      ** (Ecto.NoResultsError)

  """
  def get_letter!(id), do: Repo.get!(Letter, id)

  @doc """
  Creates a letter.

  ## Examples

      iex> create_letter(%{field: value})
      {:ok, %Letter{}}

      iex> create_letter(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_letter(attrs \\ %{}) do
    %Letter{}
    |> Letter.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a letter.

  ## Examples

      iex> update_letter(letter, %{field: new_value})
      {:ok, %Letter{}}

      iex> update_letter(letter, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_letter(%Letter{} = letter, attrs) do
    letter
    |> Letter.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Letter.

  ## Examples

      iex> delete_letter(letter)
      {:ok, %Letter{}}

      iex> delete_letter(letter)
      {:error, %Ecto.Changeset{}}

  """
  def delete_letter(%Letter{} = letter) do
    Repo.delete(letter)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking letter changes.

  ## Examples

      iex> change_letter(letter)
      %Ecto.Changeset{source: %Letter{}}

  """
  def change_letter(%Letter{} = letter) do
    Letter.changeset(letter, %{draft: true})
  end

  alias Ac.Blog.SocialMedia

  @doc """
  Returns the list of social_media.

  ## Examples

      iex> list_social_media()
      [%SocialMedia{}, ...]

  """
  def list_social_media do
    Repo.all(SocialMedia)
  end

  @doc """
  Gets a single social_media.

  Raises `Ecto.NoResultsError` if the Social media does not exist.

  ## Examples

      iex> get_social_media!(123)
      %SocialMedia{}

      iex> get_social_media!(456)
      ** (Ecto.NoResultsError)

  """
  def get_social_media!(id), do: Repo.get!(SocialMedia, id)

  @doc """
  Creates a social_media.

  ## Examples

      iex> create_social_media(%{field: value})
      {:ok, %SocialMedia{}}

      iex> create_social_media(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_social_media(attrs \\ %{}) do
    %SocialMedia{}
    |> SocialMedia.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a social_media.

  ## Examples

      iex> update_social_media(social_media, %{field: new_value})
      {:ok, %SocialMedia{}}

      iex> update_social_media(social_media, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_social_media(%SocialMedia{} = social_media, attrs) do
    social_media
    |> SocialMedia.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a SocialMedia.

  ## Examples

      iex> delete_social_media(social_media)
      {:ok, %SocialMedia{}}

      iex> delete_social_media(social_media)
      {:error, %Ecto.Changeset{}}

  """
  def delete_social_media(%SocialMedia{} = social_media) do
    Repo.delete(social_media)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking social_media changes.

  ## Examples

      iex> change_social_media(social_media)
      %Ecto.Changeset{source: %SocialMedia{}}

  """
  def change_social_media(%SocialMedia{} = social_media) do

    today = Timex.today 
    today_struct = %{"year" => today.year, "month" => today.month, "day" => today.day}

    SocialMedia.changeset(social_media, %{draft: false, social_media_type: "facebook_post", schedule_date: today_struct})
  end

end
