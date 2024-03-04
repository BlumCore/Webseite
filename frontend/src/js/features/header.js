// headroom.js documentation: https://wicky.nillia.ms/headroom.js/
import Headroom from 'headroom.js'

function initHeader(headerSelector) {

  const element = document.querySelector(headerSelector)

  if (element) {
    const headroom = new Headroom(element, {
      offset: 600,
      tolerance: 0,
      onPin: function() {},
      onUnpin: function() {},
    })
    headroom.init()
  }
}

initHeader('#header')
