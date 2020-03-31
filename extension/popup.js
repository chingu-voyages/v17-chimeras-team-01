// for top tab illust
const container = document.getElementById('container')

// --------------------------------
// create default buttons
// --------------------------------

// current tab button
function createCurrentTabButton () {
  const currentTabButton = document.createElement('button')
  const currentTabButtonText = document.createTextNode('save current tab')
  currentTabButton.id = 'current-tab'
  currentTabButton.appendChild(currentTabButtonText)
  container.appendChild(currentTabButton)

  currentTabButton.addEventListener('click', storeCurrentTab, false)
}
createCurrentTabButton()

// all tab button
function createAllTabButton () {
  const allTabsButton = document.createElement('button')
  const allTabsButtonText = document.createTextNode('save all tabs')
  allTabsButton.id = 'all-tabs'
  allTabsButton.appendChild(allTabsButtonText)
  container.appendChild(allTabsButton)

  allTabsButton.addEventListener('click', storeAllTab, false)
}
createAllTabButton()

// --------------------------------
// for first eventlisteners
// --------------------------------

// store data to chrome storage
function storeLinkData () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    let stock = [] // eslint-disable-line
    const t = tab[0]
    const id = 'data-0'
    const src = `chrome://favicon/${t.url}`
    const title = `${t.title}`
    const url = t.url
    stock.push({ id, src, title, url })

    chrome.storage.local.set({ stock })
  })
}

// store all data to chrome storage
function storeLinksData () {
  chrome.tabs.query({ }, function (tabs) {
    let stock = [] // eslint-disable-line
    for (const i in tabs) {
      const t = tabs[i]
      const id = `data-${i}`
      const src = `chrome://favicon/${t.url}`
      const title = `${t.title}`
      const url = t.url
      stock.push({ id, src, title, url })
    }

    chrome.storage.local.set({ stock })
  })
}

// for click event of current tab
function storeCurrentTab () {
  storeLinkData()
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  createNoticeText()
  createToOptionsButton()
}

// for click event of all tabs
function storeAllTab () {
  storeLinksData()
  while (container.firstChild) {
    container.removeChild(container.firstChild)
  }
  createNoticeText()
  createToOptionsButton()
}

// -----------------------------------------
// create buttons after first item clicked
// -----------------------------------------

// notice word after clicking a button
function createNoticeText () {
  const notice = document.createElement('p')
  const noticeText = document.createTextNode('saved!')
  notice.id = 'notice'
  notice.appendChild(noticeText)
  container.appendChild(notice)
}

// to options page button
function createToOptionsButton () {
  const toOptionsButton = document.createElement('button')
  const toOptionsButtonText = document.createTextNode('browse the saved tabs')
  toOptionsButtonText.id = 'to-option'
  toOptionsButton.appendChild(toOptionsButtonText)
  container.appendChild(toOptionsButton)

  toOptionsButton.addEventListener('click', toOptionsPage, false)
}

// --------------------------------
// for second eventlisteners
// --------------------------------

function toOptionsPage () {
  chrome.runtime.openOptionsPage()
}
