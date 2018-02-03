defmodule Awful.Core.Env do
  use Ecto.Schema
  import Ecto.Changeset
  alias Awful.Core.Env


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "env" do
    field :name, :string
    field :type, :string
    field :value, :string

    field :website_acronym, :string

    timestamps()
  end

  @doc false
  def changeset(%Env{} = env, attrs) do
    env
    |> cast(attrs, [:name, :value, :type, :website_acronym])
    |> validate_required([:name, :value, :type])
  end
end
