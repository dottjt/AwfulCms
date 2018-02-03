defmodule Ac.Api do
    
    alias AcWeb.Endpoint
    alias AcWeb.Router.Helpers

    import Ecto.Query, warn: false
    alias Ac.Repo

    alias Ac.Item.Product

    alias Timex

    def list_product_draft do
        #  get time. schedule date in order to do that thing you were supposed to. 
        today = Timex.now
        IO.inspect "running"
        Repo.all(from p in Product, where: [draft: true, schedule_date: ^today], order_by: [desc: p.inserted_at] ) 
    end

    def publish_scheduled_posts do
        products = list_product_draft()
        Repo.update_all products, set: [draft: false]
    end
end