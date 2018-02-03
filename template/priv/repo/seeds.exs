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

use Timex 

# %Post{title: "Hello", body: "World"}
# |> Ecto.Changeset.change()
# |> Ecto.Changeset.put_assoc(:comments, [%Comment{body: "Excellent!"}])
# |> Repo.insert!()


# WEBSITE

website = %Website{domain: Application.get_env(:ac, :website_domain), acronym: Application.get_env(:ac, :website_acronym), name: Application.get_env(:ac, :website_name), name_lower: Application.get_env(:ac, :website_name_lower)}

Repo.insert!(website)


User.changeset(%User{}, %{name: "Julius Reade", email: Application.get_env(:ac, :primary_email), password: Application.get_env(:ac, :password), password_confirmation: Application.get_env(:ac, :password), admin: true})
|> Ac.Repo.insert!
|> Coherence.ControllerHelpers.confirm!

# USER

# Repo.insert!(%User{
#     name: "Julius Reade",
#     # display_name: "Julius Reade",
#     email: "julius_dott@hotmail.com",
#     password: "hellothere",
#     password_confirmation: "hellothere",
#     # password_hash: "blahblahblah",
#     # is_admin: true,
#     product_likes: [
#         like_one,
#         like_two,
#         like_three,
#         like_four,
#         like_five,
#         like_six,
#         like_seven
#     ],
#     product_comments: [
#         comment_one,
#         comment_two,
#         comment_three
#     ]
# })


today = Timex.today
tomorrow = ~D[2017-12-12]


# LIKES
like_one = %Like{total: 9}
like_two = %Like{total: 93}
like_three = %Like{total: 339}
like_four = %Like{total: 239}
like_five = %Like{total: 29}
like_six = %Like{total: 96}
like_seven = %Like{total: 39}


# COMMENTS
comment_one = %Comment{text: "Hahaha I totally want to buy this thing."}
comment_two = %Comment{text: "LOL you are such as a such face."}
comment_three = %Comment{text: "Seriously, bro."}


# POSTS

post_one = Ecto.Changeset.change(%Post{
    name: "top-ten-ways-to-die",
    display_name: "Top Ten Ways To Die",
    excerpt: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awful",
    featured_image: "/images/herb.jpg",
    author: "Julius Reade",
    post_type: "product_list",
    product_limit: 10,
    product_offset: 0})


post_two = Ecto.Changeset.change(%Post{
    name: "you-have-a-great-body",
    display_name: "You Have a great body",
    excerpt: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awful",
    featured_image: "/images/herb.jpg",
    author: "Julius Reade",
    post_type: "product_list",
    product_limit: 10,
    product_offset: 0})

# TAGS 
tag_one = Ecto.Changeset.change(%Tag{
    name: "cake",
    display_name: "Cake",
    description: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful.",
    posts: [
        post_one, post_two
    ]})

# Repo.insert!(tag_one);

# LETTERS

# letter_one = Ecto.Changeset.change(%Update{    
#     name: "you-have-a-great-body-one",
#     display_name: "Thank you everyone for your support! We wish well!",
#     title: "Really, you deserve the world!",
#     excerpt: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awful",
#     author: "julius"})


# Repo.insert!(letter_one);
# Repo.insert!(letter_two);
# Repo.insert!(letter_three);


# UPDATES

update_one = Ecto.Changeset.change(%Update{    
    name: "you-have-a-grrsteat-body-one",
    display_name: "Thank you everyone for your support! We wish well!",
    title: "Really, you deserve the world!",
    excerpt: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awful",
    author: "julius",
    draft: false,
    schedule_date: today
    })

update_two = Ecto.Changeset.change(%Update{
    name: "you-have-a-grearstat-barstody-two",
    display_name: "Guess what October's most popular Awful Product was?",
    title: "October is amazing",
    excerpt: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awful",
    author: "julius",
    draft: false,
    schedule_date: today
    })
    
update_three = Ecto.Changeset.change(%Update{    
    name: "you-havarste-a-great-body-three",
    display_name: "Did you know...",
    title: "Crushing.",
    excerpt: "Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awful Everyone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awfulEveryone's gotta wear something. Pants, preferrably. Unless if you're really, really awful",
    author: "julius",
    draft: false,
    schedule_date: today
    })
    
Repo.insert!(update_one)
Repo.insert!(update_two)
Repo.insert!(update_three)




