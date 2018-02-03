defmodule AwfulWeb.ApplicationView do
  use AwfulWeb, :view

  def render("fetch_server_status.json", %{message: message, server_status: server_status, dev_or_prod: dev_or_prod}) do
    %{serverStatusList: render_many(server_status, AwfulWeb.ApplicationView, "server_status.json", as: :server_status),
      status_type: dev_or_prod,
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("server_status.json", %{server_status: server_status}) do
    %{ status: server_status["status"],
       acronym: server_status["acronym"]
      }
  end

end



# %{ac: server_status["ac"],
# af: server_status["af"],
# ap: server_status["ap"],
# ach: server_status["ach"],
# apo: server_status["apo"],
# ahp: server_status["ahp"],
# a9: server_status["a9"],
# aw: server_status["aw"]}
