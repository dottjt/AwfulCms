defmodule Ac.Item.SubCategory do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Item.SubCategory
  alias Ac.Item
  alias Ac.Helper
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "sub_categories" do
    field :name, :string
    field :display_name, :string    
    field :description, :string
    field :icon, :string 

    # field :category_id, :binary_id
    # field :product_id, :binary_id

    has_many :products, Item.Product
    
    belongs_to :category, Item.Category
    
    timestamps()
  end

  @doc false
  def changeset(%SubCategory{} = sub_category, attrs) do
    sub_category
    |> cast(attrs, [:name, :display_name, :description])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))    
    |> unique_constraint(:name)          
    |> validate_required([:name, :display_name, :description])
  end
end


# defmodule Ac.Join.ProductSubCategory do
#   use Ecto.Schema
#   import Ecto.Changeset
#   alias Ac.Join.ProductSubCategory
#   alias Ac.Item
#   alias Ac.Account

#   @primary_key {:id, :binary_id, autogenerate: true}
#   @foreign_key_type :binary_id
#   schema "products_sub_categories" do
#     # field :category_id, :binary_id
#     # field :product_id, :binary_id
#     belongs_to :sub_category, Item.SubCategory
#     belongs_to :product, Item.Product

#     timestamps()
#   end

#   @doc false
#   def changeset(%ProductSubCategory{} = product_sub_category, attrs) do
#     product_sub_category
#     |> cast(attrs, [])
#     |> validate_required([])
#   end
# end


