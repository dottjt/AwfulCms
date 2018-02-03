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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:a9,  :primary_email), password: Application.get_env(:a9,  :password), password_confirmation: Application.get_env(:a9,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!



website = Ecto.Changeset.change(%Website{
    # name_lower: "awful 90s", 
    # name_upper: "Awful 90s", 
    acronym: "a9"
    })

Repo.insert!(website)



# CATEGORY HOME & OFFICE

home_office = Ecto.Changeset.change(%Category{
        name: "home-office", 
        display_name: "Home & Office", 
        description: "Remember TV cabinets so large that they used to take up an entire wall? Unfortunately, you now do!", 
        icon: "fa-home"})


# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "Fashion in the 90s was a bit like grabbing a leg-full of LSD and shoving it into your eyes. Both equally scary as it is exhilirating.",
        icon: "fa-shirt-shirt"})

Repo.insert!(fashion)

# CATEGORY TOYS

toys = Ecto.Changeset.change(%Category{
    name: "toys",
    display_name: "Toys",
    description: "Remember the Super Soaker? Or sitting happily with a tub of Silly Putty like an absolute goof? Well, now you can relive those memories and remind yourself of how old you truly are.",
    icon: "fa-toys-lego"})

Repo.insert!(toys)


# CATEGORY TV

tv = Ecto.Changeset.change(%Category{
    name: "tv",
    display_name: "TV",
    description: "I would argue that most people growing up in the 90s spent a large majority of it sitting in front of a TV.",
    icon: "fa-tv-tv-one"})

Repo.insert!(tv)


# CATEGORY MUSIC

music = Ecto.Changeset.change(%Category{
    name: "music",
    display_name: "Music",
    description: "Let's bring back 90s grunge or even better, the Backstreet Boys... except the Backstreet Boys have been back, releasing their latest album in 2013. Who even knew?",
    icon: "fa-music-cd"})

Repo.insert!(music)


# CATEGORY VIDEO GAMES

video_games = Ecto.Changeset.change(%Category{
    name: "video-games",
    display_name: "Video Games",
    description: "Whether you were a Playstation kid or a Nintendo 64 kid, one thing was certain - no one owned a Sega Saturn.",
    icon: "fa-90s-n64"})

Repo.insert!(video_games)




# TAG 
# tag_men = %Tag{name: "men", display_name: "Men", description: "Are you a man? If so, excellent. We created this category just for you." }
# tag_women = %Tag{name: "women", display_name: "Women", description: "Do you enjoy being a woman? If so, excellent. We created this category just for you."}
# tag_under_20 = %Tag{name: "under-twenty" , display_name: "Under $20", description: "Some cheap, awful gifts for you and your awful friends, family and whoever else." }

