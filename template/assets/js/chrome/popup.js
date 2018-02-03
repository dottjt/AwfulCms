function getCurrentTabUrl(callback) {
    var queryInfo = {
      active: true,
      currentWindow: true
    };
  
    chrome.tabs.query(queryInfo, (tabs) => {
      var tab = tabs[0];
      var url = tab.url;

      console.assert(typeof url == 'string', 'tab.url should be a string');
  
      callback(url);
    });
  }

  function sendDataToApi(dropdownValue, url, api_key) {
        // var post_url = "https://" + dropdownValue + ".com/api/receive_amazon_id";
        var post_url = "http://localhost:4000/api/receive_amazon_id";
        var amazon_id = url.split("/")[5];

        console.log("let's see")

        var data = {
            amazon_id: amazon_id,
            api_key: api_key
        };

        if(api_key === "acy") {
          fetch(post_url, {
              method: 'POST', 
              body: data
              // headers: new Headers()
          }).then(function(response) { 
              console.log(response)
              console.log("it returned... something"); 
          });
        }
      
    }

  
  document.addEventListener('DOMContentLoaded', () => {

    getCurrentTabUrl((url) => {
      var dropdown = document.getElementById('websiteDropdown');
      var sendDataButton = document.getElementById('sendDataButton');

      sendDataButton.addEventListener('click', () => {

        sendDataToApi(dropdown.value, url, api_key);

      });
    });
  });
  