# CATEGORY FASHION

fashion = Ecto.Changeset.change(%Category{
    name: "fashion",
    display_name: "Fashion",
    description: "Everyone's gotta wear something. Which is why it's in your absolute best interest to embarass your loved ones and make them look as awful as possible. Did someone order a pink leopard-pattern leotard?",
    icon: "fae-shirt"})

# fashion_pants = Ecto.Changeset.change(%SubCategory{name: "pants", display_name: "Pants", description: "Pants are usually a good. Please wear pants. I beg you.", icon: "fae-shirt" })
# fashion_shirts = Ecto.Changeset.change(%SubCategory{name: "shirts", display_name: "Shirts", description: "I've never worn a shirt that I haven't liked. Actually, that's not true. I'm just making stuff up and actually, these are just words which I'm typing without thought so... blah, blah, blah", icon: "fae-shirt"})

fashion_product = Ecto.Changeset.change(%Product{
    name: "seearstd",
    display_name: "White Walker One-Piece Costume",
    price: 89.89,
    description: "Terrify everyone by looking like you just strolled in from the Land of Always Winter by dressing.",
    blog_description: "simplify everyone by looking like you just strolled in from the Land of Always Winter by.",
    product_type: "popular",
    schedule_date: today,
    cta: "Yuck!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",
    url_text: "amazon.co.uk",
    product_tags: [
        tag_one
    ],
    product_like: like_one
    # product_comments: [
    #     # comment_three
    # ]
})

fashion_product_two = Ecto.Changeset.change(%Product{
    name: "Mini-arstWaffle-Stick-Make333r",
    display_name: "Mini Waffle Stick Maker yo",
    description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    blog_description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    product_type: "",    
    schedule_date: today,
    price: 39.99,
    cta: "Ewww!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",
    # product_tags: [
    #     tag_one
    # ],
    # product_comments: [
    #     comment_two
    # ],
    product_like: like_seven    
})

fashion_with_product = Ecto.Changeset.put_assoc(fashion, :products, [fashion_product, fashion_product_two])

Repo.insert!(fashion_with_product)
# Repo.insert!(fashion_pants)
# Repo.insert!(fashion_shirts)








# CATEGORY FASHION

awesome_dork = Ecto.Changeset.change(%Category{
    name: "awesome-dork",
    display_name: "Awesome Dork",
    description: "Geeky gifts are the best gifts. Even the coolest of hipsters can be tragic Star Wars fans at heart. Which is why you're going to ruin their fantasy by getting them something Star Trek related instead.", 
    icon: "fae-planet"})

awesome_dork_phones = Ecto.Changeset.change(%SubCategory{name: "phones", display_name: "Phones", description: "Phones are really, really cool.", icon: "fae-shirt"})
awesome_dork_video_games = Ecto.Changeset.change(%SubCategory{name: "video_games", display_name: "Video Games", description: "Pow, Pow! Shoot the little alien guy! Wait, is this even what you do in video games?", icon: "fae-shirt"})

awesome_dork_product = Ecto.Changeset.change(%Product{
    name: "awesome-banana-frsriends-fun-pack",
    display_name: "Awesome Banana Friends Fun Pack",
    price: 338.99,
    cta: "Fugly!",
    description: "Make your salads and dishes burst with flavor by garnishing them.",
    blog_description: "Make your salads and dishes burst with flavor by garnishing them.",
    product_type: "popular",
    schedule_date: today,
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_awesome_dork,
    # product_tags: [
    #     tag_men,
    #     tag_women,
    #     tag_under_20
    # ],
    # product_comments: [
    #     comment_one,
    #     comment_two
    # ],
    product_like: like_two    
})

awesome_dork_with_product = Ecto.Changeset.put_assoc(awesome_dork, :products, [awesome_dork_product])

Repo.insert!(awesome_dork_with_product)
Repo.insert!(awesome_dork_phones)
Repo.insert!(awesome_dork_video_games)







# CATEGORY HOME & OFFICE

home_office = Ecto.Changeset.change(%Category{
    name: "home-office", 
    display_name: "Home & Office", 
    description: "Whether you're lounging about at home or pulling a few nasty pranks in the shared collective hell-hole that we recognise as 'the office', be reminded to make it all so-much worse with a handful of awful gifts.", 
    icon: "fa-fort-awesome"})


