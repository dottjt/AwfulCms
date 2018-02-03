defmodule Awful.Core do
  @moduledoc """
  The Website context.
  """

  import Ecto.Query, warn: false
  alias Awful.Repo

  alias Awful.Core.Env


  @doc """
  Returns the list of env.

  ## Examples

      iex> list_env()
      [%Env{}, ...]

  """
  def list_env do
    Repo.all(Env)
  end




  @doc """
  Gets a single env.

  Raises `Ecto.NoResultsError` if the Env does not exist.

  ## Examples

      iex> get_env!(123)
      %Env{}

      iex> get_env!(456)
      ** (Ecto.NoResultsError)

  """
  def get_env!(id), do: Repo.get!(Env, id)


  @doc """
  Creates a env.

  ## Examples

      iex> create_env(%{field: value})
      {:ok, %Env{}}

      iex> create_env(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_env(attrs \\ %{}) do
    %Env{}
    |> Env.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a env.

  ## Examples

      iex> update_env(env, %{field: new_value})
      {:ok, %Env{}}

      iex> update_env(env, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """



  def update_env(%Env{} = env, attrs) do
    env
    |> Env.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Env.

  ## Examples

      iex> delete_env(env)
      {:ok, %Env{}}

      iex> delete_env(env)
      {:error, %Ecto.Changeset{}}

  """
  def delete_env(%Env{} = env) do
    Repo.delete(env)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking env changes.

  ## Examples

      iex> change_env(env)
      %Ecto.Changeset{source: %Env{}}

  """
  def change_env(%Env{} = env) do
    Env.changeset(env, %{})
  end



  alias Awful.Core.Websites

  @doc """
  Returns the list of websites.

  ## Examples

      iex> list_websites()
      [%Websites{}, ...]

  """
  def list_websites do
    Repo.all(Websites)
  end

  @doc """
  Gets a single websites.

  Raises `Ecto.NoResultsError` if the Websites does not exist.

  ## Examples

      iex> get_websites!(123)
      %Websites{}

      iex> get_websites!(456)
      ** (Ecto.NoResultsError)

  """
  def get_websites!(id), do: Repo.get!(Websites, id)

  @doc """
  Creates a websites.

  ## Examples

      iex> create_websites(%{field: value})
      {:ok, %Websites{}}

      iex> create_websites(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_websites(attrs \\ %{}) do
    %Websites{}
    |> Websites.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a websites.

  ## Examples

      iex> update_websites(websites, %{field: new_value})
      {:ok, %Websites{}}

      iex> update_websites(websites, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_websites(%Websites{} = websites, attrs) do
    websites
    |> Websites.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Websites.

  ## Examples

      iex> delete_websites(websites)
      {:ok, %Websites{}}

      iex> delete_websites(websites)
      {:error, %Ecto.Changeset{}}

  """
  def delete_websites(%Websites{} = websites) do
    Repo.delete(websites)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking websites changes.

  ## Examples

      iex> change_websites(websites)
      %Ecto.Changeset{source: %Websites{}}

  """
  def change_websites(%Websites{} = websites) do
    Websites.changeset(websites, %{})
  end
end
