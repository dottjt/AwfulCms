defmodule Ac.Blog.Post do
  use Ecto.Schema
  import Ecto.Changeset
  
  alias Ac.Blog.Post
  
  alias Ac.Helper
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "posts" do
    field :name, :string    
    field :display_name, :string
    field :author, :string, default: "Julius Reade"    
    field :excerpt, :string
    field :featured_image, :string
    field :post_type, :string
    # generic or product_list

    field :product_limit, :integer
    field :product_offset, :integer
    
    belongs_to :tag, Ac.Item.Tag

    has_many :blog_comments, Ac.Post.Comment

    timestamps()
  end

  @doc false
  def changeset(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:name, :display_name, :featured_image, :excerpt, :author, :post_type])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))    
    |> unique_constraint(:name)
    |> validate_required([:name, :display_name, :featured_image, :excerpt, :author, :post_type])
  end

  def changeset_product(%Post{} = post, attrs) do
    post
    |> cast(attrs, [:name, :display_name, :featured_image, :excerpt, :author, :post_type, :product_limit, :product_offset])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))    
    |> unique_constraint(:name)          
    |> validate_required([:name, :display_name, :featured_image, :excerpt, :author, :post_type, :product_limit, :product_offset])
  end

end
