defmodule Awful.ConsoleTest do
  use Awful.DataCase

  alias Awful.Console

  describe "messages" do
    alias Awful.Console.Message

    @valid_attrs %{command: "some command", text: "some text"}
    @update_attrs %{command: "some updated command", text: "some updated text"}
    @invalid_attrs %{command: nil, text: nil}

    def message_fixture(attrs \\ %{}) do
      {:ok, message} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Console.create_message()

      message
    end

    test "list_messages/0 returns all messages" do
      message = message_fixture()
      assert Console.list_messages() == [message]
    end

    test "get_message!/1 returns the message with given id" do
      message = message_fixture()
      assert Console.get_message!(message.id) == message
    end

    test "create_message/1 with valid data creates a message" do
      assert {:ok, %Message{} = message} = Console.create_message(@valid_attrs)
      assert message.command == "some command"
      assert message.text == "some text"
    end

    test "create_message/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Console.create_message(@invalid_attrs)
    end

    test "update_message/2 with valid data updates the message" do
      message = message_fixture()
      assert {:ok, message} = Console.update_message(message, @update_attrs)
      assert %Message{} = message
      assert message.command == "some updated command"
      assert message.text == "some updated text"
    end

    test "update_message/2 with invalid data returns error changeset" do
      message = message_fixture()
      assert {:error, %Ecto.Changeset{}} = Console.update_message(message, @invalid_attrs)
      assert message == Console.get_message!(message.id)
    end

    test "delete_message/1 deletes the message" do
      message = message_fixture()
      assert {:ok, %Message{}} = Console.delete_message(message)
      assert_raise Ecto.NoResultsError, fn -> Console.get_message!(message.id) end
    end

    test "change_message/1 returns a message changeset" do
      message = message_fixture()
      assert %Ecto.Changeset{} = Console.change_message(message)
    end
  end
end
