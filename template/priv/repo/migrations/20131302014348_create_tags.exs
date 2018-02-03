defmodule Ac.Repo.Migrations.CreateTags do
  use Ecto.Migration

  def change do
    create table(:tags, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :description, :text
      
      add :product_id, references(:products, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create unique_index(:tags, [:name])
    
    create index(:tags, [:product_id])
  end
end
