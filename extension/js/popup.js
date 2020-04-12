// for top tab illust
const container = document.getElementById('container')

// --------------------------------
// create default buttons
// --------------------------------

// current tab button
function createCurrentButton () {
  const currentTabButton = document.createElement('button')
  const currentTabButtonText = document.createTextNode('Save Current Tab')
  currentTabButton.id = 'current-tab'
  currentTabButton.appendChild(currentTabButtonText)
  container.appendChild(currentTabButton)

  currentTabButton.addEventListener('click', storeTab, false)
}

// all tab button
function createAllButton () {
  const allTabsButton = document.createElement('button')
  const allTabsButtonText = document.createTextNode('Save All Tabs')
  allTabsButton.id = 'all-tabs'
  allTabsButton.appendChild(allTabsButtonText)
  container.appendChild(allTabsButton)

  allTabsButton.addEventListener('click', storeTab, false)
}

// --------------------------------
// check stored data for second pushing button
// --------------------------------

// get stored data
function getStoredData (f, e) {
  chrome.storage.local.get(['stock'], function (data) {
    let stock = data.stock === undefined ? [] : data.stock // eslint-disable-line
    f(stock, e)
  })
}

// check whether past data exsist or not
function returnLinksNumber (stock) {
  let checker = 0 // eslint-disable-line
  if (stock.length) {
    let len = (stock.length - 1) // eslint-disable-line
    checker = stock[len].id.replace(/[^0-9^.]/g, '')
  }
  let n = [] // eslint-disable-line
  n.push({ checker })
  chrome.storage.local.set({ n })
}

// display options button if there is stored links
function appearOptionsButton () {
  chrome.storage.local.get(['n'], function (data) {
    let n = data.n ? data.n[0].checker : 0 // eslint-disable-line
    if (n !== 0) {
      console.log(n)
      createToOptionsButton(addClassToOptionButton)
    }
  })
}

function addClassToOptionButton (toOptionsButton) {
  toOptionsButton.id = 'first-to-option'
}

// async await
// road first
const delayTimes = (s) => new Promise(resolve => setTimeout(resolve, s))
const startDisplay = async () => {
  getStoredData(returnLinksNumber)
  createCurrentButton()
  createAllButton()
  await delayTimes(10)
  appearOptionsButton()
}
document.addEventListener('DOMContentLoaded', startDisplay)

// --------------------------------
// for first eventlisteners
// --------------------------------

// for first action BEFORE delay
function nextItems () {
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  // createNoticeText()
  createToOptionsButton(createNoticeText)
}

// for second action AFTER delay
// get stored data if existing
function firstEvent (e) {
  getStoredData(getCheckNumber, e)
}

// get the number for checking the number of stored links
function getCheckNumber (stock, e) {
  chrome.storage.local.get(['n'], function (data) {
    let n = data.n ? data.n[0].checker : 0 // eslint-disable-line
    storeLinksData(n, stock, e)
  })
}

// store data to chrome storage
function storeLinksData (n, stock, e) {
  if (e.target.id === 'current-tab') {
    const queryOption = { active: true, currentWindow: true }
    storeData(n, stock, queryOption)
  } else {
    storeData(n, stock)
  }
}

function storeData (n, stock, queryOption = { }) {
  chrome.tabs.query(queryOption, function (tabs) {
    if (queryOption !== { }) {
      for (const i in tabs) {
        dataDetail(n, tabs, stock, i)
      }
    } else {
      dataDetail(n, tabs, stock)
    }
    chrome.storage.local.set({ stock })
  })
}

// common function for two buttons for storing data to chrome storage
function dataDetail (n, tabs, stock, i) {
  let number = i ? parseInt(n) + parseInt(i) + 1 : n // eslint-disable-line

  let t = i ? tabs[i] : tabs[n]  // eslint-disable-line
  const id = `data-${number}`
  const src = `chrome://favicon/${t.url}`
  const title = `${t.title}`
  const url = t.url

  stock.push({ id, src, title, url })
}

// refresh options.html every links are added
function refreshOptions () {
  chrome.storage.onChanged.addListener(function () {
    chrome.tabs.query({ }, function (tabs) {
      for (const i in tabs) {
        const options = /^chrome-extension:\/\/[\w-].*\/options\.html$/gi
        if (options.test(tabs[i].url)) {
          chrome.tabs.reload(tabs[i].id)
        }
      }
    })
  })
}

// async await
// for click event of current tab or all tabs
const storeTab = async (e) => {
  nextItems()
  await delayTimes(100)
  firstEvent(e)
  refreshOptions()
}

// -----------------------------------------
// create buttons after first item clicked
// -----------------------------------------

// notice word after clicking a button
function createNoticeText (toOptionsButton) {
  toOptionsButton.id = 'second-to-option'
  const notice = document.createElement('span')
  const noticeText = document.createTextNode('\\ Saved! /')
  notice.id = 'notice'
  notice.appendChild(noticeText)
  toOptionsButton.appendChild(notice)
}

// to options page button
function createToOptionsButton (f) {
  const toOptionsButton = document.createElement('button')
  const toOptionsButtonText = document.createTextNode('Browse The Saved Tabs')
  f(toOptionsButton)
  toOptionsButton.appendChild(toOptionsButtonText)
  container.appendChild(toOptionsButton)

  toOptionsButton.addEventListener('click', toOptionsPage, false)
}

// for second eventlisteners
function toOptionsPage () {
  chrome.runtime.openOptionsPage()
}
