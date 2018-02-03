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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:ahp,  :primary_email), password: Application.get_env(:ahp,  :password), password_confirmation: Application.get_env(:ahp,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!


website = Ecto.Changeset.change(%Website{
    # name_lower: "awful harry potter", 
    # name_upper: "Awful Harry Potter", 
    acronym: "ahp"
    })

Repo.insert!(website)



# CATEGORY HOME

home_office = Ecto.Changeset.change(%Category{
        name: "home-office", 
        display_name: "Home & Office", 
        description: "You're not a true Harry Potter fan unless if you have a life-size replication of Hogwarts itself within your living room. Thankfully, we can sort you out.", 
        icon: "fa-home-shield"})

Repo.insert!(home_office)


# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "Ever wanted to look like a wizard? Of course you do! After all, as an actual real-life wizard you're going to need all the magic spells and over-sized velvet gowns you can get.",
        icon: "fa-fashion-glasses"})

Repo.insert!(fashion)


# CATEGORY TOYS

toys = Ecto.Changeset.change(%Category{
    name: "toys",
    display_name: "Toys",
    description: "While that plastic wand you recieved for your tenth birthday wasn't exactly what you had in mind, there's nothing stopping you from buying a bigger, better, more expensive one now that you're an adult.",
    icon: "fa-toys-snitch"})

Repo.insert!(toys)


# CATEGORY TV

tv = Ecto.Changeset.change(%Category{
    name: "tv",
    display_name: "TV",
    description: "While Harry Potter technically wasn't a TV show, we figured you wouldn't notice that this category was called 'TV' and would anatomically relate it to the Harry Potter movies instead.",
    icon: "fa-tv-tv-one"})

Repo.insert!(tv)


# CATEGORY VIDEO GAMES

video_games = Ecto.Changeset.change(%Category{
    name: "video-games",
    display_name: "Video Games",
    description: "If you haven't played Harry Potter and the Chamber of Secrets on Gameboy Colour, then you should leave this website and never speak to me again.",
    icon: "fa-90s-n64"})

Repo.insert!(video_games)


# CATEGORY COLLECTION

collection = Ecto.Changeset.change(%Category{
    name: "collection",
    display_name: "Collection",
    description: "Humans like collecting things... and that was the sole reason why J.K. Rowling created Harry Potter.",
    icon: "fa-trophy"})

Repo.insert!(collection)