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
const mainNav = document.querySelector('#main-nav');
const mainNavList = document.querySelector('#main-nav-list');

const btnMenu = document.querySelector('#btn-menu');
const btnClose = document.querySelector('#btn-close');

window.addEventListener('resize', () => {
   
   if(window.innerWidth > 736) { 
      
      header.setAttribute('data-menu-open', false);
      btnMenu.style.display = 'none';
      btnClose.style.display = 'none';
      mainNavList.style.display = 'flex';

      bodyOverflowVisible();
   
   } else if(window.innerWidth < 736) {
      
      btnMenu.style.display = 'block';
      mainNavList.style.display = 'none';

   }
});

mainNav.addEventListener('click', e => {

   if(e.target.id === 'btn-menu' || e.target.id === 'menu-icon') {
      
      header.setAttribute('data-menu-open', true);
      btnMenu.style.display = 'none';
      btnClose.style.display = 'block';
      mainNavList.style.display = 'flex';

      bodyOverflowHidden();

   }

   if(e.target.id === 'btn-close' || e.target.id === 'close-icon') {
      
      header.setAttribute('data-menu-open', false);
      btnMenu.style.display = 'block';
      btnClose.style.display = 'none';
      mainNavList.style.display = 'none';

      bodyOverflowVisible();

   }
});