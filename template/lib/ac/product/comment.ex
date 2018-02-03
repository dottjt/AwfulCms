defmodule Ac.Product.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Product.Comment
  alias Ac.Account
  alias Ac.Item

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "product_comments" do
    field :text, :string
    # field :user_id, :binary_id
    # field :product_id, :binary_id

    belongs_to :user, Account.User
    belongs_to :product, Item.Product

    timestamps()
  end

  @doc false
  def changeset(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:text])
    |> validate_required([:text])
  end
end
