// --------------------
// for top tab illust
// --------------------
const TabIllust = document.querySelector('.upper__inner')

// base browser buttons
const BrowserButtons = document.createElement('div')
BrowserButtons.className = 'browser-buttons'
TabIllust.appendChild(BrowserButtons)

const BrowserButtonColor = [
  'red', 'yellow', 'green'
]

// create browser buttons
function createButton (color) {
  const BrowserButton = document.createElement('div')
  BrowserButton.className = `browser-button browser-button-${color}`
  return BrowserButton
}

// add browser buttons
function addButtons () {
  const fragment = document.createDocumentFragment()
  BrowserButtonColor.map((color) => {
    const BrowserButtons = createButton(color)
    fragment.appendChild(BrowserButtons)
  })
  return BrowserButtons.appendChild(fragment)
}
addButtons()

// base compressed tabs
const TabWrapper = document.createElement('div')
TabWrapper.className = 'compressed-tabs'
TabIllust.appendChild(TabWrapper)

// create one of compressed tabs
function createCompressedTabs () {
  const CompressedTab = document.createElement('div')
  CompressedTab.className = 'compressed-tab'
  return CompressedTab
}

// add compressed tabs
function addTabs () {
  // change compressed tabs number when resizing
  if (TabWrapper.firstChild) {
    while (TabWrapper.firstChild) {
      TabWrapper.removeChild(TabWrapper.firstChild)
    }
  }
  const fragment = document.createDocumentFragment()
  const DivWidth = TabIllust.clientWidth

  let n = 0;  // eslint-disable-line
  if (window.innerWidth > 600) {
    n = Math.floor((DivWidth - 200 - 210) / 19)
  } else {
    n = Math.floor((DivWidth - 106 - 100) / 13)
  }

  for (let i = 0; i < n; i++) {
    const CompressedTabs = createCompressedTabs()
    fragment.appendChild(CompressedTabs)
  }

  return TabWrapper.appendChild(fragment)
}
addTabs()

window.addEventListener('resize', addTabs, false)

// a set of add and close functions
const AddCloseBlock = document.createElement('div')
AddCloseBlock.className = 'add-close-block'
TabIllust.appendChild(AddCloseBlock)

// common cross mark
const CommonCrossMark = document.createElement('div')
CommonCrossMark.className = 'common-cross-mark rotate'

// single tab -- outside
const SingleTab = document.createElement('div')
SingleTab.className = 'single-tab'
AddCloseBlock.appendChild(SingleTab)

// single tab -- inside
const SingleTabDeco = document.createElement('span')
SingleTabDeco.className = 'single-tab-deco'
SingleTab.appendChild(SingleTabDeco)

SingleTabDeco.appendChild(CommonCrossMark)

// tab add cross mark
const CommonCrossMarkRotate = document.createElement('div')
CommonCrossMarkRotate.className = 'common-cross-mark'
AddCloseBlock.appendChild(CommonCrossMarkRotate)
