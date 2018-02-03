defmodule Ac.Blog.Update do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Blog.Update
  alias Ac.Helper
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "updates" do
    field :name, :string
    field :display_name, :string
    field :title, :string
    field :author, :string
    field :excerpt, :string

    field :draft, :boolean, default: false
    field :schedule_date, :date 

    timestamps()
  end

  @doc false
  def changeset(%Update{} = update, attrs) do
    update
    |> cast(attrs, [:name, :author, :display_name, :title, :draft, :excerpt, :schedule_date])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))    
    |> unique_constraint(:name) 
    |> validate_required([:name, :author, :display_name, :excerpt, :schedule_date])
  end
end
