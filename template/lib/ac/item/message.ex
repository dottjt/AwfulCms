defmodule Ac.Item.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Item.Message


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "messages" do
    field :command, :string
    field :text, :string

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:command, :text])
    |> validate_required([:command, :text])
  end
end
