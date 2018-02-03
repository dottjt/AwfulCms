defmodule Awful.GoogleAnalytics do

    import Ecto.Query, warn: false
    alias Ac.Repo
    
    alias Awful.CoreHttp


    # GET https://www.googleapis.com/analytics/v3/management/accountSummaries?key={YOUR_API_KEY}
    #  fetch account details etc. 



    def fetch_analytics_data(ga_view_id) do
        # analytics.data.ga.get

        IO.inspect "start here"

        today_url = "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A#{ga_view_id}&start-date=today&end-date=today&metrics=ga%3Asessions&key=#{System.get_env("GA_API_KEY")}"
        yesterday_url = "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A#{ga_view_id}&start-date=yesterday&end-date=yesterday&metrics=ga%3Asessions&key=#{System.get_env("GA_API_KEY")}"
        week_url = "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A#{ga_view_id}&start-date=7daysAgo&end-date=today&metrics=ga%3Asessions&key=#{System.get_env("GA_API_KEY")}"
        month_url = "https://www.googleapis.com/analytics/v3/data/ga?ids=ga%3A#{ga_view_id}&start-date=30daysAgo&end-date=today&metrics=ga%3Asessions&key=#{System.get_env("GA_API_KEY")}"

        

        {body_today, message} = CoreHttp.http_get_and_message(today_url, "Fetch Analytics Data - Today", "Complete", "success")

        # {body_yesterday, message} = CoreHttp.http_get_and_message(today_url, "Fetch Analytics Data - Yesterday", "Complete", "success")
        # {body_week, message} = CoreHttp.http_get_and_message(today_url, "Fetch Analytics Data - Week", "Complete", "success")
        # {body_month, message} = CoreHttp.http_get_and_message(today_url, "Fetch Analytics Data - Month", "Complete", "success")

        IO.inspect body_today

        # I will need to break down and decode all of these things. 
        body_today
        
        # {body_today, body_yesterday, body_week, body_month}
        
    end 

    def add_site do
        # webmasters.sites.add

        siteUrl = "http://www.example.com/"
    end
    
    def create_remarketing_audience_list do
        #analytics.management.remarketingAudience.insert

        #accountId
        #webPropertyId
        #fields
        #Request body

        #analytics.management.remarketingAudience.get
    end

    def create_property do 
        #analytics.management.webproperties.insert
        # need beta access
        # url = https://www.googleapis.com/analytics/v3/management/accounts/109525120/webproperties?key={YOUR_API_KEY}


        #accountId
        #fields
        #request body
    end
end