defmodule Ac.Blog.SocialMedia do
  use Ecto.Schema
  import Ecto.Changeset

  alias Ac.Blog.SocialMedia
  alias Ac.Item.Product
  
  alias Ac.Helper
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "social_media" do
    field :name, :string    
    field :description, :string
    field :display_name, :string
    field :url, :string

    field :draft, :boolean, default: false
    field :schedule_date, :date     

    field :facebook_code, :string, virtual: true
    
    field :featured_image, :string
    field :image_caption, :string
    field :social_media_type, :string
    field :tags, :string

    has_one :product, Product
  
    timestamps()
  end

  @doc false
  def changeset(%SocialMedia{} = social_media, attrs) do
    social_media
    |> cast(attrs, [:name, :display_name, :description, :tags, :featured_image, :image_caption, :draft, :schedule_date, :social_media_type, :url, :facebook_code])
    |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))    
    |> unique_constraint(:name)          
    |> validate_required([:name, :display_name, :description, :featured_image, :draft, :social_media_type, :url])
    # no tags, image_caption, schedule_date
  end
end


