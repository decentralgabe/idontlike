// My first time using js, be kind
var clicks = 0; // click counter

// Make sure this only runs on facebook
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("facebook.com") > -1) {
        chrome.pageAction.show(tabId);
    }
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
  if (clicks == 0) {
    chrome.pageAction.setIcon({path: "dontlike.png", tabId: tab.id}); // Update icon
    chrome.pageAction.setTitle({title: "idontlike", tabId: tab.id}); // Update title
    chrome.tabs.executeScript({ // Hide like buttons
      code: 'var like = document.getElementsByClassName("UFILikeLink"); for (index = 0; index < like.length; ++index) { like[index].style.display="none"; }'
    });
  } 
  else {
    chrome.pageAction.setIcon({path: "like.png", tabId: tab.id}); // Update icon
    chrome.pageAction.setTitle({title: "like", tabId: tab.id}); // Update title
    chrome.tabs.executeScript({ // Show like buttons
      code: 'var like = document.getElementsByClassName("UFILikeLink"); for (index = 0; index < like.length; ++index) { like[index].style.display=""; }'
    });
  }
  
  // wrap coutner around
  clicks++;
  if (clicks > 1)
    clicks = 0;
});

