defmodule AwfulWeb.EnvControllerTest do
  use AwfulWeb.ConnCase

  alias Awful.Website

  @create_attrs %{name: "some name", type: "some type", value: "some value"}
  @update_attrs %{name: "some updated name", type: "some updated type", value: "some updated value"}
  @invalid_attrs %{name: nil, type: nil, value: nil}

  def fixture(:env) do
    {:ok, env} = Website.create_env(@create_attrs)
    env
  end

  describe "index" do
    test "lists all env", %{conn: conn} do
      conn = get conn, env_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Env"
    end
  end

  describe "new env" do
    test "renders form", %{conn: conn} do
      conn = get conn, env_path(conn, :new)
      assert html_response(conn, 200) =~ "New Env"
    end
  end

  describe "create env" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, env_path(conn, :create), env: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == env_path(conn, :show, id)

      conn = get conn, env_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Env"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, env_path(conn, :create), env: @invalid_attrs
      assert html_response(conn, 200) =~ "New Env"
    end
  end

  describe "edit env" do
    setup [:create_env]

    test "renders form for editing chosen env", %{conn: conn, env: env} do
      conn = get conn, env_path(conn, :edit, env)
      assert html_response(conn, 200) =~ "Edit Env"
    end
  end

  describe "update env" do
    setup [:create_env]

    test "redirects when data is valid", %{conn: conn, env: env} do
      conn = put conn, env_path(conn, :update, env), env: @update_attrs
      assert redirected_to(conn) == env_path(conn, :show, env)

      conn = get conn, env_path(conn, :show, env)
      assert html_response(conn, 200) =~ "some updated name"
    end

    test "renders errors when data is invalid", %{conn: conn, env: env} do
      conn = put conn, env_path(conn, :update, env), env: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Env"
    end
  end

  describe "delete env" do
    setup [:create_env]

    test "deletes chosen env", %{conn: conn, env: env} do
      conn = delete conn, env_path(conn, :delete, env)
      assert redirected_to(conn) == env_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, env_path(conn, :show, env)
      end
    end
  end

  defp create_env(_) do
    env = fixture(:env)
    {:ok, env: env}
  end
end
