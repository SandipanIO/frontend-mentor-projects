/* --------------------------------------------------------------------------- */
/* Remove Preload class from Body on page load */
/* --------------------------------------------------------------------------- */

window.addEventListener('load', ()=> {
   document.querySelector('body').classList.remove('preload');
});

/* --------------------------------------------------------------------------- */
/* Add/Remove Overflow to(or from) Body */
/* --------------------------------------------------------------------------- */

const bodyOverflowHidden = () => {
   document.querySelector('body').classList.add('body__overflow-hidden');
}

const bodyOverflowVisible = () => {
   document.querySelector('body').classList.remove('body__overflow-hidden');
}

/* --------------------------------------------------------------------------- */
/* Mobile Menu */
/* --------------------------------------------------------------------------- */

const header = document.querySelector('#header');
const mainNavList = document.querySelector('#main-nav-list');
const btnMenu = document.querySelector('#btn-menu');
const lines = btnMenu.querySelectorAll('span');

// openMenu() Function
const openMenu = () => {

   header.setAttribute('data-mobile-menu-open', true);
   mainNavList.setAttribute('data-mobile-menu-visible', true);
   btnMenu.setAttribute('aria-expanded', 'true');
   btnMenu.setAttribute('aria-label', 'Close');

   lines.forEach((line, count) => {
      count++;
      line.classList.add('main-nav__cross' + count);
   });

   bodyOverflowHidden();

}

// closeMenu() Function
const closeMenu = () => {

   header.setAttribute('data-mobile-menu-open', false);
   mainNavList.setAttribute('data-mobile-menu-visible', false);
   btnMenu.setAttribute('aria-expanded', false);
   btnMenu.setAttribute('aria-label', 'Menu');

   lines.forEach((line, count) => {
      count++;
      line.classList.remove('main-nav__cross' + count);
   });

   bodyOverflowVisible();

}

btnMenu.addEventListener('click', e => {

   const visibility = mainNavList.getAttribute('data-mobile-menu-visible');

   if(visibility === 'false') {
      openMenu();
   } else {
      closeMenu();
   }

});