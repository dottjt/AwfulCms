defmodule Ac.Item.Tag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Item.Tag
  alias Ac.Item
  alias Ac.Blog 
  alias Ac.Join
  alias Ac.Helper
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "tags" do
    field :description, :string
    field :display_name, :string
    field :name, :string
    # field :product_id, :binary_id

    many_to_many :products, Item.Product, join_through: Join.Tag
    has_many :posts, Blog.Post

    timestamps()
  end

  @doc false
  def changeset(%Tag{} = tag, attrs) do
    tag
    |> cast(attrs, [:name, :display_name, :description])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))    
    |> unique_constraint(:name)          
    |> validate_required([:name, :display_name, :description])
  end
end
