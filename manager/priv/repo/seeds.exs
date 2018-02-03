# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Awful.Repo.insert!(%Awful.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

# - website_title : string 
# - website_description : string 
# - blog_meta_description : string 
# - categories_meta_description : string 
# - updates_meta_description : string 
# - grid_meta_description : string 
# - about_meta_description : string 
# - contact_meta_description : string 
# - submit_meta_description : string 
# - login_meta_description : string 
# - register_meta_description : string 
# - search_meta_description : string 
# - website_keywords : string 
# - website_twitter : string 
# - website_alt_image : string 

# - about_copy : string
# - submit_copy : string 
# - letter_copy : string 

# - website_logo_png : string 
# - website_logo_svg : string 
# - website_favicon : string 

# - google_analytics_tracking_id : string 
# - google_site_verification : string 


    # website details
#   website_acronym: "ac",
#   website_name: "Awful Christmas",
#   website_name_lower: "awful christmas",
#   website_domain: "https://awfulchristmas.com",

#   # image assets
#   website_logo_png: "/images/ac/AC.png",
#   website_logo_svg: "/images/ac/AC.svg",

#   # username/password 
#   primary_email: "admin@awfulchristmas.com",
#   password: "awfulchristmasforever1!",

# websites = ["ac", "af", "ap", "ach", "ahp", "apo", "a9", "aw"]



# # INDIVIDUAL ENV 

# individual_env_list = [
#   "mailgun_domain",
#   "amazon_s3_bucket_name",
#   "recaptcha_public_key",
#   "recaptcha_private_key",
#   "twitter_api_key",
#   "twitter_secret_key",
#   "twitter_access_token",
#   "twitter_access_token_secret",
#   "facebook_api_key",
#   "facebook_secret_key",
#   "facebook_page_id",
#   "facebook_redirect_url",
#   "tumblr_api_key",
#   "tumblr_secret_key",
#   "tumblr_blog_identifier",
#   "pintrest_api_key",
#   "pintrest_secret_key"
# ]

# Enum.map(websites, fn(website) -> 
#   Enum.map(individual_env_list, fn(individual_env) ->
#     Repo.insert!(Ecto.Changeset.change(%Env{
#       name: individual_env,
#       type: "individual",
#       value: "",
#       website_acronym: website
#     }))
#   end)
# end)



# # COMMON ENV 

# common_env_list = [
#   "mailgun_key",
#   "amazon_associate_tag",
#   "aws_access_key_id",
#   "aws_secret_access_key",
#   "marketplace_host",
#   "amazon_s3_access_key",
#   "amazon_s3_secret_access_key",
#   "etsy_api_key",
#   "etsy_secret_key",
#   "tumblr_access_token",
#   "tumblr_access_token_secret"
# ]

# Enum.map(common_env_list, &(
#   Repo.insert!(Ecto.Changeset.change(%Env{
#     name: &1,
#     type: "common",
#     value: "",
#     website_acronym: "common"
#   }))
# ))


# common_env_list = %Env{ 

# }

# export MAILGUN_KEY="key-4df520f1907c048f529c25b69ee4f027"

# export AMAZON_ASSOCIATE_TAG="readeassociat-20"
# export AWS_ACCESS_KEY_ID="AKIAJ2ALVRWC6O5INEOQ"
# export AWS_SECRET_ACCESS_KEY="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"
# export MARKETPLACE_HOST="webservices.amazon.com"

# export AMAZON_S3_ACCESS_KEY="AKIAIV3CSIZWUGOYKPBQ"
# export AMAZON_S3_SECRET_ACCESS_KEY="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"

# export ETSY_API_KEY="n6zkpm9jgx2zyrsc4oeb5tfx"
# export ETSY_SECRET_KEY="ml2u2mqe7i"

# export TUMBLR_ACCESS_TOKEN="UySZ2DRpIQSnafKYQU6Pe0eMGN4PD1BIYf9iHn0A9h1ZxeXhq8"
# export TUMBLR_ACCESS_TOKEN_SECRET="sZYLcADrTemz298J4va30qSQEXys5nEJI0F9p0rpxQWve5SFQu"



# # CONFIG 

# config_list = [
#   "website_title",
#   "website_description",
#   "blog_meta_description",
#   "categories_meta_description",
#   "updates_meta_description",
#   "grid_meta_description",
#   "about_meta_description",
#   "contact_meta_description",
#   "submit_meta_description",
#   "login_meta_description",
#   "register_meta_description",
#   "search_meta_description",
#   "website_keywords",
#   "website_twitter",
#   "website_alt_image",
#   "about_copy",
#   "submit_copy",
#   "website_favicon",
#   "google_analytics_tracking_id",
#   "google_site_verification",

#   "website_acronym",
#   "website_name",
#   "website_name_lower",
#   "website_domain",

#   "website_logo_png",
#   "website_logo_svg",

#   "primary_email",
#   "password"
# ]

# Enum.map(websites, fn(website) -> 
#   Enum.map(config_list, fn(config) ->
#     Repo.insert!(Ecto.Changeset.change(%Env{
#       name: config,
#       type: "config",      
#       value: "",
#       website_acronym: website
#     }))
#   end)
# end)



alias Awful.Repo

alias Awful.Core.Websites
alias Awful.Core.Env



Awful.Repo.delete_all(Websites)
Awful.Repo.delete_all(Env)    

Awful.Repo.delete_all Awful.Coherence.User

Awful.Coherence.User.changeset(%Awful.Coherence.User{}, %{name: "Julius Reade", email: "julius.reade@gmail.com", password: "hellothere", password_confirmation: "hellothere"})
|> Awful.Repo.insert!




common_list = [
  %Env{ type: "common", website_acronym: "common", name: "mailgun_key", value: "key-4df520f1907c048f529c25b69ee4f027" },
  %Env{ type: "common", website_acronym: "common", name: "amazon_associate_tag", value: "readeassociat-20" },
  %Env{ type: "common", website_acronym: "common", name: "aws_access_key_id", value: "AKIAJ2ALVRWC6O5INEOQ" },
  %Env{ type: "common", website_acronym: "common", name: "aws_secret_access_key", value: "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" },
  %Env{ type: "common", website_acronym: "common", name: "marketplace_host", value: "webservices.amazon.com" },
  %Env{ type: "common", website_acronym: "common", name: "amazon_s3_access_key", value: "AKIAIV3CSIZWUGOYKPBQ" },
  %Env{ type: "common", website_acronym: "common", name: "amazon_s3_secret_access_key", value: "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" },
  %Env{ type: "common", website_acronym: "common", name: "etsy_api_key", value: "n6zkpm9jgx2zyrsc4oeb5tfx" },
  %Env{ type: "common", website_acronym: "common", name: "etsy_secret_key", value: "ml2u2mqe7i" },
  %Env{ type: "common", website_acronym: "common", name: "tumblr_access_token", value: "UySZ2DRpIQSnafKYQU6Pe0eMGN4PD1BIYf9iHn0A9h1ZxeXhq8" },
  %Env{ type: "common", website_acronym: "common", name: "tumblr_access_token_secret", value: "sZYLcADrTemz298J4va30qSQEXys5nEJI0F9p0rpxQWve5SFQu" }
]


Enum.map(common_list, fn(config) -> 
  Repo.insert!(config)
end)



#AC 


