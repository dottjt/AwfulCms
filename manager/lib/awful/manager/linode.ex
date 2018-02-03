defmodule Awful.Linode do

    import Ecto.Query, warn: false
    alias Ac.Repo

    alias Awful.CoreHttp

    # STATUS


    def server_status do

        # https://login.linode.com/oauth/authorize?client_id=client_id
        # redirect_uri
        # response_type

        # https://login.linode.com/oauth/token

        url = "https://api.linode.com/v4/linode/instances/#{System.get_env("LINODE_INSTANCE_ID")}"
        header = ["Authorization": "Bearer "] # #{TOKEN}

        {body, message} = CoreHttp.http_get_header_and_message(url, header, "Fetch Server Status", "Complete", "success")

    end
    
    # CREATION 

    def create_dns_zone(url, email) do

        url = "https://api.linode.com/v4/domains"
        header = ["Authorization": "Bearer "] # #{TOKEN}

        {body, message} = CoreHttp.http_get_header_and_message(url, header, "Create DNS Zone", "Complete", "success")
        
    end

    def delete_record(url, type, match, domain_id) do

        # find records and filter 
        url = "https://api.linode.com/v4/domains/#{domain_id}/records"
        header = ["Authorization": "Bearer "] # #{TOKEN}

        {body, message} = CoreHttp.http_get_header_and_message(url, header, "Find Record Id", "Complete", "success")
        # get record_id from the body
        record_id = "fake, for testing"

        # delete_record
        delete_url = "https://api.linode.com/v4/domains/#{domain_id}/records/#{record_id}"
        header =  ["Authorization": "Bearer "] # #{TOKEN}

        {body, message} = CoreHttp.http_delete_header_and_message(url, header, "Delete Record", "Complete", "success")

    end

    def create_record(url, type, name, value, domain_id) do
        # need domain_id 

        url = "https://api.linode.com/v4/domains/#{domain_id}/records"
        body = Poison.encode!(%{
            url: url,
            type: type,
            name: name,
            value: value
        })
        header = ["Authorization": "Bearer "] # #{TOKEN}, "Content-Type": "Application/json; Charset=utf-8"] # application/json

        {body, message} = CoreHttp.http_post_header_and_message(url, body, header, "Create Record", "Complete", "success")

    end

    def create_mx_record(url, type, name, value, priority, domain_id) do

        url = "https://api.linode.com/v4/domains/#{domain_id}/records"
        body = Poison.encode!(%{
            url: url,
            type: type,
            name: name,
            value: value,
            priority: priority
        })
        header = ["Authorization": "Bearer "] # #{TOKEN}, "Content-Type": "Application/json; Charset=utf-8"] # application/json

        {body, message} = CoreHttp.http_post_header_and_message(url, body, header, "Create MX Record", "Complete", "success")

    end

    def create_srv_record(url, type, name, value, port, protocol, weight, priority, domain_id) do

        url = "https://api.linode.com/v4/domains/#{domain_id}/records"
        body = Poison.encode!(%{
            url: url,
            type: type,
            name: name,
            value: value,
            port: port,
            protocol: protocol,
            weight: weight,
            priority: priority
        })
        header = ["Authorization": "Bearer "] # #{TOKEN}, "Content-Type": "Application/json; Charset=utf-8"] # application/json

        {body, message} = CoreHttp.http_post_header_and_message(url, body, header, "Create SRV Record", "Complete", "success")
        
    end



    # COMPILE 
    def default_dns_setup(url) do 
        email = Application.get_env(:awful, :email)
        
        mailgun_mx = "mail.mg.awful90s.com"

        # create DNS Zone
        Linode.create_dns_zone(url, email)

        # delete mail A Record
        Linode.delete_record(url, "A", "mail")
        Linode.delete_record(url, "A", "mail")

        # setup MX Records
        Linode.create_mx_record(url, "MX", "mx1.privateemail.com", "value", "10")
        Linode.create_mx_record(url, "MX", "mx2.privateemail.com", "value", "10")
        Linode.create_mx_record(url, "MX", mailgun_mx, "value", "10") # may need to be different

        # setup CNAME Records
        Linode.create_record(url, "CNAME", "autoconfig", "privateemail.com")
        Linode.create_record(url, "CNAME", "autodiscover", "privateemail.com")        
        Linode.create_record(url, "CNAME", "mail", "privateemail.com")
        Linode.create_record(url, "CNAME", "email", "mailgun.org") # may need to be different

        # setup TXT Records
        Linode.create_record(url, "CNAME", "", "v=spf1 include:spf.privateemail.com ~all")
        Linode.create_record(url, "CNAME", "mg", "v=spf1 include:mailgun.org ~all")
        Linode.create_record(url, "CNAME", "smtp._domainkey", "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDKf79+zMeSz0K9zx0jjo5OYMIbfgaYR5Yc+bRjwWeWtQvZkKe6tdm/fiqA9l9TDVzDx93v/G6mIR/S6JlZl7JIqp60RaiEiBiB028jLBsN460YE7hQK92bkuEEzPRF5SP7ZRS91+8FDjblq+E3v76UwwFx4u/IFwBOZDHwXvTlzwIDAQAB")

        # setup srv_record 
        Linode.create_srv_record(url, "SRV", "_autodiscover", "privateemail.com", "443", "tcp", "0", "0") # may need to check tcp
    end


end