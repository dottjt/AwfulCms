defmodule Ac.Item.Category do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Item.Category
  alias Ac.Item
  alias Ac.Helper

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "categories" do
    field :name, :string
    field :display_name, :string
    field :description, :string
    field :icon, :string
    
    # field :product_id, :binary_id
    has_many :products, Item.Product
    
    # many_to_many :products, Item.Product, join_through: Join.Category
    has_many :sub_categories, Item.SubCategory
    
    timestamps()
  end

  @doc false
  def changeset(%Category{} = category, attrs) do
    category
    |> cast(attrs, [:name, :display_name, :description, :icon])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))        
    |> unique_constraint(:name)    
    |> validate_required([:name, :display_name, :description, :icon])
  end
end
