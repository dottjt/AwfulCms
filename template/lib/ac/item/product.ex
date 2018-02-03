defmodule Ac.Item.Product do
  use Ecto.Schema
  import Ecto.Changeset
  alias Ac.Item
  alias Ac.Product
  alias Ac.Join
  alias Ac.Post
  alias Ac.Helper
  alias Ac.Blog 
  
  @primary_key {:id, :binary_id, autogenerate: true}
  @foreign_key_type :binary_id
  schema "products" do
    field :name, :string
    field :display_name, :string
    field :featured_image, :string
    field :original_featured_image, :string, virtual: true
    
    field :draft, :boolean, default: false
    field :schedule_date, :date 
    
    field :cta, :string
    field :price, :float
    field :product_type, :string
    field :url, :string
    field :url_text, :string 
    field :description, :string
    field :blog_description, :string
    
    
    # field :category_id, :binary_id
    # field :like_id, :binary_id
    # field :comment_id, :binary_id
  
    belongs_to :category, Item.Category
    belongs_to :sub_category, Item.SubCategory
    belongs_to :social_media, Blog.SocialMedia

    many_to_many :product_tags, Item.Tag, join_through: Join.ProductTag
    
    has_one :product_like, Product.Like
    has_many :product_comments, Product.Comment

    timestamps()
  end

  def changeset(%Item.Product{} = product, attrs) do
    product
      |> cast(attrs, [:name, :display_name, :price, :cta, :featured_image, :category_id, :sub_category_id, :original_featured_image,
                      :schedule_date, :draft, :product_type, :url_text, :description, :blog_description, :url])
      |> cast_assoc(:category)
      |> cast_assoc(:sub_category)
      |> cast_assoc(:product_like)
      |> put_change(:url_text, Helper.url_convert(attrs["url"]))            
      |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))
      |> unique_constraint(:name)      
      |> validate_required([:name, :display_name, :price, :cta, :featured_image, 
                            :draft, :url_text, :product_type, :description, 
                            :blog_description, :url])
  end           

  def submit_changeset(%Item.Product{} = product, attrs) do

    product
      |> cast(attrs, [:name, :display_name, :price, :cta, :featured_image, :category_id, :sub_category_id, :original_featured_image,
                      :schedule_date, :draft, :product_type, :url_text, :description, :blog_description, :url])
      |> cast_assoc(:category)
      |> cast_assoc(:sub_category)
      |> cast_assoc(:product_like)
      |> put_change(:url_text, Helper.url_convert(attrs["url"]))            
      |> put_change(:name, Helper.display_name_convert(attrs["display_name"]))
      |> put_change(:blog_description, attrs["description"])            
      |> unique_constraint(:name)
      |> validate_required([:name, :display_name, :price, :cta, :featured_image, 
                            :draft, :product_type, :url_text, :description, 
                            :blog_description, :url])
  end
end


