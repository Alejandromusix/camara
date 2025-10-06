const year = document.getElementById("year").textContent = new Date().getFullYear();

let slides = document.querySelectorAll(".image-slider img");
let slideIndex = 0;
let intervalId = null;

document.addEventListener("DOMContentLoaded", initializeSlider)

function initializeSlider() {
  if(slides === 0) return; {
     showSlides(slideIndex);
     intervalId = setInterval(() => nextSlide(false), INTERVAL_MS)
}
}
function showSlides(index) {
    if(index >= slides.length) {
        slideIndex = 0;
    }
    else if(index < 0) {
         slideIndex = slides.length -1;
    }
    
    SlideIndex = index;
    slides.forEach(s => s.classList.remove("displaySlide"));
    slides[slideIndex].classList.add("displaySlide");
 };

function prevSlide(manual = true) {
   clearInterval(intervalId);
   slideIndex--;
   showSlides(slideIndex)
}
function nextSlide(manual = true) {
   clearInterval(intervalId);
   slideIndex++;
   showSlides(slideIndex)
}
function restartInterval() {
  if (intervalId) clearInterval(intervalId);
  intervalId = setInterval(() => nextSlide(false), INTERVAL_MS);
}

