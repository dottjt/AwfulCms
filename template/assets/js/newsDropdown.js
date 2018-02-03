
var dropdown__button = document.querySelectorAll(".dropdown__button");
var news__content__container = document.querySelectorAll(".news__content__container");
var fa_plus = document.querySelectorAll(".fa-plus"); 

var uttermost__overlay = document.querySelector(".uttermost__overlay"); 
var text__container = document.querySelectorAll(".text__container");
var news__right = document.querySelectorAll(".news__right");



if(dropdown__button) {  
  for(let i=0; i<dropdown__button.length; i++){
    dropdown__button[i].addEventListener('click', function(event) {

      // console.log(news__content__container[i])
      // console.log(news__content__container[i].style.display)

      if(news__content__container[i].style.display === "block") {
        news__content__container[i].style.display = "none";
        
        uttermost__overlay.style.display = "none";
        text__container[i].style.zIndex = 199; 
        news__right[i].style.zIndex = 199; 
        
        fa_plus[i].classList.remove('fa-minus');
        fa_plus[i].classList.add('fa-plus');        
      } else {
        news__content__container[i].style.display = "block";
  
        uttermost__overlay.style.display = "block";
        text__container[i].style.zIndex = 201; 
        news__right[i].style.zIndex = 201; 

        fa_plus[i].classList.remove('fa-plus');
        fa_plus[i].classList.add('fa-minus');        
      }

    });


    window.addEventListener('click', function(event) {
      if (event.target == uttermost__overlay) {
        content__container[i].style.display = "none";
        uttermost__overlay.style.display = "none";
        
        text__container[i].style.zIndex = 199; 
        news__right[i].style.zIndex = 199; 
        
        fa_plus[i].classList.remove('fa-minus');
        fa_plus[i].classList.add('fa-plus');        
    
      } 
    });
  }
}


// closing news update


