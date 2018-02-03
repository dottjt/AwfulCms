let sFacebookCode = document.querySelector(".sFacebookCode");

if (window.location.search) {
    let facebook_code_bool = window.location.search.split("=")[1];
    let facebook_code = window.location.search.split("?")[1].split("=")[1];

    if (facebook_code_bool) {
        sFacebookCode.value = facebook_code;
    }
}
