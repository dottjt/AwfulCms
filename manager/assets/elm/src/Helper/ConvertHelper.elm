module Helper.ConvertHelper exposing (..)

import Model.ModelProduct exposing (..)



productAssocToProductForm : ProductAssoc -> ProductForm 
productAssocToProductForm productAssoc = 
    { display_name = productAssoc.display_name
    , description = productAssoc.description
    , blog_description = productAssoc.blog_description
    , original_featured_image = ""
    , featured_image = productAssoc.featured_image
    , draft = productAssoc.draft
    , schedule_date = productAssoc.schedule_date
    , cta = productAssoc.cta
    , price = productAssoc.price
    , url = productAssoc.url
    , url_text = productAssoc.url_text
    , category = productAssoc.category
    , category_id = productAssoc.category.id
    , tag_id = List.map (\x -> x.id) productAssoc.product_tags
    , product_like = productAssoc.product_like.total
    , product_type = productAssoc.product_type
    }


postAssocToProductForm : PostAssoc -> PostForm 
postAssocToProductForm postAssoc = 
    { display_name = postAssoc.display_name
    , author = postAssoc.author
    , excerpt = postAssoc.excerpt
    , featured_image = postAssoc.featured_image
    , post_type = postAssoc.post_type
    , tag = postAssoc.tag
    , product_limit = postAssoc.product_limit
    , product_offset = postAssoc.product_offset
    }


socialToSocialForm : Social -> SocialForm 
socialToSocialForm social = 
    { display_name = social.display_name
    , description = social.description
    , tags = social.tags
    , draft = social.draft
    , schedule_date = social.schedule_date
    , facebook_code = social.facebook_code
    , featured_image = social.featured_image
    , url = social.url
    , image_caption = social.image_caption
    , social_media_type = social.social_media_type
    }    


tagAssocToTagForm : TagAssoc -> TagForm
tagAssocToTagForm tagAssoc =
    { display_name = tagAssoc.display_name
    , description = tagAssoc.description
    }    


updateToUpdateForm : Update -> UpdateForm
updateToUpdateForm update =
    { display_name = update.display_name
    , title = update.title
    , excerpt = update.excerpt
    , author = update.author
    , draft = update.draft 
    , schedule_date = update.schedule_date
    }    