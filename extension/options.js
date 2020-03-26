chrome.tabs.query({}, function (tabs) {
  const Links = document.getElementById('links')
  const fragment = document.createDocumentFragment()
  for (const i in tabs) {
    const t = tabs[i]
    const li = document.createElement('li')
    li.className = 'saved-link'
    const icon = document.createElement('img')
    icon.src = `chrome://favicon/${t.url}`
    icon.alt = `${t.title}`
    const a = document.createElement('a')
    a.href = t.url
    a.target = '_blank'
    const tabLink = document.createTextNode(`${t.title}`)
    a.appendChild(tabLink)

    const deleteButton = document.createElement('button')
    const deleteButtonImage = document.createElement('img')
    deleteButton.className = 'delete-button'
    // this is a material icon
    deleteButtonImage.src = 'img/clear-black-18dp.svg'
    deleteButtonImage.alt = 'clear'
    deleteButton.appendChild(deleteButtonImage)

    li.appendChild(icon)
    li.appendChild(a)
    li.appendChild(deleteButton)
    fragment.appendChild(li)
  }
  Links.appendChild(fragment)

  const DefinedDeleteButton = Array.from(document.querySelectorAll('.delete-button'))
  DefinedDeleteButton.map((item, i) => item.addEventListener('click', function () {
    item.parentNode.remove()
  }))
})
