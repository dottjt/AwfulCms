defmodule Ac.Repo.Migrations.CreateUsersLikes do
  use Ecto.Migration

  def change do
    create table(:users_likes, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)
      add :like_id, references(:product_likes, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:users_likes, [:user_id])
    create index(:users_likes, [:like_id])
  end
end
