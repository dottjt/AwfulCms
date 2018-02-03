defmodule AwfulWeb.EnvView do
  use AwfulWeb, :view

  def render("config_details_data.json", %{data: data, message: message}) do
    %{config: render_one(data, AwfulWeb.EnvView, "config_details.json", as: :data),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("config_details.json", %{data: data}) do
    %{website_title: data.website_title,
      website_description: data.website_description,
      website_keywords: data.website_keywords,
      website_twitter: data.website_twitter,
      website_alt_image: data.website_alt_image,
      blog_meta_description: data.blog_meta_description,
      categories_meta_description: data.categories_meta_description,
      updates_meta_description: data.updates_meta_description,
      about_meta_description: data.about_meta_description,
      contact_meta_description: data.contact_meta_description,
      submit_meta_description: data.submit_meta_description,
      login_meta_description: data.login_meta_description,
      register_meta_description: data.register_meta_description,
      search_meta_description: data.search_meta_description,
      about_copy: data.about_copy,
      submit_copy: data.submit_copy,
      letter_copy: data.letter_copy,
      website_acronym: data.website_acronym,
      website_name: data.website_name,
      website_name_lower: data.website_name_lower,
      website_domain: data.website_domain,
      website_logo_png: data.website_logo_png,
      website_logo_svg: data.website_logo_svg,
      website_favicon: data.website_favicon,
      google_analytics_tracking_id: data.google_analytics_tracking_id,
      google_site_verification: data.google_site_verification,
      password: data.password,
      primary_email: data.primary_email}
  end


  def render("common_env_data.json", %{data: data, message: message}) do
    %{commonEnv: render_one(data, AwfulWeb.EnvView, "common_env.json", as: :data),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end
  
  def render("common_env.json", %{data: data}) do
    %{mailgun_key: data.mailgun_key,
      amazon_associate_tag: data.amazon_associate_tag,
      aws_access_key_id: data.aws_access_key_id,
      aws_secret_access_key: data.aws_secret_access_key,
      marketplace_host: data.marketplace_host,
      amazon_s3_access_key: data.amazon_s3_access_key,
      amazon_s3_secret_access_key: data.amazon_s3_secret_access_key,
      etsy_api_key: data.etsy_api_key,
      etsy_secret_key: data.etsy_secret_key,
      tumblr_access_token: data.tumblr_access_token,
      tumblr_access_token_secret: data.tumblr_access_token_secret}
  end

  def render("individual_env_data.json", %{data: data, message: message}) do
    %{individualEnv: render_one(data, AwfulWeb.EnvView, "individual_env.json", as: :data),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("individual_env.json", %{data: data}) do
    %{mailgun_domain: data.mailgun_domain,
      amazon_s3_bucket_name: data.amazon_s3_bucket_name,
      recaptcha_public_key: data.recaptcha_public_key,
      recaptcha_private_key: data.recaptcha_private_key,
      twitter_api_key: data.twitter_api_key,
      twitter_secret_key: data.twitter_secret_key,
      twitter_access_token: data.twitter_access_token,
      twitter_access_token_secret: data.twitter_access_token_secret,
      facebook_api_key: data.facebook_api_key,
      facebook_secret_key: data.facebook_secret_key,
      facebook_page_id: data.facebook_page_id,
      facebook_redirect_url: data.facebook_redirect_url,
      tumblr_api_key: data.tumblr_api_key,
      tumblr_secret_key: data.tumblr_secret_key,
      tumblr_blog_identifier: data.tumblr_blog_identifier,
      pintrest_api_key: data.pintrest_api_key,
      pintrest_secret_key: data.pintrest_secret_key}
  end
end

