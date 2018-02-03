defmodule Ac.Repo.Migrations.CreateProductLikes do
  use Ecto.Migration

  def change do
    create table(:product_likes, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :total, :integer
      
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :product_id, references(:products, on_delete: :nothing, type: :binary_id)

      timestamps()
    end
    
    create index(:product_likes, [:user_id])
    create index(:product_likes, [:product_id])
  end
end
