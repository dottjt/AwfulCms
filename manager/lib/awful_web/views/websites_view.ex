defmodule AwfulWeb.WebsitesView do
  use AwfulWeb, :view

  use Timex 

  # INDIVIDUAL
  def render("indexAssoc.json", %{productsAssoc: productsAssoc, categories: categories, tagsAssoc: tagsAssoc, postAssoc: postAssoc, productsDraft: productsDraft, message: message, social: social, updates: updates}) do
    %{ productsAssoc: render_many(productsAssoc, AwfulWeb.WebsitesView, "productAssoc.json", as: :productAssoc),
       categories: render_many(categories, AwfulWeb.WebsitesView, "category.json", as: :category),
       tagsAssoc: render_many(tagsAssoc, AwfulWeb.WebsitesView, "tagAssoc.json", as: :tagAssoc),
       posts: render_many(postAssoc, AwfulWeb.WebsitesView, "postAssoc.json", as: :post),
       productsDraft: render_many(productsDraft, AwfulWeb.WebsitesView, "product.json", as: :product),
       social: render_many(social, AwfulWeb.WebsitesView, "social.json", as: :social),
       updates: render_many(updates, AwfulWeb.WebsitesView, "update.json", as: :update),
       message: render_one(message, AwfulWeb.MessageView, "message.json", as: :message)}
  end


  def render("product.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      display_name: product.display_name,
      featured_image: product.featured_image,
      draft: product.draft,
      schedule_date: render_one(product.schedule_date, AwfulWeb.WebsitesView, "scheduleDate.json", as: :schedule_date),
      cta: product.cta,
      price: product.price,
      product_type: product.product_type,
      description: product.description,
      blog_description: product.blog_description,
      url: product.url,
      url_text: product.url_text}
  end


  def render("productAssocMessage.json", %{message: message, product: product}) do
    %{product: render_one(product, AwfulWeb.WebsitesView, "productAssoc.json", as: :product),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end


  def render("productAssoc.json", %{productAssoc: productAssoc}) do
    # IO.inspect productAssoc.category

    %{id: productAssoc.id,
      name: productAssoc.name,
      display_name: productAssoc.display_name,
      featured_image: productAssoc.featured_image,
      draft: productAssoc.draft,
      schedule_date: render_one(productAssoc.schedule_date, AwfulWeb.WebsitesView, "scheduleDate.json", as: :schedule_date),      
      cta: productAssoc.cta,
      price: productAssoc.price,
      product_type: productAssoc.product_type,
      description: productAssoc.description,
      blog_description: productAssoc.blog_description,
      url: productAssoc.url,
      inserted_at: productAssoc.inserted_at,
      url_text: productAssoc.url_text,   
             
      category: render_one(productAssoc.category, AwfulWeb.WebsitesView, "category.json", as: :category),
      product_tags: render_many(productAssoc.product_tags, AwfulWeb.WebsitesView, "tag.json", as: :tag),
      product_like: render_one(productAssoc.product_like, AwfulWeb.WebsitesView, "like.json", as: :like )}
  end

  def render("scheduleDate.json", %{schedule_date: schedule_date}) do
    # IO.inspect schedule_date
    # IO.inspect schedule_date["day"]

    product_schedule_date = Timex.to_date(schedule_date)
          
    struct = %{"year" => product_schedule_date.year, "month" => product_schedule_date.month, "day" => product_schedule_date.day}

    %{
      day: struct["day"],
      month: struct["month"],
      year: struct["year"],
    }
  end


  def render("category.json", %{category: category}) do
    %{id: category.id,
      name: category.name,
      display_name: category.display_name,
      description: category.description,
      icon: category.icon}
  end
  

  def render("tag.json", %{tag: tag}) do
    %{id: tag.id,
      name: tag.name,
      display_name: tag.display_name,
      description: tag.description}
  end


  def render("tagAssoc.json", %{tagAssoc: tagAssoc}) do
    # IO.inspect tagAssoc 

    %{id: tagAssoc.id,
      name: tagAssoc.name,
      display_name: tagAssoc.display_name,
      description: tagAssoc.description,
      products: render_many(tagAssoc.products, AwfulWeb.WebsitesView, "product.json", as: :product),
      posts: render_many(tagAssoc.posts, AwfulWeb.WebsitesView, "post.json", as: :post)}    
  end


  def render("like.json", %{like: like}) do
    %{id: like.id,
      total: like.total}
  end


  # tagsAssoc
  # posts


  def render("postAssoc.json", %{post: post}) do
    %{id: post.id,
    name: post.name,
    display_name: post.display_name,
    author: post.author,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    post_type: post.post_type,
    product_limit: post.product_limit,
    product_offset: post.product_offset,
    tag: render_one(post.tag, AwfulWeb.WebsitesView, "tag.json", as: :tag)}    
    
    # post.tag} 
    # blog_comments
  end

  def render("post.json", %{post: post}) do
    %{id: post.id,
    name: post.name,
    display_name: post.display_name,
    author: post.author,
    excerpt: post.excerpt,
    featured_image: post.featured_image,
    post_type: post.post_type,
    product_limit: post.product_limit,
    product_offset: post.product_offset}
    # tag 
    # blog_comments
  end


  def render("social.json", %{social: social}) do
    %{id: social.id,
      name: social.name,
      description: social.description,
      display_name: social.display_name,
      url: social.url,
      draft: social.draft,
      schedule_date: render_one(social.schedule_date, AwfulWeb.WebsitesView, "scheduleDate.json", as: :schedule_date),
      facebook_code: social.facebook_code,
      featured_image: social.featured_image,
      image_caption: social.image_caption,
      social_media_type: social.social_media_type,
      tags: social.tags}
  end


  def render("update.json", %{update: update}) do
    %{ id: update.id,
       name: update.name,
       display_name: update.display_name,
       title: update.title,
       excerpt: update.excerpt,
       draft: update.draft,
       schedule_date: render_one(update.schedule_date, AwfulWeb.WebsitesView, "scheduleDate.json", as: :schedule_date),
       author: update.author}

  end


  #  PREFIL


  def render("new_product.json", %{product: product}) do
    # IO.inspect product.category

    %{
      # display_name: product.display_name,
      featured_image: product.featured_image,
      price: product.price,
      # description: ""
      # blog_description: product.blog_description,
      url: product.url
    }
      # inserted_at: product.inserted_at,
      # url_text: product.url_text,   
             
      # category: render_one(product.category, AwfulWeb.WebsitesView, "category.json", as: :category),
      # product_tags: render_many(product.product_tags, AwfulWeb.WebsitesView, "tag.json", as: :tag),
      # product_like: render_one(product.product_like, AwfulWeb.WebsitesView, "like.json", as: :like )}
  end


  def render("new_product_prefil.json", %{message: message, product: product}) do
    %{product: render_one(product, AwfulWeb.WebsitesView, "new_product.json", as: :product),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("social_media_prefil.json", %{message: message, prefil: prefil}) do
    %{prefil: render_one(prefil, AwfulWeb.WebsitesView, "prefil.json"),
      message: render_one(message, AwfulWeb.MessageView, "message.json")}
  end

  def render("prefil.json", %{prefil: prefil}) do
    %{display_name: prefil.display_name, 
      featured_image: prefil.featured_image,
      url: prefil.url,
      description: prefil.description}
  end



end
