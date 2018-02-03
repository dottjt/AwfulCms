defmodule Ac.Product.Like do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Product.Like
  alias Ac.Account
  alias Ac.Item
  alias Ac.Join
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "product_likes" do
    field :total, :integer
    # field :user_id, :binary_id
    # field :product_id, :binary_id

    belongs_to :product, Item.Product
    many_to_many :users, Account.User, join_through: Join.UserLike

    timestamps()
  end

  @doc false
  def changeset(%Like{} = like, attrs) do
    like
    |> cast(attrs, [:total])
    |> validate_required([:total])
  end
end