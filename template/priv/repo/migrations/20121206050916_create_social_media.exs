defmodule Ac.Repo.Migrations.CreateSocialMedia do
  use Ecto.Migration

  def change do
    create table(:social_media, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :name, :string
      add :display_name, :string
      add :description, :string
      add :tags, :string
      add :url, :string
      add :featured_image, :string
      add :image_caption, :string
      add :social_media_type, :string

      add :draft, :boolean, default: false, null: false
      add :schedule_date, :date     
      
      timestamps()
    end

  end
end
