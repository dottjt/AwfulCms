defmodule AcWeb.ApiView do
  use AcWeb, :view

  def render("user_information.json", %{response: response}) do
    %{data: response}
  end

  def render("amazon_product_api.json", %{response: response}) do
    %{data: response.body}
  end
  
  def render("product_like_total.json", %{product_like_total: product_like_total}) do
    %{product_like_total: product_like_total}
  end

  # def render("message_list.json", %{messages: messages # , message: message}) do
  #   %{messages: render_many(messages, AwfulWeb.MessageView, "message.json"),
  #     message: message}
  # end

  # def render("message.json", %{message: message}) do
  #   %{command: message.command,
  #     text: message.text,
  #     updated_at: message.update_at}
  # end

end
  