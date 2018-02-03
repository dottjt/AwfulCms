defmodule AcWeb.LetterController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Blog
  alias Ac.Blog.Letter

  def index(conn, _params) do
    letters = Blog.list_letters()
    render(conn, "index.html", letters: letters)
  end

  def new(conn, _params) do
    changeset = Blog.change_letter(%Letter{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"letter" => letter_params}) do
    case Blog.create_letter(letter_params) do
      {:ok, letter} ->
        conn
        |> put_flash(:info, "Letter created successfully.")
        |> redirect(to: letter_path(conn, :show, letter))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def submit_create(conn, %{"letter" => letter_params}) do
    case Blog.create_letter(letter_params) do
      {:ok, letter} ->
        conn
        |> put_flash(:info, "Letter created successfully.")
        |> redirect(to: letter_path(conn, :show, letter))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    letter = Blog.get_letter!(id)
    render(conn, "show.html", letter: letter)
  end

  def edit(conn, %{"id" => id}) do
    letter = Blog.get_letter!(id)
    changeset = Blog.change_letter(letter)
    render(conn, "edit.html", letter: letter, changeset: changeset)
  end

  def update(conn, %{"id" => id, "letter" => letter_params}) do
    letter = Blog.get_letter!(id)

    case Blog.update_letter(letter, letter_params) do
      {:ok, letter} ->
        conn
        |> put_flash(:info, "Letter updated successfully.")
        |> redirect(to: letter_path(conn, :show, letter))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", letter: letter, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    letter = Blog.get_letter!(id)
    {:ok, _letter} = Blog.delete_letter(letter)

    conn
    |> put_flash(:info, "Letter deleted successfully.")
    |> redirect(to: letter_path(conn, :index))
  end
end
