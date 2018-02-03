defmodule AwfulWeb.WebsitesController do
  use AwfulWeb, :controller

  alias Awful.Core
  alias Awful.Core.Websites
  alias Awful.Console
  
  alias Awful.CoreExtra
  alias Awful.CoreHttp
  alias Awful.CoreActions

  alias AmazonProduct.ItemLookup

  alias Ac.Item 

  import SweetXml 


  
  # GET INITAL ITEMS PER ACRONYM

    def fetch_website_individual(conn, %{"acronym" => acronym}) do
      repo = CoreExtra.acronym_to_repo(acronym)

      {productsAssoc, categories, tagsAssoc, postAssoc, productsDraft, social, updates} = CoreExtra.admin_items(repo)

      message = Console.generate_message(("Fetch Website Individual - " <> (String.upcase acronym)), "Complete", "success")
        
      render conn, AwfulWeb.WebsitesView, "indexAssoc.json", message: message, productsAssoc: productsAssoc, categories: categories, tagsAssoc: tagsAssoc, postAssoc: postAssoc, productsDraft: productsDraft, social: social, updates: updates
    end








  # PREFIL 
  
    def search_for_amazon_item(conn, %{"input" => input}) do
      new_asin = URI.encode(input)
      
      # %ItemSearch{"MaximumPrice": "25", "Keywords": "long sleeve shirt"} |> ItemSearch.execute
      case %ItemLookup{"ItemId": new_asin} |> ItemLookup.execute do
        {:ok, response} ->
          IO.inspect "lovely, just lovely."
          body = response.body

          IO.inspect body 
          featured_image =
            body |> xpath(~x"//LargeImage/URL/text()"s)
                 
          IO.inspect featured_image 

          url =
            body |> xpath(~x"//DetailPageURL/text()"s)
                 
          IO.inspect url
          
          display_name =
            body |> xpath(~x"//Title/text()"s)
                 
          
          price =
            body |> xpath(~x"//FormattedPrice/text()"s)
                 |> String.slice(1..-1)
                 |> String.to_float() 

          IO.inspect price

          description =
            body |> xpath(~x"//Feature"l)

            
          product = 
            %{ featured_image: featured_image,
               url: url,
               price: price 
             }

          IO.inspect product 
          
          message = Console.generate_message("Amazon Item Found", "Completed", "success")

          render(conn, "new_product_prefil.json", message: message, product: product)
          
        {:error, error} ->
            IO.inspect "error"
            IO.inspect error 

            message = Console.generate_message("Amazon Item Error", "Completed", "failure")
              
            render(conn, AwfulWeb.MessageView, "message.json", message: message)
            
      end

    end

  
    def prefil_social_media_form(conn, %{"acronym" => acronym, "product_id" => product_id}) do
      repo = CoreExtra.acronym_to_repo(acronym)
      
      prefil = CoreExtra.get_products_assoc(repo, product_id)

      message = Console.generate_message("Prefil Social Media", "Completed", "success")

      render(conn, "social_media_prefil.json", message: message, prefil: prefil)
    end 









  # CREATE / UPDATE / DELETE

  def item_create(conn, %{"acronym" => acronym, "type" => type, "data" => data}) do

    repo = CoreExtra.acronym_to_repo(acronym)

    bucket = CoreExtra.acronym_to_bucket(acronym)

    case type do
      "products" ->
        message = CoreActions.product_create(repo, bucket, data) 

      "posts" ->
        message = CoreActions.post_create(repo, data) 
        
      "tags" ->
        message = CoreActions.tag_create(repo, data) 

      "updates" ->
        message = CoreActions.update_create(repo, data) 

      "social_media" ->
        message = CoreActions.social_create(repo, data) 

    end

    render(conn, AwfulWeb.MessageView, "message.json", message: message)

  end
  

  def item_update(conn, %{"acronym" => acronym, "type" => type, "id" => id, "data" => data}) do

    repo = CoreExtra.acronym_to_repo(acronym)

    case type do
      "products" ->
        message = CoreActions.product_update(repo, id, data)

      "posts" ->
        message = CoreActions.post_update(repo, id, data) 
        
      "tags" ->
        message = CoreActions.tag_update(repo, id, data) 

      "updates" ->
        message = CoreActions.update_update(repo, id, data) 

      "social_media" ->
        message = CoreActions.social_update(repo, id, data) 

    end

    render(conn, AwfulWeb.MessageView, "message.json", message: message)

  end


  def item_delete(conn, %{"acronym" => acronym, "type" => type, "id" => id }) do

    repo = CoreExtra.acronym_to_repo(acronym)

    case type do
      "products" ->
        message = CoreActions.product_delete(repo, id) 

      "posts" ->
        message = CoreActions.post_delete(repo, id) 
        
      "tags" ->
        message = CoreActions.tag_delete(repo, id) 

      "updates" ->
        message = CoreActions.update_delete(repo, id) 

      "social_media" ->
        message = CoreActions.social_delete(repo, id) 

    end

    render(conn, AwfulWeb.MessageView, "message.json", message: message)

  end













  
  def index(conn, _params) do
    websites = Website.list_websites()
    render(conn, "index.html", websites: websites)
  end

  def new(conn, _params) do
    changeset = Website.change_websites(%Websites{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"websites" => websites_params}) do
    case Website.create_websites(websites_params) do
      {:ok, websites} ->
        conn
        |> put_flash(:info, "Websites created successfully.")
        |> redirect(to: websites_path(conn, :show, websites))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    websites = Website.get_websites!(id)
    render(conn, "show.html", websites: websites)
  end

  def edit(conn, %{"id" => id}) do
    websites = Website.get_websites!(id)
    changeset = Website.change_websites(websites)
    render(conn, "edit.html", websites: websites, changeset: changeset)
  end

  def update(conn, %{"id" => id, "websites" => websites_params}) do
    websites = Website.get_websites!(id)

    case Website.update_websites(websites, websites_params) do
      {:ok, websites} ->
        conn
        |> put_flash(:info, "Websites updated successfully.")
        |> redirect(to: websites_path(conn, :show, websites))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", websites: websites, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    websites = Website.get_websites!(id)
    {:ok, _websites} = Website.delete_websites(websites)

    conn
    |> put_flash(:info, "Websites deleted successfully.")
    |> redirect(to: websites_path(conn, :index))
  end
