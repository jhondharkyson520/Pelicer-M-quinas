let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
let slideInterval = null;

function showSlide(index) {
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    } else {
        currentIndex = index;
    }

    const offset = -currentIndex * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
}

function startSlideShow() {
    slideInterval = setInterval(() => {
        showSlide(currentIndex + 1);
    }, 3000); 
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

startSlideShow();

document.querySelector('.prev-btn').addEventListener('click', () => {
    showSlide(currentIndex - 1);
    stopSlideShow(); 
});

document.querySelector('.next-btn').addEventListener('click', () => {
    showSlide(currentIndex + 1);
    stopSlideShow();
});
