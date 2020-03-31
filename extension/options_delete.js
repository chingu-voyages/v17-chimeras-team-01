// delete a clicked link
const definedDeleteButton = Array.from(document.getElementsByClassName('delete-button'))

definedDeleteButton.map((link, i) => {
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
    e.stopImmediatePropagation()
  }, false)
})
