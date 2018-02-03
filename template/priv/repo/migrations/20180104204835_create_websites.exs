defmodule Ac.Repo.Migrations.CreateWebsites do
  use Ecto.Migration

  def change do
    create table(:websites, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :domain, :string
      add :acronym, :string
      add :name, :string
      add :name_lower, :string

      timestamps()
    end

  end
end
