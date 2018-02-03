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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:aw,  :primary_email), password: Application.get_env(:aw,  :password), password_confirmation: Application.get_env(:aw,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!


website = Ecto.Changeset.change(%Website{
    # name_lower: "awful wedding", 
    # name_upper: "Awful Wedding", 
    acronym: "aw"
    })

Repo.insert!(website)




# CATEGORY HOME

home_office = Ecto.Changeset.change(%Category{
        name: "home-office",
        display_name: "Home & Office",
        description: "There's nothing quite like an awful reminder that you're married, than a bunch of fake divorce papers on the dining table to lighten the mood at dinner. Go on. It'll be hilarious, until you're slapped in the face.",
        icon: "fae-sofa"})

Repo.insert!(home_office)


# CATEGORY OUTDOOR SPORTS

sports_outdoor = Ecto.Changeset.change(%Category{
        name: "sports-outdoors",
        display_name: "Sports & Outdoors",
        description: "Want a perfectly inappropiately wedding gift? Why not buy them a jetski or better yet, football themed wedding paraphernalia. A wedding-themed garden box? Surely it exists out there somewhere.",
        icon: "fae-sun-cloud"})

Repo.insert!(sports_outdoor)
        

# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "There's nothing worse than spilling red wine on your perfectly clean white shirt, only to realise that you're actually the bride and you shouldn't be wear a white shirt. Oh wait, where is my wedding dress?",
        icon: "fae-comb"})

Repo.insert!(fashion)


# CATEGORY BEAUTY

beauty = Ecto.Changeset.change(%Category{
    name: "beauty",
    display_name: "Beauty",
    description: "It's imperative that everyone look their best at a wedding, which is why it's in your absolute best interest to make everyone look their worst, so you can feel as if you're in-control.",
    icon: "fae-makeup-brushes"})

Repo.insert!(beauty)


# CATEGORY FOOD

food = Ecto.Changeset.change(%Category{
    name: "food",
    display_name: "Food",
    description: "Food is awesome. And what better food than at a wedding? Well, you can remind the bride that how amazing their food was, with utter crap you've managed to scour from the internet.",
    icon: "fae-pizza"})

Repo.insert!(food)


# CATEGORY WTF

wtf = Ecto.Changeset.change(%Category{
    name: "wtf",
    display_name: "WTF",
    description: "This is what you get them when you're absolutely bat-shit insane. Although remember to go easy. Especially on your own wallet.",
    icon: "fa-bomb"})

Repo.insert!(wtf)