defmodule AwfulWeb.OverviewController do
    use AwfulWeb, :controller
 
    alias Awful.GoogleAnalytics
    alias Awful.Console
    
    alias Awful.CoreExtra 


  def fetch_websites_index(conn, _params) do
      
    websites = Enum.map(Application.get_env(:awful, :website_repos), &(CoreExtra.list_websites_data(&1)))

    message = Console.generate_message("Fetch Websites Index", "Complete", "load")
    
    render(conn, "websites_list.json", message: message, websites: websites) # ac: ac, af: af, ap: ap, ach: ach, apo: apo, ahp: ahp, a9: a9, aw: aw)
  end  

  def fetch_google_analytics_data(conn, _params) do 
    
    data = Enum.map(Application.get_env(:awful, :ga_view_ids), &(GoogleAnalytics.fetch_analytics_data(&1)))
    
    message = Console.generate_message("fetch common env data", "Completed", "load")

    render conn, "google_analytics_data.json", data: data, message: message
  end

  def fetch_domain_expiration_data(conn, _params) do
    data = Namecheap.list_domains()

    message = Console.generate_message("fetch common env data", "Completed", "load")

    render conn, "domain_expiration_data.json", data: data, message: message
  end

  def renew_domain(conn, %{"domain" => domain}) do
    data = Namecheap.renew_domain(domain)

    message = Console.generate_message("fetch common env data", "Completed", "success")

    render conn, AwfulWeb.MessageView, "message.json", message: message
  end

end