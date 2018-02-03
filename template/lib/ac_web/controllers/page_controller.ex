defmodule AcWeb.PageController do
  use AcWeb, :controller

  alias Ac.Search
  alias Ac.Sitemaps
  alias Ac.Pagination

  alias Ac.Item
  alias Ac.Item.Product

  alias Ac.Blog
  alias Ac.Account
  alias Ac.Account.Email
  
  alias Ac.Blog.Post
  alias Ac.Blog.Update
  alias Ac.Blog.SocialMedia

  alias Arc

  alias Coherence.Config
  alias Coherence.ControllerHelpers, as: Helpers
  
  # single pages
  def homepage(conn, _params) do
    
    {feature_products, products, updates} = Item.homepage_items(1) 
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()
    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()

    IO.inspect feature_products

    meta_title = Application.get_env(:ac, :website_title)
    meta_description = Application.get_env(:ac, :website_description)

    {pagination_numbers, page_number, left_arrow, right_arrow} = Pagination.pagination_numbers(0, products.total_pages)

    render conn, "homepage.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                                  pagination_numbers: pagination_numbers, page_number: page_number, left_arrow: left_arrow, right_arrow: right_arrow, total_pages: products.total_pages,
                                  meta_title: meta_title, meta_description: meta_description,                                  
                                  random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                                  feature_products: feature_products, products: products, updates: updates 
  end

  def category(conn, %{"name" => name}) do
    
    category = Item.get_category_name!(name)
    category_products = Item.get_single_category_name_assoc_paginate!(category.id, 1)
    
    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()        
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()    

    meta_title = Application.get_env(:ac, :website_name) <> " | " <> category.display_name
    meta_description = category.description

    {pagination_numbers, page_number, left_arrow, right_arrow} = Pagination.pagination_numbers(0, category_products.total_pages)
    
    render conn, "category.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                                  random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                                  pagination_numbers: pagination_numbers, page_number: page_number, left_arrow: left_arrow, right_arrow: right_arrow, total_pages: category_products.total_pages,
                                  category: category, category_products: category_products,                                    
                                  meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}
  end    

  # blog pages
  def blog(conn, _params) do

    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()    
    posts = Blog.list_posts_assoc_latest_paginate(1)

    meta_title = Application.get_env(:ac, :website_name) <> " | Blog"
    meta_description = Application.get_env(:ac, :blog_meta_description)

    {pagination_numbers, page_number, left_arrow, right_arrow} = Pagination.pagination_numbers(0, posts.total_pages)
    
    render conn, "blog.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                              pagination_numbers: pagination_numbers, page_number: page_number, left_arrow: left_arrow, right_arrow: right_arrow, total_pages: posts.total_pages,
                              random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                              posts: posts,                               
                              meta_title: meta_title, meta_description: meta_description, 
                              layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}
  end
    


  def homepage_page(conn, %{"number" => number}) do
    new_number = String.to_integer(number)
    
    {feature_products, products, updates} = Item.homepage_items(new_number)
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()
    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()

    meta_title = Application.get_env(:ac, :website_title)
    meta_description = Application.get_env(:ac, :website_description)

    {pagination_numbers, page_number, left_arrow, right_arrow} = Pagination.pagination_numbers(number, products.total_pages)
    
    render conn, "homepage.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                                  pagination_numbers: pagination_numbers, page_number: page_number, left_arrow: left_arrow, right_arrow: right_arrow, total_pages: products.total_pages,
                                  feature_products: feature_products, products: products.entries, updates: updates, 
                                  random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories,
                                  meta_title: meta_title, meta_description: meta_description
  end

  def category_page(conn, %{"name" => name, "number" => number}) do
    new_number = String.to_integer(number)
    
    category = Item.get_category_name!(name)
    category_products = Item.get_single_category_name_assoc_paginate!(category.id, new_number)

    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()        
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()    

    meta_title = Application.get_env(:ac, :website_name) <> " | " <> category.display_name
    meta_description = category.description

    {pagination_numbers, page_number, left_arrow, right_arrow} = Pagination.pagination_numbers(number, category_products.total_pages)
    
    render conn, "category.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                                  random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                                  pagination_numbers: pagination_numbers, page_number: page_number, left_arrow: left_arrow, right_arrow: right_arrow, total_pages: category_products.total_pages,
                                  category: category,                                   
                                  meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}
  end
    
  def blog_page(conn, %{"number" => number}) do
    new_number = String.to_integer(number)
    
    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()    
    posts = Blog.list_posts_assoc_latest_paginate(new_number)

    meta_title = Application.get_env(:ac, :website_name) <> " | Blog"
    meta_description = Application.get_env(:ac, :blog_meta_description)

    {pagination_numbers, page_number, left_arrow, right_arrow} = Pagination.pagination_numbers(number, posts.total_pages)
    
    render conn, "blog.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                              pagination_numbers: pagination_numbers, page_number: page_number, left_arrow: left_arrow, right_arrow: right_arrow, total_pages: posts.total_pages,
                              random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                              posts: posts,                               
                              meta_title: meta_title, meta_description: meta_description, 
                              layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}
  end


