defmodule Ac.Join.ProductTag do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Join.ProductTag


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "products_tags" do
    field :tag_id, :binary_id
    field :product_id, :binary_id

    timestamps()
  end

  @doc false
  def changeset(%ProductTag{} = product_tag, attrs) do
    product_tag
    |> cast(attrs, [])
    |> validate_required([])
  end
end
