defmodule AcWeb.CategoryController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Item
  alias Ac.Item.Category
  alias Ac.Item.SubCategory
  

  # ADMIN FUNCTIONS 

  def index(conn, _params) do # Intentionally, not assoc
    categories = Item.list_categories()
    render(conn, "index.html", categories: categories)
  end

  def new(conn, _params) do
    # empty category
    changeset = Item.change_category(%Category{})
    
    # list subcategories
    sub_category = Item.list_sub_categories()

    # new subcategory
    sub_changeset = Item.change_sub_category(%SubCategory{})

    render(conn, "new.html", sub_category: sub_category, sub_changeset: sub_changeset, changeset: changeset)
  end

  def create(conn, %{"category" => category_params}) do
    case Item.create_category(category_params) do
      {:ok, category} ->
        conn
        |> put_flash(:info, "Category created successfully.")
        |> redirect(to: category_path(conn, :show, category))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    category = Item.get_category_assoc!(id)
    render(conn, "show.html", category: category)
  end
    

  def edit(conn, %{"id" => id}) do
    # new assoc category
    category = Item.get_category_assoc!(id)
    changeset = Item.change_category(category)

    # list subcategories
    sub_categories = Item.list_sub_categories()
    sub_category = Item.get_sub_category_no_error(id)
    
    # new subcategory
    sub_changeset = Item.change_sub_category(%SubCategory{})

    render(conn, "edit.html", category: category, sub_category: sub_category, sub_categories: sub_categories, sub_changeset: sub_changeset, changeset: changeset)
  end

  def update(conn, %{"id" => id, "category" => category_params}) do
    category = Item.get_category!(id)

    case Item.update_category(category, category_params) do
      {:ok, category} ->
        conn
        |> put_flash(:info, "Category updated successfully.")
        |> redirect(to: category_path(conn, :show, category))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", category: category, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    category = Item.get_category!(id)
    {:ok, _category} = Item.delete_category(category)

    conn
    |> put_flash(:info, "Category deleted successfully.")
    |> redirect(to: category_path(conn, :index))
  end
end
