defmodule AcWeb.UpdateControllerTest do
  use AcWeb.ConnCase

  alias Ac.Blog

  @create_attrs %{author: "some author", display_name: "some display_name", excerpt: "some excerpt", name: "some name"}
  @update_attrs %{author: "some updated author", display_name: "some updated display_name", excerpt: "some updated excerpt", name: "some updated name"}
  @invalid_attrs %{author: nil, display_name: nil, excerpt: nil, name: nil}

  def fixture(:update) do
    {:ok, update} = Blog.create_update(@create_attrs)
    update
  end

  describe "index" do
    test "lists all updates", %{conn: conn} do
      conn = get conn, update_path(conn, :homepage)
      assert html_response(conn, 200) =~ "Listing Updates"
    end
  end

  describe "new update" do
    test "renders form", %{conn: conn} do
      conn = get conn, update_path(conn, :new)
      assert html_response(conn, 200) =~ "New Update"
    end
  end

  describe "create update" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, update_path(conn, :create), update: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == update_path(conn, :show, id)

      conn = get conn, update_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Update"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, update_path(conn, :create), update: @invalid_attrs
      assert html_response(conn, 200) =~ "New Update"
    end
  end

  describe "edit update" do
    setup [:create_update]

    test "renders form for editing chosen update", %{conn: conn, update: update} do
      conn = get conn, update_path(conn, :edit, update)
      assert html_response(conn, 200) =~ "Edit Update"
    end
  end

  describe "update update" do
    setup [:create_update]

    test "redirects when data is valid", %{conn: conn, update: update} do
      conn = put conn, update_path(conn, :update, update), update: @update_attrs
      assert redirected_to(conn) == update_path(conn, :show, update)

      conn = get conn, update_path(conn, :show, update)
      assert html_response(conn, 200) =~ "some updated author"
    end

    test "renders errors when data is invalid", %{conn: conn, update: update} do
      conn = put conn, update_path(conn, :update, update), update: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Update"
    end
  end

  describe "delete update" do
    setup [:create_update]

    test "deletes chosen update", %{conn: conn, update: update} do
      conn = delete conn, update_path(conn, :delete, update)
      assert redirected_to(conn) == update_path(conn, :homepage)
      assert_error_sent 404, fn ->
        get conn, update_path(conn, :show, update)
      end
    end
  end

  defp create_update(_) do
    update = fixture(:update)
    {:ok, update: update}
  end
end
