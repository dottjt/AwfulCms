defmodule AcWeb.ProductView do
  use AcWeb, :view


  # PRODUCT 
  def render("index.json", %{products: products}) do
    %{data: render_many(products, AcWeb.ProductView, "product.json")}
  end

  def render("show.json", %{product: product}) do
    %{data: render_one(product, AcWeb.ProductView, "product.json")}
  end

  def render("product.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      display_name: product.display_name,
      featured_image: product.featured_image,
      draft: product.draft,
      cta: product.cta,
      price: product.price,
      product_type: product.product_type,
      description: product.description,
      blog_description: product.blog_description,
      url: product.url,
      url_text: product.url_text}
  end


  # PRODUCT ASSOC
  def render("indexAssoc.json", %{products: products}) do
    %{data: render_many(products, AcWeb.ProductView, "productAssoc.json")}
  end

  def render("showAssoc.json", %{product: product}) do
    %{data: render_one(product, AcWeb.ProductView, "productAssoc.json")}
  end

  def render("productAssoc.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      display_name: product.display_name,
      featured_image: product.featured_image,
      draft: product.draft,
      cta: product.cta,
      price: product.price,
      product_type: product.product_type,
      description: product.description,
      blog_description: product.blog_description,
      url: product.url,
      url_text: product.url_text,          
      # categories: render_many(product.categories, AcWeb.ProductView, "productCategory.json"),
      category: render_one(product.category, AcWeb.ProductView, "productCategory.json"),
      sub_category: render_one(product.category, AcWeb.ProductView, "productSubCategory.json"),
      product_tags: render_many(product.product_tags, AcWeb.ProductView, "productTag.json"),
      product_like: render_one(product.product_like, AcWeb.ProductView, "productLike.json"),
      product_comments: render_many(product.product_comments, AcWeb.ProductView, "productComments.json")}
  end

  def render("productCategory.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      display_name: product.display_name,
      description: product.description,
      icon: product.icon}
  end

  def render("productSubCategory.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      display_name: product.display_name,
      description: product.description,
      icon: product.icon}
  end

  def render("productTag.json", %{product: product}) do
    %{id: product.id,
      name: product.name,
      display_name: product.display_name,
      description: product.description}
  end


  def render("productLike.json", %{product: product}) do
    %{id: product.id,
      total: product.total}
  end


  def render("productComments.json", %{product: product}) do
    %{id: product.id,
      text: product.text}
  end

end

