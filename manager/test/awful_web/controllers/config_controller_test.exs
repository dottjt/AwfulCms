defmodule AwfulWeb.ConfigControllerTest do
  use AwfulWeb.ConnCase

  alias Awful.Website

  @create_attrs %{name: "some name", value: "some value"}
  @update_attrs %{name: "some updated name", value: "some updated value"}
  @invalid_attrs %{name: nil, value: nil}

  def fixture(:config) do
    {:ok, config} = Website.create_config(@create_attrs)
    config
  end

  describe "index" do
    test "lists all config", %{conn: conn} do
      conn = get conn, config_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Config"
    end
  end

  describe "new config" do
    test "renders form", %{conn: conn} do
      conn = get conn, config_path(conn, :new)
      assert html_response(conn, 200) =~ "New Config"
    end
  end

  describe "create config" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, config_path(conn, :create), config: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == config_path(conn, :show, id)

      conn = get conn, config_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Config"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, config_path(conn, :create), config: @invalid_attrs
      assert html_response(conn, 200) =~ "New Config"
    end
  end

  describe "edit config" do
    setup [:create_config]

    test "renders form for editing chosen config", %{conn: conn, config: config} do
      conn = get conn, config_path(conn, :edit, config)
      assert html_response(conn, 200) =~ "Edit Config"
    end
  end

  describe "update config" do
    setup [:create_config]

    test "redirects when data is valid", %{conn: conn, config: config} do
      conn = put conn, config_path(conn, :update, config), config: @update_attrs
      assert redirected_to(conn) == config_path(conn, :show, config)

      conn = get conn, config_path(conn, :show, config)
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, config: config} do
      conn = put conn, config_path(conn, :update, config), config: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Config"
    end
  end

  describe "delete config" do
    setup [:create_config]

    test "deletes chosen config", %{conn: conn, config: config} do
      conn = delete conn, config_path(conn, :delete, config)
      assert redirected_to(conn) == config_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, config_path(conn, :show, config)
      end
    end
  end

  defp create_config(_) do
    config = fixture(:config)
    {:ok, config: config}
  end
end
