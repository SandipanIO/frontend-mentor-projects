const mobileNav = document.querySelector('.main-nav__list');
const menuButton = document.querySelector('#mobile-menu');
const lines = menuButton.querySelectorAll('span');

menuButton.addEventListener('click', e => {
   const visibility = mobileNav.getAttribute('data-visible');

   if(visibility === "false") {
      mobileNav.setAttribute('data-visible', 'true');
      menuButton.setAttribute('aria-expanded', 'true');

      lines.forEach((line, count) => {
         count++;
         line.classList.add('main-nav__cross' + count);
      });

   } else {
      mobileNav.setAttribute('data-visible', 'false');
      menuButton.setAttribute('aria-expanded', 'false');

      lines.forEach((line, count) => {
         count++;
         line.classList.remove('main-nav__cross' + count);
      });
   }
});