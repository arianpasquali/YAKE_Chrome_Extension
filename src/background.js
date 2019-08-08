chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if ("getOptions" == request.message) {
		if ("undefined" != typeof localStorage) {
			chrome.tabs.query({
					"active": true,
					"currentWindow": true
				},
				function(tabs) {
					if ("undefined" != typeof tabs[0].id && tabs[0].id) {
						var payload={language:"en",max_ngram_size:1,number_of_keywords:parseInt(localStorage.getItem("number")),url:tabs[0].url};
						fetch('https://immense-anchorage-25105.herokuapp.com/yake/url', {
						  method: 'POST',
						  headers: {
						    'Content-Type': 'application/json'
						  },
						  body: JSON.stringify(payload)
						}).then(function(response) {
    							return response.json()
  						}).then(function(json) {
								let list=[]
								json.forEach(function(y)
								{
								   list.push(y["ngram"]);
								}
								);
								console.log(list.join());
    						localStorage.setItem("keywords", list.join());
  						}).catch(function(ex) {
    						console.log('parsing failed', ex)
  						})
						chrome.tabs.sendMessage(tabs[0].id, {
							"message": "returnOptions",
							"remove": request.remove,
							"keywords": localStorage.getItem("keywords"),
							"foreground": localStorage.getItem("foreground") || "#000000",
						});
					}
				}
			);
		}
	}
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    localStorage.setItem("keywords","");
 });
