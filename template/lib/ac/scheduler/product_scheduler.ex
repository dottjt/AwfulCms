defmodule Ac.ProductScheduler do
    
    import Ecto.Query, warn: false
    alias Ac.Repo

    alias Ac.Item.Product
    alias Ac.Blog.Update
    alias Ac.Blog.SocialMedia

    use Timex

    def list_product_draft(today) do
        from(p in Product, where: [draft: true, schedule_date: ^today])
    end

    def list_update_draft(today) do
        from(u in Update, where: [draft: true, schedule_date: ^today])
    end

    def list_social_media_draft(today) do
        from(sm in SocialMedia, where: [draft: true, schedule_date: ^today])
    end

    def publish_scheduled_posts do        
        today = Timex.today        
        
        list_product_draft(today)
            |> Repo.update_all(set: [draft: false])

        list_update_draft(today)
            |> Repo.update_all(set: [draft: false])
        
        list_social_media_draft(today)
            |> Repo.update_all(set: [draft: false])
    end
end