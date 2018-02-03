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

User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:af,  :primary_email), password: Application.get_env(:af,  :password), password_confirmation: Application.get_env(:af,  :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!


website = Ecto.Changeset.change(%Website{
    # name_lower: "awful fashion", 
    # name_upper: "Awful Fashion", 
    acronym: "af"
    })

Repo.insert!(website)




# CATEGORY ACCESSORIES

accessories = Ecto.Changeset.change(%Category{
    name: "accessories",
    display_name: "Accessories",
    description: "Almost everything can be accessorised, whether it be a bunch of twigs you decided to steal from a bird's nest or the used remains a milk carton, delicately arranged to resemble a hat. Welcome to Awful Fashion.",
    icon: "fae-glass"})
# fae-umbrella 
Repo.insert!(accessories)


# CATEGORY HEADWEAR 

headwear = Ecto.Changeset.change(%Category{
    name: "headwear",
    display_name: "Headwear",
    description: "There are many reasons why people like to wear hats. I mean, I'm struggling to think of a single one... but I'm sure if I spend the next 60 minutes prentending to think of an answer while I search on Google, I might just eventually get there.",
    icon: "fa-hat-hat"})

Repo.insert!(headwear)


# CATEGORY FOOTWEAR

footwear = Ecto.Changeset.change(%Category{
        name: "footwear",
        display_name: "Footwear",
        description: "Feet are easily the sexiest part of the body, especially when they're gaping out a pair of crusty thongs, soaked in the prime juice of last week's accidental splashback.",
        icon: "fa-shoes-shoes"})

Repo.insert!(footwear)


# CATEGORY DRESSES 

dresses_skirts = Ecto.Changeset.change(%Category{
    name: "dresses-skirts",
    display_name: "Dresses & Skirts",
    description: "Oh, you look so pretty in that dress! It's just a shame it's covered in peanut butter and the smell of lingering cigarette smoke. At least on bright side you're still young and hip, right?",
    icon: "fa-dress-dress"})

Repo.insert!(dresses_skirts)


# CATEGORY SHIRTS 

shirts_tops = Ecto.Changeset.change(%Category{
    name: "shirts-tops",
    display_name: "Shirts & Tops",
    description: "I'm a big fan of t-shirts. They keep me cool during summer and most of all, I get to wear a bunch of fabulous quotes some 'artist' clearly stole from a Reddit thread. How deliriously luxurious.",
    icon: "fa-shirt-shirt"})

Repo.insert!(shirts_tops)


# CATEGORY PANTS 

pants_shorts = Ecto.Changeset.change(%Category{
    name: "pants-shorts",
    display_name: "Pants & Shorts",
    description: "The ability to wear pants should be a human right. Because there's nothing worse than sitting next to a homeless man on the bus, has he airates his thighs like an anxious goose. Oh, the modern world we live in.",
    icon: "fa-pants-pants"})

Repo.insert!(pants_shorts)


# # CATEGORY JACKET 

# jumper = Ecto.Changeset.change(%Category{
#     name: "jumper",
#     display_name: "Jumper",
#     description: "The last time I wore a jumper was back in the late 70s. Smoking weed was still young and fresh, and my dad would congratulate me with a big wooly vest. I mean, jumper.",
#     icon: "fae-grav"})

# Repo.insert!(jumper)


# CATEGORY JACKET 

coats_and_jacket = Ecto.Changeset.change(%Category{
    name: "coats-and-jackets",
    display_name: "Coats & Jackets",
    description: "Jackets have been proven to keep you warm, and even warmer on hot summer days. In fact, jackets are so warm that they can actually kill you. Please don't wear one, unless threatened by warmth.",
    icon: "fa-jacket-jacket"})

Repo.insert!(coats_and_jacket)


# CATEGORY SPORTS & FUN  

sports_and_fun = Ecto.Changeset.change(%Category{
    name: "sports-and-fun",
    display_name: "Sports & Fun",
    description: "Oh look, it's a really attractive girl wearing a sports bra! Wait, what's that? She wants my phone number? Clearly, it's obviously that I'm desperate and alone. Please call me.",
    icon: "fa-fashion-sports"})
# fae-lipstick
Repo.insert!(sports_and_fun)


# CATEGORY SEXY 

sexy = Ecto.Changeset.change(%Category{
    name: "sexy",
    display_name: "Sexy",
    description: "Sexy isn't something you can wear. It's an attitude, a lot like being Mongolian or having a face-scar. Remember, lingerie doesn't make you sexy... it just, kind of does.",
    icon: "fa-sexy-two"})

Repo.insert!(sexy)


