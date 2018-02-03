
// const category_name = window.location.pathname.split("/")[1];

// let type_query_complete = window.location.search.split("?")[1].split("&")[0];
// let type_query_value = window.location.search.split("?")[1].split("&")[0].split("=")[1];

// let tags_query_complete = window.location.search.split("?")[1].split("&")[1]
// let tags_query_value = window.location.search.split("?")[1].split("&")[1].split("=")[1];

// let complete_query = window.location.search;


const elmDiv = document.querySelector('#elm-grid');

if (elmDiv) {
  Elm.MainGrid.embed(elmDiv);
  
    // {
      // category_name: category_name,
      // type_query_complete: type_query_complete,
      // type_query_value: type_query_value,
      // tags_query_complete: tags_query_complete,
      // tags_query_value: tags_query_value,
      // complete_query: complete_query
  // }
}


// Christmas countdown timer.
// let timer = document.querySelector(".timer");

// if(timer) {
//   var today = new Date();
//   var todayTime = today.getTime();	
//   var xmasDay = new Date(today.getFullYear(), 11, 25);
//   var xmasDayTime = xmasDay.getTime();
//   var daysLeft = (xmasDayTime - todayTime) / 1000 / 60 / 60 / 24;
  
//   timer.innerHTML = Math.floor(daysLeft) + " Days!!!!!";  
// }






function searchAmazon() {
  // B01MQIFINS amazon id. 

  // let marketplace_host="webservices.amazon.ca" 
  // let amazon_associate_tag="readeassociat-20"
  // let aws_access_key_id="AKIAJWYTCX4HUYSRETRQ"
  // let aws_secret_access_key="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"
  // var aws_secret_hash = new jsSHA("SHA-256", "TEXT");
  // aws_secret_hash.update(aws_secret_access_key);
  // var hash = aws_secret_hash.getHash("HEX");
  

  // item ItemSearch
  let search_query = `http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=AKIAI6R5YCTDGRHTCMYQ&AssociateTag=readeassociat-20&Operation=ItemSearch&Keywords=hello&SearchIndex=Books&Timestamp=2017-11-13T04%3A11%3A20.735Z&Signature=6348a857ea93d98868ff732225a2b477c058061fa7d79d80d34d6068ed6297e5`;
  
  // item ItemLookup
  let itemLookup = `http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=AKIAI6R5YCTDGRHTCMYQ&AssociateTag=readeassociat-20&Operation=ItemLookupt&ItemId=B00008OE6I&Timestamp=2017-11-13T04%3A34%3A00.878Z&Signature=6348a857ea93d98868ff732225a2b477c058061fa7d79d80d34d6068ed6297e5`

  // date
  var today = new Date(); 
      time = today.toISOString(); 
      time = encodeURIComponent(time);

  
  let itemSearchQuery = `http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=${aws_access_key_id}&AssociateTag=${amazon_associate_tag}&Operation=ItemSearch&Keywords=${amazon__search__value}&SearchIndex=${amazon__select__value}&Timestamp=${time}&Signature=${hash}`;
  let itemLookupQuery = `http://webservices.amazon.com/onca/xml?Service=AWSECommerceService&AWSAccessKeyId=${aws_access_key_id}&AssociateTag=${amazon_associate_tag}&Operation=ItemLookup&ItemId=${amazon__search__value}&Timestamp=${time}&Signature=${hash}`;

  axios.get(itemLookupQuery)
    .then(function (response) {
      var xml = "<root>Hello xml2js!</root>"

      parseString(xml, function (err, result) {
          console.dir(result);
      });

      // pDisplayName.value = 
      // pSocialMediaTitle.value = 

      // pPrice.value = 
      
      // pFeaturedImage.value = 

      // pUrl.value = 
      // pUrlText.value = // get the website

      // pDescription.value = 
      // pBlogDescription.value = 
      // pSocialMediaDescription.value = 

      // pSocialMediaTags.value = 
      // pCategory.value = 

  }).catch(function (error) {
      console.log(error);
  });

}



// let amazon__select__one__value = document.querySelector('#amazon__select').value;    
// let amazon__select__two__value = document.querySelector('#amazon__select__two').value;    
// let amazon__select__three__value = document.querySelector('#amazon__select__three').value;    

// if (amazon__select__one__value) {
//     var amazon__select__value = amazon__select__one__value;
// } else if (amazon__select__two__value) {
//     var amazon__select__value = amazon__select__two__value;
// } else {
//     var amazon__select__value = amazon__select__three__value;    
// }


// relevant product placeholders
// let pSocialMediaTags = document.querySelector('.pSocialMediaTags');

// NA 
// let pDraft = document.querySelector('.pDraft');
// let pProductType = document.querySelector('.pProductType'); // already has default
// let pCta = document.querySelector('.pCta'); // already has default

// let pSubCategory = document.querySelector('.pSubCategory');
// let pProductTag = document.querySelector('.pProductTag');
// let pProductLike = document.querySelector('.pProductLike');

// let pCategory = document.querySelector('.pCategory');
// let pUrlText = document.querySelector('.pUrlText');
