defmodule AcWeb.ProductController do
  use AcWeb, :controller

  import Ac.Coherence.Authorization

  plug :authorize when not action in [:fetch_grid, :fetch_grid_category, :fetch_grid_category_search, :fetch_grid_category_search, :new_like, :search_for_item, :submit_create, :new_blog_post]

  use Timex

  alias Ac.Item
  alias Ac.Item.Product
  alias Ac.Upload.ProductPhoto
  alias Ac.Blog 
  alias Ac.Blog.Post 
  alias Ac.Blog.Update 
  alias Ac.Blog.SocialMedia 

  alias Ac.Search

  alias Recaptcha

  # ADMIN FUNCTIONS
  def index(conn, _params) do
    products = Item.list_products_assoc()
    render(conn, "index.html", products: products, layout: {AcWeb.LayoutView, "layout_admin_no_bulma.html"})
  end

  def new(conn, _params) do
    changeset = Item.change_product(%Product{})

    {_, categories, sub_categories, tags, _, _} = Item.admin_items()

    
    render(conn, "new.html", categories: categories, sub_categories: sub_categories, tags: tags, changeset: changeset)
  end

  # def create(conn, %{"product" => product_params}) do
  def create(conn, %{"data" => data}) do
    # B0143RT8OY

    IO.inspect data

    date_struct = data["schedule_date"]
    date = Timex.to_date(date_struct)
    
    new_prod_params = %{ data | "category_id" => hd(data["category_id"]), 
                                          # "sub_category_id" => hd(data["sub_category_id"]),
                                          "featured_image" => ProductPhoto.upload_product_photo_store(data["featured_image"]) }
    # so ProductPhoto uploads the imge and returns the absolute url. 

    case Item.create_product(new_prod_params) do
      {:ok, product} ->

        conn
        |> put_flash(:info, "Product created successfully.")
        |> redirect(to: product_path(conn, :show, product))
        
        # # message = Item.generate_message("Create New Product", "Complete")

        # # render conn, "message.json", AcWeb.ApiView, message: message

      {:error, %Ecto.Changeset{} = changeset} ->
        IO.inspect "didn't work"
        {products, categories, sub_categories, tags, posts, products_pending} = Item.admin_items()
        
        changeset_post = Blog.change_post_product(%Post{})
        changeset_update = Blog.change_update(%Update{})
        changeset_social_media = Blog.change_social_media(%SocialMedia{})
        
        render conn, AcWeb.PageView, "panel.html", products: products, products_pending: products_pending, categories: categories, sub_categories: sub_categories, tags: tags, posts: posts, changeset: changeset, changeset_update: changeset_update, changeset_post: changeset_post, changeset_social_media: changeset_social_media
        # # message = Item.generate_message("Create New Product Error", "Complete")

        # # render conn, "message.json", AcWeb.ApiView, message: message

    end
  end

  def submit_create(conn, %{"product" => product_params}) do

    case Recaptcha.verify(product_params["g-recaptcha-response"]) do
      {:ok, _response} -> 

        new_prod_params = %{ product_params | "category_id" => hd(product_params["category_id"]), 
        "sub_category_id" => hd(product_params["sub_category_id"]),
        "featured_image" => ProductPhoto.upload_product_photo_store(product_params["featured_image"]) }

        case Item.create_product(new_prod_params) do
          {:ok, _product} ->
            conn
            |> put_flash(:success, "Your product has been added to our system. Thank you for playing!")
            |> redirect(to: page_path(conn, :submit)) # :submit, product))

          {:error, %Ecto.Changeset{} = changeset} ->
            # {_, categories, sub_categories, tags, _} = Item.admin_items()

            conn
              |> put_flash(:error, "You missed something")
              |> redirect(to: page_path(conn, :submit, changeset)) # :submit, product))
    
            # render conn, AcWeb.PageView, "submit.html", categories: categories, sub_categories: sub_categories, tags: tags, changeset: changeset
        end

      {:error, errors} -> 

        conn
        |> put_flash(:error, "You need to verify the Google captcha.")
        |> redirect(to: page_path(conn, :submit)) # :submit, product))
    end
  end


  def show(conn, %{"id" => id}) do
    product = Item.get_product_assoc!(id)
    IO.inspect product 
    render(conn, "show.html", product: product)
  end


  def edit(conn, %{"id" => id}) do
    # for whatever reason, id is actually name 

    product = Item.get_product_name_assoc!(id)
    changeset = Item.change_product(product)
    
    categories = Item.list_categories()
    sub_categories = Item.list_sub_categories()
    tags = Item.list_tags()
    
    render(conn, "edit.html", product: product, categories: categories, sub_categories: sub_categories, tags: tags, changeset: changeset)
  end

  def update(conn, %{"id" => id, "product" => product_params}) do
    product = Item.get_product_assoc!(id)

    case Item.update_product(product, product_params) do
      {:ok, product} ->

        # message = Item.generate_message("Update Product", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message

        conn
        |> put_flash(:info, "Product updated successfully.")
        |> redirect(to: product_path(conn, :show, product))
      {:error, %Ecto.Changeset{} = changeset} ->

        # message = Item.generate_message("Update Product Error", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message
      
        render(conn, "edit.html", product: product, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    product = Item.get_product_assoc!(id)
    {:ok, _product} = Item.delete_product(product)

        # message = Item.generate_message("Delete Product", "Complete")

        # render conn, "message.json", AcWeb.ApiView, message: message


    conn
    |> put_flash(:info, "Product deleted successfully.")
    |> redirect(to: product_path(conn, :index))
  end
end
