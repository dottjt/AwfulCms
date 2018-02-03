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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:apo,  :primary_email), password: Application.get_env(:apo,  :password), password_confirmation: Application.get_env(:apo,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!


website = Ecto.Changeset.change(%Website{
    # name_lower: "awful pokemon", 
    # name_upper: "Awful Pokemon", 
    acronym: "apo"
    })

Repo.insert!(website)



# CATEGORY HOME

home_office = Ecto.Changeset.change(%Category{
        name: "home-office", 
        display_name: "Home & Office", 
        description: "Decorate your home or office with all 151 original Pokemon and you'll be blessed... as the people in the your life question the validity of your well-being.", 
        icon: "fa-home"})

Repo.insert!(home_office)


# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "Whether you choose to wear a Pikachu onesie or your very favourite Pokemon backpack, it's important to stay fashionable with your favourite Pokemon gear!",
        icon: "fae-comb"})

Repo.insert!(fashion)


# CATEGORY TOYS

toys = Ecto.Changeset.change(%Category{
    name: "toys",
    display_name: "Toys",
    description: "Do you absolutely adore Pokemon figurines? I know I do, which is why Awful Pokemon features a huge range of toys to keep you preoccupied.",
    icon: "fa-toys-pokeball-two"})

Repo.insert!(toys)


# CATEGORY TV

tv = Ecto.Changeset.change(%Category{
    name: "tv",
    display_name: "TV",
    description: "If you haven't watched Pokemon you have some very serious issues. Most likely life threatening, although my doctor says it's not a season or two can't fix.",
    icon: "fa-tv-tv-one"})

Repo.insert!(tv)


# CATEGORY VIDEO GAMES

video_games = Ecto.Changeset.change(%Category{
    name: "video-games",
    display_name: "Video Games",
    description: "Obviously Pokemon Red and Blue is where it all started, but now with over 100 games spanning more than a dozen consoles - you'll have some catching up todo before you can call yourself a true poke-master.",
    icon: "fa-videogames-gameboy"})

Repo.insert!(video_games)


# CATEGORY COLLECTION

collection = Ecto.Changeset.change(%Category{
    name: "collection",
    display_name: "Collection",
    description: "It is absolutely imperative that you catch em' all. Seriously, otherwise all your loved ones will judge you and hate you for the rest of your life.",
    icon: "fa-trophy"})

Repo.insert!(collection)