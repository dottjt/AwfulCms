defmodule AwfulWeb.OverviewView do
  use AwfulWeb, :view

  def render("websites_list.json", %{message: message, websites: websites}) do
    %{websites: render_many(websites, AwfulWeb.OverviewView, "websites.json", as: :websites),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("websites.json", %{websites: websites}) do
    %{name: websites.name, 
      acronym: websites.acronym, 
      total_products: websites.total_products,
      total_products_week: websites.total_products_week,
      total_products_month: websites.total_products_month,
      total_products_draft: websites.total_products_draft, 
      total_posts: websites.total_posts}
  end


  def render("google_analytics_data.json", %{data: data, message: message}) do
    %{googleAnalytics: render_one(data, AwfulWeb.OverviewView, "google_analytics.json"),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("google_analytics.json", %{data: data}) do
    %{domain: data.domain,
      today: data.today,
      yesterday: data.yesterday,
      week: data.week,
      month: data.month,
      link: data.link}
  end


  def render("domain_expiration_data.json", %{data: data, message: message}) do
    %{domainExpirations: render_one(data, AwfulWeb.OverviewView, "domain_expiration.json"),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end 

  def render("domain_expiration.json", %{data: data, message: message}) do
    %{domain: data.domain,
      daysTillExpiration: data.daysTillExpiration,
      expirationDate: data.expirationDate,
      autoRenewStatus: data.autoRenewStatus,
      renew: data.renew}
  end



end