ac_config_list = [
  %Env{ type: "config", website_acronym: "ac", name: "website_acronym", value: "ac" },
  %Env{ type: "config", website_acronym: "ac", name: "website_name", value: "Awful Christmas" },
  %Env{ type: "config", website_acronym: "ac", name: "website_name_lower", value: "awful christmas" },
  %Env{ type: "config", website_acronym: "ac", name: "website_domain", value: "https://awfulchristmas.com" },
  %Env{ type: "config", website_acronym: "ac", name: "website_logo_png", value: "/images/ac/AC.png" },
  %Env{ type: "config", website_acronym: "ac", name: "website_logo_svg", value: "/images/ac/AC.svg" },
  %Env{ type: "config", website_acronym: "ac", name: "website_favicon", value: "/images/ac/AC.ico" },
  %Env{ type: "config", website_acronym: "ac", name: "primary_email", value: "admin@awfulchristmas.com" },
  %Env{ type: "config", website_acronym: "ac", name: "password", value: "awfulchristmasforever1!" },
  %Env{ type: "config", website_acronym: "ac", name: "website_title", value: "Awful Christmas | For All Your Awful Christmas Gift Ideas" },
  %Env{ type: "config", website_acronym: "ac", name: "website_description", value: "Discover a world of awful gifts and ruin the holiday your loved ones adore most! Curated by Santa's awful little helpers, otherwise known as the internet." },
  %Env{ type: "config", website_acronym: "ac", name: "website_keywords", value: "Awful Christmas, christmas, christmas gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO" },
  %Env{ type: "config", website_acronym: "ac", name: "website_twitter", value: "@AwfulChristmas" },
  %Env{ type: "config", website_acronym: "ac", name: "website_alt_image", value: "This is an awful christmas image" },
  %Env{ type: "config", website_acronym: "ac", name: "blog_meta_description", value: "At Awful Christmas write a range of blog posts covering life's most pressing topics. Such as, what awful gift I should I get my loved ones this Christmas?" },
  %Env{ type: "config", website_acronym: "ac", name: "categories_meta_description", value: "Awful Christmas features a range of product categories to tickle your fancy, including fashion, geek, home, office, food, sports, outdoors and more!" },
  %Env{ type: "config", website_acronym: "ac", name: "updates_meta_description", value: "Don't flail around like a queasy duck. Keep up to date with all the happenings at Awful Christmas and keep those awful gifts aplenty this holiday season." },
  %Env{ type: "config", website_acronym: "ac", name: "grid_meta_description", value: "View and filter all our amazingly awful products with our interactive, grid application that has been oh-so spendidly designed for your pleasure." },
  %Env{ type: "config", website_acronym: "ac", name: "about_meta_description", value: "Want to learn more about Awful Christmas? Well, unfortunately you can't. Because we're just plain awful." },
  %Env{ type: "config", website_acronym: "ac", name: "contact_meta_description", value: "Awful Christmas doesn't like to be contacted by the general public, so please scram! You awful human being!" },
  %Env{ type: "config", website_acronym: "ac", name: "submit_meta_description", value: "Perhaps you would like to submit your million dollar product into our Awful Christmas catalogue. Well, now you can. Although don't go power hungry." },
  %Env{ type: "config", website_acronym: "ac", name: "login_meta_description", value: "Why not login? It's proven to promote healthy bone growth and pre-maritime dyslexia." },
  %Env{ type: "config", website_acronym: "ac", name: "register_meta_description", value: "When you register at Awful Christmas you recieve a lifetime supply of beetle juice, as well as a whole world of dysphoria." },
  %Env{ type: "config", website_acronym: "ac", name: "search_meta_description", value: "Aside from hacking into our database and typing in a sneaky SQL query to find what you want, why not just type what you want to find into our search bar?" },
  %Env{ type: "config", website_acronym: "ac", name: "about_copy", value: "<p><span style='text-decoration: underline; color: red'>awful christmas.</span> is an online catalogue of the most awfully wonderful, quirky gifts available on the internet! Because that's just what the internet was created for.</p><p>Each and every day our team of little helpers post new and interesting products from a range of websites including Amazon, Etsy and Aliexpress, taking the hard work out of your gift discovering pleasures. </p><p>May the power of awful gifts be with you.</p><p>Your lord saviour,</p><p>Awful Santa</p>" },
  %Env{ type: "config", website_acronym: "ac", name: "submit_copy", value: "<p>So, you wanna play god?</p><p>You wanna influence the minds of millions, warping the twisted perception of the innocent consumer in the hope of giving your invention a chance on the world stage?</p><p>You poor bastard. Of course, that's why we're here, so make yourself at home!</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"  },
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "ac", name: "google_analytics_tracking_id", value: "UA-109525120-1" },
  %Env{ type: "config", website_acronym: "ac", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4" }
]



Enum.map(ac_config_list, fn(config) -> 
    Repo.insert!(config)
end)




