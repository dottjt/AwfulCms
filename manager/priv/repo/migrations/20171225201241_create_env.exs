defmodule Awful.Repo.Migrations.CreateEnv do
  use Ecto.Migration

  def change do
    create table(:env, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :value, :text
      add :type, :string
      
      add :website_acronym, :string 
      
      # add :website_id, references(:websites, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    # create index(:env, [:website_id])
  end
end
