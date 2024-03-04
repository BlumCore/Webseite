const initCookieConsent = () => {
  const btn = document.getElementById('consent-button');
  const wrapper = document.getElementById('consent-wrapper');

  if (!btn || !wrapper) return;

  // Check if the cookie exists
  const cookieExists = document.cookie.split(';').filter(item => item.trim().startsWith('cookieConsent=')).length > 0;

  // If the cookie exists, remove the banner
  if (cookieExists) {
    wrapper.remove();
    return;
  } else {
    wrapper.classList.remove('hide');
  }

  const consentGranted = () => {
    gtag('consent', 'update', {
      'ad_storage': 'granted',
      'analytics_storage': 'granted'
    });
  }

  btn.addEventListener('click', () => {
    consentGranted();
    wrapper.remove(); // remove the cookie consent banner

    // Set the cookie to expire in 365 days
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 365);

    // Set the cookie
    document.cookie = `cookieConsent=true; expires=${expiryDate.toUTCString()}; path=/`;
  });
}

initCookieConsent();
