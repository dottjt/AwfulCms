defmodule Ac.Repo.Migrations.CreateEmails do
  use Ecto.Migration

  def change do
    create table(:emails, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :recipient, :string
      add :subject, :string
      add :name, :string
      add :message, :string

      timestamps()
    end

  end
end
