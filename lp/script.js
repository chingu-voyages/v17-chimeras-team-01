// for top tab illust
const TabIllust = document.querySelector('.upper__inner')

// browser buttons
const BrowserButtons = document.createElement('div')
BrowserButtons.className = 'browser-buttons'
TabIllust.appendChild(BrowserButtons)

const BrowserButtonColor = [
  'red', 'yellow', 'green'
]

function createButton (color) {
  const BrowserButton = document.createElement('div')
  BrowserButton.className = `browser-button browser-button-${color}`
  return BrowserButton
  // return TabIllust.appendChild(BrowserButton) たぶんちがう
  // return `
  //   <div class="browser-button browser-button-${color}"></div>`
}

function addButtons () {
  const fragment = document.createDocumentFragment()
  BrowserButtonColor.map((color) => {
    const BrowserButtons = createButton(color)
    fragment.appendChild(BrowserButtons)
  })
  return BrowserButtons.appendChild(fragment)

  // TabIllust.innerHTML = BrowserButtonColor.map((color) => {
  //   return createButton(color)
  // })
  //   .join('')
}
addButtons()

// bunch of tabs
const TabWrapper = document.createElement('div')
TabWrapper.className = 'compressed-tabs'
TabIllust.appendChild(TabWrapper)

function createCompressedTabs () {
  const CompressedTab = document.createElement('div')
  CompressedTab.className = 'compressed-tab'
  return CompressedTab
  // return `
  //       <div class="compressed-tab"></div>`
}

// function createtTabs (tab) {
//   return `
//       <div class="compressed-tabs">${tab}</div>`
// }

function addTabs () {
  const fragment = document.createDocumentFragment()
  const DivWidth = TabIllust.clientWidth
  const n = window.innerWidth > 600 ? Math.floor((DivWidth - 200 - 210) / 19) : Math.floor((DivWidth - 106 - 100) / 13)

  for (let i = 0; i < n; i++) {
    const CompressedTabs = createCompressedTabs()
    fragment.appendChild(CompressedTabs)
  }

  return TabWrapper.appendChild(fragment)
  // TabIllust.innerHTML = createtTabs(createCompressedTab())
}
addTabs()

// common cross mark
const CommonCrossMark = document.createElement('div')
CommonCrossMark.className = 'common-cross-mark rotate'

// add-close-block
const AddCloseBlock = document.createElement('div')
AddCloseBlock.className = 'add-close-block'
TabIllust.appendChild(AddCloseBlock)

// single tab
const SingleTab = document.createElement('div')
SingleTab.className = 'single-tab'
AddCloseBlock.appendChild(SingleTab)

const SingleTabDeco = document.createElement('span')
SingleTabDeco.className = 'single-tab-deco'
SingleTab.appendChild(SingleTabDeco)

SingleTabDeco.appendChild(CommonCrossMark)

// tab add cross mark
const CommonCrossMarkRotate = document.createElement('div')
CommonCrossMarkRotate.className = 'common-cross-mark'
AddCloseBlock.appendChild(CommonCrossMarkRotate)
