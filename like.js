// No copyright, but don't copy, right?

var prevTabID = 0;
var clicks = 0;

chrome.tabs.onSelectionChanged.addListener(function(tabId) {
  prevTabID = tabId;
  chrome.pageAction.show(prevTabID);
});

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  prevTabID = tabs[0].id;
  chrome.pageAction.show(prevTabId);
});

// Called when the user clicks on the page action.
chrome.pageAction.onClicked.addListener(function(tab) {
  if (clicks == 0) {
    chrome.pageAction.setIcon({path: "dontlike.png", tabId: tab.id});
    chrome.pageAction.setTitle({title: "idontlike", tabId: tab.id});
    chrome.tabs.executeScript({
    code: 'hideLike()'
  });
  } else {
    chrome.pageAction.setIcon({path: "like.png", tabId: tab.id});
    chrome.pageAction.setTitle({title: "like", tabId: tab.id});
    chrome.tabs.executeScript({
    code: 'showLike()'
  });
  }
  
  // wrap around
  clicks++;
  if (clicks > 1)
    clicks = 0;
});

function hideLike() {
  var index;
  var like = document.getElementsByClassName("UFILikeLink");
  for (index = 0; index < like.length; ++index) {
    like[index].style.display="none";
  }
}

function showLike() {
  var index;
  var like = document.getElementsByClassName("UFILikeLink");
  for (index = 0; index < like.length; ++index) {
    like[index].style.display="";
  }
}

