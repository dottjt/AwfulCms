defmodule Ac.Account.Email do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Account.Email


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "emails" do
    field :message, :string
    field :name, :string
    field :recipient, :string
    field :subject, :string

    timestamps()
  end

  @doc false
  def changeset(%Email{} = email, attrs) do
    email
    |> cast(attrs, [:recipient, :subject, :name, :message])
    |> validate_required([:recipient, :subject, :name, :message])
  end
end
