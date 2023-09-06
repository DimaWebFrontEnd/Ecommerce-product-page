const menuBurger = document.querySelector('.menu-burger-icon');
const navMenu = document.querySelector('nav');
const closeMenuBurger = document.querySelector('.close-burger')
const navUl = navMenu.querySelector('ul');
const body = document.querySelector('body');



menuBurger.addEventListener('click', () => {
   //navMenu.style.display = 'block';
   navMenu.classList.add('nav-on')
   navUl.classList.add('show');
   body.style.overflow = 'hidden';
})

closeMenuBurger.addEventListener('click', () => {
   navUl.classList.remove('show');
   navUl.classList.add('hide-menu');
   body.style.overflow = 'auto';
   //setTimeout(() => navMenu.style.display = 'none', 350);
   setTimeout(() => navMenu.classList.remove('nav-on'), 350);
   setTimeout(() => navUl.classList.remove('hide-menu'), 350);
})

window.onclick = function(event) {
   if (event.target === navMenu) {
      navUl.classList.remove('show');
      navUl.classList.add('hide-menu');
      body.style.overflow = 'auto';
      //setTimeout(() => navMenu.style.display = 'none', 350);
      setTimeout(() => navMenu.classList.remove('nav-on'), 350);
      setTimeout(() => navUl.classList.remove('hide-menu'), 350);
   }
 }
