defmodule Ac.Join.UserLike do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Join.UserLike
  alias Ac.Account
  alias Ac.Product

  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users_likes" do
    # field :user_id, :binary_id
    # field :like_id, :binary_id
    belongs_to :user, Account.User
    belongs_to :like, Product.Like

    timestamps()
  end

  @doc false
  def changeset(%UserLike{} = user_like, attrs) do
    user_like
    |> cast(attrs, [])
    |> validate_required([])
  end
end
