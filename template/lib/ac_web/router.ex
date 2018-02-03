defmodule AcWeb.Router do
  use AcWeb, :router
  # use AcWeb.Coherence, :router 
  use Coherence.Router 
  alias AcWeb.Router.Helpers
  
  # def must_be_admin(conn, opts) do
  #   admin_status = Coherence.current_user(conn).admin     
  #   case admin_status do 
  #     false ->
  #       conn |> redirect(to: Helpers.page_path(conn, :homepage))        
  #     true ->
  #       conn
  #   end
  # end
  
  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_layout, {AcWeb.LayoutView, :layout_app}    
    plug Coherence.Authentication.Session
  end

  pipeline :protected do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug :put_layout, {AcWeb.LayoutView, :layout_app}        
    plug Coherence.Authentication.Session, protected: true 
  end

  # pipeline :protected_admin do
  #   plug :accepts, ["html"]
  #   plug :fetch_session
  #   plug :fetch_flash
  #   plug :protect_from_forgery
  #   plug :put_secure_browser_headers
  #   plug :put_layout, {AcWeb.LayoutView, :layout_app}        
  #   plug Coherence.Authentication.Session, protected: true 
  # end


  pipeline :admin_layout do
    plug :put_layout, {AcWeb.LayoutView, :layout_admin}
  end

  pipeline :api do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
  end



  scope "/" do
    pipe_through :browser # Use the default browser stack
    coherence_routes()
  end 
  
  scope "/", AcWeb do
    pipe_through :browser # Use the default browser stack

    # pages
    get "/", PageController, :homepage
    get "/page/:number", PageController, :homepage_page
    get "/about", PageController, :about    
    get "/contact", PageController, :contact
    get "/submit", PageController, :submit
    # get "/send-a-letter-to-santa", PageController, :letter
  
    # product pages
    get "/gifts", PageController, :grid
    get "/gifts/:name", PageController, :individual
    
    # grid
    # get "/search/:name", PageController, :grid
    # get "/search/category/:name", PageController, :grid
    
    # blog pages
    get "/blog", PageController, :blog
    get "/blog/page/:number", PageController, :blog_page
    get "/blog/:name", PageController, :post

    # category pages
    get "/categories", PageController, :categories
    get "/categories/:name", PageController, :category

    # update pages
    get "/updates", PageController, :updates
    get "/updates/:name", PageController, :update    

    # user pages
    get "/register", PageController, :register
    get "/login", PageController, :login
    # get "/profile", PageController, :profile

    # search pages
    post "/search", PageController, :search
    
    get "/disclaimer", PageController, :disclaimer
    get "/privacy", PageController, :privacy
  end


  scope "/admin" do
    pipe_through :protected
    coherence_routes :protected
  end

  scope "/admin", AcWeb do
    pipe_through [:protected, :admin_layout]

    get "/", PageController, :admin
    resources "/products", ProductController
    resources "/categories", CategoryController
    resources "/sub-categories", SubCategoryController
    resources "/tags", TagController
    resources "/posts", PostController
    resources "/users", UserController
    resources "/email", EmailController
    resources "/updates", UpdateController
    resources "/letters", LetterController
    resources "/social_media", SocialMediaController

    get "/new_post_with_products_list", PostController, :newPostWithProduct
    post "/create_post_with_products_list", PostController, :createPostProductsList
    # post "/letter_submit", LetterController, :submit_create
    
  end

  scope "/api", AcWeb do
    pipe_through [:api]
    get "/fetch_grid/", ApiController, :fetch_grid
    get "/fetch_grid/:category", ApiController, :fetch_grid_category
    get "/fetch_grid/:category/:search_input", ApiController, :fetch_grid_category_search
    
    # WEBSITE AJAX
    get "/check_user_status", ApiController, :check_user_status
    post "/new_like", ApiController, :new_like

    # AMAZON ITEM SEARCH 
    post "/search_for_amazon_item", ApiController, :search_for_amazon_item
    post "/search_for_etsy_item", ApiController, :search_for_etsy_item
    post "/search_for_product", ApiController, :search_for_product

    # PRODUCT SUBMIT
    post "/product_submit", ProductController, :submit_create
    
    # CHROME EXTENSION
    post "/receive_amazon_id", ApiController, :receive_amazon_id

  end

  # Other scopes may use custom stacks.
  # scope "/api", AcWeb do
  #   pipe_through :api
  # end
end
