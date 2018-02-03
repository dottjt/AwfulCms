defmodule Awful.WebsiteTest do
  use Awful.DataCase

  alias Awful.Website

  describe "core" do
    alias Awful.Website.Core

    @valid_attrs %{display_name: "some display_name", email: "some email", name: "some name"}
    @update_attrs %{display_name: "some updated display_name", email: "some updated email", name: "some updated name"}
    @invalid_attrs %{display_name: nil, email: nil, name: nil}

    def core_fixture(attrs \\ %{}) do
      {:ok, core} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Website.create_core()

      core
    end

    test "list_core/0 returns all core" do
      core = core_fixture()
      assert Website.list_core() == [core]
    end

    test "get_core!/1 returns the core with given id" do
      core = core_fixture()
      assert Website.get_core!(core.id) == core
    end

    test "create_core/1 with valid data creates a core" do
      assert {:ok, %Core{} = core} = Website.create_core(@valid_attrs)
      assert core.display_name == "some display_name"
      assert core.email == "some email"
      assert core.name == "some name"
    end

    test "create_core/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Website.create_core(@invalid_attrs)
    end

    test "update_core/2 with valid data updates the core" do
      core = core_fixture()
      assert {:ok, core} = Website.update_core(core, @update_attrs)
      assert %Core{} = core
      assert core.display_name == "some updated display_name"
      assert core.email == "some updated email"
      assert core.name == "some updated name"
    end

    test "update_core/2 with invalid data returns error changeset" do
      core = core_fixture()
      assert {:error, %Ecto.Changeset{}} = Website.update_core(core, @invalid_attrs)
      assert core == Website.get_core!(core.id)
    end

    test "delete_core/1 deletes the core" do
      core = core_fixture()
      assert {:ok, %Core{}} = Website.delete_core(core)
      assert_raise Ecto.NoResultsError, fn -> Website.get_core!(core.id) end
    end

    test "change_core/1 returns a core changeset" do
      core = core_fixture()
      assert %Ecto.Changeset{} = Website.change_core(core)
    end
  end

  describe "env" do
    alias Awful.Website.Env

    @valid_attrs %{name: "some name", type: "some type", value: "some value"}
    @update_attrs %{name: "some updated name", type: "some updated type", value: "some updated value"}
    @invalid_attrs %{name: nil, type: nil, value: nil}

    def env_fixture(attrs \\ %{}) do
      {:ok, env} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Website.create_env()

      env
    end

    test "list_env/0 returns all env" do
      env = env_fixture()
      assert Website.list_env() == [env]
    end

    test "get_env!/1 returns the env with given id" do
      env = env_fixture()
      assert Website.get_env!(env.id) == env
    end

    test "create_env/1 with valid data creates a env" do
      assert {:ok, %Env{} = env} = Website.create_env(@valid_attrs)
      assert env.name == "some name"
      assert env.type == "some type"
      assert env.value == "some value"
    end

    test "create_env/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Website.create_env(@invalid_attrs)
    end

    test "update_env/2 with valid data updates the env" do
      env = env_fixture()
      assert {:ok, env} = Website.update_env(env, @update_attrs)
      assert %Env{} = env
      assert env.name == "some updated name"
      assert env.type == "some updated type"
      assert env.value == "some updated value"
    end

    test "update_env/2 with invalid data returns error changeset" do
      env = env_fixture()
      assert {:error, %Ecto.Changeset{}} = Website.update_env(env, @invalid_attrs)
      assert env == Website.get_env!(env.id)
    end

    test "delete_env/1 deletes the env" do
      env = env_fixture()
      assert {:ok, %Env{}} = Website.delete_env(env)
      assert_raise Ecto.NoResultsError, fn -> Website.get_env!(env.id) end
    end

    test "change_env/1 returns a env changeset" do
      env = env_fixture()
      assert %Ecto.Changeset{} = Website.change_env(env)
    end
  end

  describe "config" do
    alias Awful.Website.Config

    @valid_attrs %{name: "some name", value: "some value"}
    @update_attrs %{name: "some updated name", value: "some updated value"}
    @invalid_attrs %{name: nil, value: nil}

    def config_fixture(attrs \\ %{}) do
      {:ok, config} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Website.create_config()

      config
    end

    test "list_config/0 returns all config" do
      config = config_fixture()
      assert Website.list_config() == [config]
    end

    test "get_config!/1 returns the config with given id" do
      config = config_fixture()
      assert Website.get_config!(config.id) == config
    end

    test "create_config/1 with valid data creates a config" do
      assert {:ok, %Config{} = config} = Website.create_config(@valid_attrs)
      assert config.name == "some name"
      assert config.value == "some value"
    end

    test "create_config/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Website.create_config(@invalid_attrs)
    end

    test "update_config/2 with valid data updates the config" do
      config = config_fixture()
      assert {:ok, config} = Website.update_config(config, @update_attrs)
      assert %Config{} = config
      assert config.name == "some updated name"
      assert config.value == "some updated value"
    end

    test "update_config/2 with invalid data returns error changeset" do
      config = config_fixture()
      assert {:error, %Ecto.Changeset{}} = Website.update_config(config, @invalid_attrs)
      assert config == Website.get_config!(config.id)
    end

    test "delete_config/1 deletes the config" do
      config = config_fixture()
      assert {:ok, %Config{}} = Website.delete_config(config)
      assert_raise Ecto.NoResultsError, fn -> Website.get_config!(config.id) end
    end

    test "change_config/1 returns a config changeset" do
      config = config_fixture()
      assert %Ecto.Changeset{} = Website.change_config(config)
    end
  end

  describe "websites" do
    alias Awful.Website.Websites

    @valid_attrs %{acronym: "some acronym", name: "some name"}
    @update_attrs %{acronym: "some updated acronym", name: "some updated name"}
    @invalid_attrs %{acronym: nil, name: nil}

    def websites_fixture(attrs \\ %{}) do
      {:ok, websites} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Website.create_websites()

      websites
    end

    test "list_websites/0 returns all websites" do
      websites = websites_fixture()
      assert Website.list_websites() == [websites]
    end

    test "get_websites!/1 returns the websites with given id" do
      websites = websites_fixture()
      assert Website.get_websites!(websites.id) == websites
    end

    test "create_websites/1 with valid data creates a websites" do
      assert {:ok, %Websites{} = websites} = Website.create_websites(@valid_attrs)
      assert websites.acronym == "some acronym"
      assert websites.name == "some name"
    end

    test "create_websites/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Website.create_websites(@invalid_attrs)
    end

    test "update_websites/2 with valid data updates the websites" do
      websites = websites_fixture()
      assert {:ok, websites} = Website.update_websites(websites, @update_attrs)
      assert %Websites{} = websites
      assert websites.acronym == "some updated acronym"
      assert websites.name == "some updated name"
    end

    test "update_websites/2 with invalid data returns error changeset" do
      websites = websites_fixture()
      assert {:error, %Ecto.Changeset{}} = Website.update_websites(websites, @invalid_attrs)
      assert websites == Website.get_websites!(websites.id)
    end

    test "delete_websites/1 deletes the websites" do
      websites = websites_fixture()
      assert {:ok, %Websites{}} = Website.delete_websites(websites)
      assert_raise Ecto.NoResultsError, fn -> Website.get_websites!(websites.id) end
    end

    test "change_websites/1 returns a websites changeset" do
      websites = websites_fixture()
      assert %Ecto.Changeset{} = Website.change_websites(websites)
    end
  end
end
