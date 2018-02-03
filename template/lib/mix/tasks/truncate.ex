defmodule Mix.Tasks.Truncate do

   use Mix.Task

   import Mix.Ecto 
   import Ecto.Query, warn: false

   @shortdoc "Description of truncate - deletes table's contents"
  
  def run(_) do 

    ensure_started(Ac.Repo, [])

    alias Ac.Account.User
    alias Ac.Account.Website

    alias Ac.Join.ProductTag
    alias Ac.Join.UserLike

    alias Ac.SubCategory
    alias Ac.Product.Like
    alias Ac.Product.Comment

    alias Ac.Blog.Post 
    alias Ac.Blog.Update 
    alias Ac.Blog.SocialMedia 


    alias Ac.Item.SubCategory

    alias Ac.Item.Product
    alias Ac.Item.Tag
    alias Ac.Item.Category
    # alias Ac.Item.Message 

    
    Ac.Repo.delete_all(User)    
    Ac.Repo.delete_all(Website)    
    
    Ac.Repo.delete_all(ProductTag)    
    Ac.Repo.delete_all(UserLike)    
    Ac.Repo.delete_all(Like)
    Ac.Repo.delete_all(Comment)    
    
    Ac.Repo.delete_all(Update)
    Ac.Repo.delete_all(SubCategory)
    Ac.Repo.delete_all(SocialMedia)

    # Ac.Repo.delete_all(Message)
    Ac.Repo.delete_all(Post)
    Ac.Repo.delete_all(Tag)    
    Ac.Repo.delete_all(Product)
    Ac.Repo.delete_all(Category)


   end

end


# mix truncate Hello
