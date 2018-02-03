defmodule Awful.Console do
  @moduledoc """
  The Console context.
  """

  use Timex 

  import Ecto.Query, warn: false
  alias Awful.Repo

  alias Awful.Console.Message

  @doc """
  Returns the list of messages.

  ## Examples

      iex> list_messages()
      [%Message{}, ...]

  """
  def list_messages do
    Repo.all(Message)
  end

  def list_messages_40 do
    Repo.all(from m in Message, order_by: [desc: m.inserted_at], limit: 40)
      |> Enum.map(fn(message) ->

        strftime_str = Timex.format!(message.inserted_at, "%y-%m-%d %H:%M", :strftime) # "%Y-%m-%d %H:%M:%S"

          Map.put(message, :inserted_at, strftime_str)

      end)
  end

  @doc """
  Gets a single message.

  Raises `Ecto.NoResultsError` if the Message does not exist.

  ## Examples

      iex> get_message!(123)
      %Message{}

      iex> get_message!(456)
      ** (Ecto.NoResultsError)

  """
  def get_message!(id), do: Repo.get!(Message, id)


  @doc """
  Creates a message.

  ## Examples

      iex> create_message(%{field: value})
      {:ok, %Message{}}

      iex> create_message(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_message(attrs \\ %{}) do
    %Message{}
    |> Message.changeset(attrs)
    |> Repo.insert()
  end


  def generate_message(command, text, console_type) do
    message = %{
      command: command,
      text: text,
      console_type: console_type
    }
    
    generated_message = 
        %Message{}
        |> Message.changeset(message)
        |> Repo.insert()
    

    case generated_message do 
      {:ok, message} ->
        
        datetime = Timex.now
        strftime_str = Timex.format!(datetime, "%y-%m-%d %H:%M", :strftime) # "%Y-%m-%d %H:%M:%S"

        Map.put(message, :inserted_at, strftime_str)
        
      {:error, error} ->
        error
    end 
        
  end

  @doc """
  Updates a message.

  ## Examples

      iex> update_message(message, %{field: new_value})
      {:ok, %Message{}}

      iex> update_message(message, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_message(%Message{} = message, attrs) do
    message
    |> Message.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Message.

  ## Examples

      iex> delete_message(message)
      {:ok, %Message{}}

      iex> delete_message(message)
      {:error, %Ecto.Changeset{}}

  """
  def delete_message(%Message{} = message) do
    Repo.delete(message)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking message changes.

  ## Examples

      iex> change_message(message)
      %Ecto.Changeset{source: %Message{}}

  """
  def change_message(%Message{} = message) do
    Message.changeset(message, %{})
  end
end
