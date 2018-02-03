defmodule Ac.Repo.Migrations.CreateProductComments do
  use Ecto.Migration

  def change do
    create table(:product_comments, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :text, :text

      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :product_id, references(:products, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:product_comments, [:user_id])
    create index(:product_comments, [:product_id])
  end
end
