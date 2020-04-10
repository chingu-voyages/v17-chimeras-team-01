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
    const allStockedData = Array.from(data.stock)
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

    // display text if there is no link
    displayNoLink()
  })
}

// display text if there is no link
function displayNoLink () {
  const noLink = outsideLinksUl.firstChild.firstChild.firstChild
  if (!!noLink === false) {  // eslint-disable-line
    const noLinkText = document.createTextNode('there is no link')
    outsideLinksUl.firstChild.appendChild(noLinkText)
  }
}

function createBase () {
  document.addEventListener('DOMContentLoaded', getStoredData, false)
}

// delete a clicked link
function deleteLinks () {
  const definedDeleteButtons = Array.from(document.getElementsByClassName('delete-button'))

  // console.log(definedDeleteButtons === null)
  function deleteLink (link) {
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
        displayNoLink()
      }
      e.stopImmediatePropagation()
    }, false)
  }
  definedDeleteButtons.forEach(link => deleteLink(link))
}

const delayTimes = (s) => new Promise(resolve => setTimeout(resolve, s))
const setFunction = async () => {
  createBase()
  await delayTimes(100)
  deleteLinks()
}
setFunction()
