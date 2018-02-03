defmodule Awful.Core.Websites do
  use Ecto.Schema
  import Ecto.Changeset
  alias Awful.Core.Websites


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "websites" do
    field :acronym, :string
    field :name, :string

    timestamps()
  end

  @doc false
  def changeset(%Websites{} = websites, attrs) do
    websites
    |> cast(attrs, [:name, :acronym])
    |> validate_required([:name, :acronym])
  end
end
