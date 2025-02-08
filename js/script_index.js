let slides = document.querySelectorAll('.slide');
let index = 0;

function showNextSlide() {
  slides[index].style.display = "none";
  index = (index + 1) % slides.length;
  slides[index].style.display = "block";
}

setInterval(showNextSlide, 3000); 