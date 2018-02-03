defmodule AcWeb.PostController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization
  plug :authorize # when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like]

  alias Ac.Blog
  alias Ac.Blog.Post

  alias Ac.Item 
  
  def index(conn, _params) do
    posts = Blog.list_posts()
    render(conn, "index.html", posts: posts)
  end

  # new post 
  def new(conn, _params) do
    tags = Item.list_tags()

    changeset_post = Blog.change_post(%Post{})
    render(conn, "new.html", tags: tags, changeset_post: changeset_post)
  end

  def create(conn, %{"post" => post_params}) do
    case Blog.create_post(post_params) do
      {:ok, post} ->

        # message = Item.generate_message("Create New Post", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        conn
        |> put_flash(:info, "Post created successfully.")
        |> redirect(to: page_path(conn, :individual, post))
      {:error, %Ecto.Changeset{} = changeset_post} ->

        # message = Item.generate_message("Create New Post Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message
        render(conn, "new.html", changeset_post: changeset_post)
    end
  end

  def newPostWithProduct(conn, _params) do
    changeset_post = Blog.change_post_product(%Post{})
    products = Item.list_products() 
    
    render(conn, "formPostWithProduct.html", products: products, changeset_post: changeset_post)
  end

  def createPostProductsList(conn, %{"post" => post_params}) do
      
    # new_prod_params = %{ product_params | "category_id" => hd(product_params["category_id"]), "sub_category_id" => hd(product_params["sub_category_id"]) }
    
    case Blog.create_post(post_params) do
      {:ok, post} ->
        
        # message = Item.generate_message("Create New Post", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        # IO.inspect post_params

        conn
        |> put_flash(:info, "Post created successfully.")
        |> redirect(to: post_path(conn, :show, post))

      {:error, %Ecto.Changeset{} = changeset_post} ->

        # message = Item.generate_message("Create New Post Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message


        {products, categories, sub_categories, tags, posts, products_pending} = Item.admin_items()
        
        # IO.inspect "actually an error"
        render conn, AcWeb.PageView, "panel.html", products: products, categories: categories, sub_categories: sub_categories, tags: tags, posts: posts, products_pending: products_pending, changeset_post: changeset_post
    end
  end



  def show(conn, %{"id" => id}) do
    post = Blog.get_post_assoc!(id)
    IO.inspect post 
    render(conn, "show.html", post: post)
  end

  def edit(conn, %{"id" => id}) do
    post = Blog.get_post!(id)
    changeset_post = Blog.change_post(post)
    render(conn, "edit.html", post: post, changeset_post: changeset_post)
  end

  def update(conn, %{"id" => id, "post" => post_params}) do
    post = Blog.get_post!(id)

    case Blog.update_post(post, post_params) do
      {:ok, post} ->

        # message = Item.generate_message("Update Product", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        conn
        |> put_flash(:info, "Post updated successfully.")
        |> redirect(to: post_path(conn, :show, post))
      {:error, %Ecto.Changeset{} = changeset_post} ->

        # message = Item.generate_message("Update Product Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView # , message: message

        render(conn, "edit.html", post: post, changeset_post: changeset_post)
    end
  end

  def delete(conn, %{"id" => id}) do
    post = Blog.get_post!(id)
    {:ok, _post} = Blog.delete_post(post)

    # message = Item.generate_message("Update Product", "Complete")

    # render conn, "message.json", AcWeb.ApiView # , message: message

    conn
    |> put_flash(:info, "Post deleted successfully.")
    |> redirect(to: post_path(conn, :index))
  end
end
