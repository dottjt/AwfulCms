defmodule Ac.Helper do
  use Ecto.Schema
  
  import Ecto.Changeset
  import Ecto.Query, warn: false
  
  alias Ac.Repo
  
      
  def display_name_convert(display_name) do
      if display_name do
      encoding = URI.encode(display_name)
                      |> String.replace("%20", "-") 

      Regex.replace(~r/!|\$|@|#|%|^|\*|&|\^/, encoding, "")
      end
  end

  def url_convert(url) do
      if url do
      url
      |> String.split("/")
      |> Enum.at(2)
      |> check_www()
      end
  end

  def check_www(string) do
      IO.inspect string 
      if string do 
        if String.contains?(string, "www") do
          string |> String.replace("www.", "")
        else
          string
        end  
      else 
        string 
      end
  end
end