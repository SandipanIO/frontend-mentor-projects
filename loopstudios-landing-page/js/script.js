/* --------------------------------------------------------------------------- */
/* Remove Preload class from Body on page load */
/* --------------------------------------------------------------------------- */

window.addEventListener('load', ()=> {
   document.querySelector('body').classList.remove('preload');
});

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
   
   } else {
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

   }

   if(e.target.id === 'btn-close' || e.target.id === 'close-icon') {
      
      header.setAttribute('data-menu-open', false);
      btnMenu.style.display = 'block';
      btnClose.style.display = 'none';
      mainNavList.style.display = 'none';

   }
});