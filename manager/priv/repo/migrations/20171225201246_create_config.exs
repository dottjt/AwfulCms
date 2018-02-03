defmodule Awful.Repo.Migrations.CreateConfig do
  use Ecto.Migration

  def change do
    create table(:config, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :value, :string

      add :website_acronym, :string 
      # add :website_id, references(:websites, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    # create index(:config, [:website_id])
  end
end
