defmodule AwfulWeb.LinodeController do
    use AwfulWeb, :controller
 
    alias Awful.Linode
    alias Awful.Namecheap
    alias Awful.Console


    def new_website(conn, %{"domain" => domain}) do 
      # will have a heap of post data. 
        
      message = Console.generate_message("Fetch Websites Index", "Complete", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
    end

    def check_domain(conn, %{"domain" => domain}) do 
      Namecheap.check_domain_availablity_and_pricing(domain)

      message = Console.generate_message("Fetch Websites Index", "Complete", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
    end

    def register_domain(conn, %{"domain" => domain}) do 
      Namecheap.register_domain(domain)

      message = Console.generate_message("Fetch Websites Index", "Complete", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
    end

    def setup_google(conn, %{"domain" => domain}) do 
      Namecheap.update_domain_dns(domain)

      message = Console.generate_message("Fetch Websites Index", "Complete", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
    end

    def setup_server(conn, %{"domain" => domain}) do 

      message = Console.generate_message("Fetch Websites Index", "Complete", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
    end

    def build_staging_single(conn, %{"website_acronym" => website_acronym ,
      "website_lower" => website_lower ,
      "website_capital" => website_capital ,
      "num_of_categories" => num_of_categories ,
      
      "c1_name" => c1_name ,
      "c1_display_name" => c1_display_name ,
      "c1_model" => c1_model ,
      "c1_icon" => c1_icon ,
      "c2_name" => c2_name ,
      "c2_display_name" => c2_display_name ,
      "c2_model" => c2_model ,
      "c2_icon" => c2_icon ,
      "c3_name" => c3_name ,
      "c3_display_name" => c3_display_name ,
      "c3_model" => c3_model ,
      "c3_icon" => c3_icon ,
      "c4_name" => c4_name ,
      "c4_display_name" => c4_display_name ,
      "c4_model" => c4_model ,
      "c4_icon" => c4_icon ,
      "c5_name" => c5_name ,
      "c5_display_name" => c5_display_name ,
      "c5_model" => c5_model ,
      "c5_icon" => c5_icon ,
      "c6_name" => c6_name ,
      "c6_display_name" => c6_display_name ,
      "c6_model" => c6_model ,
      "c6_icon" => c6_icon ,
      "c7_name" => c7_name ,
      "c7_display_name" => c7_display_name }) do

      result = Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "build_single.sh" <> "production" <> " " <> website_acronym <> " " <> website_lower <> " " <> website_capital <> " " <> num_of_categories <> " " <> c1_name <> " " <> c1_display_name <> " " <> c1_model <> " " <> c1_icon <> " " <> c2_name <> " " <> c2_display_name <> " " <> c2_model <> " " <> c2_icon <> " " <> c3_name <> " " <> c3_display_name <> " " <> c3_model <> " " <> c3_icon <> " " <> c4_name <> " " <> c4_display_name <> " " <> c4_model <> " " <> c4_icon <> " " <> c5_name <> " " <> c5_display_name <> " " <> c5_model <> " " <> c5_icon <> " " <> c6_name <> " " <> c6_display_name <> " " <> c6_model <> " " <> c6_icon <> " " <> c7_name <> " " <> c7_display_name)

      message = Console.generate_message("Fetch Websites Index", "Complete", "success")

    render conn, AwfulWeb.MessageView, "message.json", message: message

    end

end