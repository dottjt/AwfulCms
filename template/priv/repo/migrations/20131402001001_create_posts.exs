defmodule Ac.Repo.Migrations.CreatePosts do
  use Ecto.Migration

  def change do
    create table(:posts, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :featured_image, :text
      add :excerpt, :text
      add :author, :string 
      add :post_type, :string
      add :product_limit, :int
      add :product_offset, :int
      
      add :tag_id, references(:tags, on_delete: :nothing, type: :binary_id)      

      timestamps()
    end

    create unique_index(:posts, [:name])
    
  end
end
