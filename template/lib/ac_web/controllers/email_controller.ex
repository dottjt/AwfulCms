defmodule AcWeb.EmailController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Account
  alias Ac.Account.Email

  def index(conn, _params) do
    emails = Account.list_emails()
    render(conn, "index.html", emails: emails)
  end

  def new(conn, _params) do
    changeset = Account.change_email(%Email{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"email" => email_params}) do

    case Recaptcha.verify(email_params["g-recaptcha-response"]) do
      {:ok, response} -> 
        case Account.create_email(email_params) do
          {:ok, email} ->
            conn
            |> put_flash(:info, "Email created successfully.")
            |> redirect(to: email_path(conn, :show, email))
          {:error, %Ecto.Changeset{} = changeset} ->
            render(conn, "new.html", changeset: changeset)
        end    
      {:error, errors} -> 
        conn
        |> put_flash(:info, "Sorry buddy.")
        |> redirect(to: email_path(conn, :show, errors))

    end

  end

  def show(conn, %{"id" => id}) do
    email = Account.get_email!(id)
    render(conn, "show.html", email: email)
  end

  def edit(conn, %{"id" => id}) do
    email = Account.get_email!(id)
    changeset = Account.change_email(email)
    render(conn, "edit.html", email: email, changeset: changeset)
  end

  def update(conn, %{"id" => id, "email" => email_params}) do
    email = Account.get_email!(id)

    case Account.update_email(email, email_params) do
      {:ok, email} ->
        conn
        |> put_flash(:info, "Email updated successfully.")
        |> redirect(to: email_path(conn, :show, email))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", email: email, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    email = Account.get_email!(id)
    {:ok, _email} = Account.delete_email(email)

    conn
    |> put_flash(:info, "Email deleted successfully.")
    |> redirect(to: email_path(conn, :index))
  end
end
