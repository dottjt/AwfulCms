defmodule Ac.Repo.Migrations.CreateUsers do
  use Ecto.Migration

  def change do
    create table(:users, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :email, :string
      add :admin, :boolean, default: false, null: false 
      # add :password, :string
      # add :password_confirmation, :string
      # add :password_hash, :string
      
      # add :like_id, references(:product_likes, on_delete: :nothing, type: :binary_id)
      # add :comment_id, references(:product_comments, on_delete: :nothing, type: :binary_id)

      timestamps()
    end

    # create table(:users_likes, primary_key: false) do
    #   add :user_id, references(:users)
    #   add :like_id, references(:product_likes)
    # end
    
    # create index(:users, [:like_id])
    # create index(:users, [:comment_id])
  
  end
end