af_config_list = [
  %Env{ type: "config", website_acronym: "af", name: "website_acronym", value: "af"},
  %Env{ type: "config", website_acronym: "af", name: "website_name", value: "Awful Fashion"},
  %Env{ type: "config", website_acronym: "af", name: "website_name_lower", value: "awful fashion"},
  %Env{ type: "config", website_acronym: "af", name: "website_domain", value: "https://awfulfashion.com"},
  %Env{ type: "config", website_acronym: "af", name: "website_logo_png", value: "/images/af/AF.png"},
  %Env{ type: "config", website_acronym: "af", name: "website_logo_svg", value: "/images/af/AF.svg"},
  %Env{ type: "config", website_acronym: "af", name: "website_favicon", value: "/images/af/AF.ico"},
  %Env{ type: "config", website_acronym: "af", name: "primary_email", value: "julius@awfulfashion.com"},
  %Env{ type: "config", website_acronym: "af", name: "password", value: "awfulfashionforever1!"},
  %Env{ type: "config", website_acronym: "af", name: "website_title", value: "Awful Fashion | For All Your Awful Fashion Ideas"},
  %Env{ type: "config", website_acronym: "af", name: "website_description", value: "Ever desired to look like last week's bargain bin? Well, let's do you one worse and give you that 'I recently lost my job' look too. This is Awful Fashion."},
  %Env{ type: "config", website_acronym: "af", name: "website_keywords", value: "Awful Fashion, fashion gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "af", name: "website_twitter", value: "@AwfulFashion"},
  %Env{ type: "config", website_acronym: "af", name: "website_alt_image", value: "This is an Awful Fashion image"},
  %Env{ type: "config", website_acronym: "af", name: "blog_meta_description", value: "Obviously as the world's premiere fashion blogger, allow me to grace your literary senses with literal crap found in a bargain bin off the coast of Bangladesh."},
  %Env{ type: "config", website_acronym: "af", name: "categories_meta_description", value: "Awful Fashion features a wide range of appropiate category, in order for you distinguish between the different parts of the body you wish to cover."},
  %Env{ type: "config", website_acronym: "af", name: "updates_meta_description", value: "Want to know what I'm currently wearing? Well obviously you can via our updates section, which allows you to feel the leather up close."},
  %Env{ type: "config", website_acronym: "af", name: "grid_meta_description", value: "Are you absolutely dying for some interactivity in your life. Well, with our specialised gift application you can pretend you're making love to your computer."},
  %Env{ type: "config", website_acronym: "af", name: "about_meta_description", value: "Awful Fashion is a website about bad clothes. Like, seriously awful clothing you wouldn't even catch your Grandma wearing. Even at the funeral."},
  %Env{ type: "config", website_acronym: "af", name: "contact_meta_description", value: "Perhaps you want to drop a line and say g'day? Perhaps you're feeling abusive and feel the need to let it out? Thankfully, we have a contact form just for that."},
  %Env{ type: "config", website_acronym: "af", name: "submit_meta_description", value: "Here at Awful Fashion you have the opportunity to submit all your Awful Fashion products and ideas, so the rest of the world can suffer as well."},
  %Env{ type: "config", website_acronym: "af", name: "login_meta_description", value: "Login to our Awful Fashion portal and experience a world of pain and restitution, as mystical pieces of linen attempt to drape you and ruin your reputation."},
  %Env{ type: "config", website_acronym: "af", name: "register_meta_description", value: "Register here at Awful Fashion and recieve an account with your email as the username! I would say that's pretty nifty, if not outright sensible."},
  %Env{ type: "config", website_acronym: "af", name: "search_meta_description", value: "Looking for your pants? While our search bar can't help you reclaim your dignity, it can help you discover other ways be uniquely awful."},
  %Env{ type: "config", website_acronym: "af", name: "about_copy", value: "<p><span style='text-decoration: underline; color: red'>awful fashion.</span> is an online catalogue of the most awful clothing available on the internet. Pink leotard with purple stripes? Sure, why the hell not.</p><p>I get it. You love your sweatpants and baggy jeans, but your obsession with sheep skin blazers and plastic grills has gone too far. Seriously, step away from the bubble wrap and walk towards the light.</p><p>As part of your recovery we recommend a healthy dose of glossy magazines and a potential pill addiction.</p><p>Regards,</p><p>Awful Fashionista</p>"},
  %Env{ type: "config", website_acronym: "af", name: "submit_copy", value: "<p>Thinking of ruining the wardrobe of others?</p><p>Well, now you can with our fabulously awful submission form, building from the tears of heartbreak and bad decicions.</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "af", name: "google_analytics_tracking_id", value: "UA-109525120-2"},
  %Env{ type: "config", website_acronym: "af", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"}
]


Enum.map(af_config_list, fn(config) -> 
  Repo.insert!(config)
end)


ach_config_list = [
  %Env{ type: "config", website_acronym: "ach", name: "website_acronym", value: "ach"},
  %Env{ type: "config", website_acronym: "ach", name: "website_name", value: "Awful Child"},
  %Env{ type: "config", website_acronym: "ach", name: "website_name_lower", value: "awful child"},
  %Env{ type: "config", website_acronym: "ach", name: "website_domain", value: "https://awfulchild.com"},
  %Env{ type: "config", website_acronym: "ach", name: "website_logo_png", value: "/images/ach/ACH.png"},
  %Env{ type: "config", website_acronym: "ach", name: "website_logo_svg", value: "/images/ach/ACH.svg"},
  %Env{ type: "config", website_acronym: "ach", name: "website_favicon", value: "/images/ach/ACH.ico"},
  %Env{ type: "config", website_acronym: "ach", name: "primary_email", value: "julius@awfulchild.com"},
  %Env{ type: "config", website_acronym: "ach", name: "password", value: "awfulchildforever1!"},
  %Env{ type: "config", website_acronym: "ach", name: "website_title", value: "Awful Child | All Your Awful Gift Ideas For Kids"},
  %Env{ type: "config", website_acronym: "ach", name: "website_description", value: "Spoiled brats deserve awful gifts. I mean, at least that's what we advertise this site as, but I'm sure you'll ironically find something they'll absolutely love."},
  %Env{ type: "config", website_acronym: "ach", name: "website_keywords", value: "Awful Child, child gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "ach", name: "website_twitter", value: "@AwfulChild"},
  %Env{ type: "config", website_acronym: "ach", name: "website_alt_image", value: "This is an awful child image"},
  %Env{ type: "config", website_acronym: "ach", name: "blog_meta_description", value: "This blog is written for children under the age of three years' old. If your three year old is struggling to read this, it means they have failed at life."},
  %Env{ type: "config", website_acronym: "ach", name: "categories_meta_description", value: "View our range of deliciously childish products, organised via our product categories such as Toys, Toys and even more Toys!"},
  %Env{ type: "config", website_acronym: "ach", name: "updates_meta_description", value: "Much like a baby monitor, our updates section allows you to monitor in real-time, the daily tantrums of our collective team. Whhhaaaa?"},
  %Env{ type: "config", website_acronym: "ach", name: "grid_meta_description", value: "Oh My GODDDD!!! There are so many products EVERYWHERE and it's INSANE how much easier our interactive gift grid allows you to find what you need."},
  %Env{ type: "config", website_acronym: "ach", name: "about_meta_description", value: "This website is about gifts for children. There you go. I spoilt the whole website for you, now please remain calm and go home. Your children are waiting."},
  %Env{ type: "config", website_acronym: "ach", name: "contact_meta_description", value: "If you're an awful child and you're hoping to contact a young man in his mid-twenties then... okay that didn't come out right (you should secretly contact me)."},
  %Env{ type: "config", website_acronym: "ach", name: "submit_meta_description", value: "There's never been a perfect time to submit your awful product to our awful repository of awful children's gifts. Seriously, you should totally get on it."},
  %Env{ type: "config", website_acronym: "ach", name: "login_meta_description", value: "Everytime you login to Awful Child you get a bonus 10XP per hour, as well as an additional smile from every old lady you walk past today."},
  %Env{ type: "config", website_acronym: "ach", name: "register_meta_description", value: "Did you know that when you register to Awful Child your IP is instantly tracked by the federal bureau and your drivers' licence becomes invalid?"},
  %Env{ type: "config", website_acronym: "ach", name: "search_meta_description", value: "The search bar is a holy institution and should be regarded as a modern relic of internet freedom and liberal bipartisanship. Please use it wisely."},
  %Env{ type: "config", website_acronym: "ach", name: "about_copy", value: "<p><span style='text-decoration: underline; color: red'>awful child.</span> is an online catalogue of gifts and assorted awfulness, designed to make your child very sad and depressed.</p><p>I mean, your parents never got you that amazing *brand new* toy you wanted as a child, so why should your offspring?</p><p>That's right. You're not completely insane and you should ruin their life by giving them a pair of socks for their birthday.</p><p>Child psychologists need to eat too.</p><p>Awful Parent</p>"},
  %Env{ type: "config", website_acronym: "ach", name: "submit_copy", value: "<p>Do you seriously think it's okay to get your child hooked on candy!?</p><p>Obviously, we think it's perfectly okay. You know, start them on something light before making your way to things like video games and crack-cocai... I mean, Disney.</p><p>With the power of your internet-powered device (also known as a computer), you now have the power to submit your product into our database of awful (as well as surprisingly unawful) gifts for children.</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "ach", name: "google_analytics_tracking_id", value: "UA-109525120-4"},
  %Env{ type: "config", website_acronym: "ach", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"}
]


Enum.map(ach_config_list, fn(config) -> 
  Repo.insert!(config)
end)



a9_config_list = [
  %Env{ type: "config", website_acronym: "a9", name: "website_acronym", value: "a9"},
  %Env{ type: "config", website_acronym: "a9", name: "website_name", value: "Awful 90s"},
  %Env{ type: "config", website_acronym: "a9", name: "website_name_lower", value: "awful 90s"},
  %Env{ type: "config", website_acronym: "a9", name: "website_domain", value: "https://awful90s.com"},
  %Env{ type: "config", website_acronym: "a9", name: "website_logo_png", value: "/images/a9/A9.png"},
  %Env{ type: "config", website_acronym: "a9", name: "website_logo_svg", value: "/images/a9/A9.svg"},
  %Env{ type: "config", website_acronym: "a9", name: "website_favicon", value: "/images/a9/A9.ico"},
  %Env{ type: "config", website_acronym: "a9", name: "primary_email", value: "admin@awful90s.com"},
  %Env{ type: "config", website_acronym: "a9", name: "password", value: "awful90sforever1!"},
  %Env{ type: "config", website_acronym: "a9", name: "website_title", value: "Awful 90s | Discover A World Of 90s Nostalgia"},
  %Env{ type: "config", website_acronym: "a9", name: "website_description", value: "Awful 90s features a wide range of products and gifts from the 90s, so you too can wonder why the Spice Girls and MTV are no longer a thing."},
  %Env{ type: "config", website_acronym: "a9", name: "website_keywords", value: "Awful 90s, 90s gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "a9", name: "website_twitter", value: "@Awful90s"},
  %Env{ type: "config", website_acronym: "a9", name: "website_alt_image", value: "This is an Awful 90s image"},
  %Env{ type: "config", website_acronym: "a9", name: "blog_meta_description", value: "Chasing the desire to read something about the 90s? Well, that's why we have our blog splendidly awful blog, full of great things... like words."},
  %Env{ type: "config", website_acronym: "a9", name: "categories_meta_description", value: "What would a product gifting website be without a jam-packed categories section? Clearly, it wouldn't be. Now please, stop bugging me."},
  %Env{ type: "config", website_acronym: "a9", name: "updates_meta_description", value: "Discover all the happenings at Awful 90s with our frequent, and somewhat unidentifiable weekly updates."},
  %Env{ type: "config", website_acronym: "a9", name: "grid_meta_description", value: "With our wonderful interactive grid you can wade your way through a world of awful products from the 90s, like this choker I'm currently wearing."},
  %Env{ type: "config", website_acronym: "a9", name: "about_meta_description", value: "I know you, silly puck. You're absolutely dying to find out more about this wonderful website. Well, here I present you with your opportunity."},
  %Env{ type: "config", website_acronym: "a9", name: "contact_meta_description", value: "Quickly! Pick up the phone! There's a murderer in the house! Actually, it's just a contact page, although I tend to fool most people."},
  %Env{ type: "config", website_acronym: "a9", name: "submit_meta_description", value: "For a very almost laughably limited time only, I present you with the opportunity to submit your fabulous product into our website."},
  %Env{ type: "config", website_acronym: "a9", name: "login_meta_description", value: "Everyone knows it's cool to login. Hell, I'm logged in right now. I would say that makes me somewhat of an internet celebrity."},
  %Env{ type: "config", website_acronym: "a9", name: "register_meta_description", value: "I remember the first time I ever registered. It was a cold Winter's day on the planet Creation. Oh wait, that was a dream last night."},
  %Env{ type: "config", website_acronym: "a9", name: "search_meta_description", value: "Search for your favourite 90s moment in our ever-so generic search page. Like seriously. It's as barebones as it gets."},
  %Env{ type: "config", website_acronym: "a9", name: "about_copy", value: "<p><span style='text-decoration: underline; color: red'>awful 90s.</span> is an online catalogue of nostalgia, allowing you to search for the most awful gifts available on the internet from that era! Because that's what Cartoon Network would have wanted.</p><p>The 90s were a weird time for most of us, and now you can make it even weirder by collecting a bunch of stuff from that era as a grown adult.</p><p>Things that your children will never care about, and probably throw away upon your death.</p><p>Ah well, I guess that's why they invented adoption.</p><p>Awful 90s Kid</p>"},
  %Env{ type: "config", website_acronym: "a9", name: "submit_copy", value: "<p>Guess what! Today is your lucky day!</p><p>In all fairness, it's quite an ordinary day as the world consumes itself in a flurry of over-population in an environment of limited empathy...</p><p>Oh wait, you want to hear a sales pitch!? Ummmm, well screw that, because now you can contribute to our impending doom and contribute towards the excess of capitalism by submitting your product to our website!</p><p>Submissions are free, although our team of devilish creatures will decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "a9", name: "google_analytics_tracking_id", value: "UA-109525120-7"},
  %Env{ type: "config", website_acronym: "a9", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"}
]

Enum.map(a9_config_list, fn(config) -> 
  Repo.insert!(config)
end)



ahp_config_list = [
  %Env{ type: "config", website_acronym: "ahp", name: "website_acronym", value: "ahp"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_name", value: "Awful Harry Potter"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_name_lower", value: "awful harry potter"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_domain", value: "https://awfulharrypotter.com"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_logo_png", value:  "/images/ahp/AHP.png"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_logo_svg", value:  "/images/ahp/AHP.svg"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_favicon", value:  "julius@awfulharrypotter.com"},
  %Env{ type: "config", website_acronym: "ahp", name: "primary_email", value: "awfulharrypotterforever1!"},
  %Env{ type: "config", website_acronym: "ahp", name: "password", value: "Awful Harry Potter | For All Your Awful Harry Potter Gift Ideas"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_title", value: "Featuring a range of Awful Harry Potter products and gifts, go crazy and buy enough wands and plastic facial augmentations to turn you into Daniel Radcliffe himself."},
  %Env{ type: "config", website_acronym: "ahp", name: "website_description", value: "Awful Harry Potter, harry potter gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_keywords", value: "@AwfulHarry Potter"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_twitter", value:  "This is an Awful Harry Potter image"},
  %Env{ type: "config", website_acronym: "ahp", name: "website_alt_image", value: "Here on our Awful Harry Potter blog we write about and compile our gifts into neat packages for you to consume, like Bertie Bott's Every Flavour Beans!"},
  %Env{ type: "config", website_acronym: "ahp", name: "blog_meta_description", value: "If it's one thing I'm sure of it's that JK Rowling would have wanted relatable categories for the billions she rakes in each year."},
  %Env{ type: "config", website_acronym: "ahp", name: "categories_meta_description", value: "Want to know what Ron Weasley is up to in his spare time? Unfortunately, that's utterly impossible. However allow us to update you on our lives instead."},
  %Env{ type: "config", website_acronym: "ahp", name: "updates_meta_description", value: "Internet applications are amazing. That's why we created our interactive product grid which allows you to view our gifs and products in fabulous real-time!"},
  %Env{ type: "config", website_acronym: "ahp", name: "grid_meta_description", value: "Obviously, you know a lot more about Harry Potter than I do. I mean, I read the books and I've played the video games as a kid, but dress ups as Harry..."},
  %Env{ type: "config", website_acronym: "ahp", name: "about_meta_description", value: "It's true. Through our contact form you have the ability to get in touch with the entire cast of the Harry Potter series, including JK Rowling herself."},
  %Env{ type: "config", website_acronym: "ahp", name: "contact_meta_description", value: "Like making magical wands? Maybe you have a subtle fascination with capitalism? Well, experience the worst of both worlds and submit your product today!"},
  %Env{ type: "config", website_acronym: "ahp", name: "submit_meta_description", value: "Much like enrolling in Hogwarts itself, our fantastic login system is a pickle-a-dime-a-dozen. I honestly have no idea what that means."},
  %Env{ type: "config", website_acronym: "ahp", name: "login_meta_description", value: "When you register to the Awful Harry Potter website you receive a free notion of regret, as well as a lifetime supply of worry."},
  %Env{ type: "config", website_acronym: "ahp", name: "register_meta_description", value: "Unlike your long lost son who will never be found, why not take a gamble and see what Harry Potter related gifts and products you can discover."},
  %Env{ type: "config", website_acronym: "ahp", name: "search_meta_description", value: "<p><span style='text-decoration: underline; color: red'>awful harry potter.</span> is an online catalogue of the most awfully wonderful, quirky Harry Potter related gifts available on the internet! Yes, I know you're excited (or spewing) too!</p><p>Maybe you're obsessed with wands, or pretending that you're Ginny Weasley in your awfully tight nightie so you can get close to that special man in your life: a cardboard cutout of Daniel Radcliffe, lying ever-so vulnerabling in your bed.</p><p>Clearly, you need to see a doctor. But that's why we exist so you can be distracted and remain mentally ill for the rest of your life.</p><p>Sincerely,</p><p>Awful Harry Potter Fan</p>"},
  %Env{ type: "config", website_acronym: "ahp", name: "about_copy", value:  "<p>So you've created something Harry Potter related that you want to sell?</p><p>Well, for starters you're clearly insane. The movies ended years ago and everyone's already moved onto worshipping autotuned white rappers and the alt-right.</p><p>Of course, this website relies on your hopes and dreams so feel free to tell the world about your Harry Potter related *insert item* and we'll do the rest.</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ahp", name: "submit_copy", value:  "UA-109525120-6"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "ahp", name: "google_analytics_tracking_id", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"},
  %Env{ type: "config", website_acronym: "ahp", name: "google_site_verification", value: "/images/ahp/AHP.ico"}
]


Enum.map(ahp_config_list, fn(config) -> 
  Repo.insert!(config)
end)



ap_config_list = [
  %Env{ type: "config", website_acronym: "ap", name: "website_acronym", value: "ap"},
  %Env{ type: "config", website_acronym: "ap", name: "website_name", value: "Awful Pet"},
  %Env{ type: "config", website_acronym: "ap", name: "website_name_lower", value: "awful pet"},
  %Env{ type: "config", website_acronym: "ap", name: "website_domain", value: "https://awfulpet.com"},
  %Env{ type: "config", website_acronym: "ap", name: "website_logo_png", value:  "/images/ap/AP.png"},
  %Env{ type: "config", website_acronym: "ap", name: "website_logo_svg", value:  "/images/ap/AP.svg"},
  %Env{ type: "config", website_acronym: "ap", name: "website_favicon", value:  "/images/ap/AP.ico"},
  %Env{ type: "config", website_acronym: "ap", name: "primary_email", value: "julius@awfulpet.com"},
  %Env{ type: "config", website_acronym: "ap", name: "password", value: "awfulpetforever1!"},
  %Env{ type: "config", website_acronym: "ap", name: "website_title", value: "Awful Pet | For All Your Awful Pet Gift Ideas"},
  %Env{ type: "config", website_acronym: "ap", name: "website_description", value: "Absolutely love your pet? Now you can love it even more with the power of irony with our range of awful gifts! They won't even be able to tell the difference."},
  %Env{ type: "config", website_acronym: "ap", name: "website_keywords", value: "Awful Pet, pet gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "ap", name: "website_twitter", value:  "@AwfulPet"},
  %Env{ type: "config", website_acronym: "ap", name: "website_alt_image", value: "This is an awful pet image"},
  %Env{ type: "config", website_acronym: "ap", name: "blog_meta_description", value: "Maybe your pet can read? If not, then that's okay too! On our Awful Pet blog we post about all the latest and greatest products to ruin your pet."},
  %Env{ type: "config", website_acronym: "ap", name: "categories_meta_description", value: "Organised impeccably by our expert team of category experts, with our Categories section you can find what you're looking for with complete ease!"},
  %Env{ type: "config", website_acronym: "ap", name: "updates_meta_description", value: "Keep updated on all the Awful Pet team with our conveniently well-design Updates section! And don't worry it's 100% pet fun and friendly!"},
  %Env{ type: "config", website_acronym: "ap", name: "grid_meta_description", value: "Our Awful Pet interactive gift grid is the easiest way to search through our amazing selection of awful products, sure to put a smile on your pet's face."},
  %Env{ type: "config", website_acronym: "ap", name: "about_meta_description", value: "Awful Pet is a website dedicated to the world's most awful pet gifts. Seriously awful gifts, for seriously awful pets. We're just kidding!"},
  %Env{ type: "config", website_acronym: "ap", name: "contact_meta_description", value: "Contact Awful Pet and ask us about how best to make your pet look like a your favourite celebrity or even worse... another animal."},
  %Env{ type: "config", website_acronym: "ap", name: "submit_meta_description", value: "Submit your Awful Pet related product into our product submission form, designed to ensure your pet doesn't accidentally hurt itself trying to use your computer mouse."},
  %Env{ type: "config", website_acronym: "ap", name: "login_meta_description", value: "Login to Awful Pet with our amazingly designed login system, built with absolutely no security or common human decency in mind. This is Awful Pet afterall."},
  %Env{ type: "config", website_acronym: "ap", name: "register_meta_description", value: "Register to Awful Pet and recieve a lifetime supply of tax-free dog treats and eternal regret when you realise I was just lying to you."},
  %Env{ type: "config", website_acronym: "ap", name: "search_meta_description", value: "Search for all the Awful Pet products you could possibly dream of! Just remember to remain calm and don't allow the power to reach your precious head."},
  %Env{ type: "config", website_acronym: "ap", name: "about_copy", value:  "<p><span style='text-decoration: underline; color: red'>awful pet.</span> is an online catalogue of the most awfully wonderful pet gifts available on the internet! Of course your cat is absolutely dying for a dog plush toy.</p><p>I love my dog so much. He's always there for me. Always keen for a pat. Except when he scratches through the backdoor aluminium mesh and leaves a massive hole and a very large maintenance bill.</p><p>Oh, what I am I even saying! He's too adorable to stay mad at!</p><p>Regards,</p><p>Awful Pet Owner</p>"},
  %Env{ type: "config", website_acronym: "ap", name: "submit_copy", value:  "<p>Thought of an Awful Pet product idea?</p><p>Well, with our product submission form you can do just that!</p><p>While this website is called Awful Pet, please be at least vaguely reasonable with what you send us.</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "ap", name: "google_analytics_tracking_id", value: "UA-109525120-3"},
  %Env{ type: "config", website_acronym: "ap", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"}
]


Enum.map(ap_config_list, fn(config) -> 
  Repo.insert!(config)
end)


apo_config_list = [
  %Env{ type: "config", website_acronym: "apo", name: "website_acronym", value: "apo"},
  %Env{ type: "config", website_acronym: "apo", name: "website_name", value: "Awful Pokemon"},
  %Env{ type: "config", website_acronym: "apo", name: "website_name_lower", value: "awful pokemon"},
  %Env{ type: "config", website_acronym: "apo", name: "website_domain", value: "https://awfulpokemon.com"},
  %Env{ type: "config", website_acronym: "apo", name: "website_logo_png", value:  "/images/apo/APO.png"},
  %Env{ type: "config", website_acronym: "apo", name: "website_logo_svg", value:  "/images/apo/APO.svg"},
  %Env{ type: "config", website_acronym: "apo", name: "website_favicon", value:  "/images/apo/APO.ico"},
  %Env{ type: "config", website_acronym: "apo", name: "primary_email", value: "julius@awfulpokemon.com"},
  %Env{ type: "config", website_acronym: "apo", name: "password", value: "awfulpokemonforever1!"},
  %Env{ type: "config", website_acronym: "apo", name: "website_title", value: "Awful Pokemon | For All Your Awful Pokemon Gift Ideas"},
  %Env{ type: "config", website_acronym: "apo", name: "website_description", value: "Wanna catch em' all? Awful Pokemon features a wide range of gifts designed to make you feel a little more like Ash Ketchum, and a little less socially okay."},
  %Env{ type: "config", website_acronym: "apo", name: "website_keywords", value: "Awful Pokemon, pokemon gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "apo", name: "website_twitter", value:  "@AwfulPokemon"},
  %Env{ type: "config", website_acronym: "apo", name: "website_alt_image", value: "This is an awful pokemon image"},
  %Env{ type: "config", website_acronym: "apo", name: "blog_meta_description", value: "Woah, is that a Metapod I see!?!? Obviously not. But instead why not check out our Awful Pokemon blog where we discuss all the latest in Pokemon everything."},
  %Env{ type: "config", website_acronym: "apo", name: "categories_meta_description", value: "Grass type. Fire type. Water type. Much like in Pokemon itself our Awful Pokemon website is organised into neat categories so you can find what you need."},
  %Env{ type: "config", website_acronym: "apo", name: "updates_meta_description", value: "Last I heard, Ash was stuck in a typhoon off the coast of Haiti, and has been living off coconuts since. Find our more on our intuitive Updates section."},
  %Env{ type: "config", website_acronym: "apo", name: "grid_meta_description", value: "Much like a Pokedex our interactive gift grid allows you to view a range of our Pokemon related products"},
  %Env{ type: "config", website_acronym: "apo", name: "about_meta_description", value: "What more could you possibly want to know about Pokemon? It has Charizard. It has a TV show. It has ties to the Nazis during World War... let's forget that."},
  %Env{ type: "config", website_acronym: "apo", name: "contact_meta_description", value: "If you're really lonely and dying for comfort and attention, I recommend developing a life-threatening illness. You may also send our team a message."},
  %Env{ type: "config", website_acronym: "apo", name: "submit_meta_description", value: "Submit your Awful Pokemon product today, first by creating something truly awful (like a Pikachu amulet with burn scars) and watch the whole world cry."},
  %Env{ type: "config", website_acronym: "apo", name: "login_meta_description", value: "When you login to Awful Pokemon you recieve a free rare shiny Pokemon, as well as a personal meet n' greet with Misty herself and her actual real-life Pokemon."},
  %Env{ type: "config", website_acronym: "apo", name: "register_meta_description", value: "Register at Awful Pokemon to experience something much more profound than Pokemon itself. The realisation that you're not going to live forever."},
  %Env{ type: "config", website_acronym: "apo", name: "search_meta_description", value: "Search for your favourite Pokemon gifts in our somewhat bland and uninteresting product search bar. At least that's what my boss told me to write."},
  %Env{ type: "config", website_acronym: "apo", name: "about_copy", value:  "<p><span style='text-decoration: underline; color: red'>awful pokemon.</span> is an online catalogue of the most awful pokemon gifts available on the internet! Much like a Magikarp in... Magikarp form!</p><p>Perhaps you have the desire to ruin your childhood memories, sitting in the playground trading cards with your long forgotten foes.</p><p>In my case, it being tricked by a bunch of older kids in primary school to trade my shiny Zapdos for a fake Muk.</p><p>Lest we never forget.</p><p>Regards,</p><p>Awful Pokemon</p>"},
  %Env{ type: "config", website_acronym: "apo", name: "submit_copy", value:  "<p>I know what your heart is telling.</p><p>It's tell you to find an Awful Pokemon related gift and post it into our submission form!</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "apo", name: "google_analytics_tracking_id", value: "UA-109525120-4"},
  %Env{ type: "config", website_acronym: "apo", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"}
]


Enum.map(apo_config_list, fn(config) -> 
  Repo.insert!(config)
end)



aw_config_list = [
  %Env{ type: "config", website_acronym: "aw", name: "website_acronym", value: "aw"},
  %Env{ type: "config", website_acronym: "aw", name: "website_name", value: "Awful Wedding"},
  %Env{ type: "config", website_acronym: "aw", name: "website_name_lower", value: "awful wedding"},
  %Env{ type: "config", website_acronym: "aw", name: "website_domain", value: "https://awfulwedding.com"},
  %Env{ type: "config", website_acronym: "aw", name: "website_logo_png", value: "/images/aw/AW.png"},
  %Env{ type: "config", website_acronym: "aw", name: "website_logo_svg", value: "/images/aw/AW.svg"},
  %Env{ type: "config", website_acronym: "aw", name: "website_favicon", value: "/images/wc/WC.ico"},
  %Env{ type: "config", website_acronym: "aw", name: "primary_email", value: "julius@awfulwedding.com"},
  %Env{ type: "config", website_acronym: "aw", name: "password", value: "awfulweddingforever1!"},
  %Env{ type: "config", website_acronym: "aw", name: "website_title", value: "Awful Wedding | For All Your Awful Wedding Gift Ideas"},
  %Env{ type: "config", website_acronym: "aw", name: "website_description", value: "Ever dreamed of ruining someone's wedding? Now you can! With our range of awful gifts, you'll be sure to please absolutely no one."},
  %Env{ type: "config", website_acronym: "aw", name: "website_keywords", value: "Awful Wedding, wedding gifts, gifts, gift website, awful gift website, julius reade, julius reade is aweome, #YOLO"},
  %Env{ type: "config", website_acronym: "aw", name: "website_twitter", value: "@AwfulWedding"},
  %Env{ type: "config", website_acronym: "aw", name: "website_alt_image", value: "This is an Awful Wedding image"},
  %Env{ type: "config", website_acronym: "aw", name: "blog_meta_description", value: "Wedding topics are usually boring to write about. Oh, except when it's about how to ruin a wedding. Then it's super interesting and fun! Check out our blog!"},
  %Env{ type: "config", website_acronym: "aw", name: "categories_meta_description", value: "In order to ensure your safety (and sanity) we have organised our gifts and products into these wonderful categories. Yes, we know we're thoughtful."},
  %Env{ type: "config", website_acronym: "aw", name: "updates_meta_description", value: "Want to know what's going on in the Awful Wedding offices? Well, much like the revered Big Brother house, you too can spy on the updates we post."},
  %Env{ type: "config", website_acronym: "aw", name: "grid_meta_description", value: "With our wacky, somewhat inappropiate interactive product grid you can now search through our wade of products like an absolute monster. Stay scary."},
  %Env{ type: "config", website_acronym: "aw", name: "about_meta_description", value: "Awful Wedding is the world's repository of Awful Wedding gifts, like this plunger we pulled out a of ditch in the middle of the salty Bahama sea."},
  %Env{ type: "config", website_acronym: "aw", name: "contact_meta_description", value: "Contact forms are amazing. With such a form you can let me know what you're feeling, how you're feeling, as well as what you're wearing."},
  %Env{ type: "config", website_acronym: "aw", name: "submit_meta_description", value: "Product submissions into the Awful Wedding website are heartily endorsed by all your favourite celebrities, such as Cameron Diaz (please don't sue me)."},
  %Env{ type: "config", website_acronym: "aw", name: "login_meta_description", value: "Login to the Awful Wedding platform and you'll discover a treasure trove of things, like h1 and p HTML elements on the page."},
  %Env{ type: "config", website_acronym: "aw", name: "register_meta_description", value: "Awful Wedding Registrations are at an all-time low, which is why for a limited time only we're making registrations absolutely free!"},
  %Env{ type: "config", website_acronym: "aw", name: "search_meta_description", value: "Oh please, you absolute sleazy. Why must you nose around the website? Regardless, here is the search webpage if you must."},
  %Env{ type: "config", website_acronym: "aw", name: "about_copy", value: "<p><span style='text-decoration: underline; color: red'>awful wedding.</span> is an online catalogue of the most awful wedding gifts available on the internet! Because you absolutely hate weddings.</p><p>Everyone knows that weddings are good for precisely two things. Eating mass-produced, above-average food and watching a bunch of old people try and boogie on the dance floor like it's 1983.</p><p>Now you can actively contribute towards that culture by making the bride cry.</p><p>Sincerely,</p><p>Awful Wedding</p>"},
  %Env{ type: "config", website_acronym: "aw", name: "submit_copy", value: "<p>Wanna submit your wonderfully awful product?</p><p>Thankfully, the brains trust here at Awful Wedding have figured out a way for you to do just that with our product submissions form!</p><p>Submissions are free, although our team of professional gifters decide whether it goes on the website or not. Common sense applies.</p><p>All submissions will be considered, and we'll email you if/once we decide to put your product on our store.</p><p>To have your product considered, please fill out the form below.</p>"},
  %Env{ type: "config", website_acronym: "ac", name: "letter_copy", value: "<p>dear santa.</p><p>i hate you.</p><p>i got a piece of coal last year and it wasn't even the piece of coal i wanted.</p><p>i vow to only send awful gifts this christmas to avenge my coal.</p><p>signed.</p><p>the internet.</p>"  },
  %Env{ type: "config", website_acronym: "aw", name: "google_analytics_tracking_id", value: "UA-109525120-8"},
  %Env{ type: "config", website_acronym: "aw", name: "google_site_verification", value: "4nN_Nc0KZMdR02zr9XpnGHLG9i6bYXmNxUdsrxNDmv4"}
]


Enum.map(aw_config_list, fn(config) -> 
  Repo.insert!(config)
end)




ap_individual_env_list = [
  %Env{ type: "individual", website_acronym: "ap", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulpet.com"},
  %Env{ type: "individual", website_acronym: "ap", name: "amazon_s3_bucket_name", value: "awfulpet.com"},
  %Env{ type: "individual", website_acronym: "ap", name: "recaptcha_public_key", value: "6LchUTwUAAAAAGxG6jTurRoFAiaClTChQralMXGk"},
  %Env{ type: "individual", website_acronym: "ap", name: "recaptcha_private_key", value: "6LchUTwUAAAAALcw8zepd2e859JijDFiPZCpeigm"},
  %Env{ type: "individual", website_acronym: "ap", name: "twitter_api_key", value: "UHhlOSx8L6KT1xauTm8COOqe4"},
  %Env{ type: "individual", website_acronym: "ap", name: "twitter_secret_key", value: "W3E1QRE0MuGp1f8eADAY2WqXQE4oF6jcoweByTfOI4Qa6N75is"},
  %Env{ type: "individual", website_acronym: "ap", name: "twitter_access_token", value: "940779330036056064-0chvycamqUKSvuiIlUErIs7xsdgjA68"},
  %Env{ type: "individual", website_acronym: "ap", name: "twitter_access_token_secret", value: "jaxwI7a72oh61our8x4dARVChve2x8ldfVaKXwUZi0IXB"},
  %Env{ type: "individual", website_acronym: "ap", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "facebook_redirect_url", value: "https://awfulpet.com/admin"},
  %Env{ type: "individual", website_acronym: "ap", name: "tumblr_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "tumblr_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "tumblr_blog_identifier", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "pintrest_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ap", name: "pintrest_secret_key", value: ""}
]



Enum.map(ap_config_list, fn(config) -> 
  Repo.insert!(config)
end)
  
  


a9_individual_env_list = [
  %Env{ type: "individual", website_acronym: "a9", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awful90s.com"},
  %Env{ type: "individual", website_acronym: "a9", name: "amazon_s3_bucket_name", value: "awful90s.com"},
  %Env{ type: "individual", website_acronym: "a9", name: "recaptcha_public_key", value: "6LcaVTwUAAAAAMvuWp-uYfHt7RpDm9Ansd92eimI"},
  %Env{ type: "individual", website_acronym: "a9", name: "recaptcha_private_key", value: "6LcaVTwUAAAAAOT40FivKmTtlM2wS3wOLStji9nr"},
  %Env{ type: "individual", website_acronym: "a9", name: "twitter_api_key", value: "X0eEiGYRy6dxtgKPhaX9b3DHE"},
  %Env{ type: "individual", website_acronym: "a9", name: "twitter_secret_key", value: "0PtwTiBVy63uFTbkESDIgOILg2saZ4WKJrSyg4V8bZeaiMQ1ym"},
  %Env{ type: "individual", website_acronym: "a9", name: "twitter_access_token", value: "940784377566412800-kcrL1SxGqJAR3Xf1W6hE6Ej8Uoudtx9"},
  %Env{ type: "individual", website_acronym: "a9", name: "twitter_access_token_secret", value: "mUAPnDISThovNjHvv7JJ9gkN9r4pAhZ3s8mxFXnCfuDA9"},
  %Env{ type: "individual", website_acronym: "a9", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "a9", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "a9", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "a9", name: "facebook_redirect_url", value: "https://awful90s.com/admin"},
  %Env{ type: "individual", website_acronym: "a9", name: "tumblr_api_key", value: "so0IMHhntDGK1UrgN3cZljtGL15UwW9FtGpMwb4uR7p3Ngdk3D"},
  %Env{ type: "individual", website_acronym: "a9", name: "tumblr_secret_key", value: "3D8BOizpQ89v6eNApfGNIT37l6HbLpXZqw8nxxUdqK5ZXrUCEi"},
  %Env{ type: "individual", website_acronym: "a9", name: "tumblr_blog_identifier", value: "awful90s"},
  %Env{ type: "individual", website_acronym: "a9", name: "pintrest_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "a9", name: "pintrest_secret_key", value: ""}
]



Enum.map(a9_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)
  
  


ac_individual_env_list = [
  %Env{ type: "individual", website_acronym: "ac", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulchristmas.com"},
  %Env{ type: "individual", website_acronym: "ac", name: "amazon_s3_bucket_name", value: "awfulchristmas.com"},
  %Env{ type: "individual", website_acronym: "ac", name: "recaptcha_public_key", value: "6LcC0ToUAAAAAIV3lQfzUJW_ZYKKf-70KCualeic"},
  %Env{ type: "individual", website_acronym: "ac", name: "recaptcha_private_key", value: "6LcC0ToUAAAAACVxDg2vWI2DCphiuYmbgQWKG6il"},
  %Env{ type: "individual", website_acronym: "ac", name: "twitter_api_key", value: "ROfKoew2nqf7VyPZ0nmGHTOo7"},
  %Env{ type: "individual", website_acronym: "ac", name: "twitter_secret_key", value: "vXSXkKtnMimHJz56qXM1cb4KIeg4blKLLthWOCYB1eufEu2gXZ"},
  %Env{ type: "individual", website_acronym: "ac", name: "twitter_access_token", value: "930616447708958722-sewkAAXE3lG6GHHuZ2FqHYw5mcR1ROv"},
  %Env{ type: "individual", website_acronym: "ac", name: "twitter_access_token_secret", value: "ZxAa02VRLzlmXKKsDcVJer1DFoi8SgmIgMRlRtZXzkFrN"},
  %Env{ type: "individual", website_acronym: "ac", name: "facebook_api_key", value: "191659168072517"},
  %Env{ type: "individual", website_acronym: "ac", name: "facebook_secret_key", value: "9b20da0063c4a1a1ebbfcf5f1ac51240"},
  %Env{ type: "individual", website_acronym: "ac", name: "facebook_page_id", value: "1004168936392087"},
  %Env{ type: "individual", website_acronym: "ac", name: "facebook_redirect_url", value: "https://awfulchristmas.com/admin"},
  %Env{ type: "individual", website_acronym: "ac", name: "tumblr_api_key", value: "SCe6ac58Lj7PbFYm4T2rcOUveF5MKqrFKZApMcvwY4soZVz6iy"},
  %Env{ type: "individual", website_acronym: "ac", name: "tumblr_secret_key", value: "DkOylgyT5sJRIjuyHtkZAzxIHBStaFDknWs8B8Lt0RYyGFsdye"},
  %Env{ type: "individual", website_acronym: "ac", name: "tumblr_blog_identifier", value: "awfulchristmas"},
  %Env{ type: "individual", website_acronym: "ac", name: "pintrest_api_key", value: "4934050139498101325"},
  %Env{ type: "individual", website_acronym: "ac", name: "pintrest_secret_key", value: "552a7ddedc0370773065ca09e4f3bda293021d046545621afe9b5fac6d86162f"}
]


Enum.map(ac_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)
  

af_individual_env_list = [
  %Env{ type: "individual", website_acronym: "af", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulfashion.com"},
  %Env{ type: "individual", website_acronym: "af", name: "amazon_s3_bucket_name", value: "awfulfashion.com"},
  %Env{ type: "individual", website_acronym: "af", name: "recaptcha_public_key", value: "6Lf-UzwUAAAAAND-tCnJtoIncf_VxUe7KBitJwSq"},
  %Env{ type: "individual", website_acronym: "af", name: "recaptcha_private_key", value: "6Lf-UzwUAAAAANeGp6XzCF-f-miMwRHRhQ9zzoFP"},
  %Env{ type: "individual", website_acronym: "af", name: "twitter_api_key", value: "vzpX55DD5wS0JzcuzfNHbvLKh"},
  %Env{ type: "individual", website_acronym: "af", name: "twitter_secret_key", value: "JZO8NxrzUAKVTdy8k1rLi9BvE19qrPKzJbNAIZdlDW5l01RS2D"},
  %Env{ type: "individual", website_acronym: "af", name: "twitter_access_token", value: "940777491819458561-eM9F4N8JIiBbPmrUJn0qUo8yCe5ywxe"},
  %Env{ type: "individual", website_acronym: "af", name: "twitter_access_token_secret", value: "oeC0eJTR5wnOgrPdcqMRYJvip4MBV8y61KIGpXbC1bO8M"},
  %Env{ type: "individual", website_acronym: "af", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "af", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "af", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "af", name: "facebook_redirect_url", value: "https://awfulfashion.com/admin"},
  %Env{ type: "individual", website_acronym: "af", name: "tumblr_api_key", value: "6lfeHEaA2i5YJtAqVTCJoka13b34KjtQVK1JtCKZiupUJYZvXE"},
  %Env{ type: "individual", website_acronym: "af", name: "tumblr_secret_key", value: "PBg3DwMnSCoI9m8Nnq7WwXacM0UMFS3Oo1Dtc6BBrLupUt3E0t"},
  %Env{ type: "individual", website_acronym: "af", name: "tumblr_blog_identifier", value: ""},
  %Env{ type: "individual", website_acronym: "af", name: "pintrest_api_key", value: "4939296852194378973"},
  %Env{ type: "individual", website_acronym: "af", name: "pintrest_secret_key", value: "f332843dbf979934ea9e7f94336ef3e4fa44b9017017c528c14266c3609f60b0"}
]



Enum.map(af_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)
  


ach_individual_env_list = [
  %Env{ type: "individual", website_acronym: "ach", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulchild.com"},
  %Env{ type: "individual", website_acronym: "ach", name: "amazon_s3_bucket_name", value: "awfulchild.com"},
  %Env{ type: "individual", website_acronym: "ach", name: "recaptcha_public_key", value: "6LciUTwUAAAAAPllFlk9E0ga19ROzq6F3L5Wusus"},
  %Env{ type: "individual", website_acronym: "ach", name: "recaptcha_private_key", value: "6LciUTwUAAAAAJGgpa4snKJLJdkkyYzBtp_vQhOt"},
  %Env{ type: "individual", website_acronym: "ach", name: "twitter_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "twitter_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "twitter_access_token", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "twitter_access_token_secret", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "facebook_redirect_url", value: "https://awfulchild.com/admin"},
  %Env{ type: "individual", website_acronym: "ach", name: "tumblr_api_key", value: "sZYvyQVc1gxmaxCVytV6GRAFS6OFW9u6riwdouqIaWXIoDdHQr"},
  %Env{ type: "individual", website_acronym: "ach", name: "tumblr_secret_key", value: "8ARgv3xiASWXMXrLGilHSdGn5Z82w234RQz7m6IBPIO2zFW8d9"},
  %Env{ type: "individual", website_acronym: "ach", name: "tumblr_blog_identifier", value: "afwulchild"},
  %Env{ type: "individual", website_acronym: "ach", name: "pintrest_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ach", name: "pintrest_secret_key", value: ""}
]



Enum.map(ach_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)
  


ahp_individual_env_list = [
  %Env{ type: "individual", website_acronym: "ahp", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulharrypotter.com"},
  %Env{ type: "individual", website_acronym: "ahp", name: "amazon_s3_bucket_name", value: "awfulharrypotter.com"},
  %Env{ type: "individual", website_acronym: "ahp", name: "recaptcha_public_key", value: "6LesUTwUAAAAABx0s5WCIiDe09ZqNfpPeAEpNi-Q"},
  %Env{ type: "individual", website_acronym: "ahp", name: "recaptcha_private_key", value: "6LesUTwUAAAAAMtYjZL0EOx0NK1F4jwqZ179Uwqj"},
  %Env{ type: "individual", website_acronym: "ahp", name: "twitter_api_key", value: "7GAIAKYt8UDGQxVdznsalRe5O"},
  %Env{ type: "individual", website_acronym: "ahp", name: "twitter_secret_key", value: "TxKgKzEC76DML6zo7nimNebVRFdN6TUJcBDBgjsG5djdDWlLMZ"},
  %Env{ type: "individual", website_acronym: "ahp", name: "twitter_access_token", value: "940783113663258624-Y0kfZG0rDt7ZsIEZpl28iOmPzoJbZwv"},
  %Env{ type: "individual", website_acronym: "ahp", name: "twitter_access_token_secret", value: "a0uIIn7bGFLLXiNyeQ5hPJpHpT1fTpHxDxYKDmX0uU6us"},
  %Env{ type: "individual", website_acronym: "ahp", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ahp", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "ahp", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "ahp", name: "facebook_redirect_url", value: "https://awfulharrypotter.com/admin"},
  %Env{ type: "individual", website_acronym: "ahp", name: "tumblr_api_key", value: "Mql0SIZkf7vPuVFMkmrQgXUEyO5fjU68UujfFV2qiayatR5G9c"},
  %Env{ type: "individual", website_acronym: "ahp", name: "tumblr_secret_key", value: "Lxu9RuYxNvS3LP7LWMcgZA2z3X65nFxU92AfvFJR6QkpexMzy4"},
  %Env{ type: "individual", website_acronym: "ahp", name: "tumblr_blog_identifier", value: "awfulharrypotter"},
  %Env{ type: "individual", website_acronym: "ahp", name: "pintrest_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "ahp", name: "pintrest_secret_key", value: ""}
]



Enum.map(ahp_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)



aw_individual_env_list = [
  %Env{ type: "individual", website_acronym: "aw", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulwedding.com"},
  %Env{ type: "individual", website_acronym: "aw", name: "amazon_s3_bucket_name", value: "awfulwedding.com"},
  %Env{ type: "individual", website_acronym: "aw", name: "recaptcha_public_key", value: "6LckUTwUAAAAAJpC-H3Nuzf2t1GTOcKIfhULxfZk"},
  %Env{ type: "individual", website_acronym: "aw", name: "recaptcha_private_key", value: "6LckUTwUAAAAAO68V37RBqYOdFOWRa57Pwx37bC8"},
  %Env{ type: "individual", website_acronym: "aw", name: "twitter_api_key", value: "99daYzudox9o9WXfqMbs0VsuZ"},
  %Env{ type: "individual", website_acronym: "aw", name: "twitter_secret_key", value: "vg3CkJGBMaKt7GSqClwqTccwzGQ3dHNFzmSXOCsoYjuP9rdTzt"},
  %Env{ type: "individual", website_acronym: "aw", name: "twitter_access_token", value: "940790562462060551-X1OUUiaL5pOHYp0bd2CGTqT3eYZCZH9"},
  %Env{ type: "individual", website_acronym: "aw", name: "twitter_access_token_secret", value: "64W7csbWIGxKQcvirD0lSY6uhswgj3tlgquM0f27P6g5q"},
  %Env{ type: "individual", website_acronym: "aw", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "aw", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "aw", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "aw", name: "facebook_redirect_url", value: "https://awfulwedding.com/admin"},
  %Env{ type: "individual", website_acronym: "aw", name: "tumblr_api_key", value: "GCnvP9cSOd8xzokz0IyoOjmZY9Ohwy0ApN5JKFPQnjt4L5ljcQ"},
  %Env{ type: "individual", website_acronym: "aw", name: "tumblr_secret_key", value: "14x2RBrlVLk0zd4p45VnnZvMMI8R1ctAqb4sya1oSYcU3cfv95"},
  %Env{ type: "individual", website_acronym: "aw", name: "tumblr_access_token", value:  "UySZ2DRpIQSnafKYQU6Pe0eMGN4PD1BIYf9iHn0A9h1ZxeXhq8"},
  %Env{ type: "individual", website_acronym: "aw", name: "tumblr_access_token_secret", value:  "sZYLcADrTemz298J4va30qSQEXys5nEJI0F9p0rpxQWve5SFQu"},
  %Env{ type: "individual", website_acronym: "aw", name: "tumblr_blog_identifier", value: "awfulwedding"},
  %Env{ type: "individual", website_acronym: "aw", name: "pintrest_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "aw", name: "pintrest_secret_key", value: ""}
]


Enum.map(aw_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)



apo_individual_env_list = [
  %Env{ type: "individual", website_acronym: "apo", name: "mailgun_domain", value: "https://api.mailgun.net/v3/mg.awfulpokemon.com"},
  %Env{ type: "individual", website_acronym: "apo", name: "amazon_s3_bucket_name", value: "awfulpokemon.com"},
  %Env{ type: "individual", website_acronym: "apo", name: "recaptcha_public_key", value: "6LcBUjwUAAAAACIpUulHPhUtOLUU5KBVoCfhj8wy"},
  %Env{ type: "individual", website_acronym: "apo", name: "recaptcha_private_key", value: "6LcBUjwUAAAAAM3AC--dbpdWE6OTNHhC18h-lw9L"},
  %Env{ type: "individual", website_acronym: "apo", name: "twitter_api_key", value: "7rYsVnWdYVPbJUFbhcDbMGcZw"},
  %Env{ type: "individual", website_acronym: "apo", name: "twitter_secret_key", value: "V4KP8HpPsM4noRlUxypKeUc9hEnXTlY7ikOBihQLmjDGNf5w6w"},
  %Env{ type: "individual", website_acronym: "apo", name: "twitter_access_token", value: "940781469131087872-XYQO0HDVTWp3DitWCopSUJGxX53tGAi"},
  %Env{ type: "individual", website_acronym: "apo", name: "twitter_access_token_secret", value: "v9QXoMw2kMci8SIjZcYsHQFPEUvAgcadUYEMfKeNRRwSF"},
  %Env{ type: "individual", website_acronym: "apo", name: "facebook_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "apo", name: "facebook_secret_key", value: ""},
  %Env{ type: "individual", website_acronym: "apo", name: "facebook_page_id", value: ""},
  %Env{ type: "individual", website_acronym: "apo", name: "facebook_redirect_url", value: "https://awfulpokemon.com/admin"},
  %Env{ type: "individual", website_acronym: "apo", name: "tumblr_api_key", value: "Z0c557rX93PB9vaXEL1NYaveSshZw6iGmQcwUahzC1WsowXiQE"},
  %Env{ type: "individual", website_acronym: "apo", name: "tumblr_secret_key", value: "7LmWr9NIZKKEvZk9eKRjD93oNUYU0KV00Qb2Ql23xYPDqKWt2w"},
  %Env{ type: "individual", website_acronym: "apo", name: "tumblr_access_token", value: "UySZ2DRpIQSnafKYQU6Pe0eMGN4PD1BIYf9iHn0A9h1ZxeXhq8"},
  %Env{ type: "individual", website_acronym: "apo", name: "tumblr_access_token_secret", value: "sZYLcADrTemz298J4va30qSQEXys5nEJI0F9p0rpxQWve5SFQu"},
  %Env{ type: "individual", website_acronym: "apo", name: "tumblr_blog_identifier", value: "awfulpokemon"},
  %Env{ type: "individual", website_acronym: "apo", name: "pintrest_api_key", value: ""},
  %Env{ type: "individual", website_acronym: "apo", name: "pintrest_secret_key", value: ""}
]



Enum.map(apo_individual_env_list, fn(config) -> 
  Repo.insert!(config)
end)






















