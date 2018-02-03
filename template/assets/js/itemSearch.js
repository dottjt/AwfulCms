import axios from 'axios';
var parseString = require('xml2js').parseString;

let amazon__search = document.querySelector('#amazon__keyword');
let amazon__button = document.querySelector('#amazon__button');
let etsy__search = document.querySelector('#etsy__keyword');
let etsy__button = document.querySelector('#etsy__button');

if (amazon__button) {
    amazon__button.addEventListener("click", searchAmazon, false);    
    etsy__button.addEventListener("click", searchEtsy, false);        
}

function searchAmazon() {
    let domain = window.location.origin + "/api/search_for_amazon_item";
    console.log(domain);
    
    axios.post(domain, {
        asin: amazon__search.value
    })
      .then(function (response) {
        parseString(response.data.data, function (err, result) {
        
            // B0143RT8OY amazon id.

            let amazonItem = result.ItemLookupResponse.Items[0].Item[0];
            let largeImage = amazonItem.LargeImage[0].URL[0];
            let affiliateUrl = amazonItem.DetailPageURL[0];

            let amazonItemAttributes = result.ItemLookupResponse.Items[0].Item[0].ItemAttributes[0];
            let productTitle = amazonItemAttributes.Title[0];
            let productPrice = amazonItemAttributes.ListPrice[0].FormattedPrice[0].substring(1);
            let pD = amazonItemAttributes.Feature;
            let productDescriptionList = pD[0] + " " + pD[1] + " " + pD[2];

            // console.log(amazonItem);
            // console.log(amazonItemAttributes);
            // console.log(productDescriptionList);

            let pDisplayName = document.querySelector('.pDisplayName');
            let pSocialMediaTitle = document.querySelector('.pSocialMediaTitle');
            pDisplayName.value = productTitle;

            let pPrice = document.querySelector('.pPrice');
            pPrice.value = productPrice;
            
            let pFeaturedImage = document.querySelector('.pFeaturedImage');
            let pOriginalFeaturedImage = document.querySelector('.pOriginalFeaturedImage');            
            pFeaturedImage.value = largeImage;
            pOriginalFeaturedImage.value = largeImage;
            
            let pUrl = document.querySelector('.pUrl');
            pUrl.value = affiliateUrl;

            let pDescription = document.querySelector('.pDescription');
            let pBlogDescription = document.querySelector('.pBlogDescription');
            
            pDescription.value = productDescriptionList;
            pBlogDescription.value = productDescriptionList;
            
        });
    }).catch(function (error) {
        console.log(error);
    });

}

function searchEtsy() {

  axios.get(search_query)
    .then(function (response) {
      var xml = "<root>Hello xml2js!</root>"

      parseString(xml, function (err, result) {
          console.dir(result);
      });

              
    }).catch(function (error) {
      console.log(error);
  });

}

