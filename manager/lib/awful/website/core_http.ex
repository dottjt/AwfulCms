defmodule Awful.CoreHttp do
  @moduledoc """
  The Website context.
  """

  import Ecto.Query, warn: false
  alias Awful.Repo

  alias Awful.Core.Env
  alias Awful.Core.Config

  alias Ac.Item.Product
  alias Ac.Account.Website

  alias Ac.Blog.Post
  alias Ac.Blog.SocialMedia
  alias Ac.Blog.Update

  # CUSTOM 

  def http_get_and_message(url, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]

    case HTTPoison.get! url do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)                
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end

  def http_post_and_message(url, body, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]
    
    case HTTPoison.post! url, body do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)  
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end


  def http_put_and_message(url, body, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]
    
    case HTTPoison.put! url, body do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end

  def http_delete_and_message(url, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]
    
    case HTTPoison.delete! url do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end







  def http_get_header_and_message(url, header, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]
    
    case HTTPoison.get! url, header do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)                
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end

  def http_post_header_and_message(url, body, header, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]
    
    case HTTPoison.post! url, body, header do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)  
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end


  def http_delete_header_and_message(url, body, header, command, text, console_type) do

    option = [ ssl: [{:versions, [:'tlsv1.2']}] ]
    
    case HTTPoison.delete! url, body, header do 
      {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
          IO.puts body
          body = body 
          message = Console.generate_message(command, text, console_type)  
      {:error, %HTTPoison.Error{reason: reason}} ->
          IO.inspect reason
          message = Console.generate_message(command, reason)
    end 

    {body, message}
  end

end
