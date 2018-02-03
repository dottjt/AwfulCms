defmodule Ac.Account.Website do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Account.Website


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "websites" do
    field :acronym, :string
    field :domain, :string
    field :name, :string
    field :name_lower, :string

    timestamps()
  end

  @doc false
  def changeset(%Website{} = website, attrs) do
    website
    |> cast(attrs, [:domain, :acronym, :name, :name_lower])
    |> validate_required([:domain, :acronym, :name, :name_lower])
  end
end
