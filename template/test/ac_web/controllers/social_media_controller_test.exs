defmodule AcWeb.SocialMediaControllerTest do
  use AcWeb.ConnCase

  alias Ac.Blog

  @create_attrs %{description: "some description", display_name: "some display_name", draft: true, featured_image: "some featured_image", image_caption: "some image_caption", name: "some name", social_media_type: "some social_media_type", tags: "some tags"}
  @update_attrs %{description: "some updated description", display_name: "some updated display_name", draft: false, featured_image: "some updated featured_image", image_caption: "some updated image_caption", name: "some updated name", social_media_type: "some updated social_media_type", tags: "some updated tags"}
  @invalid_attrs %{description: nil, display_name: nil, draft: nil, featured_image: nil, image_caption: nil, name: nil, social_media_type: nil, tags: nil}

  def fixture(:social_media) do
    {:ok, social_media} = Blog.create_social_media(@create_attrs)
    social_media
  end

  describe "index" do
    test "lists all social_media", %{conn: conn} do
      conn = get conn, social_media_path(conn, :index)
      assert html_response(conn, 200) =~ "Listing Social media"
    end
  end

  describe "new social_media" do
    test "renders form", %{conn: conn} do
      conn = get conn, social_media_path(conn, :new)
      assert html_response(conn, 200) =~ "New Social media"
    end
  end

  describe "create social_media" do
    test "redirects to show when data is valid", %{conn: conn} do
      conn = post conn, social_media_path(conn, :create), social_media: @create_attrs

      assert %{id: id} = redirected_params(conn)
      assert redirected_to(conn) == social_media_path(conn, :show, id)

      conn = get conn, social_media_path(conn, :show, id)
      assert html_response(conn, 200) =~ "Show Social media"
    end

    test "renders errors when data is invalid", %{conn: conn} do
      conn = post conn, social_media_path(conn, :create), social_media: @invalid_attrs
      assert html_response(conn, 200) =~ "New Social media"
    end
  end

  describe "edit social_media" do
    setup [:create_social_media]

    test "renders form for editing chosen social_media", %{conn: conn, social_media: social_media} do
      conn = get conn, social_media_path(conn, :edit, social_media)
      assert html_response(conn, 200) =~ "Edit Social media"
    end
  end

  describe "update social_media" do
    setup [:create_social_media]

    test "redirects when data is valid", %{conn: conn, social_media: social_media} do
      conn = put conn, social_media_path(conn, :update, social_media), social_media: @update_attrs
      assert redirected_to(conn) == social_media_path(conn, :show, social_media)

      conn = get conn, social_media_path(conn, :show, social_media)
      assert html_response(conn, 200) =~ "some updated description"
    end

    test "renders errors when data is invalid", %{conn: conn, social_media: social_media} do
      conn = put conn, social_media_path(conn, :update, social_media), social_media: @invalid_attrs
      assert html_response(conn, 200) =~ "Edit Social media"
    end
  end

  describe "delete social_media" do
    setup [:create_social_media]

    test "deletes chosen social_media", %{conn: conn, social_media: social_media} do
      conn = delete conn, social_media_path(conn, :delete, social_media)
      assert redirected_to(conn) == social_media_path(conn, :index)
      assert_error_sent 404, fn ->
        get conn, social_media_path(conn, :show, social_media)
      end
    end
  end

  defp create_social_media(_) do
    social_media = fixture(:social_media)
    {:ok, social_media: social_media}
  end
end
