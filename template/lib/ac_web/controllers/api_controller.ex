defmodule AcWeb.ApiController do
    use AcWeb, :controller
    
    alias Ac.Search
    alias Ac.Item
    alias AmazonProduct.ItemLookup
    
  
    # WEBSITE AJAX
    def check_user_status(conn, _params) do
        user_status = Coherence.current_user(conn)
        IO.inspect user_status

        render(conn, "user_information.json", response: user_status)
    end

    # def new_like(conn, %{"username" => username, "product_id" => product_id}) do

    #     case Item.increment_product_like_total(product_id) do
    #     {:ok, product} -> # Updated with success
    #         IO.inspect product 
    #         product_like_total = product.product_like.total
    #         # product.product_like.total - then return that shit, pronto soldier!

    #         render(conn, "product_like_total.json", product_like_total: product_like_total)
        
    #     {:error, changeset} -> # Something went wrong
    #         IO.inspect changeset
    #     end
        
    # end
  
    def search_for_amazon_item(conn, %{"asin" => asin}) do
      new_asin = URI.encode(asin)
      
      # %ItemSearch{"MaximumPrice": "25", "Keywords": "long sleeve shirt"} |> ItemSearch.execute
      case %ItemLookup{"ItemId": new_asin} |> ItemLookup.execute do
        {:ok, body} ->
          render(conn, "amazon_product_api.json", response: body)
          
        {:error, error} ->
            IO.inspect "error"
      end
    end
    
    def search_for_product(conn, %{"id" => id}) do
        IO.inspect id 
        
        product = Item.get_product_assoc!(id)
        
        render(conn, AcWeb.ProductView, "showAssoc.json", product: product)        
    end

    #  for etsy
    # def search_for_etsy_item(conn, %{"id" => id}) do
        
    # end


    # for chrome extension
    # def receive_amazon_id(conn, %{"amazon_id" => amazon_id, "api_key" => api_key}) do
        
    #     if api_key == "acy" do
            
    #     else
            
    #     end

        
    #     response = "hashtagyolo"

    #     render(conn, "user_information.json", response: response)
    # end

    # grid functions
    def fetch_grid(conn, _params) do
        products = Item.list_grid_assoc_latest()

        IO.inspect "is the API even being reached?"
        IO.inspect products
        
        render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
    end

    def fetch_grid_category(conn, %{"category" => category}) do
        case category do
        "index" ->
            products = Item.list_grid_assoc_latest()
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        "home-office" -> 
            products = Item.list_grid_assoc_category() # by default is home-office
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        "awesome-dork" -> 
            products = Item.list_grid_assoc_category("awesome-dork")
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        "sports-outdoors" -> 
            products = Item.list_grid_assoc_category("sports-outdoors")
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        "fashion" -> 
            products = Item.list_grid_assoc_category("fashion")
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        "food" -> 
            products = Item.list_grid_assoc_category("food")
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        "wtf" -> 
            products = Item.list_grid_assoc_category("wtf")     
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)
            
        _ ->
            render conn, AcWeb.PageView, "grid.html", layout: {AcWeb.LayoutView, "layout_full_width.html"}
        end
    end


    def fetch_grid_category_search(conn, %{"category" => category, "search_input" => search_input}) do
        
        case category do
        "index" ->
            products = Search.list_all_category_and_search(search_input)
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)        
        _ ->
            products = Search.list_category_and_search(category, search_input)
            render(conn, AcWeb.ProductView, "indexAssoc.json", products: products)        
        end
        
    end


end