home_office_product = Ecto.Changeset.change(%Product{
    name: "Cremated-Arsshes-Solid-Glass-Keepsake",
    display_name: "Cremated Ashes Solid Glass Keepsake",
    description: "Now you can commemorate the dearly departed by turning them into a beautiful keepsake.",
    blog_description: "Now you can commemorate the dearly departed by turning them into a beautiful keepsake.",
    product_type: "popular",    
    schedule_date: today,    
    price: 3.99,
    cta: "Gross!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_home_office,    
    # product_tags: [
    #     tag_women,
    #     tag_under_20
    # ],    
    # product_comments: [
        
    # ],
    product_like: like_three    
})


home_office_with_product = Ecto.Changeset.put_assoc(home_office, :products, [home_office_product])

Repo.insert!(home_office_with_product)





# CATEGORY SPORTS & OUTDOORS

sports_outdoors = Ecto.Changeset.change(%Category{
    name: "sports-outdoors", 
    display_name: "Sports & Outdoors", 
    description: "Sports can be fun, especially outdoor sports. I completely forget the point of this conversation, although you too can relive your awful childhood sporting moments and outdoor moments with... I don't know.", 
    icon: "fae-sun-cloud"})
    

sports_outdoors_product = Ecto.Changeset.change(%Product{
    name: "Cockroach-Plusrsh-Pillow-two",
    display_name: "Cockroach Plush Pillow Two",
    price: 3449.99,
    cta: "Yuck!!",
    description: "Make your bedroom cozier than ever with a little roach infestation.",
    blog_description: "Make your bedroom cozier than ever with a little roach infestation.",
    product_type: "bargain",
    schedule_date: today,    
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_sports_outdoors,    
    # product_tags: [
    #     tag_men
    # ],    
    # product_comments: [
        
    # ],
    product_like: like_four
})

sports_outdoors_with_product = Ecto.Changeset.put_assoc(sports_outdoors, :products, [sports_outdoors_product])

Repo.insert!(sports_outdoors_with_product)




# CATEGORY FOOD

food = Ecto.Changeset.change(%Category{
    name: "food", 
    display_name: "Food", 
    description: "There's nothing greater than sinking your teeth into a hearty burger, packed full of saturated fats and public health misnomers. Of course, you're awful which is why you're going to eat a cabbage instead.", 
    icon: "fae-pizza"})



food_product = Ecto.Changeset.change(%Product{
    name: "Mini-Waffle-Strrick-Maker",
    display_name: "Mini Waffle Stick Maker",
    description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    blog_description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    product_type: "bargain",    
    schedule_date: today,
    price: 39.99,
    cta: "Ugh!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_food,
    # product_tags: [
    #     tag_men,
    #     tag_under_20
    # ],
    # product_comments: [

    # ],
    product_like: like_five
})

food_with_product = Ecto.Changeset.put_assoc(food, :products, [food_product])

Repo.insert!(food_with_product)




# CATEGORY WTF

wtf = Ecto.Changeset.change(%Category{
    name: "wtf", 
    display_name: "WTF", 
    description: "No one really knows what this category is about. And even if I did, this description would probably just say 'OMG' or 'WOAH' to compliment the inherent childishness that is your personality.", 
    icon: "fa-bomb"})

use Timex 

    
wtf_product = Ecto.Changeset.change(%Product{
    name: "Cockroach-Plrraush-Pillow",
    display_name: "Cockroach Plush Pillow",
    price: 3449.99,
    cta: "Save!",
    description: "Make your bedroom cozier than ever with a little roach infestation.",
    blog_description: "Make your bedroom cozier than ever with a little roach infestation.",
    product_type: "featured",
    schedule_date: today,    
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_wtf,
    # product_tags: [
    #     tag_men,
    #     tag_women
    # ],
    # product_comments: [
    #     comment_one,
    #     comment_two
    # ],
    product_like: like_six    
})

    

# wtf_product_diff = Ecto.Changeset.change(%Product{
#     name: "cakes-are-cakes-yeah",
#     display_name: "Cockroach Plush Pillow",
#     price: 3449.99,
#     cta: "Awful!",
#     description: "Make your bedroom cozier than ever with a little roach infestation.",
#     blog_description: "Make your bedroom cozier than ever with a little roach infestation.",
#     product_type: "featured",
#     featured_image: "/images/herb.jpg",
#     draft: true,
#     schedule_date: tomorrow, 
#     url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
#     url_text: "amazon.co.uk",

