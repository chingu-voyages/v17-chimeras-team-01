// for insert nodes
const outsideLinksUl = document.getElementById('outside-links-ul')

// get stored data from chrome.storage
function getStoredData () {
  chrome.storage.local.get(['stock'], function (data) {
    // store elements
    const fragment = document.createDocumentFragment()

    // create blocks for adding links per saved each one
    const outsideLinksLi = document.createElement('li')
    outsideLinksLi.className = 'outside-links-li'
    const insideLinksUl = document.createElement('ul')
    insideLinksUl.id = 'inside-links-ul'

    // create each link of tabs
    if (data.stock !== undefined) {
      let stock = data.stock // eslint-disable-line
      const allStockedData = Array.from(stock)
      allStockedData.forEach(link => {
        // create elements for adding links
        const li = document.createElement('li')
        li.className = 'saved-link'
        li.id = link.id

        const icon = document.createElement('img')
        icon.className = 'saved-link-icon'
        icon.src = link.src
        icon.alt = `${link.title}`

        const a = document.createElement('a')
        a.className = 'saved-link-title'
        a.href = link.url
        a.target = '_blank'

        const tabLink = document.createTextNode(`${link.title}`)

        const deleteButton = document.createElement('button')
        const deleteButtonImage = document.createElement('img')
        deleteButton.className = 'delete-button'
        deleteButtonImage.src = '../img/clear-black-18dp.svg' // this is a material icon https://material.io/resources/icons
        deleteButtonImage.alt = 'clear button'

        // append elements
        a.appendChild(tabLink)
        deleteButton.appendChild(deleteButtonImage)
        li.appendChild(icon)
        li.appendChild(a)
        li.appendChild(deleteButton)

        // collect elements
        fragment.appendChild(li)
      })
      // append all element
      insideLinksUl.appendChild(fragment)
      outsideLinksLi.appendChild(insideLinksUl)
      outsideLinksUl.appendChild(outsideLinksLi)

      // display delete all button if there is any link
      createDeleteAllButton()
    }

    // display text if there is no link
    checkNoLink(displayNoLink)
  })
}

// display delete all button if there is any link
const main = document.getElementById('main')
function createDeleteAllButton () {
  const deleteAll = document.createElement('button')
  const deleteAllText = document.createTextNode('Delete All Links')
  deleteAll.id = 'delete-all'
  deleteAll.appendChild(deleteAllText)
  main.insertBefore(deleteAll, outsideLinksUl)
}

// remove delete all button if there is no link
function removeDeleteAllButton () {
  main.firstElementChild.remove()
}

// display text if there is no link
function checkNoLink (f) {
  if (!!outsideLinksUl.firstChild === false || !!outsideLinksUl.firstChild.firstChild.firstChild === false) {  // eslint-disable-line
    f()
  }
}

// display no link text
function displayNoLink () {
  const noLinkText = document.createTextNode('There is no link')
  if (!!outsideLinksUl.firstChild === false) {
    outsideLinksUl.appendChild(noLinkText)
  } else {
    outsideLinksUl.firstChild.appendChild(noLinkText)
  }
}

// ready for base DOM
function createBase () {
  document.addEventListener('DOMContentLoaded', getStoredData, false)
}

// create all delete button event
function deleteAllLinks (link, deleteAll) {
  deleteAll.addEventListener('click', function () {
    // delete one of link tag
    const targetLink = link.parentNode
    targetLink.remove()
    chrome.storage.local.clear()
    // display text if there is no link
    checkNoLink(displayNoLink)
    // display delete all button if there is any link
    checkNoLink(removeDeleteAllButton)
  }, false)
}

// create each delete button event
function deleteEachLink (link) {
  link.addEventListener('click', function (e) {
  // delete one of link tag
    const targetLink = link.parentNode
    targetLink.remove()
    chrome.storage.local.get(['stock'], function (data) {
    let stock = data.stock // eslint-disable-line
      const n = targetLink.id
      const changedStock = stock.filter(d => d.id !== n)
      stock = changedStock
      chrome.storage.local.set({ stock })
    })
    if (e.target) {
      // display text if there is no link
      checkNoLink(displayNoLink)
      // display delete all button if there is any link
      checkNoLink(removeDeleteAllButton)
    }
    e.stopImmediatePropagation()
  }, false)
}

// distribute the event for deleting link
function deleteLink (f) {
  const definedDeleteButtons = Array.from(document.getElementsByClassName('delete-button'))
  const deleteAll = document.getElementById('delete-all')

  definedDeleteButtons.forEach(link => f(link, deleteAll))
}

const delayTimes = (s) => new Promise(resolve => setTimeout(resolve, s))
const setFunction = async () => {
  createBase()
  await delayTimes(100)
  deleteLink(deleteAllLinks)
  deleteLink(deleteEachLink)
}
setFunction()
