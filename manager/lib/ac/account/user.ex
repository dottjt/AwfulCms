defmodule Ac.Account.User do
  use Ecto.Schema
  use Coherence.Schema 

  import Ecto.Changeset
  
  alias Ac.Product
  alias Ac.Join
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "users" do
    field :name, :string    
    field :email, :string
    field :admin, :boolean, default: false
    
    # field :password, :string
    # field :password_confirmation, :string 
    # field :password_hash, :string

    # field :like_id, :binary_id
    # field :comment_id, :binary_id

    many_to_many :product_likes, Product.Like, join_through: Join.UserLike
    has_many :product_comments, Ac.Product.Comment
    has_many :blog_comments, Ac.Post.Comment

    timestamps()
  end

  # %User{} = user
  def changeset(model, params \\ %{}) do
    model
    |> cast(params, [:name, :email, :admin])  # Add this
    |> validate_required([:name, :email])
    |> validate_format(:email, ~r/@/)
    # |> validate_coherence(params)                         # Add this
  end

  # def changeset(model, params, :password) do
  #   model
  #   |> cast(params, ~w(password password_confirmation reset_password_token reset_password_sent_at))
  #   |> validate_coherence_password_reset(params)
  # end

end
