let carouselsIntervals = new Map();

const startCarousel = (carouselInnerDiv) => {
    const carouselId = carouselInnerDiv.parentNode.id;
    stopCarousel(carouselInnerDiv); 
    const interval = setInterval(() => {
        const activeItem = carouselInnerDiv.querySelector('.carousel-item.active');
        const nextItem = activeItem.nextElementSibling || carouselInnerDiv.firstElementChild;
        activeItem.classList.remove('active');
        nextItem.classList.add('active');

        const video = nextItem.querySelector('video');
        if (video) {
            video.play();
            stopCarousel(carouselInnerDiv);
        }
    }, 3000);
    carouselsIntervals.set(carouselId, interval);
};

const stopCarousel = (carouselInnerDiv) => {
    const carouselId = carouselInnerDiv.parentNode.id;
    if (carouselsIntervals.has(carouselId)) {
        clearInterval(carouselsIntervals.get(carouselId));
        carouselsIntervals.delete(carouselId);
    }
};

const moveSlide = (carouselInnerDiv, direction) => {
    stopCarousel(carouselInnerDiv);
    const items = carouselInnerDiv.querySelectorAll('.carousel-item');
    const activeItem = carouselInnerDiv.querySelector('.carousel-item.active');
    let currentIndex = Array.from(items).indexOf(activeItem);
    items[currentIndex].classList.remove('active');
    currentIndex += direction;

    if (currentIndex >= items.length) currentIndex = 0;
    if (currentIndex < 0) currentIndex = items.length - 1;

    items[currentIndex].classList.add('active');
    const video = items[currentIndex].querySelector('video');
    
    if (video) {
        video.play();
    }
};
