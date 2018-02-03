defmodule Ac.Repo.Migrations.CreateProductsTags do
  use Ecto.Migration

  def change do
    create table(:products_tags, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :tag_id, references(:tags, on_delete: :nothing, type: :binary_id)
      add :product_id, references(:products, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:products_tags, [:tag_id])
    create index(:products_tags, [:product_id])
  end
end
