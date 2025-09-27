const year = document.getElementById("year").textContent = new Date().getFullYear();

let slides = document.querySelectorAll(".image-slider img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider)

function initializeSlider() {
  if(slides < 0){
     slides[slideIndex].classList.add("displaySlide");
     setInterval(nextSlide, 5000);
}
}
function showSlides(index) {
 slides.forEach(slide => {
    slide.classList.remove("displaySlide");
 });
 slides[slideIndex].classList.add("displaySlide");
}
function prevSlide() {

}
function nextSlide() {
   slideIndex++;
   showSlides(slideIndex)
}