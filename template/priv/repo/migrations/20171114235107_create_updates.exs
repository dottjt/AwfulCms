defmodule Ac.Repo.Migrations.CreateUpdates do
  use Ecto.Migration

  def change do
    create table(:updates, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :title, :string       
      add :author, :string
      add :excerpt, :text

      add :draft, :boolean, default: false, null: false      
      add :schedule_date, :date 
      
      timestamps()
    end

    create unique_index(:updates, [:name])
    
  end
end
