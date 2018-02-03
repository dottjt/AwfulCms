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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:ac,  :primary_email), password: Application.get_env(:ac,  :password), password_confirmation: Application.get_env(:ac,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!

website = Ecto.Changeset.change(%Website{
    # name_lower: "awful christmas", 
    # name_upper: "Awful Christmas", 
    acronym: "ac"
    })

Repo.insert!(website)



# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
        name: "fashion",
        display_name: "Fashion",
        description: "Everyone's gotta wear something. Which is why it's in your absolute best interest to embarass your loved ones and make them look as awful as possible. Did someone order a pink leopard-pattern leotard?",
        icon: "fae-shirt"})

Repo.insert!(fashion)


# AWESOME DORK

awesome_dork = Ecto.Changeset.change(%Category{
        name: "awesome-dork",
        display_name: "Awesome Dork",
        description: "Geeky gifts are the best gifts. Even the coolest of hipsters can be tragic Star Wars fans at heart. Which is why you're going to ruin their fantasy by getting them something Star Trek related instead.", 
        icon: "fae-planet"})

Repo.insert!(awesome_dork)
        

# CATEGORY HOME & OFFICE

home_office = Ecto.Changeset.change(%Category{
        name: "home-office", 
        display_name: "Home & Office", 
        description: "Whether you're lounging about at home or pulling a few nasty pranks in the shared collective hell-hole that we recognise as 'the office', be reminded to make it all so-much worse with a handful of awful gifts.", 
        icon: "fa-fort-awesome"})


# CATEGORY SPORTS & OUTDOORS

sports_outdoors = Ecto.Changeset.change(%Category{
        name: "sports-outdoors", 
        display_name: "Sports & Outdoors", 
        description: "Sports can be fun, especially outdoor sports. I completely forget the point of this conversation, although you too can relive your awful childhood sporting moments and outdoor moments with... I don't know.", 
        icon: "fae-sun-cloud"})

Repo.insert!(sports_outdoors)
        

# CATEGORY FOOD

food = Ecto.Changeset.change(%Category{
        name: "food", 
        display_name: "Food", 
        description: "There's nothing greater than sinking your teeth into a hearty burger, packed full of saturated fats and public health misnomers. Of course, you're awful which is why you're going to eat a cabbage instead.", 
        icon: "fae-pizza"})

Repo.insert!(food)


# CATEGORY WTF

wtf = Ecto.Changeset.change(%Category{
        name: "wtf", 
        display_name: "WTF", 
        description: "No one really knows what this category is about. And even if I did, this description would probably just say 'OMG' or 'WOAH' to compliment the inherent childishness that is your personality.", 
        icon: "fa-bomb"})

Repo.insert!(wtf)



# tag_men = %Tag{name: "men", display_name: "Men", description: "Are you a man? If so, excellent. We created this tag just for you." }
# tag_women = %Tag{name: "women", display_name: "Women", description: "Do you enjoy being a woman? If so, excellent. We created this tag just for you."}
# tag_under_20 = %Tag{name: "under-twenty" , display_name: "Under $20", description: "Some cheap, awful gifts for you and your awful friends, family and whoever else." }

# Repo.insert!(tag_men)
# Repo.insert!(tag_women)
