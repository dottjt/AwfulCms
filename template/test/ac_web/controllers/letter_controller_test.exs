defmodule AcWeb.LetterControllerTest do
  use AcWeb.ConnCase

  alias Ac.Blog

  @create_attrs %{message: "some message", recipient: "some recipient", subject: "some subject"}
  @update_attrs %{message: "some updated message", recipient: "some updated recipient", subject: "some updated subject"}
  @invalid_attrs %{message: nil, recipient: nil, subject: nil}

  def fixture(:letter) do
    {:ok, letter} = Blog.create_letter(@create_attrs)
    letter
  end

  describe "index" do
    test "lists all letters", %{conn: conn} do
      conn = get conn, letter_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Letters"
    end
  end

  describe "new letter" do
    test "renders form", %{conn: conn} do
      conn = get conn, letter_path(conn, :new)
      assert html_response(conn, 200) =~ "New Letter"
    end
  end

  describe "create letter" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, letter_path(conn, :create), letter: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == letter_path(conn, :show, id)

      conn = get conn, letter_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Letter"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, letter_path(conn, :create), letter: @invalid_attrs
      assert html_response(conn, 200) =~ "New Letter"
    end
  end

  describe "edit letter" do
    setup [:create_letter]

    test "renders form for editing chosen letter", %{conn: conn, letter: letter} do
      conn = get conn, letter_path(conn, :edit, letter)
      assert html_response(conn, 200) =~ "Edit Letter"
    end
  end

  describe "update letter" do
    setup [:create_letter]

    test "redirects when data is valid", %{conn: conn, letter: letter} do
      conn = put conn, letter_path(conn, :update, letter), letter: @update_attrs
      assert redirected_to(conn) == letter_path(conn, :show, letter)

      conn = get conn, letter_path(conn, :show, letter)
      assert html_response(conn, 200) =~ "some updated message"
    end

    test "renders errors when data is invalid", %{conn: conn, letter: letter} do
      conn = put conn, letter_path(conn, :update, letter), letter: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Letter"
    end
  end

  describe "delete letter" do
    setup [:create_letter]

    test "deletes chosen letter", %{conn: conn, letter: letter} do
      conn = delete conn, letter_path(conn, :delete, letter)
      assert redirected_to(conn) == letter_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, letter_path(conn, :show, letter)
      end
    end
  end

  defp create_letter(_) do
    letter = fixture(:letter)
    {:ok, letter: letter}
  end
end
