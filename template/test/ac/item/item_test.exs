defmodule Ac.ItemTest do
  use Ac.DataCase

  alias Ac.Item

  describe "products" do
    alias Ac.Item.Product

    @valid_attrs %{cta: "some cta", display_name: "some display_name", draft: true, featured_image: "some featured_image", name: "some name", price: 120.5}
    @update_attrs %{cta: "some updated cta", display_name: "some updated display_name", draft: false, featured_image: "some updated featured_image", name: "some updated name", price: 456.7}
    @invalid_attrs %{cta: nil, display_name: nil, draft: nil, featured_image: nil, name: nil, price: nil}

    def product_fixture(attrs \\ %{}) do
      {:ok, product} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Item.create_product()

      product
    end

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Item.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Item.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      assert {:ok, %Product{} = product} = Item.create_product(@valid_attrs)
      assert product.cta == "some cta"
      assert product.display_name == "some display_name"
      assert product.draft == true
      assert product.featured_image == "some featured_image"
      assert product.name == "some name"
      assert product.price == 120.5
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Item.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()
      assert {:ok, product} = Item.update_product(product, @update_attrs)
      assert %Product{} = product
      assert product.cta == "some updated cta"
      assert product.display_name == "some updated display_name"
      assert product.draft == false
      assert product.featured_image == "some updated featured_image"
      assert product.name == "some updated name"
      assert product.price == 456.7
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Item.update_product(product, @invalid_attrs)
      assert product == Item.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Item.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Item.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Item.change_product(product)
    end
  end

  describe "categories" do
    alias Ac.Item.Category

    @valid_attrs %{description: "some description", display_name: "some display_name", name: "some name"}
    @update_attrs %{description: "some updated description", display_name: "some updated display_name", name: "some updated name"}
    @invalid_attrs %{description: nil, display_name: nil, name: nil}

    def category_fixture(attrs \\ %{}) do
      {:ok, category} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Item.create_category()

      category
    end

    test "list_categories/0 returns all categories" do
      category = category_fixture()
      assert Item.list_categories() == [category]
    end

    test "get_category!/1 returns the category with given id" do
      category = category_fixture()
      assert Item.get_category!(category.id) == category
    end

    test "create_category/1 with valid data creates a category" do
      assert {:ok, %Category{} = category} = Item.create_category(@valid_attrs)
      assert category.description == "some description"
      assert category.display_name == "some display_name"
      assert category.name == "some name"
    end

    test "create_category/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Item.create_category(@invalid_attrs)
    end

    test "update_category/2 with valid data updates the category" do
      category = category_fixture()
      assert {:ok, category} = Item.update_category(category, @update_attrs)
      assert %Category{} = category
      assert category.description == "some updated description"
      assert category.display_name == "some updated display_name"
      assert category.name == "some updated name"
    end

    test "update_category/2 with invalid data returns error changeset" do
      category = category_fixture()
      assert {:error, %Ecto.Changeset{}} = Item.update_category(category, @invalid_attrs)
      assert category == Item.get_category!(category.id)
    end

    test "delete_category/1 deletes the category" do
      category = category_fixture()
      assert {:ok, %Category{}} = Item.delete_category(category)
      assert_raise Ecto.NoResultsError, fn -> Item.get_category!(category.id) end
    end

    test "change_category/1 returns a category changeset" do
      category = category_fixture()
      assert %Ecto.Changeset{} = Item.change_category(category)
    end
  end

  describe "sub_categories" do
    alias Ac.Item.SubCategory

    @valid_attrs %{description: "some description", display_name: "some display_name", name: "some name"}
    @update_attrs %{description: "some updated description", display_name: "some updated display_name", name: "some updated name"}
    @invalid_attrs %{description: nil, display_name: nil, name: nil}

    def sub_category_fixture(attrs \\ %{}) do
      {:ok, sub_category} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Item.create_sub_category()

      sub_category
    end

    test "list_sub_categories/0 returns all sub_categories" do
      sub_category = sub_category_fixture()
      assert Item.list_sub_categories() == [sub_category]
    end

    test "get_sub_category!/1 returns the sub_category with given id" do
      sub_category = sub_category_fixture()
      assert Item.get_sub_category!(sub_category.id) == sub_category
    end

    test "create_sub_category/1 with valid data creates a sub_category" do
      assert {:ok, %SubCategory{} = sub_category} = Item.create_sub_category(@valid_attrs)
      assert sub_category.description == "some description"
      assert sub_category.display_name == "some display_name"
      assert sub_category.name == "some name"
    end

    test "create_sub_category/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Item.create_sub_category(@invalid_attrs)
    end

    test "update_sub_category/2 with valid data updates the sub_category" do
      sub_category = sub_category_fixture()
      assert {:ok, sub_category} = Item.update_sub_category(sub_category, @update_attrs)
      assert %SubCategory{} = sub_category
      assert sub_category.description == "some updated description"
      assert sub_category.display_name == "some updated display_name"
      assert sub_category.name == "some updated name"
    end

    test "update_sub_category/2 with invalid data returns error changeset" do
      sub_category = sub_category_fixture()
      assert {:error, %Ecto.Changeset{}} = Item.update_sub_category(sub_category, @invalid_attrs)
      assert sub_category == Item.get_sub_category!(sub_category.id)
    end

    test "delete_sub_category/1 deletes the sub_category" do
      sub_category = sub_category_fixture()
      assert {:ok, %SubCategory{}} = Item.delete_sub_category(sub_category)
      assert_raise Ecto.NoResultsError, fn -> Item.get_sub_category!(sub_category.id) end
    end

    test "change_sub_category/1 returns a sub_category changeset" do
      sub_category = sub_category_fixture()
      assert %Ecto.Changeset{} = Item.change_sub_category(sub_category)
    end
  end

  describe "tags" do
    alias Ac.Item.Tag

    @valid_attrs %{description: "some description", display_name: "some display_name", name: "some name"}
    @update_attrs %{description: "some updated description", display_name: "some updated display_name", name: "some updated name"}
    @invalid_attrs %{description: nil, display_name: nil, name: nil}

    def tag_fixture(attrs \\ %{}) do
      {:ok, tag} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Item.create_tag()

      tag
    end

    test "list_tags/0 returns all tags" do
      tag = tag_fixture()
      assert Item.list_tags() == [tag]
    end

    test "get_tag!/1 returns the tag with given id" do
      tag = tag_fixture()
      assert Item.get_tag!(tag.id) == tag
    end

    test "create_tag/1 with valid data creates a tag" do
      assert {:ok, %Tag{} = tag} = Item.create_tag(@valid_attrs)
      assert tag.description == "some description"
      assert tag.display_name == "some display_name"
      assert tag.name == "some name"
    end

    test "create_tag/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Item.create_tag(@invalid_attrs)
    end

    test "update_tag/2 with valid data updates the tag" do
      tag = tag_fixture()
      assert {:ok, tag} = Item.update_tag(tag, @update_attrs)
      assert %Tag{} = tag
      assert tag.description == "some updated description"
      assert tag.display_name == "some updated display_name"
      assert tag.name == "some updated name"
    end

    test "update_tag/2 with invalid data returns error changeset" do
      tag = tag_fixture()
      assert {:error, %Ecto.Changeset{}} = Item.update_tag(tag, @invalid_attrs)
      assert tag == Item.get_tag!(tag.id)
    end

    test "delete_tag/1 deletes the tag" do
      tag = tag_fixture()
      assert {:ok, %Tag{}} = Item.delete_tag(tag)
      assert_raise Ecto.NoResultsError, fn -> Item.get_tag!(tag.id) end
    end

    test "change_tag/1 returns a tag changeset" do
      tag = tag_fixture()
      assert %Ecto.Changeset{} = Item.change_tag(tag)
    end
  end
end
