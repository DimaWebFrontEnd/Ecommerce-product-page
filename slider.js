const activeImg = document.querySelectorAll('[data-smallImg]');
const modalActiveImg = document.querySelectorAll('[data-smallImg-modal]')
const carousel = document.querySelector('.carousel')

const modalImg = document.querySelector('.img-container-modal');
const firstImg = carousel.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.next-prev-icons img');
const modalArrowIcons = document.querySelectorAll('.modal-next-prev-icons img');

const activeOrangeIcon = document.querySelectorAll(".bg-for-small-img");

let fullImg = document.getElementById('imageBox');



let isDragStart = false;
let isDragging = false;
let prevPageX;
let prevScrollLeft;
let positionDiff;

const showHideIcons = () => {
   let scrollWidth = carousel.scrollWidth - carousel.clientWidth;
     arrowIcons[0].style.display = carousel.scrollLeft === scrollWidth ? 'none' : 'block';
     arrowIcons[1].style.display = carousel.scrollLeft === 0 ? 'none' : 'block';

}

arrowIcons.forEach(icon => {
   icon.addEventListener('click', () => {
      firstImgWidth = firstImg.clientWidth + 5;
      carousel.scrollLeft += icon.id === 'left' ? -firstImgWidth : firstImgWidth;
      setTimeout(() => showHideIcons(), 60);
   })
})

const autoSlide = () => {
   if (carousel.scrollLeft == (carousel.scrollWidth - carousel.clientWidth)) return;

   positionDiff = Math.abs(positionDiff);
   let firstImgWidth = firstImg.clientWidth + 5;
   let valDiffrence = firstImgWidth - positionDiff;

   if (carousel.scrollLeft > prevScrollLeft) {
      return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDiffrence : -positionDiff;
   }

   carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDiffrence : -positionDiff;
}

const dragStart = (e) => {
   isDragStart = true;
   prevPageX = e.pageX || e.touches[0].pageX;
   prevScrollLeft = carousel.scrollLeft;
   
}

const dragging = (e) => {
   if (!isDragStart) return;

   isDragging = true;
   carousel.classList.add('dragging');
   positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
   carousel.scrollLeft = prevScrollLeft - positionDiff;
   showHideIcons()
}

const dragStop = () => {
   isDragStart = false;
   carousel.classList.remove("dragging");

   if(!isDragging) return;
   isDragging = false;
   autoSlide();
}



carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener('touchstart', dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener('touchmove', dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener('touchend', dragStop);



activeImg.forEach(elem => {
   elem.addEventListener('click', () => {
      document.querySelector("img.active").classList.remove("active");
      elem.classList.add('active');
   })
})

activeOrangeIcon.forEach(orangeIcon => {
   orangeIcon.addEventListener('click', () => {
      document.querySelector(".bg-for-small-img.active-plus").classList.remove("active-plus");
      orangeIcon.classList.add('active-plus');
   })
})

const toLargeSize = (smallImg) => {
   fullImg.src = smallImg.src;
}

/** 
 * ! Modal Product Images Container
**/
//


const openModalImg = () => {
   window.innerWidth < 660 
      ? (modalImg.style.display = 'none')
      : (modalImg.style.display = 'block');

      if (modalImg.style.display === 'block') {
         body.style.overflow = 'hidden';
      } 
}

const closeModal = () => {
   modalImg.style.display = 'none';
   body.style.overflow = 'auto';
}

fullImg.addEventListener('click', openModalImg);


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
   let i;
   let slides = document.querySelectorAll("[data-fullImg-modal]");
   let imgModActive = document.querySelectorAll("[data-smallImg-modal]");
   let dots = document.querySelectorAll(".bg-for-modal-small-img");
   
   if (n > slides.length) {slideIndex = 1}
   if (n < 1) {slideIndex = slides.length}

   for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }
   for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
   }
   for (i = 0; i < imgModActive.length; i++) {
      imgModActive[i].className = imgModActive[i].className.replace(" active", "");
   }

   slides[slideIndex-1].style.display = "block";
   dots[slideIndex-1].className += " active";
   imgModActive[slideIndex-1].className += " active";
}

