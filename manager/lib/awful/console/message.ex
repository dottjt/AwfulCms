defmodule Awful.Console.Message do
  use Ecto.Schema
  import Ecto.Changeset
  alias Awful.Console.Message


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "messages" do
    field :command, :string
    field :text, :string
    field :console_type, :string
    # begin, success, failure

    timestamps()
  end

  @doc false
  def changeset(%Message{} = message, attrs) do
    message
    |> cast(attrs, [:command, :text, :console_type])
    |> validate_required([:command, :text, :console_type])
  end
end
