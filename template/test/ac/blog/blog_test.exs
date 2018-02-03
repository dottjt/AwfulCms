defmodule Ac.BlogTest do
  use Ac.DataCase

  alias Ac.Blog

  describe "posts" do
    alias Ac.Blog.Post

    @valid_attrs %{display_name: "some display_name", excerpt: "some excerpt", featured_image: "some featured_image", name: "some name"}
    @update_attrs %{display_name: "some updated display_name", excerpt: "some updated excerpt", featured_image: "some updated featured_image", name: "some updated name"}
    @invalid_attrs %{display_name: nil, excerpt: nil, featured_image: nil, name: nil}

    def post_fixture(attrs \\ %{}) do
      {:ok, post} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Blog.create_post()

      post
    end

    test "list_posts/0 returns all posts" do
      post = post_fixture()
      assert Blog.list_posts() == [post]
    end

    test "get_post!/1 returns the post with given id" do
      post = post_fixture()
      assert Blog.get_post!(post.id) == post
    end

    test "create_post/1 with valid data creates a post" do
      assert {:ok, %Post{} = post} = Blog.create_post(@valid_attrs)
      assert post.display_name == "some display_name"
      assert post.excerpt == "some excerpt"
      assert post.featured_image == "some featured_image"
      assert post.name == "some name"
    end

    test "create_post/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Blog.create_post(@invalid_attrs)
    end

    test "update_post/2 with valid data updates the post" do
      post = post_fixture()
      assert {:ok, post} = Blog.update_post(post, @update_attrs)
      assert %Post{} = post
      assert post.display_name == "some updated display_name"
      assert post.excerpt == "some updated excerpt"
      assert post.featured_image == "some updated featured_image"
      assert post.name == "some updated name"
    end

    test "update_post/2 with invalid data returns error changeset" do
      post = post_fixture()
      assert {:error, %Ecto.Changeset{}} = Blog.update_post(post, @invalid_attrs)
      assert post == Blog.get_post!(post.id)
    end

    test "delete_post/1 deletes the post" do
      post = post_fixture()
      assert {:ok, %Post{}} = Blog.delete_post(post)
      assert_raise Ecto.NoResultsError, fn -> Blog.get_post!(post.id) end
    end

    test "change_post/1 returns a post changeset" do
      post = post_fixture()
      assert %Ecto.Changeset{} = Blog.change_post(post)
    end
  end

  describe "updates" do
    alias Ac.Blog.Update

    @valid_attrs %{author: "some author", display_name: "some display_name", excerpt: "some excerpt", name: "some name"}
    @update_attrs %{author: "some updated author", display_name: "some updated display_name", excerpt: "some updated excerpt", name: "some updated name"}
    @invalid_attrs %{author: nil, display_name: nil, excerpt: nil, name: nil}

    def update_fixture(attrs \\ %{}) do
      {:ok, update} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Blog.create_update()

      update
    end

    test "list_updates/0 returns all updates" do
      update = update_fixture()
      assert Blog.list_updates() == [update]
    end

    test "get_update!/1 returns the update with given id" do
      update = update_fixture()
      assert Blog.get_update!(update.id) == update
    end

    test "create_update/1 with valid data creates a update" do
      assert {:ok, %Update{} = update} = Blog.create_update(@valid_attrs)
      assert update.author == "some author"
      assert update.display_name == "some display_name"
      assert update.excerpt == "some excerpt"
      assert update.name == "some name"
    end

    test "create_update/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Blog.create_update(@invalid_attrs)
    end

    test "update_update/2 with valid data updates the update" do
      update = update_fixture()
      assert {:ok, update} = Blog.update_update(update, @update_attrs)
      assert %Update{} = update
      assert update.author == "some updated author"
      assert update.display_name == "some updated display_name"
      assert update.excerpt == "some updated excerpt"
      assert update.name == "some updated name"
    end

    test "update_update/2 with invalid data returns error changeset" do
      update = update_fixture()
      assert {:error, %Ecto.Changeset{}} = Blog.update_update(update, @invalid_attrs)
      assert update == Blog.get_update!(update.id)
    end

    test "delete_update/1 deletes the update" do
      update = update_fixture()
      assert {:ok, %Update{}} = Blog.delete_update(update)
      assert_raise Ecto.NoResultsError, fn -> Blog.get_update!(update.id) end
    end

    test "change_update/1 returns a update changeset" do
      update = update_fixture()
      assert %Ecto.Changeset{} = Blog.change_update(update)
    end
  end

  describe "letters" do
    alias Ac.Blog.Letter

    @valid_attrs %{message: "some message", recipient: "some recipient", subject: "some subject"}
    @update_attrs %{message: "some updated message", recipient: "some updated recipient", subject: "some updated subject"}
    @invalid_attrs %{message: nil, recipient: nil, subject: nil}

    def letter_fixture(attrs \\ %{}) do
      {:ok, letter} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Blog.create_letter()

      letter
    end

    test "list_letters/0 returns all letters" do
      letter = letter_fixture()
      assert Blog.list_letters() == [letter]
    end

    test "get_letter!/1 returns the letter with given id" do
      letter = letter_fixture()
      assert Blog.get_letter!(letter.id) == letter
    end

    test "create_letter/1 with valid data creates a letter" do
      assert {:ok, %Letter{} = letter} = Blog.create_letter(@valid_attrs)
      assert letter.message == "some message"
      assert letter.recipient == "some recipient"
      assert letter.subject == "some subject"
    end

    test "create_letter/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Blog.create_letter(@invalid_attrs)
    end

    test "update_letter/2 with valid data updates the letter" do
      letter = letter_fixture()
      assert {:ok, letter} = Blog.update_letter(letter, @update_attrs)
      assert %Letter{} = letter
      assert letter.message == "some updated message"
      assert letter.recipient == "some updated recipient"
      assert letter.subject == "some updated subject"
    end

    test "update_letter/2 with invalid data returns error changeset" do
      letter = letter_fixture()
      assert {:error, %Ecto.Changeset{}} = Blog.update_letter(letter, @invalid_attrs)
      assert letter == Blog.get_letter!(letter.id)
    end

    test "delete_letter/1 deletes the letter" do
      letter = letter_fixture()
      assert {:ok, %Letter{}} = Blog.delete_letter(letter)
      assert_raise Ecto.NoResultsError, fn -> Blog.get_letter!(letter.id) end
    end

    test "change_letter/1 returns a letter changeset" do
      letter = letter_fixture()
      assert %Ecto.Changeset{} = Blog.change_letter(letter)
    end
  end

  describe "social_media" do
    alias Ac.Blog.SocialMedia

    @valid_attrs %{description: "some description", display_name: "some display_name", draft: true, featured_image: "some featured_image", image_caption: "some image_caption", name: "some name", social_media_type: "some social_media_type", tags: "some tags"}
    @update_attrs %{description: "some updated description", display_name: "some updated display_name", draft: false, featured_image: "some updated featured_image", image_caption: "some updated image_caption", name: "some updated name", social_media_type: "some updated social_media_type", tags: "some updated tags"}
    @invalid_attrs %{description: nil, display_name: nil, draft: nil, featured_image: nil, image_caption: nil, name: nil, social_media_type: nil, tags: nil}

    def social_media_fixture(attrs \\ %{}) do
      {:ok, social_media} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Blog.create_social_media()

      social_media
    end

    test "list_social_media/0 returns all social_media" do
      social_media = social_media_fixture()
      assert Blog.list_social_media() == [social_media]
    end

    test "get_social_media!/1 returns the social_media with given id" do
      social_media = social_media_fixture()
      assert Blog.get_social_media!(social_media.id) == social_media
    end

    test "create_social_media/1 with valid data creates a social_media" do
      assert {:ok, %SocialMedia{} = social_media} = Blog.create_social_media(@valid_attrs)
      assert social_media.description == "some description"
      assert social_media.display_name == "some display_name"
      assert social_media.draft == true
      assert social_media.featured_image == "some featured_image"
      assert social_media.image_caption == "some image_caption"
      assert social_media.name == "some name"
      assert social_media.social_media_type == "some social_media_type"
      assert social_media.tags == "some tags"
    end

    test "create_social_media/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Blog.create_social_media(@invalid_attrs)
    end

    test "update_social_media/2 with valid data updates the social_media" do
      social_media = social_media_fixture()
      assert {:ok, social_media} = Blog.update_social_media(social_media, @update_attrs)
      assert %SocialMedia{} = social_media
      assert social_media.description == "some updated description"
      assert social_media.display_name == "some updated display_name"
      assert social_media.draft == false
      assert social_media.featured_image == "some updated featured_image"
      assert social_media.image_caption == "some updated image_caption"
      assert social_media.name == "some updated name"
      assert social_media.social_media_type == "some updated social_media_type"
      assert social_media.tags == "some updated tags"
    end

    test "update_social_media/2 with invalid data returns error changeset" do
      social_media = social_media_fixture()
      assert {:error, %Ecto.Changeset{}} = Blog.update_social_media(social_media, @invalid_attrs)
      assert social_media == Blog.get_social_media!(social_media.id)
    end

    test "delete_social_media/1 deletes the social_media" do
      social_media = social_media_fixture()
      assert {:ok, %SocialMedia{}} = Blog.delete_social_media(social_media)
      assert_raise Ecto.NoResultsError, fn -> Blog.get_social_media!(social_media.id) end
    end

    test "change_social_media/1 returns a social_media changeset" do
      social_media = social_media_fixture()
      assert %Ecto.Changeset{} = Blog.change_social_media(social_media)
    end
  end
end