# category pages
  def categories(conn, _params) do

    categories = Item.list_categories_assoc()
    
    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()    
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()    
    
    meta_title = Application.get_env(:ac,  :website_name) <> " | Categories"
    meta_description = Application.get_env(:ac,  :categories_meta_description)

    render conn, 
    "categories.html",
    categories: categories,
    random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories,
    category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks,
    meta_title: meta_title, meta_description: meta_description,
    layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}
  end

  # update pages
  def updates(conn, _params) do
    
    updates = Blog.list_updates()
    
    meta_title = Application.get_env(:ac, :website_name) <> " | News"
    meta_description = Application.get_env(:ac, :updates_meta_description)

    render conn, "updates.html", meta_title: meta_title, meta_description: meta_description, 
                                  updates: updates, 
                                  layout: {AcWeb.LayoutView, "layout_full_width.html"}
  end

  def update(conn, %{"name" => name}) do

    update = Blog.get_update_name!(name)   

    meta_title = Application.get_env(:ac, :website_name) <> " | " <> update.display_name
    meta_description = update.title

    render conn, "update.html", meta_title: meta_title, meta_description: meta_description, 
                                update: update, 
                                layout: {AcWeb.LayoutView, "layout_full_width.html"}
  end

  def post(conn, %{"name" => name}) do
    
    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()    
    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()        

    post = Blog.get_post_name_assoc!(name)    
    products = Blog.get_blog_products!(post.tag.id)
    
    meta_title = Application.get_env(:ac, :website_name) <> " | " <> post.display_name
    meta_description = post.excerpt

    render conn, "post.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                              products: products, random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                              post: post,                               
                              meta_title: meta_title, meta_description: meta_description, 
                              layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}    
  end

    
  # product pages 
  def grid(conn, _params) do

    {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()

    meta_title = Application.get_env(:ac, :website_name) <> " | Gifts"
    meta_description = Application.get_env(:ac, :grid_meta_description)

    render conn, "grid.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                              meta_title: meta_title, meta_description: meta_description, 
                              layout: {AcWeb.LayoutView, "layout_grid.html"}
  end

  def individual(conn, %{"name" => name}) do

    case name do
      "home-office" ->
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        meta_title = Application.get_env(:ac,  :website_name) <> " | Gifts"
        meta_description = Application.get_env(:ac,  :grid_meta_description)

        render conn, "grid.html", meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_grid.html"}
      "awesome-dork" ->
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        meta_title = Application.get_env(:ac,  :website_name) <> " | Gifts"
        meta_description = Application.get_env(:ac,  :grid_meta_description)

        render conn, "grid.html", meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_grid.html"}
      "sports-outdoors" ->
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        meta_title = Application.get_env(:ac,  :website_name) <> " | Gifts"
        meta_description = Application.get_env(:ac,  :grid_meta_description)

        render conn, "grid.html", meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_grid.html"}
      "fashion" ->
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        meta_title = Application.get_env(:ac,  :website_name) <> " | Gifts"
        meta_description = Application.get_env(:ac,  :grid_meta_description)

        render conn, "grid.html", meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_grid.html"}
      "food" ->
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        meta_title = Application.get_env(:ac,  :website_name) <> " | Gifts"
        meta_description = Application.get_env(:ac,  :grid_meta_description)

        render conn, "grid.html", meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_grid.html"}
      "wtf" ->
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        meta_title = Application.get_env(:ac,  :website_name) <> " | Gifts"
        meta_description = Application.get_env(:ac,  :grid_meta_description)

        render conn, "grid.html", meta_title: meta_title, meta_description: meta_description, 
                                  layout: {AcWeb.LayoutView, "layout_grid.html"}
      _ ->
        {product, random_products, popular_products, bargain_products, products, categories, updates} = Item.show_items(name)
        {category_sitelinks, post_sitelinks, update_sitelinks} = Sitemaps.sitelink_queries()
        
        meta_title = Application.get_env(:ac,  :website_name) <> " | " <> product.display_name
        meta_description = product.description

        render conn, "individual.html", category_sitelinks: category_sitelinks, post_sitelinks: post_sitelinks, update_sitelinks: update_sitelinks, 
                                        product: product, random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, products: products, categories: categories, updates: updates, 
                                        meta_title: meta_title, meta_description: meta_description, 
                                        layout: {AcWeb.LayoutView, "layout_app_show.html"}    
    end
  end





  def about(conn, _params) do

    meta_title = Application.get_env(:ac, :website_name) <> " | About Us"
    meta_description = Application.get_env(:ac, :about_meta_description)

    render conn, "about.html", meta_title: meta_title, meta_description: meta_description, 
                                layout: {AcWeb.LayoutView, "layout_full_width.html"}
  end

  def contact(conn, _params) do
    
    changeset = Account.change_email(%Email{})
    
    meta_title = Application.get_env(:ac, :website_name) <> " | Contact"
    meta_description = Application.get_env(:ac, :contact_meta_description)

    render conn, "contact.html", meta_title: meta_title, meta_description: meta_description, 
                                  changeset: changeset, 
                                  layout: {AcWeb.LayoutView, "layout_full_width.html"}
  end

  def submit(conn, _params) do

    {_, categories, sub_categories, tags, _, _} = Item.admin_items()
    changeset = Item.change_submit_product(%Product{})
    
    meta_title = Application.get_env(:ac, :website_name) <> " | Submit Your Product"
    meta_description = Application.get_env(:ac, :submit_meta_description)

    render conn, "submit.html", meta_title: meta_title, meta_description: meta_description,
                                categories: categories, sub_categories: sub_categories, tags: tags, 
                                changeset: changeset,  
                                layout: {AcWeb.LayoutView, "layout_full_width.html"}
  end



# def profile(conn, _params) do

#   meta_title = "Awful Christmas | Profile"
#   meta_description = ""

#   render conn, "profile.html", meta_title: meta_title, meta_description: meta_description, 
#                                 layout: {AcWeb.LayoutView, "layout_full_width.html"}
# end

  # def letter(conn, _params) do

  #   meta_title = "Awful Christmas | Send A Letter To Santa"
  #   meta_description = "Perhaps you'd like to send a letter to santa? Well, this feature was never finished so there you have it. "

  #   changeset = Blog.change_letter(%Letter{})
  #   letters = Blog.list_letters() 

  #   render conn, "letter.html", letters: letters, changeset: changeset, meta_title: meta_title, meta_description: meta_description, layout: {AcWeb.LayoutView, "layout_full_width.html"}
  # end

    

  
  # user account
  def register(conn, _params) do

    meta_title = Application.get_env(:ac, :website_name) <> " | Registration"
    meta_description = Application.get_env(:ac, :register_meta_description)

    user_schema = Config.user_schema
    changeset = Helpers.changeset(:registration, user_schema, user_schema.__struct__)

    render conn, AcWeb.Coherence.RegistrationView, "new.html", meta_title: meta_title, meta_description: meta_description, 
                                                               changeset: changeset,
                                                               layout: {AcWeb.LayoutView, "layout_full_width.html"}
    # redirect conn, to: "/registrations/new"

  end
  
  def login(conn, _params) do

    meta_title = Application.get_env(:ac, :website_name) <> " | Login"
    meta_description = Application.get_env(:ac, :login_meta_description)

    # redirect conn, to: "/sessions/new"    
    render conn, "login.html", meta_title: meta_title, meta_description: meta_description,
                               layout: {AcWeb.LayoutView, "layout_full_width.html"}
  end


  # search results
  def search(conn, %{"query" => query}) do

    {random_products, popular_products, bargain_products, categories} = Item.sidebar_items()  

    products = Search.search_function(query)

    meta_title = Application.get_env(:ac, :website_name) <> " | Search"
    meta_description = Application.get_env(:ac, :login_meta_description)

    render conn, "search.html", random_products: random_products, popular_products: popular_products, bargain_products: bargain_products, categories: categories, 
                                products: products, 
                                meta_title: meta_title, meta_description: meta_description, 
                                layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}    
  end



  def privacy(conn, _params) do

    meta_title = Application.get_env(:ac, :website_name) <> " | Disclaimer"
    meta_description = "Disclaimer"

    render conn, "disclaimer.html", meta_title: meta_title, meta_description: meta_description, 
                                    layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}    
  end

  def privacy(conn, _params) do

    meta_title = Application.get_env(:ac, :website_name) <> " | Privacy Policy"
    meta_description = "Privacy Policy"

    render conn, "privacy.html", meta_title: meta_title, meta_description: meta_description, 
                                layout: {AcWeb.LayoutView, "layout_with_sidebar.html"}    
  end



  alias Arc
  
  # admin page
  def admin(conn, _params) do
    
    admin_status = Coherence.current_user(conn).admin

    case admin_status do
      false ->
        conn |> redirect(to: page_path(conn, :homepage))

      true ->
        {products, categories, sub_categories, tags, posts, products_pending} = Item.admin_items()
    
        changeset = Item.change_product(%Product{})   
        changeset_post = Blog.change_post_product(%Post{})
        changeset_update = Blog.change_update(%Update{})
        changeset_social_media = Blog.change_social_media(%SocialMedia{})

        # meta_title = "Awful Christmas | For All Your Awful Christmas Gift Ideas"
        # meta_description = "This is an admin page. Be gone!"
        
        render conn, "panel.html", products: products, categories: categories, sub_categories: sub_categories, tags: tags, posts: posts, products_pending: products_pending, 
                                   changeset: changeset, 
                                   changeset_post: changeset_post, 
                                   changeset_update: changeset_update,
                                   changeset_social_media: changeset_social_media 
    end
  end 
end

