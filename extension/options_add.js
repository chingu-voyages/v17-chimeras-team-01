// for insert nodes
const Links = document.getElementById('links')

// get stored data from chrome.storage
function GetStoredData () {
  chrome.storage.local.get(['stock'], function (data) {
    // store elements
    const fragment = document.createDocumentFragment()

    // create each link of tabs
    const allStockedData = Array.from(data.stock)
    allStockedData.forEach(link => {
      // create elements for adding links
      const li = document.createElement('li')
      li.className = 'saved-link'
      li.id = link.id

      const icon = document.createElement('img')
      icon.src = link.src
      icon.alt = `${link.title}`

      const a = document.createElement('a')
      a.href = link.url
      a.target = '_blank'

      const tabLink = document.createTextNode(`${link.title}`)

      const deleteButton = document.createElement('button')
      const deleteButtonImage = document.createElement('img')
      deleteButton.className = 'delete-button'
      deleteButtonImage.src = 'img/clear-black-18dp.svg' // this is a material icon https://material.io/resources/icons
      deleteButtonImage.alt = 'clear'

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
    Links.appendChild(fragment)
  })
}
GetStoredData()
