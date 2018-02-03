defmodule Ac.Repo.Migrations.CreateBlogComments do
  use Ecto.Migration

  def change do
    create table(:blog_comments, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :text, :text
      
      add :post_id, references(:posts, on_delete: :nothing, type: :binary_id)
      add :user_id, references(:users, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    create index(:blog_comments, [:post_id])
    create index(:blog_comments, [:user_id])
  end
end
