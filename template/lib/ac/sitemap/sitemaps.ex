defmodule Ac.Sitemaps do
    
    alias AcWeb.Endpoint
    alias AcWeb.Router.Helpers

    import Ecto.Query, warn: false
    alias Ac.Repo

    alias Ac.Item
    alias Ac.Item.Category
    alias Ac.Item.Product
    
    alias Ac.Blog.Update
    alias Ac.Blog.Post 


    use Sitemap,
        host: "#{Application.get_env(:ac, :website_domain)}",
        # host: "https://awfulchristmas.com",
        files_path: "priv/static/",
        public_path: "/",
        compress: false

    # Sitemap Functions 

    def list_product_names do
        Repo.all(from p in Product, order_by: [desc: p.inserted_at], select: p.name ) 
    end

    def list_category_names do
        Repo.all(from c in Category, order_by: [desc: c.inserted_at], select: c.name ) 
    end

    def list_post_names do
        Repo.all(from p in Post, order_by: [desc: p.inserted_at], select: p.name ) 
    end

    def list_update_names do
        Repo.all(from u in Update, order_by: [desc: u.inserted_at], select: u.name ) 
    end


    def list_category_names_sitelinks do
        Repo.all(from c in Category, order_by: [desc: c.inserted_at], select: %{name: c.name, display_name: c.display_name} ) 
    end

    def list_post_names_sitelinks do
        Repo.all(from p in Post, order_by: [desc: p.inserted_at], limit: 7, select: %{name: p.name, display_name: p.display_name} ) 
    end

    def list_update_names_sitelinks do
        Repo.all(from u in Update, order_by: [desc: u.inserted_at], limit: 7, select: %{name: u.name, display_name: u.display_name} ) 
    end


    def sitelink_queries do
        { list_category_names_sitelinks(),
          list_post_names_sitelinks(),
          list_update_names_sitelinks()}
    end


    def sitemap_queries do
        { list_product_names(),
          list_category_names(),
          list_post_names(),
          list_update_names()}
    end


    # Generate

    def generate do

        {product_name_list,
        category_name_list,
        post_name_list,
        update_name_list} = sitemap_queries()

        create do

            add Helpers.page_path(Endpoint, :homepage), priority: 0.5, changefreq: "daily", expires: nil
            # add Helpers.page_path(Endpoint, :homepage_page), priority: 0.5, changefreq: "daily", expires: nil
            # okay, homepage pages needs to be added :)

            if product_name_list do
                Enum.each(product_name_list, fn(name) ->
                    add Helpers.page_path(Endpoint, :individual, name), priority: 0.5, changefreq: "daily", expires: nil                    
                end)
            end
            
            add Helpers.page_path(Endpoint, :about), priority: 0.5, changefreq: "daily", expires: nil
            add Helpers.page_path(Endpoint, :contact), priority: 0.5, changefreq: "daily", expires: nil
            add Helpers.page_path(Endpoint, :submit), priority: 0.5, changefreq: "daily", expires: nil

            add Helpers.page_path(Endpoint, :grid), priority: 0.5, changefreq: "daily", expires: nil

            add Helpers.page_path(Endpoint, :blog), priority: 0.5, changefreq: "daily", expires: nil

            if post_name_list do                    
                Enum.map(post_name_list, fn(name) ->
                    add Helpers.page_path(Endpoint, :post, name), priority: 0.5, changefreq: "daily", expires: nil
                end)
            end
        
            add Helpers.page_path(Endpoint, :categories), priority: 0.5, changefreq: "daily", expires: nil
        
            if category_name_list do                                    
                Enum.map(category_name_list, fn(name) ->
                    add Helpers.page_path(Endpoint, :category, name), priority: 0.5, changefreq: "daily", expires: nil
                end)
            end
            
            add Helpers.page_path(Endpoint, :updates), priority: 0.5, changefreq: "weekly", expires: nil

            if update_name_list do                                                    
                Enum.map(update_name_list, fn(name) ->
                    add Helpers.page_path(Endpoint, :update, name), priority: 0.5, changefreq: "weekly", expires: nil
                end)
            end

            add Helpers.page_path(Endpoint, :register), priority: 0.5, changefreq: "daily", expires: nil
            add Helpers.page_path(Endpoint, :login), priority: 0.5, changefreq: "daily", expires: nil
            # add Helpers.page_path(Endpoint, :profile), priority: 0.5, changefreq: "daily", expires: nil

            add Helpers.page_path(Endpoint, :search), priority: 0.5, changefreq: "daily", expires: nil
            
        # ...
        end
        
        ping()
        
        # notify search engines (currently Google and Bing) of the updated sitemap
    end
end
  