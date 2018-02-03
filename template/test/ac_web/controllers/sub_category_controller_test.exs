defmodule AcWeb.SubCategoryControllerTest do
  use AcWeb.ConnCase

  alias Ac.Item

  @create_attrs %{description: "some description", display_name: "some display_name", name: "some name"}
  @update_attrs %{description: "some updated description", display_name: "some updated display_name", name: "some updated name"}
  @invalid_attrs %{description: nil, display_name: nil, name: nil}

  def fixture(:sub_category) do
    {:ok, sub_category} = Item.create_sub_category(@create_attrs)
    sub_category
  end

  describe "index" do
    test "lists all sub_categories", %{conn: conn} do
      conn = get conn, sub_category_path(conn, :homepage)
      assert html_response(conn, 200) =~ "Listing Sub categories"
    end
  end

  describe "new sub_category" do
    test "renders form", %{conn: conn} do
      conn = get conn, sub_category_path(conn, :new)
      assert html_response(conn, 200) =~ "New Sub category"
    end
  end

  describe "create sub_category" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, sub_category_path(conn, :create), sub_category: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == sub_category_path(conn, :show, id)

      conn = get conn, sub_category_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Sub category"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, sub_category_path(conn, :create), sub_category: @invalid_attrs
      assert html_response(conn, 200) =~ "New Sub category"
    end
  end

  describe "edit sub_category" do
    setup [:create_sub_category]

    test "renders form for editing chosen sub_category", %{conn: conn, sub_category: sub_category} do
      conn = get conn, sub_category_path(conn, :edit, sub_category)
      assert html_response(conn, 200) =~ "Edit Sub category"
    end
  end

  describe "update sub_category" do
    setup [:create_sub_category]

    test "redirects when data is valid", %{conn: conn, sub_category: sub_category} do
      conn = put conn, sub_category_path(conn, :update, sub_category), sub_category: @update_attrs
      assert redirected_to(conn) == sub_category_path(conn, :show, sub_category)

      conn = get conn, sub_category_path(conn, :show, sub_category)
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, sub_category: sub_category} do
      conn = put conn, sub_category_path(conn, :update, sub_category), sub_category: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Sub category"
    end
  end

  describe "delete sub_category" do
    setup [:create_sub_category]

    test "deletes chosen sub_category", %{conn: conn, sub_category: sub_category} do
      conn = delete conn, sub_category_path(conn, :delete, sub_category)
      assert redirected_to(conn) == sub_category_path(conn, :homepage)
      assert_error_sent 404, fn ->
        get conn, sub_category_path(conn, :show, sub_category)
      end
    end
  end

  defp create_sub_category(_) do
    sub_category = fixture(:sub_category)
    {:ok, sub_category: sub_category}
  end
end
