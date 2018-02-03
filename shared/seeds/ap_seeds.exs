# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Ac.Repo.insert!(%Ac.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.
alias Ac.Repo
alias Ac.Account.User
alias Ac.Account.Website
alias Ac.Item.Product
alias Ac.Item.Category
alias Ac.Item.SubCategory
alias Ac.Item.Tag
alias Ac.Product.Like
alias Ac.Product.Comment
alias Ac.Blog.Post
alias Ac.Blog.Update
alias Ac.Blog.Letter

# ADMIN USER 

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:ap,  :primary_email), password: Application.get_env(:ap,  :password), password_confirmation: Application.get_env(:ap,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!


website = Ecto.Changeset.change(%Website{
    # name_lower: "awful pet", 
    # name_upper: "Awful Pet", 
    acronym: "ap"
    })

Repo.insert!(website)




# CATEGORY HOME

home = Ecto.Changeset.change(%Category{
        name: "home", 
        display_name: "Home", 
        description: "Home is where the heart is... and for your pets, home is where they love you most <3", 
        icon: "fa-home-kennel"})

Repo.insert!(home)


# OUTDOOR

outdoor = Ecto.Changeset.change(%Category{
        name: "outdoor", 
        display_name: "Outdoor", 
        description: "Some pets are outdoor pets. Except for when they're cheeky and decide to come inside. Unless if they're a cat. I have no idea what I'm talking about.", 
        icon: "fae-sun-cloud"})

Repo.insert!(outdoor)
        


# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "Ever wanted to dress your pet up in a goofy outfit? Well now you can do just that, you silly pet owner.",
        icon: "fa-fashion-collar"})

Repo.insert!(fashion)


# CATEGORY TOYS

toys = Ecto.Changeset.change(%Category{
    name: "toys",
    display_name: "Toys",
    description: "Pets love to play with their favourite toys, especially fire arms. Although we urge you not to buy your pet a gun, unless absolutely safe and necessary.",
    icon: "fa-toys-tennisball"})

Repo.insert!(toys)


# CATEGORY FOOD

food = Ecto.Changeset.change(%Category{
    name: "food",
    display_name: "Food",
    description: "I can't name a single animal that doesn't love food. So give it a lot of food until it's on a verge of exploding, and then ease off the nutrition.",
    icon: "fae-meat"})

Repo.insert!(food)