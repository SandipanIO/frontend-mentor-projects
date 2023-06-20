/* --------------------------------------------------------------------------- */
/* Remove Preload class from Body on page load */
/* --------------------------------------------------------------------------- */

window.addEventListener('load', ()=> {
   document.querySelector('body').classList.remove('preload');
});

/* --------------------------------------------------------------------------- */
/* Mobile Menu */
/* --------------------------------------------------------------------------- */

const mobileNav = document.querySelector('#primary-navigation');
const menuButton = document.querySelector('#mobile-menu');
const lines = menuButton.querySelectorAll('span');

const openMenu = () => {
   mobileNav.setAttribute('data-visible', 'true');
   menuButton.setAttribute('aria-expanded', 'true');
   menuButton.setAttribute('aria-label', 'Close');

   lines.forEach((line, count) => {
      count++;
      line.classList.add('main-nav__cross' + count);
   });
}

const closeMenu = () => {
   mobileNav.setAttribute('data-visible', 'false');
   menuButton.setAttribute('aria-expanded', 'false');
   menuButton.setAttribute('aria-label', 'Menu');

   lines.forEach((line, count) => {
      count++;
      line.classList.remove('main-nav__cross' + count);
   });
};

menuButton.addEventListener('click', () => {
   const visibility = mobileNav.getAttribute('data-visible');

   if(visibility === "false") {
      openMenu();

   } else {
      closeMenu();
   }
});

/* Close the mobile menu when a link is clicked */
mobileNav.addEventListener('click', e => {
   if(e.target.nodeName === 'A' &&  mobileNav.getAttribute('data-visible') === 'true') {
      closeMenu();
   }
});