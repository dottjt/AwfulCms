defmodule AcWeb.UpdateController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Blog
  alias Ac.Blog.Update

  def index(conn, _params) do
    updates = Blog.list_updates()
    render(conn, "index.html", updates: updates)
  end

  def new(conn, _params) do
    changeset = Blog.change_update(%Update{})
    render(conn, "new.html", changeset: changeset)
  end

  # def create(conn, %{"update" => update_params}) do
  def create(conn, %{"data" => data}) do

    # case Blog.create_update(update_params) do
    case Blog.create_update(data) do
      {:ok, update} ->
        conn
        |> put_flash(:info, "Update created successfully.")
        |> redirect(to: update_path(conn, :show, update))
        
        # message = Item.generate_message("Create New Update", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

      {:error, %Ecto.Changeset{} = changeset} ->

        # message = Item.generate_message("Create New Update Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    update = Blog.get_update!(id)
    render(conn, "show.html", update: update)
  end

  def edit(conn, %{"id" => id}) do
    update = Blog.get_update!(id)
    changeset_update = Blog.change_update(update)
    render(conn, "edit.html", update: update, changeset_update: changeset_update)
  end

  def update(conn, %{"id" => id, "update" => update_params}) do
    update = Blog.get_update!(id)

    case Blog.update_update(update, update_params) do
      {:ok, update} ->
        
        # message = Item.generate_message("Update Update", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        conn
        |> put_flash(:info, "Update updated successfully.")
        |> redirect(to: update_path(conn, :show, update))
      {:error, %Ecto.Changeset{} = changeset} ->

        # message = Item.generate_message("Update Update Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        render(conn, "edit.html", update: update, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    update = Blog.get_update!(id)
    {:ok, _update} = Blog.delete_update(update)

        # message = Item.generate_message("Delete Update", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

    conn
    |> put_flash(:info, "Update deleted successfully.")
    |> redirect(to: update_path(conn, :index))
  end
end
