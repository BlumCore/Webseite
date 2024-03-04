let openedBefore = null;

function toggleAccordion() {
  const accordionTitles = document.querySelectorAll('.accordion__title');

  if (accordionTitles) {
    for (let i = 0; i < accordionTitles.length; i++) {
      const accordionWrapper = accordionTitles[i].closest('.accordion__wrapper');
      const accordionContent = accordionWrapper.querySelector('.accordion__content');
      accordionWrapper.classList.add('js-ready');
      accordionWrapper.classList.add('js-collapsed');
      accordionContent.style.height = '0';

      accordionTitles[i].addEventListener('click', function (e) {
        const targetWrapper = e.target.closest('.accordion__wrapper');
        const targetContent = targetWrapper.querySelector('.accordion__content');

        // Check if a different item was previously opened
        if (openedBefore && openedBefore !== targetWrapper) {
          const previousContent = openedBefore.querySelector('.accordion__content');
          previousContent.style.height = '0';
          openedBefore.classList.remove('js-expanded');
          openedBefore.classList.add('js-collapsed');
        }

        if (targetContent.style.height === '0px') {
          targetWrapper.classList.remove('js-collapsed');
          targetWrapper.classList.add('js-expanded');
          targetContent.style.height = targetContent.scrollHeight + 'px';
          openedBefore = targetWrapper; // Set the currently opened item
        } else {
          targetContent.style.height = '0';
          targetWrapper.classList.remove('js-expanded');
          targetWrapper.classList.add('js-collapsed');
          openedBefore = null; // No item is currently opened
        }
      });
    }
  }
}

// IE9+ polyfill
if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function(s) {
    var el = this;

    do {
      if (Element.prototype.matches.call(el, s)) return el;
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}


toggleAccordion()
