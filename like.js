// No copyright, but don't copy, right?

var clicks = 0;
var like = document.getElementsByClassName("UFILikeLink");

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf("facebook.com") > -1) {
        chrome.pageAction.show(tabId);
    }
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
  if (clicks == 0) {
    chrome.pageAction.setIcon({path: "dontlike.png", tabId: tab.id});
    chrome.pageAction.setTitle({title: "idontlike", tabId: tab.id});
    chrome.tabs.executeScript({
      code: 'for (index = 0; index < like.length; ++index) { like[index].style.display="none"; }'
    });
  } else {
    chrome.pageAction.setIcon({path: "like.png", tabId: tab.id});
    chrome.pageAction.setTitle({title: "like", tabId: tab.id});
    chrome.tabs.executeScript({
      code: 'for (index = 0; index < like.length; ++index) { like[index].style.display=""; }'
    });
  }
  
  // wrap around
  clicks++;
  if (clicks > 1)
    clicks = 0;
});