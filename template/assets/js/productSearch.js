import axios from 'axios';

let prefillSocialMedia = document.querySelectorAll(".prefillSocialMedia");

if(prefillSocialMedia) {
  for(let i=0;i<prefillSocialMedia.length;i++){
    prefillSocialMedia[i].addEventListener('click', function(event) {
      event.preventDefault();
      
      let productId = prefillSocialMedia[i].getAttribute('data-product-id');
      let domain = window.location.origin + "/api/search_for_amazon_item";
      console.log(domain);
      
      axios.post(domain, {
        id: productId 
      })
      .then(function (response) {
        
        let product = response.data.data;

        let sDisplayName = document.querySelector('.sDisplayName');
        sDisplayName.value = product.display_name;
        
        let sFeaturedImage = document.querySelector('.sFeaturedImage');
        sFeaturedImage.value = product.featured_image;
        
        let sUrl = document.querySelector('.sUrl');
        sUrl.value = product.url;
        
        let sDescription = document.querySelector('.sDescription');
        sDescription.value = product.blog_description;
        

      }).catch(function (error) {
          console.log(error);
      });
    });
  }
}



