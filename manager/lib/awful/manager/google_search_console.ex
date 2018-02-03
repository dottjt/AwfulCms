defmodule Awful.GoogleSearchConsole do

    import Ecto.Query, warn: false
    alias Ac.Repo
    

    def add_site do
        # webmasters.sites.add

        siteUrl = "http://www.example.com/"

    end

    def add_sitemap do
        # webmasters.sitemaps.submit

        siteUrl = "http://www.example.com/"
        feedpath = "http://www.example.com/sitemap.xml"
    end


    
    def list_crawl_errors do
        # webmasters.urlcrawlerrorssamples.list

    end

    def get_crawl_errors(domain) do
        # webmasters.urlcrawlerrorssamples.get

    # siteUrl	
    # url	
    # category	
    # platform	
    # fields	

    end
    



end