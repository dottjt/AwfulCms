defmodule AwfulWeb.WebsitesControllerTest do
  use AwfulWeb.ConnCase

  alias Awful.Website

  @create_attrs %{acronym: "some acronym", name: "some name"}
  @update_attrs %{acronym: "some updated acronym", name: "some updated name"}
  @invalid_attrs %{acronym: nil, name: nil}

  def fixture(:websites) do
    {:ok, websites} = Website.create_websites(@create_attrs)
    websites
  end

  describe "index" do
    test "lists all websites", %{conn: conn} do
      conn = get conn, websites_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Websites"
    end
  end

  describe "new websites" do
    test "renders form", %{conn: conn} do
      conn = get conn, websites_path(conn, :new)
      assert html_response(conn, 200) =~ "New Websites"
    end
  end

  describe "create websites" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, websites_path(conn, :create), websites: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == websites_path(conn, :show, id)

      conn = get conn, websites_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Websites"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, websites_path(conn, :create), websites: @invalid_attrs
      assert html_response(conn, 200) =~ "New Websites"
    end
  end

  describe "edit websites" do
    setup [:create_websites]

    test "renders form for editing chosen websites", %{conn: conn, websites: websites} do
      conn = get conn, websites_path(conn, :edit, websites)
      assert html_response(conn, 200) =~ "Edit Websites"
    end
  end

  describe "update websites" do
    setup [:create_websites]

    test "redirects when data is valid", %{conn: conn, websites: websites} do
      conn = put conn, websites_path(conn, :update, websites), websites: @update_attrs
      assert redirected_to(conn) == websites_path(conn, :show, websites)

      conn = get conn, websites_path(conn, :show, websites)
      assert html_response(conn, 200) =~ "some updated acronym"
    end

    test "renders errors when data is invalid", %{conn: conn, websites: websites} do
      conn = put conn, websites_path(conn, :update, websites), websites: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Websites"
    end
  end

  describe "delete websites" do
    setup [:create_websites]

    test "deletes chosen websites", %{conn: conn, websites: websites} do
      conn = delete conn, websites_path(conn, :delete, websites)
      assert redirected_to(conn) == websites_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, websites_path(conn, :show, websites)
      end
    end
  end

  defp create_websites(_) do
    websites = fixture(:websites)
    {:ok, websites: websites}
  end
end
