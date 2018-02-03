defmodule Awful.Repo.Migrations.CreateMessages do
  use Ecto.Migration

  def change do
    create table(:messages, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :command, :string
      add :console_type, :string      
      add :text, :string

      timestamps()
    end

  end
end
