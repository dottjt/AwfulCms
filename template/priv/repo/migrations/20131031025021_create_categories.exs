defmodule Ac.Repo.Migrations.CreateCategories do
  use Ecto.Migration

  def change do
    create table(:categories, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :description, :text
      add :icon, :string

      # add :product_id, references(:products, on_delete: :nothing, type: :binary_id)
      # add :product_primary_id, references(:products, on_delete: :nothing, type: :binary_id)

      timestamps()
    end
  
    create unique_index(:categories, [:name])
    
    # create index(:categories, [:product_id])
  end
end
