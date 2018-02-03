defmodule Ac.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:products, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :price, :float
      add :cta, :string
      add :featured_image, :string
      add :product_type, :string
      add :description, :text
      add :blog_description, :text
      add :url, :text
      add :url_text, :string
            
      add :draft, :boolean, default: false, null: false      
      add :schedule_date, :date
      
      add :category_id, references(:categories, on_delete: :nothing, type: :binary_id)
      add :sub_category_id, references(:sub_categories, on_delete: :nothing, type: :binary_id)
      add :social_media_id, references(:social_media, on_delete: :nothing, type: :binary_id)
      # add :category_id, references(:categories, on_delete: :nothing, type: :binary_id)
      # add :like_id, references(:product_likes, on_delete: :nothing, type: :binary_id)
      # add :comment_id, references(:product_comments, on_delete: :nothing, type: :binary_id)
      #  ohhhh, so I don't need to do this for the "parent", because technically it doesn't exist

      timestamps()
    end    

    create unique_index(:products, [:name])

    create index(:products, [:sub_category_id])
    create index(:products, [:category_id])
    # create index(:products, [:social_media_id])
    # social_media_id seems to break it.
    # create index(:products, [:like_id])
    # create index(:products, [:comment_id])
  end
end

