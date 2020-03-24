// chrome tab count
function updateBadge(tabId, changeInfo, tab) {
  chrome.tabs.query({ currentWindow: true }, function(tabs) {
    let numberTabs = tabs.length;
    let numberTabsString = numberTabs.toString();
    chrome.browserAction.setBadgeText({ text: numberTabsString });
    chrome.browserAction.setBadgeBackgroundColor({ color: "#ff6347" });
  });
}

chrome.tabs.onCreated.addListener(updateBadge);
chrome.tabs.onRemoved.addListener(updateBadge);
chrome.tabs.onReplaced.addListener(updateBadge);
chrome.windows.onFocusChanged.addListener(updateBadge);

updateBadge();
