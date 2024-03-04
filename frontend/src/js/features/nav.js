const navTrigger = document.querySelector('.nav__trigger')
const navWrapper = document.querySelector('.nav__wrapper')

function initNav() {
  navTrigger.addEventListener('click', toggleNav)
}

function toggleNav() {
  navWrapper.classList.toggle('js-nav-active');
}

if (navTrigger && navWrapper) {
  initNav()
}
