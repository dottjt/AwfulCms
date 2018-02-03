defmodule AwfulWeb.ProductionController do
    use AwfulWeb, :controller
 
    alias Awful.Core
    alias Awful.Console


    def update_production_all(conn, _params) do
    
      render conn, "message.json"
    end

    def fetch_production_server_status(conn, _params) do
      Linode.server_status()

      # website status
      Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "fetch_production_server_status.sh")

    end

    def production_command(conn, _params) do

    end 
    

    def update_production_server(conn, %{"acronym" => acronym}) do
        
      case acronym do
          "all" ->
              Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "update_all.sh")
          _ -> 
              Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "update_single.sh " <> acronym)
      end

      message = Console.generate_message("fetch common env data", "Completed", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
    end

end

