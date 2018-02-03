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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:ach,  :primary_email), password: Application.get_env(:ach,  :password), password_confirmation: Application.get_env(:ach,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!


website = Ecto.Changeset.change(%Website{
    # name_lower: "awful child", 
    # name_upper: "Awful Child", 
    acronym: "ach"
    })

Repo.insert!(website)




# CATEGORY HOME

home = Ecto.Changeset.change(%Category{
        name: "home", 
        display_name: "Home", 
        description: "Brighten up their room with a splash of paint or a life-size sticker decal of Donald Trump himself.",
        icon: "fa-home"})

Repo.insert!(home)


# CATEGORY OUTDOOR SPORTS

sports_outdoor = Ecto.Changeset.change(%Category{
        name: "sports-outdoors",
        display_name: "Sports & Outdoors",
        description: "Often the only way to force a child to play outside is with something fun, or perhaps even as punishment. Here at Awful Child we recommend both approaches!",
        icon: "fae-sun-cloud"})

Repo.insert!(sports_outdoor)
        

# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "Childen don't deserve to look adorable. That's why we offer a range of used potatos acks and cardboard boxes instead.",
        icon: "fa-fashion-piratehat"})

Repo.insert!(fashion)


# CATEGORY TOYS

toys = Ecto.Changeset.change(%Category{
    name: "toys",
    display_name: "Toys",
    description: "Don't they have enough toys already? Well, now they can have even more, and at significantly lesser quality.",
    icon: "fa-toys-gun"})

Repo.insert!(toys)


# CATEGORY FOOD

food = Ecto.Changeset.change(%Category{
    name: "food",
    display_name: "Food",
    description: "Eating is an essential function. Please feed your children or they might perish.",
    icon: "fa-food-lollipop"})

Repo.insert!(food)


# CATEGORY TV

tv = Ecto.Changeset.change(%Category{
    name: "tv",
    display_name: "TV",
    description: "I haven't met a child that doesn't love watching TV. Then again, the last time I met a child was back in the 90s.",
    icon: "fa-tv-tv-one"})

Repo.insert!(tv)


# CATEGORY VIDEO GAMES

video_games = Ecto.Changeset.change(%Category{
    name: "video-games",
    display_name: "Video Games",
    description: "All it takes is one controller, one videogame console and one hour of their time to become permanently addicted to the thrill that is controlled virtual reality.",
    icon: "fa-videogames-controller"})

Repo.insert!(video_games)
