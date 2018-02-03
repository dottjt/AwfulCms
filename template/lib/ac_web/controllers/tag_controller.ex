defmodule AcWeb.TagController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Item
  alias Ac.Item.Tag
  alias Ac.Blog 
  alias Ac.Blog.Post
  
  def index(conn, _params) do
    tags = Item.list_tags()
    render(conn, "index.html", tags: tags)
  end

  def new(conn, _params) do
    changeset = Item.change_tag(%Tag{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"product" => tag_params}) do
    IO.inspect tag_params
    case Item.create_tag(tag_params) do
      {:ok, tag} ->
        # conn
        # |> put_flash(:info, "Tag created successfully.")
        # |> redirect(to: tag_path(conn, :show, tag))
        

        # message = Item.generate_message("Create New Tag", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message


        {products, categories, sub_categories, tags, posts, products_pending} = Item.admin_items()
        
        changeset = Item.change_product(%Item.Product{})    
        changeset_post = Blog.change_post_product(%Post{})
    
        render conn, AcWeb.PageView, "panel.html", products: products, products_pending: products_pending, categories: categories, sub_categories: sub_categories, tags: tags, posts: posts, changeset: changeset, changeset_post: changeset_post
        
      {:error, %Ecto.Changeset{} = changeset} ->

        # message = Item.generate_message("Create New Tag Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message


        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    tag = Item.get_tag!(id)
    render(conn, "show.html", tag: tag)
  end

  def edit(conn, %{"id" => id}) do
    tag = Item.get_tag!(id)
    changeset = Item.change_tag(tag)
    render(conn, "edit.html", tag: tag, changeset: changeset)
  end

  def update(conn, %{"id" => id, "tag" => tag_params}) do
    tag = Item.get_tag!(id)

    case Item.update_tag(tag, tag_params) do
      {:ok, tag} ->

        # message = Item.generate_message("Update Tag", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

        conn
        |> put_flash(:info, "Tag updated successfully.")
        |> redirect(to: tag_path(conn, :show, tag))
      {:error, %Ecto.Changeset{} = changeset} ->

        # message = Item.generate_message("Update Tag", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

        render(conn, "edit.html", tag: tag, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    tag = Item.get_tag!(id)
    {:ok, _tag} = Item.delete_tag(tag)

        # message = Item.generate_message("Delete Tag", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

    conn
    |> put_flash(:info, "Tag deleted successfully.")
    |> redirect(to: tag_path(conn, :index))
  end
end