end





  # WEBSITES FUNCTIONS

  # def new_product(conn, %{"acronym" => acronym, "data" => data}) do
  #     port = CoreExtra.acronym_to_port(acronym)

  #     url = "https://localhost:" <> port <> "/admin/updates"
  #     body = Poison.encode!(%{
  #         data: data
  #     })

  #     {body, message} = CoreHttp.http_post_and_message(url, body, "fetch common env data", "Complete", "success" )

  #     render(conn, AwfulWeb.MessageView, "message.json", message: message)
  # end 

  # def new_post(conn, %{"acronym" => acronym, "data" => data}) do
  #     port = CoreExtra.acronym_to_port(acronym)
      
  #     url = "https://localhost:" <> port <> "/admin/posts"
  #     body = Poison.encode!(%{
  #         data: data
  #     })

  #     case HTTPoison.post! url, body do 
  #         {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
  #             IO.puts body
  #             message = Console.generate_message("fetch common env data", "success!~")                
  #         {:error, %HTTPoison.Error{reason: reason}} ->
  #             IO.inspect reason
  #             message = Console.generate_message("fetch common env data", reason)
  #     end 

  #     render(conn, AwfulWeb.MessageView, "message.json", message: message)
  # end 

  # def new_social(conn, %{"acronym" => acronym, "data" => data}) do
  #     port = CoreExtra.acronym_to_port(acronym)

  #     url = "https://localhost:" <> port <> "/admin/social_media"
  #     body = Poison.encode!(%{
  #         data: data
  #     })

  #     case HTTPoison.post! url, body do
  #         {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
  #             IO.puts body
  #             message = Console.generate_message("fetch common env data", "success!~")                
  #         {:error, %HTTPoison.Error{reason: reason}} ->
  #             IO.inspect reason
  #             message = Console.generate_message("fetch common env data", reason)
  #     end 

  #     render(conn, AwfulWeb.MessageView, "message.json", message: message)
  # end 

  # def new_tags(conn, %{"acronym" => acronym, "data" => data}) do
  #     port = CoreExtra.acronym_to_port(acronym)

  #     url = "https://localhost:" <> port <> "/admin/tags"
  #     body = Poison.encode!(%{
  #         data: data
  #     })

  #     case HTTPoison.post! url, body do 
  #         {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
  #             IO.puts body
  #             message = Console.generate_message("fetch common env data", "success!~")                
  #         {:error, %HTTPoison.Error{reason: reason}} ->
  #             IO.inspect reason
  #             message = Console.generate_message("fetch common env data", reason)
  #     end 

  #     render(conn, AwfulWeb.MessageView, "message.json", message: message)
  # end 

  # def new_updates(conn, %{"acronym" => acronym, "data" => data}) do
  #     port = CoreExtra.acronym_to_port(acronym)

  #     url = "https://localhost:" <> port <> "/admin/updates"
  #     body = Poison.encode!(%{
  #         data: data
  #     })

  #     case HTTPoison.post! url, body do 
  #         {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
  #             IO.puts body
  #             message = Console.generate_message("fetch common env data", "success!~")                
  #         {:error, %HTTPoison.Error{reason: reason}} ->
  #             IO.inspect reason
  #             message = Console.generate_message("fetch common env data", reason)
  #     end
  
  #     render(conn, AwfulWeb.MessageView, "message.json", message: message)
  # end 



  # def item_render_type(type) do
  #   case type do 
  #     "posts" ->
  #       render(conn, "social_media_prefil.json", message: message, data: data)
  
  #     "products" -> 
  #       render(conn, "social_media_prefil.json", message: message, data: data)

  #     "updates" ->
  #       render(conn, "social_media_prefil.json", message: message, data: data)

  #     "social" ->
  #       render(conn, "social_media_prefil.json", message: message, data: data)

  #     "tags" ->
  #       render(conn, "social_media_prefil.json", message: message, data: data)

  #     _ ->
  #       IO.inspect "Wrong type supplied."
  #   end
  # end




    # url = "http://localhost:" <> Integer.to_string(port) <> "/admin/" <> type # <> "/new"
    
    # body = Poison.encode!(%{
    #     data: data
    # })

    # {body, message} = CoreHttp.http_post_and_message(url, body, ("create new" <> acronym <> type), "Complete", "success")
