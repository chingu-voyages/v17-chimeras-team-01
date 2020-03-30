// for top tab illust
const Container = document.getElementById('container')

// current tab button
const CurrentTabButton = document.createElement('button')
const CurrentTabButtonText = document.createTextNode('save current tab')
CurrentTabButton.setAttribute('id', 'current-tab')
CurrentTabButton.appendChild(CurrentTabButtonText)
Container.appendChild(CurrentTabButton)

// all tab button
const AllTabsButton = document.createElement('button')
const AllTabsButtonText = document.createTextNode('save all tabs')
AllTabsButton.setAttribute('id', 'all-tabs')
AllTabsButton.appendChild(AllTabsButtonText)
Container.appendChild(AllTabsButton)

const Notice = document.createElement('p')
const NoticeText = document.createTextNode('saved!')
Notice.setAttribute('id', 'notice')
Notice.appendChild(NoticeText)

const OptionsLinkText = 'browse the saved tabs'

function ToOptionsPage () {
  const TopOptionPage = document.getElementsByClassName('to-option-page')[0]
  TopOptionPage.addEventListener('click', function () {
    chrome.runtime.openOptionsPage()
  })
}

function StoreLinksData () {
  chrome.tabs.query({}, function (tabs) {
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

AllTabsButton.addEventListener('click', function () {
  if (AllTabsButton.getElementsByClassName('to-option-page').length > 0) {
    AllTabsButton.classList.remove('to-option-page')
    CurrentTabButton.classList.remove('hidden-button')
    AllTabsButton.innerHTML = 'save all tabs'
    CurrentTabButton.style.display = 'block'
  } else {
    AllTabsButton.className = 'to-option-page'
    CurrentTabButton.className = 'hidden-button'
    AllTabsButton.innerHTML = OptionsLinkText
    Container.insertBefore(Notice, AllTabsButton)
    CurrentTabButton.style.display = 'none'
    StoreLinksData()
    ToOptionsPage()
  }
})
