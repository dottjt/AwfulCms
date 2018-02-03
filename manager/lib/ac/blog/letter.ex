defmodule Ac.Blog.Letter do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Blog.Letter


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "letters" do
    field :message, :string
    field :recipient, :string
    field :subject, :string
    field :draft, :boolean, default: true

    timestamps()
  end

  @doc false
  def changeset(%Letter{} = letter, attrs) do
    letter
    |> cast(attrs, [:recipient, :subject, :message, :draft])
    |> put_change(:subject, "")
    |> validate_required([:recipient, :message, :subject, :draft])
  end
end
