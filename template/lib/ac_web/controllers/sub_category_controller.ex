defmodule AcWeb.SubCategoryController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Item
  alias Ac.Item.SubCategory

  def index(conn, _params) do
    sub_categories = Item.list_sub_categories()
    render(conn, "index.html", sub_categories: sub_categories)
  end

  def new(conn, _params) do
    changeset = Item.change_sub_category(%SubCategory{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"sub_category" => sub_category_params}) do
    case Item.create_sub_category(sub_category_params) do
      {:ok, sub_category} ->
        conn
        |> put_flash(:info, "Sub category created successfully.")
        |> redirect(to: sub_category_path(conn, :show, sub_category))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    sub_category = Item.get_sub_category!(id)
    render(conn, "show.html", sub_category: sub_category)
  end

  def edit(conn, %{"id" => id}) do
    sub_category = Item.get_sub_category!(id)
    changeset = Item.change_sub_category(sub_category)
    render(conn, "edit.html", sub_category: sub_category, changeset: changeset)
  end

  def update(conn, %{"id" => id, "sub_category" => sub_category_params}) do
    sub_category = Item.get_sub_category!(id)

    case Item.update_sub_category(sub_category, sub_category_params) do
      {:ok, sub_category} ->
        conn
        |> put_flash(:info, "Sub category updated successfully.")
        |> redirect(to: sub_category_path(conn, :show, sub_category))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", sub_category: sub_category, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    sub_category = Item.get_sub_category!(id)
    {:ok, _sub_category} = Item.delete_sub_category(sub_category)

    conn
    |> put_flash(:info, "Sub category deleted successfully.")
    |> redirect(to: sub_category_path(conn, :index))
  end
end
