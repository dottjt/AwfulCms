defmodule AwfulWeb.Router do
  
  use AwfulWeb, :router

  # use AwfulWeb.Coherence, :router
  use Coherence.Router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session 
  end

  pipeline :protected do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
    plug Coherence.Authentication.Session, protected: true 
  end

  pipeline :api do
    plug :accepts, ["json"]
    # plug Coherence.Authentication.Session, protected: true     
  end





  scope "/" do
    pipe_through :browser
    coherence_routes()
  end

  scope "/admin" do
    pipe_through :protected
    coherence_routes :protected
  end


  

  scope "/", AwfulWeb do
    pipe_through :browser    
    get "/", PageController, :index
  end


  scope "/admin", AwfulWeb do
    pipe_through :protected

    get "/", PageController, :admin

    resources "/message", MessageController
    resources "/websites", WebsitesController
    resources "/config", ConfigController
    resources "/env", EnvController
  end


  ### application
  scope "/api/application", AwfulWeb do
    pipe_through :api

    get "/new_console_session", ApplicationController, :new_console_session

    get "/send_initial_console_item/:command/:text/:console_item_type", ApplicationController, :send_initial_console_item
    get "/fetch_console_item_list", ApplicationController, :fetch_console_item_list

    get "/fetch_server_status/:dev_or_prod", ApplicationController, :fetch_server_status

    get "/command/:script/:dev_or_prod/:acronym", ApplicationController, :command

  end


  ### overview
  scope "/api/overview", AwfulWeb do
    pipe_through :api

    get "/fetch_websites_index", OverviewController, :fetch_websites_index    
    get "/fetch_google_analytics_data", OverviewController, :fetch_google_analytics_data
    get "/fetch_domain_expiration_data", OverviewController, :fetch_domain_expiration_data
    get "/renew_domain/:domain", OverviewController, :renew_domain
  end
  

  ### build 
  scope "/api/build", AwfulWeb do
    pipe_through :api

    get "/check_domain/:domain", BuildController, :check_domain
    get "/register_domain/:domain", BuildController, :register_domain
    get "/setup_google/:domain", BuildController, :setup_google
    get "/setup_server/:domain", BuildController, :setup_server

    post "/new_website", BuildController, :new_website
  end


  ### websites 
  scope "/api/websites", AwfulWeb do
    pipe_through :api
    
    get "/fetch_website_individual/:acronym", WebsitesController, :fetch_website_individual
    
    get "/prefil_social_media_form/:acronym", WebsitesController, :prefil_social_media_form    
    post "/search_for_amazon_item", WebsitesController, :search_for_amazon_item
    

    post "/item_create/:type/:acronym", WebsitesController, :item_create
    put "/item_update/:type/:acronym/:id", WebsitesController, :item_update
    delete "/item_delete/:type/:acronym/:id", WebsitesController, :item_delete
    
  end


  ### env
  scope "/api/env", AwfulWeb do
    pipe_through :api

    get "/fetch_config_details/:acronym", EnvController, :fetch_config_details
    post "/update_config_details/:acronym", EnvController, :update_config_details

    get "/fetch_common_env_data", EnvController, :fetch_common_env_data
    post "/update_common_env_data/", EnvController, :update_common_env_data

    get "/fetch_individual_env_data/:acronym", EnvController, :fetch_individual_env_data    
    post "/update_individual_env_data/:acronym", EnvController, :update_individual_env_data
  end
end
