defmodule AwfulWeb.EnvController do
  use AwfulWeb, :controller

  alias Awful.CoreExtra   
  alias Awful.Core
  alias Awful.Core.Env
  
  alias Awful.Console

  # working
  def fetch_config_details(conn, %{"acronym" => acronym}) do

    config_data =
      %{
        website_acronym: CoreExtra.get_config_elm_value(acronym, "website_acronym"),
        website_name: CoreExtra.get_config_elm_value(acronym, "website_name"),
        website_name_lower: CoreExtra.get_config_elm_value(acronym, "website_name_lower"),
        website_domain: CoreExtra.get_config_elm_value(acronym, "website_domain"),
        website_logo_png: CoreExtra.get_config_elm_value(acronym, "website_logo_png"),
        website_logo_svg: CoreExtra.get_config_elm_value(acronym, "website_logo_svg"),
        website_favicon: CoreExtra.get_config_elm_value(acronym, "website_favicon"),
        website_title: CoreExtra.get_config_elm_value(acronym, "website_title"),
        website_description: CoreExtra.get_config_elm_value(acronym, "website_description"),
        website_keywords: CoreExtra.get_config_elm_value(acronym, "website_keywords"),
        website_twitter: CoreExtra.get_config_elm_value(acronym, "website_twitter"),
        website_alt_image: CoreExtra.get_config_elm_value(acronym, "website_alt_image"),
        blog_meta_description: CoreExtra.get_config_elm_value(acronym, "blog_meta_description"),
        categories_meta_description: CoreExtra.get_config_elm_value(acronym, "categories_meta_description"),
        updates_meta_description: CoreExtra.get_config_elm_value(acronym, "updates_meta_description"),
        about_meta_description: CoreExtra.get_config_elm_value(acronym, "about_meta_description"),
        contact_meta_description: CoreExtra.get_config_elm_value(acronym, "contact_meta_description"),
        submit_meta_description: CoreExtra.get_config_elm_value(acronym, "submit_meta_description"),
        login_meta_description: CoreExtra.get_config_elm_value(acronym, "login_meta_description"),
        register_meta_description: CoreExtra.get_config_elm_value(acronym, "register_meta_description"),
        search_meta_description: CoreExtra.get_config_elm_value(acronym, "search_meta_description"),
        about_copy: CoreExtra.get_config_elm_value(acronym, "about_copy"),
        submit_copy: CoreExtra.get_config_elm_value(acronym, "submit_copy"),
        letter_copy: CoreExtra.get_config_elm_value(acronym, "letter_copy"),
        google_analytics_tracking_id: CoreExtra.get_config_elm_value(acronym, "google_analytics_tracking_id"),
        google_site_verification: CoreExtra.get_config_elm_value(acronym, "google_site_verification"),
        primary_email: CoreExtra.get_config_elm_value(acronym, "primary_email"),
        password: CoreExtra.get_config_elm_value(acronym, "password")
      }

    acronym_upper = String.upcase acronym

    message = Console.generate_message("Fetch #{acronym_upper} Config", "Complete", "load")

    render conn, "config_details_data.json", data: config_data, message: message
  end 

  def update_config_details(conn, %{"acronym" => acronym, "website_acronym" => website_acronym, "website_name" => website_name, "website_name_lower" => website_name_lower, "website_domain" => website_domain, "website_logo_png" => website_logo_png, "website_logo_svg" => website_logo_svg, "website_favicon" => website_favicon, "website_title" => website_title, "website_description" => website_description, "website_keywords" => website_keywords, "website_twitter" => website_twitter, "website_alt_image" => website_alt_image, "blog_meta_description" => blog_meta_description, "categories_meta_description" => categories_meta_description, "updates_meta_description" => updates_meta_description, "about_meta_description" => about_meta_description, "contact_meta_description" => contact_meta_description, "submit_meta_description" => submit_meta_description, "login_meta_description" => login_meta_description, "register_meta_description" => register_meta_description, "search_meta_description" => search_meta_description, "about_copy" => about_copy, "submit_copy" => submit_copy, "letter_copy" => letter_copy, "google_analytics_tracking_id" => google_analytics_tracking_id, "google_site_verification" => google_site_verification, "primary_email" => primary_email, "password" => password}) do

    CoreExtra.update_config_elm("website_acronym", website_acronym, acronym)
    CoreExtra.update_config_elm("website_name", website_name, acronym)
    CoreExtra.update_config_elm("website_name_lower", website_name_lower, acronym)
    CoreExtra.update_config_elm("website_domain", website_domain, acronym)
    CoreExtra.update_config_elm("website_logo_png", website_logo_png, acronym)
    CoreExtra.update_config_elm("website_logo_svg", website_logo_svg, acronym)
    CoreExtra.update_config_elm("website_favicon", website_favicon, acronym)
    CoreExtra.update_config_elm("website_title", website_title, acronym)
    CoreExtra.update_config_elm("website_description", website_description, acronym)
    CoreExtra.update_config_elm("website_keywords", website_keywords, acronym)
    CoreExtra.update_config_elm("website_twitter", website_twitter, acronym)
    CoreExtra.update_config_elm("website_alt_image", website_alt_image, acronym)
    CoreExtra.update_config_elm("blog_meta_description", blog_meta_description, acronym)
    CoreExtra.update_config_elm("categories_meta_description", categories_meta_description, acronym)
    CoreExtra.update_config_elm("updates_meta_description", updates_meta_description, acronym)
    CoreExtra.update_config_elm("about_meta_description", about_meta_description, acronym)
    CoreExtra.update_config_elm("contact_meta_description", contact_meta_description, acronym)
    CoreExtra.update_config_elm("submit_meta_description", submit_meta_description, acronym)
    CoreExtra.update_config_elm("login_meta_description", login_meta_description, acronym)
    CoreExtra.update_config_elm("register_meta_description", register_meta_description, acronym)
    CoreExtra.update_config_elm("search_meta_description", search_meta_description, acronym)
    CoreExtra.update_config_elm("about_copy", about_copy, acronym)
    CoreExtra.update_config_elm("submit_copy", submit_copy, acronym)
    CoreExtra.update_config_elm("letter_copy", letter_copy, acronym)
    CoreExtra.update_config_elm("google_analytics_tracking_id", google_analytics_tracking_id, acronym)
    CoreExtra.update_config_elm("google_site_verification", google_site_verification, acronym)
    CoreExtra.update_config_elm("primary_email", primary_email, acronym)
    CoreExtra.update_config_elm("password", password, acronym)

    result = Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "update_env_config_single.sh" <> " " <> "production" <> " " <> acronym <> " " <> website_acronym <> " " <> website_name <> " " <> website_name_lower <> " " <> website_domain <> " " <> website_logo_png <> " " <> website_logo_svg <> " " <> website_favicon <> " " <> website_title <> " " <> website_description <> " " <> website_keywords <> " " <> website_twitter <> " " <> website_alt_image <> " " <> blog_meta_description <> " " <> categories_meta_description <> " " <> updates_meta_description <> " " <> about_meta_description <> " " <> contact_meta_description <> " " <> submit_meta_description <> " " <> login_meta_description <> " " <> register_meta_description <> " " <> search_meta_description <> " " <> about_copy <> " " <> submit_copy <> " " <> google_analytics_tracking_id <> " " <> google_site_verification)

    message = Console.generate_message("Update #{acronym} Config", "Complete", "success")

    render conn, AwfulWeb.MessageView, "message.json", message: message
  end

  def fetch_common_env_data(conn, _params) do

    common_env_data = 
      %{mailgun_key: CoreExtra.get_common_env_value("mailgun_key"),
        amazon_associate_tag: CoreExtra.get_common_env_value("amazon_associate_tag"),
        aws_access_key_id: CoreExtra.get_common_env_value("aws_access_key_id"),
        aws_secret_access_key: CoreExtra.get_common_env_value("aws_secret_access_key"),
        marketplace_host: CoreExtra.get_common_env_value("marketplace_host"),
        amazon_s3_access_key: CoreExtra.get_common_env_value("amazon_s3_access_key"),
        amazon_s3_secret_access_key: CoreExtra.get_common_env_value("amazon_s3_secret_access_key"),
        etsy_api_key: CoreExtra.get_common_env_value("etsy_api_key"),
        etsy_secret_key: CoreExtra.get_common_env_value("etsy_secret_key"),
        tumblr_access_token: CoreExtra.get_common_env_value("tumblr_access_token"),
        tumblr_access_token_secret: CoreExtra.get_common_env_value("tumblr_access_token_secret")
      }
      
      message = Console.generate_message("Fetch Common Env Data", "Complete", "load")

      render conn, "common_env_data.json", data: common_env_data, message: message
  end

  def update_common_env_data(conn, %{"mailgun_key" => mailgun_key, "amazon_associate_tag" => amazon_associate_tag, "aws_access_key_id" => aws_access_key_id, "aws_secret_access_key" => aws_secret_access_key, "marketplace_host" => marketplace_host, "amazon_s3_access_key" => amazon_s3_access_key, "amazon_s3_secret_access_key" => amazon_s3_secret_access_key, "etsy_api_key" => etsy_api_key, "etsy_secret_key" => etsy_secret_key, "tumblr_access_token" => tumblr_access_token, "tumblr_access_token_secret" => tumblr_access_token_secret}) do
    
    CoreExtra.update_common_env("mailgun_key", mailgun_key)
    CoreExtra.update_common_env("amazon_associate_tag", amazon_associate_tag)
    CoreExtra.update_common_env("aws_access_key_id", aws_access_key_id)
    CoreExtra.update_common_env("aws_secret_access_key", aws_secret_access_key)
    CoreExtra.update_common_env("marketplace_host", marketplace_host)
    CoreExtra.update_common_env("amazon_s3_access_key", amazon_s3_access_key)
    CoreExtra.update_common_env("amazon_s3_secret_access_key", amazon_s3_secret_access_key)
    CoreExtra.update_common_env("etsy_api_key", etsy_api_key)
    CoreExtra.update_common_env("etsy_secret_key", etsy_secret_key)
    CoreExtra.update_common_env("tumblr_access_token", tumblr_access_token)
    CoreExtra.update_common_env("tumblr_access_token_secret", tumblr_access_token_secret)

    # update files
    Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "update_env_common.sh" <> " " <> "production" <> " " <> mailgun_key <> " " <> amazon_associate_tag <> " " <> aws_access_key_id <> " " <> aws_secret_access_key <> " " <> marketplace_host <> " " <> amazon_s3_access_key <> " " <> amazon_s3_secret_access_key <> " " <> etsy_api_key <> " " <> etsy_secret_key <> " " <> tumblr_access_token <> " " <> tumblr_access_token_secret)

    # generate message
    message = Console.generate_message("Update Common Env Data", "Complete", "success")

    render conn, AwfulWeb.MessageView, "message.json", message: message
  end


  def fetch_individual_env_data(conn, %{"acronym" => acronym}) do
    
    # update database
    individual_env_data = 
      %{mailgun_domain: CoreExtra.get_individual_env_value(acronym, "mailgun_domain"),
        amazon_s3_bucket_name: CoreExtra.get_individual_env_value(acronym, "amazon_s3_bucket_name"),
        recaptcha_public_key: CoreExtra.get_individual_env_value(acronym, "recaptcha_public_key"),
        recaptcha_private_key: CoreExtra.get_individual_env_value(acronym, "recaptcha_private_key"),
        twitter_api_key: CoreExtra.get_individual_env_value(acronym, "twitter_api_key"),
        twitter_secret_key: CoreExtra.get_individual_env_value(acronym, "twitter_secret_key"),
        twitter_access_token: CoreExtra.get_individual_env_value(acronym, "twitter_access_token"),
        twitter_access_token_secret: CoreExtra.get_individual_env_value(acronym, "twitter_access_token_secret"),
        facebook_api_key: CoreExtra.get_individual_env_value(acronym, "facebook_api_key"),
        facebook_secret_key: CoreExtra.get_individual_env_value(acronym, "facebook_secret_key"),
        facebook_page_id: CoreExtra.get_individual_env_value(acronym, "facebook_page_id"),
        facebook_redirect_url: CoreExtra.get_individual_env_value(acronym, "facebook_redirect_url"),
        tumblr_api_key: CoreExtra.get_individual_env_value(acronym, "tumblr_api_key"),
        tumblr_secret_key: CoreExtra.get_individual_env_value(acronym, "tumblr_secret_key"),
        tumblr_blog_identifier: CoreExtra.get_individual_env_value(acronym, "tumblr_blog_identifier"),
        pintrest_api_key: CoreExtra.get_individual_env_value(acronym, "pintrest_api_key"),
        pintrest_secret_key: CoreExtra.get_individual_env_value(acronym, "pintrest_secret_key")
      }

    # generate message 
    message = Console.generate_message("Fetch Individual Env Data", "Complete", "load")

    render conn, "individual_env_data.json", data: individual_env_data, message: message
  end

  def update_individual_env_data(conn, %{"acronym" => acronym, "mailgun_domain" => mailgun_domain, "amazon_s3_bucket_name" => amazon_s3_bucket_name, "recaptcha_public_key" => recaptcha_public_key, "recaptcha_private_key" => recaptcha_private_key, "twitter_api_key" => twitter_api_key, "twitter_secret_key" => twitter_secret_key, "twitter_access_token" => twitter_access_token, "twitter_access_token_secret" => twitter_access_token_secret, "facebook_api_key" => facebook_api_key, "facebook_secret_key" => facebook_secret_key, "facebook_page_id" => facebook_page_id, "facebook_redirect_url" => facebook_redirect_url, "tumblr_api_key" => tumblr_api_key, "tumblr_secret_key" => tumblr_secret_key, "tumblr_blog_identifier" => tumblr_blog_identifier, "pintrest_api_key" => pintrest_api_key, "pintrest_secret_key" => pintrest_secret_key}) do

    # update database 
      CoreExtra.update_individual_env("mailgun_domain", mailgun_domain, acronym)   
      CoreExtra.update_individual_env("amazon_s3_bucket_name", amazon_s3_bucket_name, acronym)   
      CoreExtra.update_individual_env("recaptcha_public_key", recaptcha_public_key, acronym)   
      CoreExtra.update_individual_env("recaptcha_private_key", recaptcha_private_key, acronym)   
      CoreExtra.update_individual_env("twitter_api_key", twitter_api_key, acronym)   
      CoreExtra.update_individual_env("twitter_secret_key", twitter_secret_key, acronym)   
      CoreExtra.update_individual_env("twitter_access_token", twitter_access_token, acronym)   
      CoreExtra.update_individual_env("twitter_access_token_secret", twitter_access_token_secret, acronym)   
      CoreExtra.update_individual_env("facebook_api_key", facebook_api_key, acronym)   
      CoreExtra.update_individual_env("facebook_secret_key", facebook_secret_key, acronym)   
      CoreExtra.update_individual_env("facebook_page_id", facebook_page_id, acronym)   
      CoreExtra.update_individual_env("facebook_redirect_url", facebook_redirect_url, acronym)   
      CoreExtra.update_individual_env("tumblr_api_key", tumblr_api_key, acronym)   
      CoreExtra.update_individual_env("tumblr_secret_key", tumblr_secret_key, acronym)   
      CoreExtra.update_individual_env("tumblr_blog_identifier", tumblr_blog_identifier, acronym)   
      CoreExtra.update_individual_env("pintrest_api_key", pintrest_api_key, acronym)   
      CoreExtra.update_individual_env("pintrest_secret_key", pintrest_secret_key, acronym)   

      # update development / production
      Porcelain.shell(System.get_env("AWFUL_SCRIPT_DIR") <> "/" <> "update_env_individual_single.sh" <> " " <> "production" <> " " <> acronym <> " " <> mailgun_domain <> " " <> amazon_s3_bucket_name <> " " <> recaptcha_public_key <> " " <> recaptcha_private_key <> " " <> twitter_api_key <> " " <> twitter_secret_key <> " " <> twitter_access_token <> " " <> twitter_access_token_secret <> " " <> facebook_api_key <> " " <> facebook_secret_key <> " " <> facebook_page_id <> " " <> facebook_redirect_url <> " " <> tumblr_api_key <> " " <> tumblr_secret_key <> " " <> tumblr_blog_identifier <> " " <> pintrest_api_key <> " " <> pintrest_secret_key)
      
      # generate message
      message = Console.generate_message("Update Individual Env Data", "Complete", "success")

      render conn, AwfulWeb.MessageView, "message.json", message: message
  end



  def index(conn, _params) do
    env = Core.list_env()
    render(conn, "index.html", env: env)
  end

  def new(conn, _params) do
    changeset = Core.change_env(%Env{})
    render(conn, "new.html", changeset: changeset)
  end

  def create(conn, %{"env" => env_params}) do
    case Core.create_env(env_params) do
      {:ok, env} ->
        conn
        |> put_flash(:info, "Env created successfully.")
        |> redirect(to: env_path(conn, :show, env))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "new.html", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    env = Core.get_env!(id)
    render(conn, "show.html", env: env)
  end

  def edit(conn, %{"id" => id}) do
    env = Core.get_env!(id)
    changeset = Core.change_env(env)
    render(conn, "edit.html", env: env, changeset: changeset)
  end

  def update(conn, %{"id" => id, "env" => env_params}) do
    env = Core.get_env!(id)

    case Core.update_env(env, env_params) do
      {:ok, env} ->
        conn
        |> put_flash(:info, "Env updated successfully.")
        |> redirect(to: env_path(conn, :show, env))
      {:error, %Ecto.Changeset{} = changeset} ->
        render(conn, "edit.html", env: env, changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    env = Core.get_env!(id)
    {:ok, _env} = Core.delete_env(env)

    conn
    |> put_flash(:info, "Env deleted successfully.")
    |> redirect(to: env_path(conn, :index))
  end

  
end
