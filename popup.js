// generates html for the tab list
function listTabs(tabs) {
  tabs.forEach(function(tab) {
    let favicon = tab.favIconUrl || chrome.runtime.getURL("icons/icon16.png");
    let url = tab.url || "";
    let title = tab.title || url;

    let li = document.createElement("li");
    li.className = "list-item " + (tab.selected ? "selected" : "");

    let img = document.createElement("img");
    if (favicon) img.src = favicon;
    if (url) img.title = url;

    let link = document.createElement("a");
    link.className = "list-item-link";
    link.href = url;
    link.textContent = title;

    let closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.textContent = "x";

    li.appendChild(img);
    li.appendChild(link);
    link.appendChild(closeBtn);

    li.tabId = tab.id;
    list.appendChild(li);
  });
  const li = document.querySelectorAll(".list-item");
  console.log(li);

  events();
}

function events() {
  list.addEventListener("click", function(e) {
    closeTab(e, e.target.parentElement.parentElement);
  });

  list.addEventListener("click", function(e) {
    chrome.tabs.update(e.target.parentElement.tabId, { selected: true });
  });
}

// Remove Tabs
function closeTab(e, tab) {
  if (e.target.className === "close") {
    tab = list.removeChild(tab);
    chrome.tabs.remove(tab.tabId);
  }
}

document.addEventListener("DOMContentLoaded", function() {
  let list = document.querySelector("#list");

  // Handler when the DOM is fully loaded
  chrome.tabs.query({}, listTabs);
});
