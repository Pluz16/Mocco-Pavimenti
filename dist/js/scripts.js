/*!
* Start Bootstrap - Business Casual v7.0.9 (https://startbootstrap.com/theme/business-casual)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-business-casual/blob/master/LICENSE)
*/
// Highlights current date on contact page
window.addEventListener('DOMContentLoaded', event => {
    const listHoursArray = document.body.querySelectorAll('.list-hours li');
    if (listHoursArray.length > 0) {
        listHoursArray[new Date().getDay()].classList.add(('today'));
    }

    // Custom Cookie Banner Logic
    const banner = document.getElementById('custom-cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept-all');
    const rejectBtn = document.getElementById('cookie-reject-all');

    if (banner) {
        const cookieConsent = localStorage.getItem('mocco_cookie_consent');
        if (!cookieConsent) {
            banner.style.display = 'block';
        }

        const hideBanner = (status) => {
            localStorage.setItem('mocco_cookie_consent', status);
            banner.style.animation = 'none'; // reset
            banner.style.transform = 'translateY(100%)';
            banner.style.opacity = '0';
            setTimeout(() => { banner.style.display = 'none'; }, 500);
        };

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => hideBanner('accepted_all'));
        }
        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => hideBanner('rejected_all'));
        }
    }
})
