defmodule Ac.Repo.Migrations.CreateSubCategories do
  use Ecto.Migration

  def change do
    create table(:sub_categories, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :description, :text
      add :icon, :string
      
      add :category_id, references(:categories, on_delete: :nothing, type: :binary_id)
      # add :product_id, references(:products, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create unique_index(:sub_categories, [:name])
    
    create index(:sub_categories, [:category_id])
    # create index(:sub_categories, [:product_id])
  end
end


# defmodule Ac.Repo.Migrations.CreateProductsSubCategories do
#   use Ecto.Migration

#   def change do
#     create table(:products_sub_categories, primary_key: false) do
#       add :id, :binary_id, primary_key: true

#       add :sub_category_id, references(:sub_categories, on_delete: :nothing, type: :binary_id)
#       add :product_id, references(:products, on_delete: :nothing, type: :binary_id)

#       timestamps()
#     end

#     create index(:products_sub_categories, [:sub_category_id])
#     create index(:products_sub_categories, [:product_id])
#   end
# end
