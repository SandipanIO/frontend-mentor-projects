/* --------------------------------------------------------------------------- */
/* Remove Preload class from Body on page load */
/* --------------------------------------------------------------------------- */

window.addEventListener('load', ()=> {
   document.querySelector('body').classList.remove('preload');
});

/* --------------------------------------------------------------------------- */
/* Mobile Menu */
/* --------------------------------------------------------------------------- */

const btnMenu = document.querySelector('#btn-menu');
const btnMenuClose = document.querySelector('#btn-menu-close');
const header = document.querySelector('#header');
const mainNav = document.querySelector('#main-nav-list');

header.addEventListener('click', e => {

   if(e.target.closest('#btn-menu')) {
      
      btnMenu.style.display = 'none';
      btnMenuClose.style.display = 'block';

   }

   if(e.target.closest('#btn-menu-close')) {
      
      btnMenuClose.style.display = 'none';
      btnMenu.style.display = 'block';

   }

});

window.addEventListener('resize', () => {
   
   if(window.innerWidth > 736) { 
      
      btnMenuClose.style.display = 'none';
      btnMenu.style.display = 'none';
   
   } else {
      btnMenu.style.display = 'block';
   }
});
