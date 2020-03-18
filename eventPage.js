// to retrieve all the tabs
chrome.tabs.query({}, function(tabs) {
  let session = {
    name: "",
    tabsArray: []
  };

  tabs.forEach(function(tab) {
    let tabItem = {};
    if (tab.url.indexOf("chrome-devtools://") !== 0) {
      tabItem.title = tab.title;
      tabItem.url = tab.url;
      tabItem.favIconUrl = tab.favIconUrl;
      session.tabsArray.push(tabItem);
    }
  });
});
