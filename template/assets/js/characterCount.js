let displayNameCount = document.querySelector('.displayNameCount');
let descriptionCount = document.querySelector('.descriptionCount');
let blogDescriptionCount = document.querySelector('.blogDescriptionCount');

let pDisplayName = document.querySelector('.pDisplayName');
let pDescription = document.querySelector('.pDescription');
let pBlogDescription = document.querySelector('.pBlogDescription');

if (displayNameCount) {
    pDisplayName.onkeyup = function () {
        displayNameCount.innerHTML = "Characters left: " + (35 - this.value.length);
    };
}

if (descriptionCount) {
    pDescription.onkeyup = function () {
        descriptionCount.innerHTML = "Characters left: " + (90 - this.value.length);
    };    
}

if (blogDescriptionCount) {
    pBlogDescription.onkeyup = function () {
        blogDescriptionCount.innerHTML = "Characters left: " + (90 - this.value.length);
    };
}

