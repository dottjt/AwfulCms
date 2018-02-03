import axios from 'axios';

let ctaElements = document.querySelectorAll(".cta");

let modalContainer = document.querySelector(".modal__container");
let loginModal = document.querySelector(".login__modal");
let loginOverlay = document.querySelector(".login__overlay");

let cross = document.querySelector(".cross");

let likeTotalElements = document.querySelectorAll(".like_total"); 
let likeProductId = document.querySelectorAll(".like_product_id");

console.log(ctaElements)
if(ctaElements) {  
  for(let i=0;i<ctaElements.length;i++){
    ctaElements[i].addEventListener('click', function(event) {

      axios.get("/api/check_user_status")
        .then(function (response) {
          console.log(response)
        }).catch(function (error) {
            console.log(error);
        });

      if(true) { // should technically be false for testing save functionality. 
        modalContainer.style.zIndex = 450;
        
        loginModal.style.display = "block";
        loginModal.style.zIndex = 500;

        loginOverlay.style.display = "block";
        loginOverlay.style.zIndex = 400;

      } else {
        axios.post("/api/new_like", {
          username: 'julius',
          product_id: likeProductId[i].textContent
        })
        .then(function (response) {
          
        }).catch(function (error) {
            console.log(error);
        });
      }
    });

    window.addEventListener('click', function(event) {
      if (event.target == loginOverlay) {
        modalContainer.style.zIndex = -10;
        
        loginModal.style.display = "none";
        loginModal.style.zIndex = 0;
      
        loginOverlay.style.display = "none";
        loginOverlay.style.zIndex = 0;
      } 
    });

  }
}

if(cross) {
  cross.addEventListener('click', function(event) {
    modalContainer.style.zIndex = 0;
    
    loginModal.style.display = "none";
    loginModal.style.zIndex = 0;
  
    loginOverlay.style.display = "none";
    loginOverlay.style.zIndex = 0;
    
  });
}
