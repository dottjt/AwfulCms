defmodule Awful.Repo.Migrations.CreateWebsites do
  use Ecto.Migration

  def change do
    create table(:websites, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :acronym, :string

      timestamps()
    end

  end
end
