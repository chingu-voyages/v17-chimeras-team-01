// delete a clicked link
const DefinedDeleteButton = Array.from(document.getElementsByClassName('delete-button'))

DefinedDeleteButton.map((link, i) => {
  link.addEventListener('click', function (e) {
    // delete one of link tag
    const removedId = link.parentNode
    removedId.remove()
    chrome.storage.local.get(['stock'], function (data) {
          let stock = data.stock // eslint-disable-line
      const n = removedId.id
      const changedStock = stock.filter(d => d.id !== n)
      stock = changedStock
      chrome.storage.local.set({ stock })
    })
    e.stopImmediatePropagation()
  }, false)
})
