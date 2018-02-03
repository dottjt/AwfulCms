defmodule Ac.Post.Comment do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Post.Comment
  alias Ac.Account
  alias Ac.Blog 


  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "blog_comments" do
    field :text, :string
    # field :blog_id, :binary_id
    # field :user_id, :binary_id

    belongs_to :post, Blog.Post
    belongs_to :user, Account.User    
    
    timestamps()
  end

  @doc false
  def changeset(%Comment{} = comment, attrs) do
    comment
    |> cast(attrs, [:text])
    |> validate_required([:text])
  end
end
