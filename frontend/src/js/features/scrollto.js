// jump.js documentation: https://github.com/callmecavs/jump.js
import Jump from 'jump.js'

function scrollTo(target) {
  const clickTarget = document.querySelectorAll(target)

  for (var el of clickTarget) {
    const scrollTarget = el.getAttribute('href')
    el.addEventListener('click', function() {

      Jump(scrollTarget, {
        duration: 750,
        offset: 0
      })

    })

  }
}

scrollTo('.js-scrollto')