#     # category: category_wtf,
#     # product_tags: [
#     #     tag_men,
#     #     tag_women
#     # ],
#     # product_comments: [
#     #     comment_one,
#     #     comment_two
#     # ],
#     product_like: like_six    
# })

# Repo.insert!(wtf_product_diff)





food_product__two = Ecto.Changeset.change(%Product{
    name: "Mini-Waffle-Stick-Mrsttrstaker",
    display_name: "Mini Wafflrste Stick Maker",
    description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    blog_description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    product_type: "bargain",    
    schedule_date: today,    
    price: 39.99,
    cta: "Terrible!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_food,
    # product_tags: [
    #     tag_men,
    #     tag_under_20
    # ],
    # product_comments: [

    # ],
    product_like: like_five
})

food_product__three = Ecto.Changeset.change(%Product{
    name: "Miecakni-Waffle-Stick-Mrstrstaker",
    display_name: "Mini Wafflrste Stick Maker",
    description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    blog_description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    product_type: "bargain",    
    schedule_date: today,    
    price: 39.99,
    cta: "Cheap!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_food,
    # product_tags: [
    #     tag_men,
    #     tag_under_20
    # ],
    # product_comments: [

    # ],
    product_like: like_five
})


food_product__four = Ecto.Changeset.change(%Product{
    name: "Miecakni-taker",
    display_name: "Mini Wafflrste Stick Maker",
    description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    blog_description: "Turn a fast-food staple into a yummy home cooked treat using this mini waffle stick maker.",
    product_type: "bargain",    
    schedule_date: today,    
    price: 39.99,
    cta: "Nasty!",
    featured_image: "/images/herb.jpg",
    draft: false,
    url: "https://www.amazon.co.uk/Business-Casual-Suede-Shirt-PJAD1010-2/dp/B014CDY7WW/ref=sr_1_3?s=clothing&ie=UTF8&qid=1509497781&sr=1-3&nodeID=83450031&psd=1&keywords=suede%2Bshirt&th=1",    
    url_text: "amazon.co.uk",

    # category: category_food,
    # product_tags: [
    #     tag_men,
    #     tag_under_20
    # ],
    # product_comments: [

    # ],
    product_like: like_five
})

wtf_with_product = Ecto.Changeset.put_assoc(wtf, :products, [wtf_product, food_product__two, food_product__three, food_product__four])

Repo.insert!(wtf_with_product)




# SUB CATEGORY




# TAG 
tag_men = %Tag{name: "men", display_name: "Men", description: "Perfectly awful gifts for awful men, perhaps, just like you." }
tag_women = %Tag{name: "women", display_name: "Women", description: "If you're an awful women, then boy do I have the gift for you!"}
tag_under_20 = %Tag{name: "under-twenty" , display_name: "Under $20" , description: "Some cheap, awful gifts for you and your awful friends, family and whoever else." }




# Popular Items 


Ecto.Changeset.change(%Post{ 
    name: "Mini-Waffle-Stickttr-Maker",
    display_name: "Top Ten Mini Waffle Stick Maker",
    excerpt: "Turn a fast-food staple into a yummy home cooked treat using this mini whome cooked treat usinghome cooked treat usinghome cooked treat usingaffle stick maker.",
    author: "Julius Reade",
    featured_image: "/images/herb.jpg"
})

Ecto.Changeset.change(%Post{ 
    name: "Mini-Waffle-Stick-arMaker",
    display_name: "Top Ten Mini Waffle Stick Maker",
    excerpt: "Turn a fast-food staple into a yummy home cooked treat using this mini whome cooked treat usinghome cooked treat usinghome cooked treat usingaffle stick maker.",
    author: "Julius Reade",
    featured_image: "/images/herb.jpg"
})
    
Ecto.Changeset.change(%Post{ 
    name: "Mini-Waffle-Sttrtick-Maker",
    display_name: "Top Ten Mini Waffle Stick Maker",
    excerpt: "Turn a fast-food staple into a yummy home cooked treat using this mini whome cooked treat usinghome cooked treat usinghome cooked treat usingaffle stick maker.",
    author: "Julius Reade",
    featured_image: "/images/herb.jpg"
})
    





