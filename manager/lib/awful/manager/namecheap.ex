defmodule Awful.Namecheap do

    import Ecto.Query, warn: false
    alias Ac.Repo
    

    ### OVERVIEW 

    def list_domains do 
        url = "https://api.namecheap.com/xml.response?ApiUser=#{System.get_env("NAMECHEAP_API_USER")}&ApiKey=#{System.get_env("NAMECHEAP_API_KEY")}&UserName=#{System.get_env("NAMECHEAP_API_USER")}&Command=namecheap.domains.getList&ClientIp=#{System.get_env("LINODE_INSTANCE_IP")}"
        # done

        case HTTPoison.get! url do 
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
                IO.puts body

                # xml_sweet      
                # Name, Expires, AutoRenew
            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end 
    end

    def renew_domain(domain) do
        url = "https://api.namecheap.com/xml.response?ApiUser=#{System.get_env("NAMECHEAP_API_USER")}&ApiKey=#{System.get_env("NAMECHEAP_API_KEY")}&UserName=#{System.get_env("NAMECHEAP_API_USER")}&Command=namecheap.domains.renew&ClientIp=#{System.get_env("LINODE_INSTANCE_IP")}&DomainName=#{domain}&Years=1" # IsPremiumDomain=true&PremiumPrice=650
        # done. 

        case HTTPoison.get! url do 
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
                IO.puts body
                # DomainName, Renew, ChargedAmount

                # xml_sweet                
            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end 
    end


    ### BUILD

    def check_domain_availablity_and_pricing(domain) do
        url = "https://api.namecheap.com/xml.response?ApiUser=#{System.get_env("NAMECHEAP_API_USER")}&ApiKey=#{System.get_env("NAMECHEAP_API_KEY")}&UserName=#{System.get_env("NAMECHEAP_API_USER")}&Command=namecheap.domains.check&ClientIp=#{System.get_env("LINODE_INSTANCE_IP")}&DomainList=#{domain}"
        # done 
        case HTTPoison.get! url do 
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
                IO.puts body

                # Domain, Available, IsPremiumName, PremiumRegistrationPrice

                # xml_sweet
            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end 
    end


    def register_domain(domain) do

        url = "https://api.namecheap.com/xml.response?ApiUser=#{System.get_env("NAMECHEAP_API_USER")}&ApiKey=#{System.get_env("NAMECHEAP_API_KEY")}&UserName=#{System.get_env("NAMECHEAP_API_USER")}&Command=namecheap.domains.create&ClientIp=#{System.get_env("LINODE_INSTANCE_IP")}&DomainName=#{domain}&Years=1&AuxBillingFirstName=Julius&AuxBillingLastName=Reade&AuxBillingAddress1=76a%20Hull%20Road&AuxBillingStateProvince=VIC&AuxBillingPostalCode=3136&AuxBillingCountry=AUS&AuxBillingPhone=+61.434508716&AuxBillingEmailAddress=julius.reade@gmail.com&AuxBillingOrganizationName=AwfulCorporation&AuxBillingCity=Melbourne&TechFirstName=Julius&TechLastName=Reade&TechAddress1=76a%20Hull%20Road&TechStateProvince=VIC&TechPostalCode=90045&TechCountry=US&TechPhone=+61.434508716&TechEmailAddress=julius.reade@gmail.com&TechOrganizationName=AwfulCorporation&TechCity=Melbourne&AdminFirstName=Julius&AdminLastName=Reade&AdminAddress1=76a20%Hull%20Road&AdminStateProvince=VIC&AdminPostalCode=3136&AdminCountry=AUS&AdminPhone=+64.434508716&AdminEmailAddress=julius.reade@gmail.com&AdminOrganizationName=AwfulCorporation&AdminCity=Melbourne&RegistrantFirstName=Julius&RegistrantLastName=Reade&RegistrantAddress1=76a%20Hull%20Road&RegistrantStateProvince=VIC&RegistrantPostalCode=3136&RegistrantCountry=AUS&RegistrantPhone=+61.434508716&RegistrantEmailAddress=julius.reade@gmail.com&RegistrantOrganizationName=AwfulCorporation&RegistrantCity=VIC&AddFreeWhoisguard=no&WGEnabled=no&GenerateAdminOrderRefId=False&EapFee=0" # IsPremiumDomain=True&PremiumPrice=206.7

        
        case HTTPoison.get! url do 
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
                IO.puts body
        # Domain, Registered, ChargedAmount
                
            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end 
    end


    def update_domain_dns do

        url = "https://api.namecheap.com/xml.response?ApiUser=#{System.get_env("NAMECHEAP_API_USER")}&ApiKey=#{System.get_env("NAMECHEAP_API_KEY")}&UserName=#{System.get_env("NAMECHEAP_API_USER")}&Command=namecheap.domains.dns.setCustom&ClientIp=#{System.get_env("LINODE_INSTANCE_IP")}&SLD=domain&TLD=com&NameServers=ns1.linode.com,ns2.linode.com,ns3.linode.com,ns4.linode.com,ns5.linode.com"
        # done
        
        case HTTPoison.get! url do 
            {:ok, %HTTPoison.Response{status_code: 200, body: body}} ->
                IO.puts body
        # Domain, Updated
                
            {:error, %HTTPoison.Error{reason: reason}} ->
                IO.inspect reason
        end 
    end

end

  