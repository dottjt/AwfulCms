defmodule AwfulWeb.MessageView do
  use AwfulWeb, :view

  def render("message_list.json", %{messages: messages, message: message}) do
    %{messages: render_many(messages, AwfulWeb.MessageView, "message.json"),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("message.json", %{message: message}) do
    %{command: message.command,
      text: message.text,
      console_type: message.console_type,
      inserted_at: message.inserted_at}
  end
end