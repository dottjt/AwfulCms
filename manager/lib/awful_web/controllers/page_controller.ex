defmodule AwfulWeb.PageController do
  use AwfulWeb, :controller

  def index(conn, _params) do
    System.cmd "whoami", []

    render conn, "index.html"
  end

  def admin(conn, _params) do
    render conn, "admin.html", layout: {AwfulWeb.LayoutView, "layout_admin.html"}
  end

end
