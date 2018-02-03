defmodule AwfulWeb.ApplicationController do
    use AwfulWeb, :controller

    alias Awful.Console

  

  def new_console_session(conn, _params) do
    message = Console.generate_message("New Console Session", "New Session", "new_session") 

    render(conn, AwfulWeb.MessageView, "message.json", message: message)
  end
  



  def fetch_console_item_list(conn, _params) do
    messages = Console.list_messages_40()

    message = Console.generate_message("Fetch Console Item List", "Complete", "load") 

    render(conn, AwfulWeb.MessageView, "message_list.json", messages: messages, message: message)
  end


  def send_initial_console_item(conn, %{"command" => command, "text" => text, "console_item_type" => console_item_type}) do

    message = Console.generate_message(command, text, console_item_type) 

    # IO.inspect "we are generating the message, sir"    

    render(conn, AwfulWeb.MessageView, "message.json", message: message)
  end

  

  
    
  def fetch_server_status(conn, %{"dev_or_prod" => dev_or_prod}) do

    case dev_or_prod do
      "production" ->
        result = Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "fetch_server_status.sh" <> " " <> dev_or_prod)

      "development" ->
        result = Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "fetch_server_status.sh" <> " " <> dev_or_prod)  

    end

    json_list = (result.out <> " ]")

    complete_list = String.replace(json_list, "\\", " ")

    server_status = Poison.decode!(json_list)
    
    message = Console.generate_message("Fetch Server Status", "Complete", "load") 

    render(conn, "fetch_server_status.json", message: message, server_status: server_status, dev_or_prod: dev_or_prod)
  end
    

  def command(conn, %{"script" => script, "acronym" => acronym, "dev_or_prod" => dev_or_prod}) do 

    case acronym do 
        "" -> 
          result = Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> script <> ".sh" <> " " <> dev_or_prod )
        
        _ ->
        result = Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> script <> ".sh" <> " " <> dev_or_prod <> " " <> acronym )
    end 
    
    IO.inspect result.out
    
    message =
      script 
        |> String.split("_")
        |> Enum.map(&(String.capitalize(&1)))
        |> Enum.join(" ")
        |> Kernel.<>(" " <> String.capitalize(dev_or_prod))
        |> Console.generate_message("Complete", "success")

    render conn, AwfulWeb.MessageView, "message.json", message: message
  end

end